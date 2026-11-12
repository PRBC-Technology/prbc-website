"""Check the source site for broken local links, missing anchors and basic HTML issues.

Run from the repository root: python scripts/check_site.py
Only the standard library is required, so this also runs unchanged in CI.
"""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
EXCLUDED_DIRS = {".git", "pages-dist", "docs"}
LOCAL_SCHEMES = {"", "file"}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: dict[str, int] = {}
        self.duplicate_ids: list[tuple[str, int]] = []
        self.links: list[tuple[str, str, int]] = []
        self.images: list[tuple[dict[str, str | None], int]] = []
        self.iframes: list[tuple[dict[str, str | None], int]] = []
        self.lang: str | None = None
        self.title = ""
        self.has_description = False
        self.canonical: str | None = None
        self.h1_count = 0
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = dict(attrs)
        line = self.getpos()[0]

        if tag == "html":
            self.lang = attr.get("lang")
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            if (attr.get("name") or "").lower() == "description" and (attr.get("content") or "").strip():
                self.has_description = True
        elif tag == "link":
            rel = (attr.get("rel") or "").lower().split()
            if "canonical" in rel:
                self.canonical = attr.get("href")
            if attr.get("href"):
                self.links.append(("href", attr["href"], line))
        elif tag == "h1":
            self.h1_count += 1

        if attr.get("id"):
            value = attr["id"]
            if value in self.ids:
                self.duplicate_ids.append((value, line))
            else:
                self.ids[value] = line

        if tag == "a":
            if attr.get("name"):
                self.ids.setdefault(attr["name"], line)
            if attr.get("href"):
                self.links.append(("href", attr["href"], line))
        elif tag in {"img", "script", "iframe", "source"}:
            if attr.get("src"):
                self.links.append(("src", attr["src"], line))
            if tag == "source" and attr.get("srcset"):
                for candidate in attr["srcset"].split(","):
                    url = candidate.strip().split()[0] if candidate.strip() else ""
                    if url:
                        self.links.append(("srcset", url, line))

        if tag == "img":
            self.images.append((attr, line))
        elif tag == "iframe":
            self.iframes.append((attr, line))

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data


def html_files() -> list[Path]:
    files = []
    for path in ROOT.rglob("*.html"):
        if any(part in EXCLUDED_DIRS for part in path.relative_to(ROOT).parts):
            continue
        files.append(path)
    return sorted(files)


def css_files() -> list[Path]:
    files = []
    for path in ROOT.rglob("*.css"):
        if any(part in EXCLUDED_DIRS for part in path.relative_to(ROOT).parts):
            continue
        files.append(path)
    return sorted(files)


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def resolve_target(page: Path, path: str) -> Path | None:
    """Return the local file for a URL path, or None when it is external."""
    parts = urlsplit(path)
    if parts.scheme not in LOCAL_SCHEMES or parts.netloc:
        return None
    raw = parts.path
    if not raw:
        return page
    target = ROOT / raw.lstrip("/") if raw.startswith("/") else page.parent / raw
    target = target.resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        return target  # Reported as an out-of-root link below.
    if target.is_dir() or raw.endswith("/"):
        target = target / "index.html"
    return target


def main() -> int:
    errors: list[str] = []
    pages = {path: PageParser() for path in html_files()}
    for path, parser in pages.items():
        parser.feed(path.read_text(encoding="utf-8"))

    for path, parser in pages.items():
        name = rel(path)
        if not parser.lang:
            errors.append(f"{name}: missing <html lang>")
        if not parser.title.strip():
            errors.append(f"{name}: missing <title>")
        if not parser.has_description:
            errors.append(f"{name}: missing meta description")
        if path.name != "404.html" and not parser.canonical:
            errors.append(f"{name}: missing canonical link")
        if parser.h1_count != 1:
            errors.append(f"{name}: expected exactly one <h1>, found {parser.h1_count}")
        for value, line in parser.duplicate_ids:
            errors.append(f"{name}:{line}: duplicate id {value!r}")
        for attr, line in parser.images:
            if "alt" not in attr:
                errors.append(f"{name}:{line}: <img> is missing alt")
            if not attr.get("width") or not attr.get("height"):
                errors.append(f"{name}:{line}: <img> is missing width/height")
        for attr, line in parser.iframes:
            if not (attr.get("title") or "").strip():
                errors.append(f"{name}:{line}: <iframe> is missing title")

    link_count = 0
    for path, parser in pages.items():
        for kind, url, line in parser.links:
            parts = urlsplit(url)
            if parts.scheme not in LOCAL_SCHEMES or parts.netloc:
                continue
            link_count += 1
            target = resolve_target(path, url)
            if target is None:
                continue
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                errors.append(f"{rel(path)}:{line}: {kind} escapes the repository: {url}")
                continue
            if not target.exists():
                errors.append(f"{rel(path)}:{line}: broken {kind}: {url}")
                continue
            if parts.fragment:
                target_page = pages.get(target)
                if target_page and parts.fragment not in target_page.ids:
                    errors.append(f"{rel(path)}:{line}: missing anchor #{parts.fragment} in {rel(target)}")

    css_count = 0
    url_pattern = re.compile(r"""url\(\s*(['"]?)([^'")]+)\1\s*\)""")
    for path in css_files():
        text = path.read_text(encoding="utf-8")
        for match in url_pattern.finditer(text):
            url = match.group(2).strip()
            parts = urlsplit(url)
            if parts.scheme not in LOCAL_SCHEMES or parts.netloc or url.startswith("#"):
                continue
            css_count += 1
            target = resolve_target(path, url)
            if target is None:
                continue
            line = text.count("\n", 0, match.start()) + 1
            if not target.exists():
                errors.append(f"{rel(path)}:{line}: broken CSS url: {url}")

    if errors:
        print("Site checks failed:")
        for error in errors:
            print(f"  - {error}")
        return 1

    print(
        f"Site checks passed: {len(pages)} HTML pages, "
        f"{link_count} local links/assets, {css_count} CSS urls."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""Prepare a static copy for a GitHub Pages project URL."""
from pathlib import Path
import os
import re
import shutil

source = Path('static-site')
target = Path('pages-dist')
if target.exists():
    shutil.rmtree(target)
shutil.copytree(source, target)
repository = os.environ.get('GITHUB_REPOSITORY', 'PRBC-Technology/prbc-website').split('/')[-1]
prefix = '/' + repository
paths = [p.name for p in source.iterdir()]
pattern = re.compile(r'(?P<lead>["\'\s(,])/(?P<path>(?:' + '|'.join(map(re.escape, paths)) + r')(?:/|[?#"\'\s),]|$))')
for file in target.rglob('*'):
    if file.is_file() and file.suffix.lower() in ('.html', '.css'):
        content = file.read_text(encoding='utf-8')
        content = pattern.sub(lambda m: m.group('lead') + prefix + '/' + m.group('path'), content)
        content = re.sub(r'(?P<lead>href=["\'])/(?P<end>["\'])', lambda m: m.group('lead') + prefix + '/' + m.group('end'), content)
        if file.suffix.lower() == '.html':
            # The GitHub Pages copy is a public preview, not the canonical website.
            content = re.sub(r"""<meta\b(?=[^>]*\bname=["' ]?robots["' ])[^>]*>""", "", content, flags=re.I)
            content = re.sub(r"""<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>""", "", content, flags=re.I)
            content = re.sub(r"""<script\b[^>]*type=["']application/ld\+json["'][^>]*>.*?</script>""", "", content, flags=re.I | re.S)
            content = content.replace('https://prbc.org.au/assets/hero-original.jpg', 'https://prbc-technology.github.io' + prefix + '/assets/hero-original.jpg')
            content = re.sub(r'(<meta property="og:url" content=")https://prbc\.org\.au(/[^" ]*)', lambda m: m.group(1) + 'https://prbc-technology.github.io' + prefix + m.group(2), content)
            content = re.sub(r"</head>", '<meta name="robots" content="noindex, nofollow">\n</head>', content, count=1, flags=re.I)
        file.write_text(content, encoding='utf-8')
# Sitemap and robots.txt describe the future production domain, not this preview.
for name in ('robots.txt', 'sitemap.xml'):
    (target / name).unlink(missing_ok=True)
(target / '.nojekyll').touch()

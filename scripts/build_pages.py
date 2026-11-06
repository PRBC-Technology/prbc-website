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
        file.write_text(content, encoding='utf-8')
(target / '.nojekyll').touch()

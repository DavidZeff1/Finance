#!/usr/bin/env python3
"""Validate section files and assemble the final site.html from shell.html + sections/*.html."""
import glob
import html as htmlmod
import os
import re
import sys
from html.parser import HTMLParser

BASE = os.path.dirname(os.path.abspath(__file__))
SECTIONS_DIR = os.path.join(BASE, 'sections')
SHELL = os.path.join(BASE, 'shell.html')
OUT = os.path.join(BASE, 'site.html')

PARTS = [
    ('Part I · Economic Foundations', range(1, 6)),
    ('Part II · Financial Markets & Instruments', range(6, 11)),
    ('Part III · Corporate Finance & Accounting', range(11, 15)),
    ('Part IV · Investing & Risk', range(15, 18)),
    ('Part V · Your Edge: Data Meets Finance', range(18, 21)),
]

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'}


class BalanceChecker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack:
            self.errors.append(f'line {self.getpos()[0]}: closing </{tag}> with empty stack')
            return
        if self.stack[-1][0] == tag:
            self.stack.pop()
        else:
            # try to find it (unclosed inner tags)
            names = [t for t, _ in self.stack]
            if tag in names:
                while self.stack and self.stack[-1][0] != tag:
                    t, pos = self.stack.pop()
                    self.errors.append(f'line {pos[0]}: <{t}> never closed (implicitly closed by </{tag}>)')
                self.stack.pop()
            else:
                self.errors.append(f'line {self.getpos()[0]}: stray closing </{tag}>')


def check_file(path, text):
    problems = []
    # tag balance
    c = BalanceChecker()
    try:
        c.feed(text)
        c.close()
    except Exception as e:
        problems.append(f'parser exception: {e}')
    problems += c.errors
    for t, pos in c.stack:
        problems.append(f'line {pos[0]}: <{t}> never closed')
    # hardcoded colors in style/fill/stroke contexts (allow var(), none, currentColor, inherit, transparent)
    for m in re.finditer(r'(?:style|fill|stroke|stop-color)\s*=\s*"([^"]*)"', text):
        v = m.group(1)
        if re.search(r'#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(', v):
            problems.append(f'hardcoded color: {v[:80]}')
    for m in re.finditer(r'(?:fillStyle|strokeStyle|setAttribute\([\'"](?:fill|stroke)[\'"])\s*[,=]\s*[\'"]([^\'"]*)[\'"]', text):
        v = m.group(1)
        if re.search(r'#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(', v):
            problems.append(f'hardcoded color in JS: {v[:80]}')
    # external resources
    for m in re.finditer(r'(?:src|href)\s*=\s*"(https?:[^"]*)"', text):
        problems.append(f'external resource: {m.group(1)[:100]}')
    if '<style' in text:
        problems.append('contains <style> tag')
    if '<img' in text or '<iframe' in text or '<link' in text:
        problems.append('contains img/iframe/link element')
    return problems


def extract_meta(text, fname):
    m = re.search(r'<section[^>]*\bid="(s\d\d)"[^>]*\bdata-title="([^"]*)"', text)
    if not m:
        m2 = re.search(r'<section[^>]*\bdata-title="([^"]*)"[^>]*\bid="(s\d\d)"', text)
        if not m2:
            raise ValueError(f'{fname}: cannot find section id/data-title')
        sid, title = m2.group(2), m2.group(1)
    else:
        sid, title = m.group(1), m.group(2)
    subs = []
    for h in re.finditer(r'<h3\s+id="([^"]+)"[^>]*>(.*?)</h3>', text, re.S):
        t = re.sub(r'<[^>]+>', '', h.group(2)).strip()
        subs.append((h.group(1), htmlmod.unescape(t)))
    return sid, htmlmod.unescape(title), subs


def build_nav(sections):
    by_num = {int(s['sid'][1:]): s for s in sections}
    out = []
    for label, nums in PARTS:
        items = []
        for n in nums:
            s = by_num.get(n)
            if not s:
                continue
            search = htmlmod.escape((s['title'] + ' ' + ' '.join(t for _, t in s['subs'])).lower(), quote=True)
            subs_html = '\n'.join(
                f'          <li><a href="#{htmlmod.escape(hid, quote=True)}">{htmlmod.escape(ht)}</a></li>'
                for hid, ht in s['subs']
            )
            items.append(f'''      <li class="nav-item" data-sec="{s['sid']}" data-search="{search}">
        <a class="nav-link" href="#{s['sid']}"><span class="nav-num">{n:02d}</span><span>{htmlmod.escape(s['title'])}</span><span class="nav-check">✓</span></a>
        <ul class="nav-subs">
{subs_html}
        </ul>
      </li>''')
        if items:
            out.append(f'''    <div class="nav-part">
      <p class="nav-part-label">{htmlmod.escape(label)}</p>
      <ul>
{chr(10).join(items)}
      </ul>
    </div>''')
    return '\n'.join(out)


def main():
    files = sorted(glob.glob(os.path.join(SECTIONS_DIR, 's*.html')))
    if not files:
        print('NO SECTION FILES FOUND', file=sys.stderr)
        sys.exit(1)
    sections, all_problems, all_ids = [], {}, {}
    for f in files:
        text = open(f, encoding='utf-8').read().strip()
        fname = os.path.basename(f)
        probs = check_file(f, text)
        sid, title, subs = extract_meta(text, fname)
        exp = 's' + fname[1:3]
        if sid != exp:
            probs.append(f'section id {sid} does not match filename prefix {exp}')
        # id uniqueness across the whole site + prefix check
        for m in re.finditer(r'\bid="([^"]+)"', text):
            i = m.group(1)
            if i in all_ids:
                probs.append(f'duplicate id across site: {i} (also in {all_ids[i]})')
            all_ids[i] = fname
            if not i.startswith(sid):
                probs.append(f'id not prefixed with {sid}: {i}')
        if probs:
            all_problems[fname] = probs
        sections.append({'sid': sid, 'title': title, 'subs': subs, 'text': text, 'file': fname})

    if all_problems:
        print('=== VALIDATION PROBLEMS ===')
        for fn, ps in all_problems.items():
            print(f'\n{fn}:')
            for p in ps:
                print(f'  - {p}')
    else:
        print('All section files pass validation.')

    if '--check-only' in sys.argv:
        sys.exit(1 if all_problems else 0)

    sections.sort(key=lambda s: s['sid'])
    nav = build_nav(sections)
    body = '\n\n'.join(s['text'] for s in sections)
    shell = open(SHELL, encoding='utf-8').read()
    site = shell.replace('<!--NAV-->', nav).replace('<!--SECTIONS-->', body)
    with open(OUT, 'w', encoding='utf-8') as fh:
        fh.write(site)
    kb = os.path.getsize(OUT) / 1024
    print(f'\nAssembled {len(sections)} sections -> {OUT} ({kb:,.0f} KB)')
    words = len(re.sub(r'<[^>]+>', ' ', body).split())
    print(f'Approx body words: {words:,}')


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""Generate section narration MP3s from audio-scripts/*.txt via ElevenLabs.

Usage:  ELEVENLABS_API_KEY=sk_... python3 finance-course-build/generate-audio.py 3-1 3-2 ...
        ELEVENLABS_API_KEY=sk_... python3 finance-course-build/generate-audio.py --chapter 4
        ELEVENLABS_API_KEY=sk_... python3 finance-course-build/generate-audio.py --quota

Output lands in audio-files/<chapter>-<n>.mp3, which is exactly the naming the
audio engine in index.html probes for. Existing files are skipped unless --force.
"""
import json, os, subprocess, sys, tempfile

BASE     = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS  = os.path.join(BASE, 'finance-course-build', 'audio-scripts')
OUT      = os.path.join(BASE, 'audio-files')
VOICE    = 'rR8JWnPrjfZCSkmI0hWH'          # Andrew - Deep and Informational
MODEL    = 'eleven_multilingual_v2'
FMT      = 'mp3_44100_128'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.75, 'style': 0.2, 'use_speaker_boost': True}

KEY = os.environ.get('ELEVENLABS_API_KEY')
if not KEY:
    sys.exit('ELEVENLABS_API_KEY not set')


def api(path, data=None, out=None):
    """curl transport - this Python build has no CA bundle configured."""
    cmd = ['curl', '-sS', '-w', '%{http_code}', '-H', 'xi-api-key: ' + KEY,
           '-o', out or '-', 'https://api.elevenlabs.io' + path]
    if data is not None:
        cmd[1:1] = ['-X', 'POST', '-H', 'Content-Type: application/json',
                    '--data-binary', '@-']
    payload = json.dumps(data).encode() if data is not None else None
    r = subprocess.run(cmd, input=payload, capture_output=True)
    if out:
        return int(r.stdout.strip()[-3:]), r.stderr.decode('utf8', 'replace')
    body, code = r.stdout[:-3].decode('utf8', 'replace'), r.stdout[-3:].decode()
    return int(code), body


def quota():
    code, body = api('/v1/user/subscription')
    if code != 200:
        sys.exit('subscription lookup failed: HTTP %s %s' % (code, body[:200]))
    d = json.loads(body)
    used, lim = d['character_count'], d['character_limit']
    return used, lim, lim - used


def speak(slug, force=False):
    src = os.path.join(SCRIPTS, slug + '.txt')
    dst = os.path.join(OUT, slug + '.mp3')
    os.makedirs(OUT, exist_ok=True)
    if not os.path.exists(src):
        print('  %-5s MISSING SCRIPT' % slug); return 0
    if os.path.exists(dst) and not force:
        print('  %-5s skip (exists)' % slug); return 0
    text = open(src, encoding='utf-8').read().strip()
    body = {'text': text, 'model_id': MODEL, 'voice_settings': SETTINGS}
    tmp = dst + '.part'
    code, err = api('/v1/text-to-speech/%s?output_format=%s' % (VOICE, FMT), body, out=tmp)
    if code != 200:
        detail = open(tmp, 'rb').read()[:200].decode('utf8', 'replace') if os.path.exists(tmp) else err
        print('  %-5s HTTP %s  %s' % (slug, code, detail))
        if os.path.exists(tmp):
            os.remove(tmp)
        return 0
    audio = open(tmp, 'rb').read()
    os.replace(tmp, dst)
    print('  %-5s %6d chars -> %5.1f MB  (~%d:%02d)'
          % (slug, len(text), len(audio) / 1e6,
             len(audio) / 16000 // 60, len(audio) / 16000 % 60))
    return len(text)


if __name__ == '__main__':
    args  = [a for a in sys.argv[1:] if not a.startswith('--')]
    flags = {a for a in sys.argv[1:] if a.startswith('--')}
    used, lim, left = quota()
    print('quota: %s used / %s  ->  %s credits left' % (f'{used:,}', f'{lim:,}', f'{left:,}'))
    if '--quota' in flags:
        sys.exit(0)
    if '--chapter' in flags:
        ch = args[0]
        args = sorted((f[:-4] for f in os.listdir(SCRIPTS) if f.startswith(ch + '-')),
                      key=lambda s: int(s.split('-')[1]))
    planned = sum(len(open(os.path.join(SCRIPTS, s + '.txt'), encoding='utf-8').read().strip())
                  for s in args if os.path.exists(os.path.join(SCRIPTS, s + '.txt')))
    print('planned: %s chars for %d clip(s)' % (f'{planned:,}', len(args)))
    if planned > left:
        sys.exit('ABORT: needs %s credits, only %s left' % (f'{planned:,}', f'{left:,}'))
    spent = sum(speak(s, '--force' in flags) for s in args)
    used, lim, left = quota()
    print('spent %s chars; quota now %s left' % (f'{spent:,}', f'{left:,}'))

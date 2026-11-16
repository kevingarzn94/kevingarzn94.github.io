"""Compara la estructura de una página en español con su traducción en /en/.
Uso: python3 -I scripts/i18n-structure.py apps/portfolio/src/pages/x.html apps/portfolio/src/en/pages/x.html
Solo pueden cambiar el texto y los atributos traducibles (alt, aria-label, title, content, placeholder, lang, aria-roledescription)."""
import sys
from html.parser import HTMLParser
TRANSLATABLE = {"alt", "aria-label", "title", "content", "placeholder", "lang", "aria-roledescription"}
class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.seq = []
    def handle_starttag(self, tag, attrs):
        self.seq.append(("<" + tag, tuple(sorted((k, v) for k, v in attrs if k not in TRANSLATABLE)), tuple(sorted(k for k, v in attrs if k in TRANSLATABLE))))
    def handle_endtag(self, tag):
        self.seq.append(("</" + tag,))
def parse(path):
    p = P(); p.feed(open(path, encoding="utf-8").read()); return p.seq
a, b = parse(sys.argv[1]), parse(sys.argv[2])
for i, (x, y) in enumerate(zip(a, b)):
    if x != y:
        print(f"Diferencia en la etiqueta #{i}:\n  es: {x}\n  en: {y}"); sys.exit(1)
if len(a) != len(b):
    print(f"Distinto número de etiquetas: es {len(a)}, en {len(b)}"); sys.exit(1)
print(f"OK: {len(a)} etiquetas con la misma estructura")

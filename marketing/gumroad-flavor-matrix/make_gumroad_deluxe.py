"""Generate the paid Gumroad edition — 'The Flavor Pairing Matrix: Deluxe Kit'.

Page 1: same designed matrix as the free lead magnet (all 16 pairings).
Page 2: the 5-step build-your-own-pairing method (reused verbatim from the
site's mini-course, Day 5) + a blank worksheet grid — the real
differentiation for $7.99 over the free single-page version.
"""
import os

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

FONTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gumroad-deluxe-matrix.pdf")

PAPER = HexColor("#FFFCF7")
INK = HexColor("#1A1A1A")
VERMILLION = HexColor("#B11226")
HAIRLINE = HexColor("#E6E1D6")

pdfmetrics.registerFont(TTFont("Playfair", f"{FONTS}/Playfair-Medium.ttf"))
pdfmetrics.registerFont(TTFont("Playfair-Bold", f"{FONTS}/Playfair-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Playfair-Italic", f"{FONTS}/Playfair-MediumItalic.ttf"))
pdfmetrics.registerFont(TTFont("Mont", f"{FONTS}/Montserrat-Medium.ttf"))
pdfmetrics.registerFont(TTFont("Mont-SB", f"{FONTS}/Montserrat-SemiBold.ttf"))
pdfmetrics.registerFont(TTFont("Lato", f"{FONTS}/Lato-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Lato-Bold", f"{FONTS}/Lato-Bold.ttf"))

DATA = [
    ("Umami", [
        ("Parmigiano Reggiano", "Glutamate depth", "White miso",
         "Miso is sweeter; reduce salt elsewhere"),
        ("Anchovy in oil", "Umami bomb, fat carrier", "Katsuobushi flakes",
         "Both dissolve into the fat invisibly"),
    ]),
    ("Fat & cure", [
        ("Guanciale", "Animal fat + inosinate", "Pancetta + katsuobushi",
         "Katsuobushi adds oceanic smokiness"),
        ("Pine nuts", "Nutty fat + crunch", "Toasted sesame seeds",
         "Toast until fragrant; add off the heat"),
    ]),
    ("Finishing salt", [
        ("Pecorino Romano", "Sharp fermented salt", "Shiro dashi",
         "Lower volume; stronger per gram"),
        ("Gremolata", "Aromatic finishing sprinkle", "Furikake",
         "Brings nori + sesame; hold extra salt"),
    ]),
    ("Starch & crumb", [
        ("Spaghetti", "Structural starch noodle", "Ramen noodle",
         "Alkaline chew; holds sauce differently"),
        ("Toasted breadcrumbs", "Crisp starch finish", "Panko",
         "Panko is airier; toast in olive oil first"),
    ]),
    ("Acid & alcohol", [
        ("White wine", "Acid cut + alcohol", "Dry sake",
         "Sake is lower in tannins; sweeter finish"),
        ("Balsamic reduction", "Sweet-acid glaze", "Mirin + rice vinegar",
         "Simmer down to a glossy syrup"),
    ]),
    ("Citrus & herb", [
        ("Lemon zest + juice", "Bright citrus lift", "Yuzu",
         "More floral; more zest, less juice"),
        ("Basil", "Fresh green top note", "Shiso",
         "Citrus-mint; tear it in at the end"),
    ]),
    ("Heat", [
        ("Black pepper", "Aromatic contrasting heat", "Sansho pepper",
         "Sansho is more citrus-floral, less spice"),
        ("Peperoncino flakes", "Layered dry heat", "Shichimi togarashi",
         "Adds citrus peel and sansho; gentler burn"),
    ]),
    ("Body", [
        ("Chicken stock", "Liquid body + mineral depth", "Kombu dashi",
         "Dashi is cleaner; no fat or roast notes"),
        ("Ricotta", "Mild fresh body", "Silken tofu",
         "Drain tofu well; it wants more seasoning"),
    ]),
]

# Reused verbatim from app/mini-course/day-5/page.tsx — same voice, already vetted.
STEPS = [
    ("01", "Pick a dish you know well",
     "Choose an Italian or Japanese dish you've cooked before and understand "
     "intuitively. The simpler, the better — carbonara, cacio e pepe, miso "
     "soup, oyakodon."),
    ("02", "Identify the structural roles",
     "Map every ingredient to its function. In carbonara: pasta is structure, "
     "egg emulsifies and enriches, Pecorino adds fermented salt, guanciale "
     "provides fat and inosinate, pepper contrasts. Name each role."),
    ("03", "Cross the pairing matrix",
     "For each ingredient, find its equivalent on the matrix. You don't have "
     "to swap everything — choose 1–3 crossovers that change the "
     "character without losing the structure."),
    ("04", "Cook it as written, then adjust",
     "Make the dish with the swapped ingredients without deviating from the "
     "original technique. Taste what needs adjusting: more acid, more salt, "
     "more depth."),
    ("05", "Name the principle, not the dish",
     "Write one sentence describing what you did functionally: “I applied "
     "Japanese fermented sweetness to an Italian acid-fat-emulsion "
     "structure.” That sentence outlasts the recipe."),
]

W, H = letter
M = 46

c = canvas.Canvas(OUT, pagesize=letter)
c.setTitle("The Flavor Pairing Matrix: Deluxe Kit — Borderless Kitchen")
c.setAuthor("Sebastian Dri — Borderless Kitchen")
c.setSubject("Italian x Japanese ingredient substitutions, method, and worksheet")


def wrap(text, font, size, max_w):
    words, lines, cur = text.split(), [], ""
    for w_ in words:
        trial = (cur + " " + w_).strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w_
    if cur:
        lines.append(cur)
    return lines


def header_band(title, subtitle_lines, eyebrow):
    band_h = 168
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(INK)
    c.rect(0, H - band_h, W, band_h, stroke=0, fill=1)

    y = H - 44
    c.setFillColor(PAPER)
    c.setFillAlpha(0.5)
    c.setFont("Mont-SB", 8)
    c.drawString(M, y, eyebrow)
    c.setFillAlpha(1)

    y -= 34
    c.setFillColor(PAPER)
    c.setFont("Playfair-Bold", 30)
    c.drawString(M, y, title)

    y -= 16
    c.setFillColor(VERMILLION)
    c.rect(M, y, 48, 3, stroke=0, fill=1)

    y -= 24
    c.setFillColor(PAPER)
    c.setFillAlpha(0.72)
    c.setFont("Lato", 10.5)
    for ln in subtitle_lines:
        c.drawString(M, y, ln)
        y -= 15
    c.setFillAlpha(1)
    return band_h


def footer(page_label):
    c.setFillColor(VERMILLION)
    c.circle(M + 3, 40, 2.6, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Playfair-Italic", 9.5)
    c.drawString(M + 14, 37.4, "The Flavor Pairing Matrix — Deluxe Kit — Borderless Kitchen Vol. I")
    c.setFillAlpha(0.45)
    c.setFont("Mont", 7)
    c.drawRightString(W - M, 37.4, "B O R D E R L E S S K I T C H E N S E R I E S . C O M")
    c.setFillAlpha(1)
    c.setFillColor(INK)
    c.setFillAlpha(0.35)
    c.setFont("Lato", 7)
    c.drawString(M + 14, 24, f"© 2026 Sebastian Dri · Personal use · Not for resale or redistribution · {page_label}")
    c.setFillAlpha(1)


# ============================== PAGE 1 — MATRIX ==============================
band_h = header_band(
    "The Flavor Pairing Matrix",
    [
        "Every Japanese–Italian substitution mapped by function — not by taste, not by vibe,",
        "by what each ingredient actually does. Eight categories, sixteen pairings.",
    ],
    "B O R D E R L E S S   K I T C H E N   —   D E L U X E   K I T   ·   P A G E   1   O F   2",
)

x_cat = M
x_ita = M + 74
x_fun = x_ita + 116
x_jap = x_fun + 112
x_note = x_jap + 118
x_end = W - M

top = H - band_h - 30
c.setFont("Mont-SB", 7)
c.setFillColor(INK)
c.setFillAlpha(0.5)
for x, label in [(x_ita, "I T A L I A N"), (x_fun, "F U N C T I O N"),
                 (x_jap, "J A P A N E S E"), (x_note, "N O T E")]:
    c.drawString(x, top, label)
c.setFillAlpha(1)
c.setStrokeColor(INK)
c.setStrokeAlpha(0.25)
c.setLineWidth(1.1)
c.line(M, top - 8, x_end, top - 8)
c.setStrokeAlpha(1)

ROW_H = 31.5
y = top - 8

for cat, rows in DATA:
    cat_top = y
    for i, (ita, fun, jap, note) in enumerate(rows):
        base = y - ROW_H + 11

        c.setFillColor(INK)
        c.setFont("Lato-Bold", 9.5)
        c.drawString(x_ita, base + 4, ita)

        c.setFillColor(INK)
        c.setFillAlpha(0.45)
        c.setFont("Mont", 6.4)
        lines = wrap(fun.upper(), "Mont", 6.4, x_jap - x_fun - 12)
        yy = base + (10 if len(lines) > 1 else 4)
        for ln in lines:
            c.drawString(x_fun, yy, ln)
            yy -= 9
        c.setFillAlpha(1)

        c.setFillColor(VERMILLION)
        c.setFont("Lato", 9.5)
        lines = wrap(jap, "Lato", 9.5, x_note - x_jap - 12)
        yy = base + (10 if len(lines) > 1 else 4)
        for ln in lines:
            c.drawString(x_jap, yy, ln)
            yy -= 11

        c.setFillColor(INK)
        c.setFillAlpha(0.55)
        c.setFont("Lato", 8)
        lines = wrap(note, "Lato", 8, x_end - x_note)
        yy = base + (10 if len(lines) > 1 else 4)
        for ln in lines:
            c.drawString(x_note, yy, ln)
            yy -= 10
        c.setFillAlpha(1)

        y -= ROW_H
        if i == 0:
            c.setStrokeColor(HAIRLINE)
            c.setLineWidth(0.7)
            c.line(x_ita, y, x_end, y)

    c.setFillColor(INK)
    c.setFillAlpha(0.45)
    c.setFont("Mont-SB", 6.6)
    c.drawString(x_cat, (cat_top + y) / 2 - 2, cat.upper())
    c.setFillAlpha(1)

    c.setStrokeColor(INK)
    c.setStrokeAlpha(0.18)
    c.setLineWidth(0.9)
    c.line(M, y, x_end, y)
    c.setStrokeAlpha(1)

footer("Page 1 of 2")
c.showPage()

# ======================= PAGE 2 — METHOD + WORKSHEET =======================
band_h = header_band(
    "Build Your Own Pairing",
    [
        "The five-step method behind every recipe in Tokyo Meets Tuscany —",
        "then a blank grid to run it yourself.",
    ],
    "B O R D E R L E S S   K I T C H E N   —   D E L U X E   K I T   ·   P A G E   2   O F   2",
)

y = H - band_h - 34
col_w = (x_end - M - 28) / 2

for idx, (num, title, detail) in enumerate(STEPS):
    col = idx % 2 if idx < 4 else None
    # simple single-column flow for consistent rhythm at this size
    c.setFillColor(VERMILLION)
    c.setFont("Playfair-Bold", 15)
    c.drawString(M, y, num)

    c.setFillColor(INK)
    c.setFont("Lato-Bold", 10.5)
    c.drawString(M + 34, y, title)

    c.setFillColor(INK)
    c.setFillAlpha(0.62)
    c.setFont("Lato", 8.4)
    lines = wrap(detail, "Lato", 8.4, x_end - (M + 34))
    yy = y - 13
    for ln in lines:
        c.drawString(M + 34, yy, ln)
        yy -= 11
    c.setFillAlpha(1)

    y = yy - 12
    if idx < len(STEPS) - 1:
        c.setStrokeColor(HAIRLINE)
        c.setLineWidth(0.7)
        c.line(M, y, x_end, y)
        y -= 16

# ---- worksheet grid
y -= 6
c.setFillColor(INK)
c.setFillAlpha(0.5)
c.setFont("Mont-SB", 7.5)
c.drawString(M, y, "Y O U R   T U R N")
c.setFillAlpha(1)
y -= 6
c.setStrokeColor(INK)
c.setStrokeAlpha(0.25)
c.setLineWidth(1.1)
c.line(M, y, x_end, y)
c.setStrokeAlpha(1)

y -= 16
headers2 = [("Dish", M), ("Original ingredient", M + 108), ("Function", M + 268),
            ("Swap in", M + 380)]
c.setFont("Mont-SB", 6.6)
c.setFillColor(INK)
c.setFillAlpha(0.45)
for label, x in headers2:
    c.drawString(x, y, label.upper())
c.setFillAlpha(1)

y -= 8
row_h = 26
n_rows = 5
c.setStrokeColor(HAIRLINE)
c.setLineWidth(0.8)
for r in range(n_rows + 1):
    yy = y - r * row_h
    c.line(M, yy, x_end, yy)
for x in [M, M + 100, M + 260, M + 372, x_end]:
    c.line(x, y, x, y - n_rows * row_h)

footer("Page 2 of 2")
c.save()
print("wrote", OUT)

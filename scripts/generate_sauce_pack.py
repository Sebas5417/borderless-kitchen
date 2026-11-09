#!/usr/bin/env python3
"""Generate public/sauce-pack.pdf — the free 5-sauce lead magnet.

Why this file exists
--------------------
The Sauce Pack shipped for months with no reproducible source in the repo, and
it carried three defects that a reader could hit:

  1. The "Get it on Amazon" button had a single annotation pointing at
     file:///home/claude/saucepack.html — a dead link on the author's own
     machine, so the buy button did nothing on every download.
  2. Page 4 still sold Seoul Meets Mexico City as forthcoming ("Reply to this
     email to get on the early list") with no purchase path, months after Vol. II
     went live on Gumroad at $9.99.
  3. The page-2 sauce-02 "Why it works" callout ran into the footer rule and
     overlapped the footer text "5 Japanese–Italian Sauces".

This script reproduces the shipped design (cream ground, rust accent, DejaVu
type, two-column recipe blocks, hairline ingredient rules, rust callouts, navy
CTA card) and fixes exactly those three things. Copy is unchanged except where
it was selling the wrong thing.

The intro moves from the top of page 2 to the lower half of the cover, which is
what makes the five recipe blocks fit without the section footer colliding with
anything. Page count stays at four.

Run:
    python -I -B scripts/generate_sauce_pack.py

Output: public/sauce-pack.pdf
"""
from __future__ import annotations

import sys
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "sauce-pack.pdf"

# ---------------------------------------------------------------- palette ----
CREAM = HexColor("#FBF6EE")   # page ground
PALE = HexColor("#F6EBE0")    # callout / footer band / Vol. II box
RULE = HexColor("#E4DACB")    # hairlines
RUST = HexColor("#BC5A38")    # accent, eyebrows, buttons
GOLD = HexColor("#B4894F")    # eyebrows on the dark card
INK = HexColor("#2A2521")     # body / headline
GREY = HexColor("#6B615A")    # secondary copy
NAVY = HexColor("#2E3A46")    # CTA card, column labels
CARD_BODY = HexColor("#D9D0C4")
CARD_FOOT = HexColor("#93A5B4")

# ---------------------------------------------------------------- metrics ----
PAGE_W, PAGE_H = 612.0, 792.0
ML, MR = 64.8, 547.2
LEFT_COL_X = ML
LEFT_COL_RULE_W = 240.7
LEFT_COL_TEXT_W = 175.9
RIGHT_NUM_R = 268.2
RIGHT_TXT_X = 272.2
RIGHT_TXT_W = MR - RIGHT_TXT_X
CALLOUT_X = 260.2
CALLOUT_TXT_X = 271.5
BEST_ON_X = 312.0
CONTENT_TOP = 62.5
CONTENT_BOTTOM = 730.0
FOOTER_BAND = (737.2, 756.0)

# ---------------------------------------------------------------- content ----
EYEBROW = "BORDERLESS KITCHEN"
PILL = "FREE STARTER PACK"
SITE = "borderlesskitchenseries.com"

# Sale channel, mirrored from lib/amazon.ts and lib/gumroad.ts. If those change,
# change these: this PDF ships a link a reader will click.
TMT_AMAZON = "https://www.amazon.com/dp/B0GY8H2TCQ?tag=borderlesskitchen-20"
SMMC_GUMROAD = "https://facelesschannel.gumroad.com/l/dqnqe"
SMMC_PRICE = "$9.99"
AMAZON_DISCLOSURE = (
    "As an Amazon Associate, Borderless Kitchen earns from qualifying purchases."
)

INTRO = (
    "Sauce is where the borders come down. You don't need a new cuisine to cook "
    "better — you need to notice that the good stuff already overlaps. Miso and "
    "brown butter are the same idea. Balsamic and soy are cousins. Parmesan is "
    "basically Italy's miso. Here are five sauces that prove it. Keep them; the "
    "whole book is built on this."
)

SAUCES = [
    {
        "n": "01",
        "title": "Miso Butter",
        "tagline": "The one you make when you're too tired to think. "
                   "Nearly impossible to ruin.",
        "ingredients": [
            "4 tbsp unsalted butter",
            "1 tbsp white (shiro) miso",
            "1 clove garlic, grated",
            "1 tsp soy sauce",
            "Black pepper + a splash of pasta water",
        ],
        "method": [
            "Melt the butter over low heat — don't rush it.",
            "Whisk in miso, garlic and soy until smooth.",
            "Loosen with a splash of starchy pasta water until glossy.",
        ],
        "best_on": "pasta, roasted vegetables, seared salmon, rice, udon",
        "why": "Miso and browned butter are both built on deep savory umami. "
               "Italy calls it brown butter, Japan calls it miso. Same idea, "
               "two passports.",
    },
    {
        "n": "02",
        "title": "Chili–Soy Garlic Oil",
        "tagline": "Aglio e olio's louder cousin. Heat, garlic, and a little "
                   "danger.",
        "ingredients": [
            "1/3 cup olive oil",
            "4 cloves garlic, thinly sliced",
            "1 tbsp chili flakes (or chili crisp)",
            "1 tbsp soy sauce",
            "Pinch of sugar",
        ],
        "method": [
            "Warm oil and garlic slowly until pale gold. Do not burn it.",
            "Off the heat, stir in chili and soy — it'll sizzle.",
            "Pinch of sugar to round off the edge.",
        ],
        "best_on": "spaghetti, noodles, dumplings, fried eggs, grilled meat",
        "why": "Aglio e olio and Asian chili oil are the same three moves: fat, "
               "garlic, heat. Soy just does the depth that parmesan usually "
               "handles.",
    },
    {
        "n": "03",
        "title": "Umami Tomato",
        "tagline": "Marinara that went to Tokyo and came back different.",
        "ingredients": [
            "1 can (14 oz) crushed tomatoes",
            "2 tbsp olive oil",
            "1/2 onion, finely diced",
            "1 clove garlic",
            "1 tsp white miso or dashi powder",
            "Pinch sugar + fresh basil",
        ],
        "method": [
            "Soften onion and garlic in the oil.",
            "Add tomatoes and simmer 15 minutes.",
            "Stir in miso or dashi at the end; finish with basil.",
        ],
        "best_on": "pasta, pizza, gnocchi, meatballs, eggs",
        "why": "Italians build depth with anchovy and parmesan; Japan uses dashi "
               "and miso. Both are pure umami. Swap the source, keep the soul.",
    },
    {
        "n": "04",
        "title": "Soy–Balsamic Glaze",
        "tagline": "Sweet, sharp, sticky. The finishing move that tastes "
                   "expensive.",
        "ingredients": [
            "1/4 cup balsamic vinegar",
            "2 tbsp soy sauce",
            "1 tbsp honey or mirin",
            "1 clove garlic, smashed",
        ],
        "method": [
            "Combine everything in a small pan.",
            "Simmer until it coats a spoon, about 5–7 minutes.",
            "Fish out the garlic. Done.",
        ],
        "best_on": "steak, salmon, roasted mushrooms, caprese, tofu",
        "why": "Balsamic and soy are both aged, fermented and dark. Reduce them "
               "together and you get a glaze with the complexity of something "
               "that took all day.",
    },
    {
        "n": "05",
        "title": "Parmesan–Miso Cream",
        "tagline": "Alfredo with a passport. Richer, deeper, harder to stop "
                   "eating.",
        "ingredients": [
            "1/2 cup heavy cream",
            "1/3 cup grated parmesan",
            "1 tsp white miso",
            "1 clove garlic, grated",
            "Black pepper + a scrape of nutmeg",
        ],
        "method": [
            "Warm the cream and garlic gently — don't boil.",
            "Off the heat, whisk in parmesan and miso until smooth.",
            "Finish with pepper and a tiny grate of nutmeg.",
        ],
        "best_on": "fettuccine, gnocchi, chicken, cauliflower, baked potatoes",
        "why": "Parmesan is basically Italy's miso: aged, salty, packed with "
               "glutamate. Put them together and the savoriness doubles instead "
               "of fighting.",
    },
]

# ------------------------------------------------------------------ fonts ----
FONT_DIR = Path("C:/Windows/Fonts")
FONTS = {
    "Serif": "DejaVuSerif.ttf",
    "Serif-Bold": "DejaVuSerif-Bold.ttf",
    "Serif-Italic": "DejaVuSerif-BoldItalic.ttf",
    "Sans": "DejaVuSans.ttf",
    "Sans-Bold": "DejaVuSans-Bold.ttf",
    "Sans-Oblique": "DejaVuSans-Oblique.ttf",
}


def register_fonts() -> None:
    for name, fname in FONTS.items():
        path = FONT_DIR / fname
        if not path.exists():
            raise SystemExit("missing font: %s" % path)
        pdfmetrics.registerFont(TTFont("DejaVu" + name, str(path)))


def w(text: str, font: str, size: float) -> float:
    return pdfmetrics.stringWidth(text, font, size)


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    return simpleSplit(text, font, size, width)


# ----------------------------------------------------------------- canvas ----
class Doc:
    """Thin top-down wrapper: y is measured from the top of the page."""

    def __init__(self, path: Path):
        # initialFontName keeps reportlab's default Helvetica out of the page
        # preamble, so every font resource in the file is an embedded DejaVu.
        self.c = canvas.Canvas(str(path), pagesize=(PAGE_W, PAGE_H),
                               initialFontName="DejaVuSans",
                               initialFontSize=9)
        self.c.setTitle("5 Japanese–Italian Sauces — Borderless Kitchen")
        self.c.setAuthor("Sebastian Dri")
        self.c.setSubject("Free starter pack")
        self.page_no = 0
        self.rules: list[str] = []

    # -- primitives ---------------------------------------------------------
    def text(self, x, y, s, font, size, color, char_space=0.0, align="left"):
        c = self.c
        full = w(s, font, size) + char_space * len(s)
        if align == "right":
            x -= full
        elif align == "center":
            x -= full / 2
        c.setFillColor(color)
        c.setFont(font, size)
        if char_space:
            # Tc lives in the graphics state and survives ET, so it must be
            # scoped or every later string inherits the tracking.
            c.saveState()
            t = c.beginText(x, PAGE_H - y)
            t.setFont(font, size)
            t.setFillColor(color)
            t.setCharSpace(char_space)
            t.textOut(s)
            c.drawText(t)
            c.restoreState()
        else:
            self._out(x, y, s, font, size, color)

    def _out(self, x, y, s, font, size, color):
        """Draw a single string keeping leading/trailing spaces intact.

        drawString trims the outer spaces of the string it emits, which silently
        welds words together where one run ends and the next begins.
        """
        if not s:
            return
        c = self.c
        c.saveState()
        t = c.beginText(x, PAGE_H - y)
        t.setFont(font, size)
        t.setFillColor(color)
        t.textOut(s)
        c.drawText(t)
        c.restoreState()

    def runs(self, x, y, parts, size, color_default=INK):
        """Draw [(text, font, color|None), ...] left to right on one baseline."""
        for s, font, color in parts:
            self._out(x, y, s, font, size, color or color_default)
            x += w(s, font, size)
        return x

    def rect(self, x0, y0, x1, y1, fill, stroke=None, stroke_w=0.8):
        c = self.c
        c.setFillColor(fill) if fill else None
        if stroke:
            c.setStrokeColor(stroke)
            c.setLineWidth(stroke_w)
        c.rect(x0, PAGE_H - y1, x1 - x0, y1 - y0,
               fill=1 if fill else 0, stroke=1 if stroke else 0)

    def hairline(self, x0, y, x1, color=RULE, width=0.6):
        c = self.c
        c.setStrokeColor(color)
        c.setLineWidth(width)
        c.line(x0, PAGE_H - y, x1, PAGE_H - y)

    def link(self, url, x0, y0, x1, y1):
        self.c.linkURL(url, (x0, PAGE_H - y1, x1, PAGE_H - y0), relative=0)

    def guard(self, label, bottom):
        if bottom > CONTENT_BOTTOM:
            self.rules.append(
                "FAIL overflow: %s reaches y=%.1f (limit %.1f)"
                % (label, bottom, CONTENT_BOTTOM))
        else:
            self.rules.append(
                "OK   fits: %s ends y=%.1f (limit %.1f)" % (label, bottom,
                                                            CONTENT_BOTTOM))

    def new_page(self):
        if self.page_no:
            self.c.showPage()
        self.page_no += 1
        self.c.setFillColor(CREAM)
        self.c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    def save(self):
        self.c.showPage()
        self.c.save()


# ------------------------------------------------------------------ pages ----
def draw_eyebrow(d, x, y, s, color=RUST, size=8.5, tracking=2.7):
    d.text(x, y, s, "DejaVuSans-Bold", size, color, char_space=tracking)


def draw_footer(d, page_no):
    y0, y1 = FOOTER_BAND
    d.rect(ML, y0, MR, y1, PALE)
    base = y1 - 4.0
    d.text(ML + 4.0, base, "Borderless Kitchen", "DejaVuSans", 8.0, GREY)
    d.text(MR - 4.0, base, "5 Japanese–Italian Sauces", "DejaVuSans", 8.0, GREY,
           align="right")
    d.text(ML + 4.0, base + 0.0, "", "DejaVuSans", 8.0, GREY)
    d.rules.append("INFO footer band page %d at y %.1f-%.1f" % (page_no, y0, y1))


def draw_cover(d):
    d.new_page()
    # eyebrow + short ink tick under it
    draw_eyebrow(d, ML, 69.8, EYEBROW)
    d.rect(ML, 81.4, ML + 40.5, 82.9, INK)

    # outlined rust pill
    d.rect(ML, 82.9, 200.7, 104.7, None, stroke=RUST, stroke_w=0.9)
    d.text((ML + 200.7) / 2, 96.4, PILL, "DejaVuSans-Bold", 8.0, RUST,
           char_space=2.25, align="center")

    # headline, 40/41.6
    d.runs(ML, 152.5, [("5 Japanese–Italian", "DejaVuSerif-Bold", INK)], 40)
    d.runs(ML, 194.1, [
        ("Sauces ", "DejaVuSerif-Bold", INK),
        ("that fix", "DejaVuSerif-Italic", RUST),
        (" any", "DejaVuSerif-Bold", INK),
    ], 40)
    d.runs(ML, 235.7, [("dinner.", "DejaVuSerif-Bold", INK)], 40)

    # standfirst, 12.5/19.4
    for i, line in enumerate([
        "Five fusion sauces you can make in under ten minutes with",
        "things already in your kitchen. Pulled straight from the",
    ]):
        d.text(ML, 272.5 + i * 19.4, line, "DejaVuSans", 12.5, GREY)
    d.runs(ML, 272.5 + 2 * 19.4, [
        ("flavor system behind ", "DejaVuSans", GREY),
        ("Tokyo Meets Tuscany", "DejaVuSans-Oblique", GREY),
        (".", "DejaVuSans", GREY),
    ], 12.5)

    d.hairline(ML, 331.0, MR)

    # byline row
    base = 351.0
    x = d.runs(ML, base, [
        ("By ", "DejaVuSans", GREY),
        ("Sebastian Dri", "DejaVuSans-Bold", INK),
    ], 9.0)
    d.text(x, base, "  ·  borderlesskitchenseries.com", "DejaVuSans", 9.0, GREY)

    # the intro lives here so page 2 can carry two recipe blocks
    y = 400.0
    y += 12.0
    draw_eyebrow(d, ML, y, "THE SAUCES · 01–05", color=GOLD, size=7.5,
                 tracking=1.6)
    y += 12.0
    d.hairline(ML, y, MR)
    y += 22.0
    for line in wrap(INTRO, "DejaVuSans", 11.0, MR - ML):
        d.text(ML, y, line, "DejaVuSans", 11.0, GREY)
        y += 17.0
    y += 6.0
    d.hairline(ML, y, MR)
    d.guard("cover intro block", y)


def draw_recipe(d, top, s):
    """Draw one sauce block; returns the y where it ends."""
    # number + title + tagline
    d.text(ML, top + 8.6, s["n"], "DejaVuSerif-Bold", 11.0, RUST)
    d.text(ML, top + 18.8 + 17.0, s["title"], "DejaVuSerif-Bold", 20.0, INK)
    ty = top + 50.3 + 8.0
    for line in wrap(s["tagline"], "DejaVuSans-Oblique", 10.5, MR - ML):
        d.text(ML, ty, line, "DejaVuSans-Oblique", 10.5, GREY)
        ty += 13.6

    # column labels
    lab = top + 74.5 + 5.6
    d.text(LEFT_COL_X, lab, "INGREDIENTS", "DejaVuSans-Bold", 7.5, NAVY,
           char_space=1.35)
    d.text(RIGHT_NUM_R, lab, "METHOD", "DejaVuSans-Bold", 7.5, NAVY,
           char_space=1.35, align="right")

    # left column: ingredients with a hairline rule under each
    y = top + 91.3
    row_end = y
    for item in s["ingredients"]:
        lines = wrap(item, "DejaVuSans", 9.5, LEFT_COL_TEXT_W)
        for i, line in enumerate(lines):
            d.text(LEFT_COL_X, y + i * 12.2, line, "DejaVuSans", 9.5, INK)
        row_end = y + (len(lines) - 1) * 12.2
        d.hairline(LEFT_COL_X, row_end + 4.4, LEFT_COL_RULE_W, RULE, 0.5)
        y += 18.0
    left_bottom = row_end + 6.0

    # right column: numbered method steps
    y = top + 91.3
    for i, step in enumerate(s["method"], 1):
        lines = wrap(step, "DejaVuSans", 9.8, RIGHT_TXT_W)
        for j, line in enumerate(lines):
            if j == 0:
                d.text(RIGHT_NUM_R, y, "%d." % i, "DejaVuSans-Bold", 9.8, RUST,
                       align="right")
            d.text(RIGHT_TXT_X, y, line, "DejaVuSans", 9.8, INK)
            y += 14.7
        y += 2.9
        row_end = y - 2.9 - 14.7
    method_bottom = row_end + 5.0

    # "Best on:" - label at the callout margin, value at its own hanging indent
    # (304.5 as measured in the shipped pack) so wrapped lines align under the
    # value instead of under the label.
    by = max(left_bottom, method_bottom) + 14.0
    d.text(CALLOUT_X, by, "Best on:", "DejaVuSans-Bold", 9.5, NAVY)
    best_lines = wrap(s["best_on"], "DejaVuSans", 9.5, MR - BEST_ON_X)
    for k, line in enumerate(best_lines):
        d.text(BEST_ON_X, by + k * 14.2, line, "DejaVuSans", 9.5, GREY)
    best_bottom = by + (len(best_lines) - 1) * 14.2 + 4.0

    # rust callout, right column only
    ctop = best_bottom + 12.0
    seg = [("Why it works — ", "DejaVuSans-Bold", RUST)]
    body_w = MR - CALLOUT_TXT_X
    prefix_w = w("Why it works — ", "DejaVuSans-Bold", 9.3)
    # wrap the body against the width left on the first line
    words = s["why"].split()
    lines, cur = [], ""
    avail = body_w - prefix_w
    first = True
    for word in words:
        trial = (cur + " " + word).strip()
        if w(trial, "DejaVuSans", 9.3) <= avail:
            cur = trial
        else:
            lines.append(cur)
            cur = word
            first = False
            avail = body_w
    lines.append(cur)
    n_lines = len(lines)
    cheight = 9.0 + n_lines * 13.95 + 4.5
    d.rect(CALLOUT_X, ctop, MR, ctop + cheight, PALE)
    d.rect(CALLOUT_X, ctop, CALLOUT_X + 2.4, ctop + cheight, RUST)

    ty = ctop + 9.0 + 7.2
    x = d.runs(CALLOUT_TXT_X, ty, seg, 9.3)
    d.text(x, ty, lines[0], "DejaVuSans", 9.3, INK)
    for k, line in enumerate(lines[1:], 1):
        d.text(CALLOUT_TXT_X, ty + k * 13.95, line, "DejaVuSans", 9.3, INK)

    return max(ctop + cheight, left_bottom)


def draw_cta_card(d, top):
    """Navy Amazon card for Vol. I, with its live link and the disclosure."""
    h = 172.0
    d.rect(ML, top, MR, top + h, NAVY)
    d.text(82.8, top + 20.0, "THE COOKBOOK", "DejaVuSans-Bold", 7.5, GOLD,
           char_space=1.6)
    d.text(82.8, top + 43.0, "Tokyo Meets Tuscany", "DejaVuSerif", 18.0,
           HexColor("#FFFFFF"))

    body = ("30 Japanese–Italian recipes built on the exact logic behind these "
            "sauces — Udon Bolognese, Chili Oil Lasagna Roll-Ups, "
            "miso-butter everything. Restaurant-level weeknight dinners, "
            "minus the restaurant.")
    y = top + 66.0
    for line in wrap(body, "DejaVuSans", 9.8, MR - 82.8 - 18.0):
        d.text(82.8, y, line, "DejaVuSans", 9.8, CARD_BODY)
        y += 14.7

    bx0, by0, bx1, by1 = 82.8, y + 6.0, 218.5, y + 33.8
    d.rect(bx0, by0, bx1, by1, RUST)
    label = "Get it on Amazon →"
    d.text((bx0 + bx1) / 2, by0 + 17.6, label, "DejaVuSans-Bold", 9.5,
           HexColor("#FFFFFF"), align="center")
    d.link(TMT_AMAZON, bx0, by0, bx1, by1)
    d.rules.append("INFO card button links %s" % TMT_AMAZON)

    d.text(82.8, top + h - 10.0, AMAZON_DISCLOSURE, "DejaVuSans", 6.8, CARD_FOOT)
    return top + h


def draw_vol_two(d, top):
    """Vol. II is live on Gumroad: say so, and link it. Never an Amazon CTA."""
    h = 96.0
    d.rect(ML, top, MR, top + h, PALE)
    d.rect(ML, top, ML + 2.4, top + h, RUST)
    d.text(82.8, top + 24.0, "Seoul Meets Mexico City is out.",
           "DejaVuSerif-Bold", 13.0, INK)
    body = ("Gochujang, adobo, kimchi, birria, street corn — the Korean–Mexican "
            "collision, in 30 recipes built on the same flavor logic as this "
            "pack.")
    y = top + 42.0
    for line in wrap(body, "DejaVuSans", 9.3, MR - 82.8 - 18.0):
        d.text(82.8, y, line, "DejaVuSans", 9.3, GREY)
        y += 13.4
    y += 8.0
    link_text = "Get it on Gumroad — %s →" % SMMC_PRICE
    d.text(82.8, y, link_text, "DejaVuSans-Bold", 9.8, RUST)
    d.link(SMMC_GUMROAD, 82.8, y - 9.0, 82.8 + w(link_text, "DejaVuSans-Bold",
                                                 9.8), y + 3.0)
    d.rules.append("INFO Vol. II links %s at %s" % (SMMC_GUMROAD, SMMC_PRICE))
    return top + h


def draw_signoff(d, y):
    d.text(ML, y, "Cook something that shouldn't work. Watch it work anyway.",
           "DejaVuSans", 9.5, GREY)
    d.text(ML, y + 18.0, "— Sebastian", "DejaVuSerif", 12.0, INK)
    return y + 22.0


def build() -> int:
    register_fonts()
    d = Doc(OUT)

    # page 1 — cover + intro
    draw_cover(d)

    # page 2 — sauces 01, 02
    d.new_page()
    y = CONTENT_TOP
    y = draw_recipe(d, y, SAUCES[0]) + 34.0
    d.hairline(ML, y - 17.0, MR)
    y = draw_recipe(d, y, SAUCES[1])
    d.guard("page 2 blocks", y)
    draw_footer(d, 2)

    # page 3 — sauces 03, 04
    d.new_page()
    y = CONTENT_TOP
    y = draw_recipe(d, y, SAUCES[2]) + 34.0
    d.hairline(ML, y - 17.0, MR)
    y = draw_recipe(d, y, SAUCES[3])
    d.guard("page 3 blocks", y)
    draw_footer(d, 3)

    # page 4 — sauce 05, then the back matter
    d.new_page()
    y = draw_recipe(d, CONTENT_TOP, SAUCES[4]) + 40.0
    y = draw_cta_card(d, y) + 18.0
    y = draw_vol_two(d, y) + 26.0
    y = draw_signoff(d, y)
    d.guard("page 4 back matter", y)

    d.c.save()

    fails = [r for r in d.rules if r.startswith("FAIL")]
    print("wrote %s" % OUT)
    for line in d.rules:
        print("  " + line)
    if fails:
        print("FAILED: %d overflow(s)" % len(fails))
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(build())

"""Replace sauce-pack page four, preserving the first three recipe pages.

The old repair overlaid new copy without removing hidden obsolete text. This
rebuild is idempotent: running it again replaces page four instead of stacking
another overlay. All purchase links go directly to tagged Amazon product pages.
"""

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

PDF = Path(__file__).resolve().parents[1] / "public" / "sauce-pack.pdf"
TMT = "https://www.amazon.com/dp/B0GY8H2TCQ?tag=borderlesskitchen-20"
SMMC = "https://www.amazon.com/dp/B0H6VD21M2?tag=borderlesskitchen-20"

font_dir = Path("C:/Windows/Fonts")
font_files = {"Serif": "georgia.ttf", "SerifBold": "georgiab.ttf", "Sans": "arial.ttf", "SansBold": "arialbd.ttf"}
if all((font_dir / filename).exists() for filename in font_files.values()):
    for name, filename in font_files.items():
        pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))
    SERIF, SERIF_BOLD, SANS, SANS_BOLD = font_files.keys()
else:
    SERIF, SERIF_BOLD, SANS, SANS_BOLD = "Times-Roman", "Times-Bold", "Helvetica", "Helvetica-Bold"

BG, INK, MUTED = map(HexColor, ("#FBF6EE", "#262522", "#6F6860"))
RUST, GOLD, NAVY = map(HexColor, ("#BF603A", "#B8843B", "#2D3A47"))
CREAM, PALE, RULE = map(HexColor, ("#EEE9DF", "#F2E8DE", "#DED1C3"))


def text(c, words, x, y, width, font=SANS, size=10, leading=14, color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in simpleSplit(words, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def method(c, number, words, y):
    text(c, f"{number}.", 260, y, 14)
    return text(c, words, 275, y, 272, size=10) - 3


buffer = BytesIO()
c = canvas.Canvas(buffer, pagesize=(612, 792))
c.setFillColor(BG)
c.rect(0, 0, 612, 792, fill=1, stroke=0)
text(c, "T H E   S A U C E S   /   0 1 - 0 5", 64, 729, 480, SANS_BOLD, 8.5, color=GOLD)
text(c, "05", 64, 686, 100, SERIF_BOLD, 11, color=RUST)
text(c, "Parmesan-Miso Cream", 64, 658, 484, SERIF_BOLD, 22)
text(c, "Alfredo with a passport. Richer, deeper, harder to stop eating.", 64, 637, 484, SERIF, 10.5, color=MUTED)
text(c, "I N G R E D I E N T S", 64, 611, 180, SANS_BOLD, 8, color=NAVY)
text(c, "M E T H O D", 260, 611, 270, SANS_BOLD, 8, color=NAVY)
for i, ingredient in enumerate(("1/2 cup heavy cream", "1/3 cup grated parmesan", "1 tsp white miso", "1 clove garlic, grated", "Black pepper + a scrape of nutmeg")):
    y = 591 - 18 * i
    text(c, ingredient, 64, y, 180, size=9.4)
    c.setStrokeColor(RULE)
    c.setLineWidth(0.5)
    c.line(64, y - 7, 244, y - 7)
y = 591
y = method(c, 1, "Warm the cream and garlic gently - don't boil.", y)
y = method(c, 2, "Off the heat, whisk in parmesan and miso until smooth.", y)
method(c, 3, "Finish with pepper and a tiny grate of nutmeg.", y)
text(c, "Best on: fettuccine, gnocchi, chicken, cauliflower, baked potatoes.", 260, 523, 286, size=9.7)

c.setFillColor(PALE)
c.roundRect(260, 440, 288, 65, 3, fill=1, stroke=0)
c.setFillColor(RUST)
c.rect(260, 440, 2, 65, fill=1, stroke=0)
text(c, "WHY IT WORKS", 272, 487, 250, SANS_BOLD, 8, color=RUST)
text(c, "Parmesan and miso are both aged, salty, and rich in umami. Together they deepen this quick cream sauce.", 272, 471, 263, size=9.2, leading=12)

c.setFillColor(NAVY)
c.roundRect(64, 272, 484, 155, 4, fill=1, stroke=0)
text(c, "T H E   C O O K B O O K", 82, 403, 446, SANS_BOLD, 8.5, color=GOLD)
text(c, "Tokyo Meets Tuscany", 82, 377, 446, SERIF, 21, color=HexColor("#FFFFFF"))
text(c, "30 Japanese-Italian recipes built on the same flavor logic behind these sauces. Practical dinners with bold, balanced flavor.", 82, 352, 447, size=9.8, color=CREAM)
c.setFillColor(RUST)
c.roundRect(82, 290, 159, 28, 3, fill=1, stroke=0)
text(c, "Get Vol. I on Amazon", 94, 299, 145, SANS_BOLD, 10, color=HexColor("#FFFFFF"))
c.linkURL(TMT, (82, 290, 241, 318), relative=0, thickness=0)

c.setStrokeColor(RULE)
c.setLineWidth(0.7)
c.roundRect(64, 174, 484, 88, 4, fill=0, stroke=1)
text(c, "Seoul Meets Mexico City is out now", 80, 241, 452, SERIF_BOLD, 13)
text(c, "30 recipes and six master sauces where Korean fermentation meets Mexican heat. Available in paperback and on Kindle.", 80, 224, 452, size=9.3, leading=12)
c.setFillColor(RUST)
c.roundRect(80, 183, 163, 25, 3, fill=1, stroke=0)
text(c, "Get Vol. II on Amazon", 90, 191, 151, SANS_BOLD, 9, color=HexColor("#FFFFFF"))
c.linkURL(SMMC, (80, 183, 243, 208), relative=0, thickness=0)
text(c, "As an Amazon Associate, we earn from qualifying purchases.", 64, 151, 484, size=8, color=MUTED)
text(c, "Cook something that shouldn't work. Watch it work anyway.", 64, 126, 484, size=9.5, color=MUTED)
text(c, "- Sebastian", 64, 108, 484, SERIF, 13)
c.showPage()
c.save()

source = PdfReader(PDF)
assert len(source.pages) == 4
writer = PdfWriter()
for page in source.pages[:3]:
    writer.add_page(page)
writer.add_page(PdfReader(buffer).pages[0])
writer.add_metadata({"/Title": "Borderless Kitchen - Five Japanese-Italian Sauces", "/Author": "Sebastian Dri"})
temporary = PDF.with_suffix(".pdf.tmp")
with temporary.open("wb") as stream:
    writer.write(stream)
temporary.replace(PDF)

check = PdfReader(PDF)
page_text = check.pages[-1].extract_text() or ""
assert "early list" not in page_text.lower()
assert "out now" in page_text.lower()
uris = [str(a.get_object().get("/A", {}).get("/URI", "")) for a in check.pages[-1].get("/Annots", [])]
assert sorted(uris) == sorted([TMT, SMMC]), uris
print("Rebuilt sauce-pack page four with two direct Amazon links:", uris)

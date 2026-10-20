"""Repair obsolete links and Vol. II copy in the downloadable sauce pack."""

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, NameObject, NumberObject, TextStringObject
from reportlab.pdfgen import canvas


PDF = Path(__file__).resolve().parents[1] / "public" / "sauce-pack.pdf"
TMT = "https://www.amazon.com/dp/B0GY8H2TCQ?tag=borderlesskitchen-20"
SMMC = "https://www.amazon.com/dp/B0H6VD21M2?tag=borderlesskitchen-20"

reader = PdfReader(PDF)
writer = PdfWriter()
writer.clone_document_from_reader(reader)
last = writer.pages[-1]

# The original button led to the author's local HTML file, which readers cannot open.
links = [a.get_object() for a in last.get("/Annots", [])]
old_button = next(a for a in links if str(a.get("/A", {}).get("/URI", "")).startswith("file:") or str(a.get("/A", {}).get("/URI", "")) == TMT)
old_button["/A"][NameObject("/URI")] = TextStringObject(TMT)

# The book has been published, so replace the obsolete "reply for the early list" copy.
overlay = BytesIO()
c = canvas.Canvas(overlay, pagesize=(612, 792))
c.setFillColorRGB(251 / 255, 246 / 255, 238 / 255)
c.rect(76, 192, 473, 58, fill=1, stroke=0)
c.setFillColorRGB(0.13, 0.14, 0.13)
c.setFont("Helvetica-Bold", 11)
c.drawString(80, 230, "Seoul Meets Mexico City is out now on Amazon.")
c.setFont("Helvetica", 9.5)
c.drawString(80, 213, "Gochujang, adobo, kimchi, and birria - the Korean-Mexican collision.")
c.save()
overlay.seek(0)
last.merge_page(PdfReader(overlay).pages[0])
if not any(str(a.get("/A", {}).get("/URI", "")) == SMMC for a in links):
    writer.add_uri(3, SMMC, (80, 225, 360, 245))
for annot in last.get("/Annots", []):
    annot.get_object()[NameObject("/Border")] = ArrayObject([NumberObject(0), NumberObject(0), NumberObject(0)])

with PDF.open("wb") as file:
    writer.write(file)

check = PdfReader(PDF)
uris = [str(a.get_object().get("/A", {}).get("/URI", "")) for a in check.pages[-1].get("/Annots", [])]
assert TMT in uris and SMMC in uris and not any(u.startswith("file:") for u in uris)
print("Sauce pack repaired:", uris)

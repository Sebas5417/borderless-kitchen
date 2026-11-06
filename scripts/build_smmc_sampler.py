"""Build a 5-page draft sampler from three Korean-Mexican recipes in the MDX.

**This is NOT the delivery artefact.** The official free download is the reviewed
12-page sampler served from `public/smmc-sampler-v3.pdf`, which was produced
independently and must not be regenerated or overwritten by this script. This
script writes only into `_drafts/`, so running it can never touch the live PDF.

Decision record (2026-11-06, BK-SMMC-AUTO): the 12-page v3 is the official
sampler; this 5-page build is retained as an unused local draft.

    python -I -B scripts/build_smmc_sampler.py

Output: _drafts/2026-11-06_smmc-sampler-5page-v1.pdf
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "content" / "free-recipes"
# Draft location only — never public/. The served sampler is
# public/smmc-sampler-v3.pdf and is not built by this script.
OUT = ROOT / "_drafts" / "2026-11-06_smmc-sampler-5page-v1.pdf"

PAPER = HexColor("#FFFCF7")
INK = HexColor("#1A1A1A")
VERMILLION = HexColor("#B11226")
HAIRLINE = HexColor("#E6E1D6")
MUTED = HexColor("#6B6660")

SAMPLER = [
    ("korean-fried-chicken-tacos", "KFC-style fried chicken, kimchi slaw, crema"),
    ("mexican-korean-birria-tacos", "chili-braised beef, kimchi salsa"),
    ("gochugaru-elote-korean-mexican-corn", "street corn, gochujang mayo"),
]

BOOK = "Seoul Meets Mexico City"
SITE = "borderlesskitchenseries.com"
STORE = "facelesschannel.gumroad.com/l/dqnqe"
PRICE = "$9.99"


# ---------------------------------------------------------------- parsing

def split_frontmatter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---"):
        raise ValueError("no frontmatter")
    _, fm, body = text.split("---", 2)
    meta: dict[str, str] = {}
    for line in fm.strip().splitlines():
        m = re.match(r"^([A-Za-z_]+):\s*(.*)$", line)
        if not m:
            continue
        k, v = m.group(1), m.group(2).strip()
        if v.startswith('"') and v.endswith('"'):
            v = v[1:-1]
        meta[k] = v
    return meta, body


def sections(body: str) -> dict[str, list[str]]:
    out: dict[str, list[str]] = {}
    current = None
    for line in body.splitlines():
        if line.startswith("## "):
            current = line[3:].strip().lower()
            out[current] = []
        elif current:
            out[current].append(line)
    return out


def flatten(lines: list[str]) -> str:
    return "\n".join(lines).strip()


def esc(s: str) -> str:
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)


def parse_ingredients(block: str) -> list[tuple[str, list[str]]]:
    groups: list[tuple[str, list[str]]] = []
    for raw in block.splitlines():
        line = raw.strip()
        if not line:
            continue
        if line.startswith("**") and line.endswith("**") and not line.startswith("-"):
            groups.append((line.strip("*").strip(), []))
        elif line.startswith("- "):
            if not groups:
                groups.append(("", []))
            groups[-1][1].append(line[2:].strip())
    return [g for g in groups if g[1]]


def parse_steps(block: str) -> list[tuple[str, str]]:
    """Return ("head" | "step", escaped-markup text) items.

    The three recipes number their method three different ways — some use
    standalone bold headings, some write "**1. Toast the chiles.** text", some
    write plain "1. Grill". Normalise all three so numbering is generated here
    once and never doubled. A bare horizontal rule ("---") is dropped rather
    than laid out as a step.
    """
    items: list[tuple[str, str]] = []
    for chunk in re.split(r"\n\s*\n", block.strip()):
        chunk = " ".join(chunk.split()).strip()
        if not chunk or re.fullmatch(r"[-*_\s]+", chunk):
            continue

        # Standalone bold line: a method section heading, not a numbered step.
        m = re.fullmatch(r"\*\*(.+?)\*\*", chunk)
        if m:
            label = re.sub(r"^\d+[.)]\s*", "", m.group(1)).strip()
            items.append(("head", esc(label)))
            continue

        # "**1. Toast the chiles.** Dry skillet…" -> bold label + body.
        m = re.match(r"^\*\*\s*(?:\d+[.)]\s*)?(.+?)\*\*\s*(.*)$", chunk)
        if m:
            label, rest = m.group(1).strip(), m.group(2).strip()
            items.append(("step", f"<b>{esc(label)}</b> {esc(rest)}".strip()))
            continue

        items.append(("step", esc(re.sub(r"^\d+[.)]\s*", "", chunk))))
    return items


def flow_height(flow: list, width: float) -> float:
    """Total height of a run of flowables at `width`, including space-after."""
    total = 0.0
    for f in flow:
        _, h = f.wrap(width, A4[1])
        total += h
        total += f.getSpaceAfter() if hasattr(f, "getSpaceAfter") else 0
    return total


def load(slug: str) -> dict:
    meta, body = split_frontmatter((SRC / f"{slug}.mdx").read_text(encoding="utf-8"))
    sec = sections(body)
    ing_block = flatten(next((v for k, v in sec.items() if k.startswith("ingredient")), []))
    ins_block = flatten(
        next((v for k, v in sec.items() if k.startswith(("instruction", "method", "direction"))), [])
    )
    if not ing_block or not ins_block:
        raise ValueError(f"{slug}: missing ingredients or instructions")
    return {
        "slug": slug,
        "title": meta.get("title", slug),
        "dek": meta.get("dek", ""),
        "yield": meta.get("recipeYield", ""),
        "cuisine": meta.get("cuisine", ""),
        "ingredients": parse_ingredients(ing_block),
        "steps": parse_steps(ins_block),
    }


def duration(iso: str) -> str:
    m = re.match(r"^PT(?:(\d+)H)?(?:(\d+)M)?$", iso)
    if not m:
        return iso
    parts = []
    if m.group(1):
        parts.append(f"{m.group(1)} hr")
    if m.group(2):
        parts.append(f"{m.group(2)} min")
    return " ".join(parts) or iso


# ---------------------------------------------------------------- styles

def styles(scale: float = 1.0) -> dict[str, ParagraphStyle]:
    """Type ramp. `scale` < 1 compresses a recipe page that would otherwise
    overflow — the layout shrinks, the content never gets truncated."""
    s = scale

    def base(name: str, size: float, leading: float, **kw) -> ParagraphStyle:
        return ParagraphStyle(
            name, fontName="Times-Roman", textColor=INK, alignment=TA_LEFT,
            fontSize=size * s, leading=leading * s, **kw
        )

    return {
        "eyebrow": ParagraphStyle(
            "eyebrow", fontName="Helvetica-Bold", fontSize=8 * s, leading=11 * s,
            textColor=VERMILLION, spaceAfter=6 * s,
        ),
        "cover_title": ParagraphStyle(
            "cover_title", fontName="Times-Roman", fontSize=40, leading=44,
            textColor=PAPER,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub", fontName="Times-Italic", fontSize=15, leading=22,
            textColor=HexColor("#BDB7AE"),
        ),
        "h1": ParagraphStyle("h1", fontName="Times-Roman", fontSize=26 * s, leading=30 * s),
        "h2": ParagraphStyle(
            "h2", fontName="Helvetica-Bold", fontSize=8 * s, leading=12 * s,
            textColor=MUTED, spaceBefore=2 * s, spaceAfter=6 * s,
        ),
        "head": ParagraphStyle(
            "head", fontName="Helvetica-Bold", fontSize=8.5 * s, leading=13 * s,
            textColor=INK, spaceBefore=6 * s, spaceAfter=3 * s,
        ),
        "dek": ParagraphStyle(
            "dek", fontName="Times-Italic", fontSize=11.5 * s, leading=17 * s,
            textColor=HexColor("#55504A"),
        ),
        "meta": ParagraphStyle(
            "meta", fontName="Helvetica", fontSize=8 * s, leading=12 * s, textColor=MUTED
        ),
        "grp": ParagraphStyle(
            "grp", fontName="Times-Roman", fontSize=9.5 * s, leading=14 * s,
            textColor=INK, spaceBefore=5 * s, spaceAfter=2 * s,
        ),
        "body": base("body", 10, 15),
        "bullet": base("bullet", 9.5, 14, leftIndent=9 * s, bulletIndent=1,
                       spaceAfter=2.5 * s),
        "step": base("step", 9.5, 14, spaceAfter=7 * s),
        "note": ParagraphStyle(
            "note", fontName="Times-Italic", fontSize=9 * s, leading=13 * s,
            textColor=HexColor("#6B6660"),
        ),
    }


# ---------------------------------------------------------------- pages

def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
    if doc.page > 1:
        canvas.setStrokeColor(HAIRLINE)
        canvas.setLineWidth(0.5)
        canvas.line(20 * mm, 15 * mm, A4[0] - 20 * mm, 15 * mm)
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(MUTED)
        canvas.drawString(20 * mm, 11 * mm, f"{BOOK} — free sampler")
        canvas.drawRightString(A4[0] - 20 * mm, 11 * mm, SITE)
    canvas.restoreState()


def on_cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(HexColor("#0A0A0A"))
    canvas.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
    canvas.setFillColor(VERMILLION)
    canvas.rect(20 * mm, A4[1] - 30 * mm, 26 * mm, 1.6 * mm, stroke=0, fill=1)
    canvas.restoreState()


def cover(st: dict[str, ParagraphStyle]) -> list:
    return [
        Spacer(1, 78 * mm),
        Paragraph("FREE SAMPLER", ParagraphStyle(
            "cv_eyebrow", fontName="Helvetica-Bold", fontSize=9, leading=12,
            textColor=VERMILLION, spaceAfter=14)),
        Paragraph("Seoul Meets<br/>Mexico City", st["cover_title"]),
        Spacer(1, 8 * mm),
        Paragraph(
            "Three recipes from the illustrated cookbook — gochujang against "
            "chile, kimchi against lime.",
            st["cover_sub"],
        ),
        Spacer(1, 30 * mm),
        Paragraph(
            "<font color='#8A837A'>Korean Fried Chicken Tacos &nbsp;·&nbsp; "
            "Birria Tacos with Kimchi Salsa &nbsp;·&nbsp; Gochugaru Elote</font>",
            ParagraphStyle("cv_list", fontName="Helvetica", fontSize=8.5, leading=13),
        ),
        Spacer(1, 40 * mm),
        Paragraph(
            "<font color='#8A837A'>borderlesskitchenseries.com</font>",
            ParagraphStyle(
                "cv_foot", fontName="Helvetica-Bold", fontSize=8, leading=12,
                textColor=HexColor("#8A837A")),
        ),
    ]


def recipe_flow(
    item: dict,
    index: int,
    blurb: str,
    avail_w: float,
    avail_h: float,
) -> list:
    """One recipe on one page.

    The two-column ingredients/method block is a single table row, which
    reportlab refuses to split — so an over-long recipe silently pushes the
    whole table to the next page and strands the heading alone. Measure first,
    then compress the type ramp until header + table fit the frame. If even the
    smallest size overflows, fall through with the smallest (content is never
    dropped).
    """
    flow: list = []
    for scale in (1.0, 0.95, 0.90, 0.85, 0.80, 0.75, 0.70):
        st = styles(scale)
        header: list = [
            Paragraph(f"RECIPE {index:02d} OF 03", st["eyebrow"]),
            Paragraph(esc(item["title"]), st["h1"]),
            Spacer(1, 4 * mm * scale),
            Paragraph(esc(item["dek"]), st["dek"]),
            Spacer(1, 4 * mm * scale),
            Paragraph(
                " &nbsp;·&nbsp; ".join(
                    x for x in (
                        item["cuisine"],
                        duration(item["time"]),
                        item["yield"],
                    ) if x
                ),
                st["meta"],
            ),
            Spacer(1, 3 * mm * scale),
        ]

        left: list = [Paragraph("INGREDIENTS", st["h2"])]
        for group, lines in item["ingredients"]:
            if group:
                left.append(Paragraph(esc(group), st["grp"]))
            for line in lines:
                left.append(Paragraph(esc(line), st["bullet"], bulletText="·"))

        right: list = [Paragraph("METHOD", st["h2"])]
        n = 0
        for kind, text in item["steps"]:
            if kind == "head":
                right.append(Paragraph(text, st["head"]))
            else:
                n += 1
                right.append(Paragraph(f"<b>{n}.</b> {text}", st["step"]))

        table = Table(
            [[left, right]],
            colWidths=[62 * mm, 88 * mm],
            style=TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 8 * mm),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]),
        )
        flow = header + [table]

        total = flow_height(header, avail_w) + table.wrap(avail_w, avail_h)[1]
        if total <= avail_h:
            break
    return flow


def closing(st: dict[str, ParagraphStyle]) -> list:
    return [
        Spacer(1, 12 * mm),
        Paragraph("THE BOOK", st["eyebrow"]),
        Paragraph(esc("The full illustrated edition"), st["h1"]),
        Spacer(1, 6 * mm),
        Paragraph(
            f"<em>{BOOK}</em> works the overlap between two kitchens that both build "
            "flavor from fermented chili, acid, and char — gochujang and adobo, kimchi "
            "and curtido, sesame and cilantro. Every recipe explains why the pairing "
            "works, not just what to do.",
            st["body"],
        ),
        Spacer(1, 6 * mm),
        Paragraph(
            f"The illustrated edition is an instant PDF download — {PRICE}, no shipping, "
            "no account required.",
            st["body"],
        ),
        Spacer(1, 8 * mm),
        Paragraph(
            f"<font color='#B11226'><b>{STORE}</b></font>",
            ParagraphStyle("buy", fontName="Helvetica-Bold", fontSize=10, leading=16),
        ),
        Spacer(1, 14 * mm),
        Paragraph(
            "More free recipes every week at borderlesskitchenseries.com",
            st["note"],
        ),
    ]


def build() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    st = styles()
    items = []
    for idx, (slug, blurb) in enumerate(SAMPLER, 1):
        data = load(slug)
        meta, _ = split_frontmatter((SRC / f"{slug}.mdx").read_text(encoding="utf-8"))
        data["time"] = meta.get("totalTime", "")
        items.append((data, idx, blurb))

    doc = BaseDocTemplate(
        str(OUT),
        pagesize=A4,
        title=f"{BOOK} — Free Sampler",
        author="Sebastian Dri",
        subject="Three free Korean-Mexican recipes",
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
    )
    frame = Frame(20 * mm, 20 * mm, A4[0] - 40 * mm, A4[1] - 40 * mm, id="body")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame], onPage=on_cover),
        PageTemplate(id="body", frames=[frame], onPage=on_page),
    ])

    avail_w = A4[0] - 40 * mm
    avail_h = A4[1] - 40 * mm

    story: list = cover(st)
    story.append(PageBreak())
    for data, idx, blurb in items:
        story.extend(recipe_flow(data, idx, blurb, avail_w, avail_h))
        if idx < len(items):
            story.append(PageBreak())
    story.append(PageBreak())
    story.extend(closing(st))

    # First page uses the cover template; the rest the body template.
    from reportlab.platypus import NextPageTemplate
    story.insert(0, NextPageTemplate("body"))
    doc.build(story)
    print(f"wrote {OUT} ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    build()

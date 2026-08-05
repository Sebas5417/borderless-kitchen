"""Gumroad listing cover — 1280x720, same brand system as the PDF."""
import os
from PIL import Image, ImageDraw, ImageFont

FONTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gumroad-cover.png")

PAPER = (255, 252, 247)
INK = (26, 26, 26)
VERMILLION = (177, 18, 38)
INK_DARK = (10, 10, 10)

W, H = 1280, 720
img = Image.new("RGB", (W, H), PAPER)
d = ImageDraw.Draw(img)

# radial-ish charcoal-to-black band (approximate with vertical gradient across full canvas)
for y in range(H):
    t = y / H
    r = int(10 + (26 - 10) * (1 - abs(t - 0.5) * 2) * 0.6)
    col = (int(10 + t * 4), int(10 + t * 4), int(10 + t * 4))
    d.line([(0, y), (W, y)], fill=col)

eyebrow_f = ImageFont.truetype(f"{FONTS}/Montserrat-SemiBold.ttf", 17)
title_f = ImageFont.truetype(f"{FONTS}/Playfair-Bold.ttf", 74)
sub_f = ImageFont.truetype(f"{FONTS}/Lato-Regular.ttf", 22)
tag_f = ImageFont.truetype(f"{FONTS}/Montserrat-SemiBold.ttf", 15)
price_f = ImageFont.truetype(f"{FONTS}/Playfair-Bold.ttf", 30)

M = 72
y = 118
d.text((M, y), "B O R D E R L E S S   K I T C H E N   —   D E L U X E   K I T",
       font=eyebrow_f, fill=(255, 252, 247, 140))

y += 52
d.text((M, y), "The Flavor Pairing", font=title_f, fill=PAPER)
y += 88
d.text((M, y), "Matrix", font=title_f, fill=PAPER)

y += 108
d.rectangle([M, y, M + 64, y + 4], fill=VERMILLION)

y += 34
d.text((M, y), "16 Italian × Japanese ingredient pairings, mapped by function.",
       font=sub_f, fill=(255, 252, 247))
y += 32
d.text((M, y), "Plus the 5-step method for building your own — and a worksheet to run it.",
       font=sub_f, fill=(255, 252, 247))

# bottom tag row
y_tag = H - 92
d.text((M, y_tag), "P R I N T   R E A D Y   ·   2   P A G E S   ·   P D F",
       font=tag_f, fill=(200, 40, 55))

price_text = "$7.99"
price_w = d.textlength(price_text, font=price_f)
d.text((W - M - price_w, H - 100), price_text, font=price_f, fill=PAPER)

img.save(OUT)
print("wrote", OUT, img.size)

"""
Assigns heroImageSrc to BK stories based on filename keywords.
Uses images already in public/images/.

Run from project root:
  python scripts/bk_add_images.py
"""

import re
from pathlib import Path

ROOT    = Path(__file__).parent.parent
STORIES = ROOT / "content" / "stories"

# Map keyword groups to public image paths
IMAGE_MAP = [
    ({"ramen", "carbonara", "pasta", "rigatoni", "spaghetti", "fettuccine", "udon", "noodle", "soba", "pappardelle"},
     "/images/recipe-carbonara-ramen.jpg"),
    ({"burrata", "caprese", "cheese", "ricotta", "mozzarella"},
     "/images/recipe-udon-burrata.jpg"),
    ({"japanese", "miso", "dashi", "sake", "ramen", "teriyaki", "yuzu", "wasabi", "tamago", "katsu", "tonkotsu"},
     "/images/tmt-dark-plate.jpg"),
    ({"history", "culture", "tradition", "ritual", "story", "memory", "origin", "heritage"},
     "/images/banner-culture.png"),
    ({"technique", "chef", "heat", "knife", "salt", "acid", "fat", "ferment", "cure", "stock", "sear", "roast"},
     "/images/hero-chef.png"),
    ({"italian", "roman", "sicilian", "tuscan", "venetian", "neapolitan", "milan"},
     "/images/tmt-cover-new.png"),
    ({"dessert", "chocolate", "cake", "pastry", "sweet", "tiramisu", "gelato", "mochi"},
     "/images/banner-carousel-1.png"),
    ({"soup", "broth", "stew", "braise", "slow", "lamb", "pork"},
     "/images/banner-carousel-2.png"),
    ({"rice", "grain", "bread", "dumpling", "bao", "gyoza", "dumpling"},
     "/images/banner-carousel-3.png"),
    ({"sauce", "condiment", "spice", "herb", "seasoning", "vinegar", "oil"},
     "/images/banner-carousel-4.png"),
    ({"vegetable", "salad", "green", "plant", "tofu", "tempeh"},
     "/images/banner-carousel-5.png"),
]
DEFAULT_IMAGE = "/images/banner-journal.png"

HERO_RE = re.compile(r'^(heroImageSrc:\s*).*$', re.MULTILINE)
FRONT_END_RE = re.compile(r'^---\s*$', re.MULTILINE)


def pick_image(filename: str) -> str:
    name = filename.lower().replace("-", " ").replace("_", " ")
    for keywords, img_path in IMAGE_MAP:
        if any(kw in name for kw in keywords):
            return img_path
    return DEFAULT_IMAGE


def add_or_update_image(text: str, img_path: str) -> str:
    # If heroImageSrc already set, skip
    if re.search(r'^heroImageSrc:\s*".+"', text, re.MULTILINE):
        return text  # already has an image
    # Insert heroImageSrc after heroImageAlt
    alt_re = re.compile(r'^(heroImageAlt:\s*"[^"]*")', re.MULTILINE)
    if alt_re.search(text):
        return alt_re.sub(f'\\1\nheroImageSrc: "{img_path}"', text, count=1)
    return text


updated = 0
skipped = 0
for mdx in sorted(STORIES.glob("*.mdx")):
    text = mdx.read_text(encoding="utf-8")
    img  = pick_image(mdx.name)
    new  = add_or_update_image(text, img)
    if new != text:
        mdx.write_text(new, encoding="utf-8")
        updated += 1
    else:
        skipped += 1

print(f"Updated {updated} stories with heroImageSrc")
print(f"Skipped {skipped} (already had image or alt field not found)")

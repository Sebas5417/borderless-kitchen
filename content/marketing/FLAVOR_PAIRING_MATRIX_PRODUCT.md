# The Flavor Pairing Matrix — Full Product (16 pairings)

**Status: READY TO SELL.** This is the complete content for the $7.99 PDF already
promised on `/free` (see `app/free/page.tsx`). The site only ships 8 of 16 rows as
a preview — this file has all 16, ready to paste into a design tool (Canva /
Google Docs / Notion) and export as a PDF today.

Once you have the PDF file:
1. Create a Gumroad account, list it as "The Flavor Pairing Matrix — $7.99"
2. Set `NEXT_PUBLIC_GUMROAD_FLAVOR_MATRIX_URL` in Vercel to the product URL
3. The `/free` page will automatically start showing the buy link (it's hidden until this env var exists — see the code change in this same commit)

---

## Product framing (use as PDF intro page)

**The Flavor Pairing Matrix**
*Every Japanese ↔ Italian ingredient swap in Tokyo Meets Tuscany, mapped by function — not by taste, not by vibe, by what each ingredient actually does.*

Sixteen pairings. Eight categories. One page you'll come back to every time you cook.

---

## The 16 pairings

| # | Category | Italian | Function | Japanese | Note |
|---|----------|---------|----------|----------|------|
| 1 | Aged cheese | Parmigiano Reggiano | Glutamate depth | White Miso (Shiro Miso) | Miso is sweeter and saltier per gram; reduce salt elsewhere in the dish |
| 2 | Cured fat | Guanciale | Animal fat + inosinate | Pancetta + katsuobushi | Katsuobushi adds an oceanic smokiness pancetta alone doesn't have |
| 3 | Hard cheese | Pecorino Romano | Sharp fermented salt | Shiro dashi | Dashi is liquid, lower in volume needed — start with half the quantity |
| 4 | Noodle | Spaghetti | Structural starch noodle | Ramen noodle | Alkaline (kansui) chew holds sauce differently than semolina — less absorption, more coating |
| 5 | Fat carrier | Anchovy in oil | Umami bomb, invisible depth | Katsuobushi flakes | Both dissolve into hot fat without leaving a "fishy" flavor signature |
| 6 | Acid + alcohol | White wine | Deglazing acid + alcohol | Dry sake (junmai) | Sake is lower in tannins and slightly sweeter on the finish |
| 7 | Aromatic heat | Black pepper | Contrasting aromatic heat | Sansho pepper | Sansho is more citrus-floral and numbing, less straightforwardly "hot" |
| 8 | Broth base | Chicken stock | Liquid body + mineral depth | Kombu dashi | Dashi is cleaner — no fat, no roasted notes, faster to make (20 min vs hours) |
| 9 | Concentrated umami | Tomato paste | Concentrated fermented-adjacent depth | Aka (red) miso | Longer-fermented miso reads closer to tomato paste's savoriness than shiro miso does |
| 10 | Finishing oil | Extra virgin olive oil | Peppery, grassy finishing fat | Toasted sesame oil | Never cook with it as a base oil — add at the very end, same rule as good EVOO |
| 11 | Fresh herb | Basil | High-volatile-oil aromatic herb | Shiso (perilla) | Shiso brings mint/anise/cumin notes basil doesn't — start with half the quantity |
| 12 | Sweet-acid reduction | Balsamic vinegar | Syrupy sweet-acid finish | Mirin reduced with rice vinegar | Reduce mirin by half first, then add rice vinegar off-heat to preserve brightness |
| 13 | Briny burst | Capers | Sharp acidic-briny punctuation | Umeboshi (chopped) | Umeboshi brings sourness *and* saltiness in one ingredient — season cautiously elsewhere |
| 14 | Richness | Heavy cream | Dairy mouthfeel and gloss | Egg yolk (off-heat emulsion) | Whisk yolk into hot-not-boiling liquid exactly as you would for carbonara, to avoid scrambling |
| 15 | Background aromatic | Bay leaf | Simmered-in, discarded before serving | Kombu | Both exist purely to season a liquid from within — remove before the dish is plated |
| 16 | Background heat | Peperoncino (chili flakes) | Diffuse background heat | Ichimi togarashi | Ichimi is pure chili (no sesame/citrus peel, unlike shichimi) — the closer 1:1 swap |

---

## Design notes for the PDF

- One page, landscape works well for a 16-row table
- Use the site's existing palette: ink (near-black), paper (off-white), vermillion accent for the header rule — matches the site's dark-editorial aesthetic already used on `/free`
- Footer line: "From Tokyo Meets Tuscany — the complete book has 37 recipes built on this exact logic. [borderlesskitchenseries.com]"
- Keep it copy-paste simple: a designer isn't required. A clean table in Google Docs, exported to PDF, is sufficient for a $7.99 impulse buy — polish can come later once it's actually generating revenue.

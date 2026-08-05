# Gumroad — Flavor Pairing Matrix (Deluxe Kit)

Assets for the $7.99 Gumroad listing referenced by `NEXT_PUBLIC_GUMROAD_MATRIX_URL`
(see `.env.example` and `lib/gumroad.ts`). The free single-page matrix lives at
`public/flavor-pairing-matrix.pdf`; this is the paid 2-page deluxe edition
(matrix + build-your-own-pairing method + worksheet).

- `gumroad-deluxe-matrix.pdf` — the product file to upload to Gumroad
- `gumroad-cover.png` — 1280×720 listing cover image
- `gumroad-listing-copy.md` — title, price, description, tags, publish steps
- `make_gumroad_deluxe.py`, `make_gumroad_cover.py` — regenerate the PDF/cover

## Regenerating

Both scripts expect brand fonts (Playfair Display, Montserrat, Lato) as static
TTFs in a sibling `fonts/` directory, not committed here. Instantiate them from
Google Fonts variable fonts before running:

```
Playfair-Medium.ttf, Playfair-Bold.ttf, Playfair-MediumItalic.ttf   (wght 500/700/500-italic)
Montserrat-Medium.ttf, Montserrat-SemiBold.ttf                      (wght 500/600)
Lato-Regular.ttf, Lato-Bold.ttf
```

Then: `python3 make_gumroad_deluxe.py && python3 make_gumroad_cover.py`
(requires `reportlab` and `Pillow`).

## Status

Not yet published — publishing requires a Gumroad account login, which has no
available tool/connector integration. Once published, set
`NEXT_PUBLIC_GUMROAD_MATRIX_URL` in Vercel for the **borderless-kitchen-series**
project and redeploy; the buy link on `/free` appears automatically.

#!/usr/bin/env python3
"""
SMMC content loader: Drive -> Cloudinary -> BK_Content_Queue.

For each image in the Drive "SMMC Approved Done Final" folder:
  1. download it (via the Sheets-Trigger Google token, which has full drive scope)
  2. upload to Cloudinary (signed, overwrite)
  3. append a PENDING row to the sheet (book=SMMC), copying config columns from
     an existing SMMC row as a template.

Idempotent: keyed by recipe id (smmc_R01...) and normalized recipe name, so
re-running won't create duplicates.

Secrets at runtime (NO secrets in source):
  - n8n encryption key: via n8n_lib (config file or $N8N_ENCRYPTION_KEY)
  - Cloudinary: $CLOUDINARY_API_KEY, $CLOUDINARY_API_SECRET, $CLOUDINARY_CLOUD (default dawh49ucg)

Usage:
  APPLY=1 python3 smmc_pipeline.py     # upload + write
  python3 smmc_pipeline.py             # dry-run (plan only)
"""
import os, sys, re, time, hashlib, requests
from n8n_lib import google_access_token

SHEET_ID = os.environ.get("BK_SHEET_ID", "1-Ft2mcZIf-bY5Nn9Zhxuoive8O3odIiEAmh6eiFfvNw")
TAB = "BK_Content_Queue"
DRIVE_FOLDER = os.environ.get("SMMC_DRIVE_FOLDER", "1MAJ5Xhx9SE4Jlpta8dFW3Aq7rqIo9hSo")

CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD", "dawh49ucg")
CLOUD_KEY = os.environ.get("CLOUDINARY_API_KEY")
CLOUD_SECRET = os.environ.get("CLOUDINARY_API_SECRET")
CLOUD_FOLDER = "borderless_kitchen/content/Downloads"

APPLY = os.environ.get("APPLY") == "1"

if APPLY and not (CLOUD_KEY and CLOUD_SECRET):
    sys.exit("Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to run with APPLY=1.")

# Drive uses the Sheets-Trigger token (full drive scope); the standalone Drive
# credential's refresh token is revoked.
drive_tok = google_access_token("googleSheetsTriggerOAuth2Api")
sheet_tok = google_access_token("googleSheetsOAuth2Api")
dh = {"Authorization": f"Bearer {drive_tok}"}
sh = {"Authorization": f"Bearer {sheet_tok}"}
print("Tokens OK")

# ---- list Drive folder ----
files, page = [], None
while True:
    p = {"q": f"'{DRIVE_FOLDER}' in parents and trashed=false",
         "fields": "nextPageToken,files(id,name,mimeType)", "pageSize": 100}
    if page:
        p["pageToken"] = page
    j = requests.get("https://www.googleapis.com/drive/v3/files", headers=dh, params=p).json()
    files += [f for f in j["files"] if f["mimeType"].startswith("image/")]
    page = j.get("nextPageToken")
    if not page:
        break
files.sort(key=lambda f: f["name"])
print(f"Drive images: {len(files)}")


def recipe_from_filename(name):
    stem = re.sub(r"\.(jpg|jpeg|png)$", "", name, flags=re.I)
    m = re.match(r"^([RS]\d+)_(.*?)(_v\d+)?$", stem)
    if m:
        return m.group(1).upper(), m.group(2).lower(), m.group(2).replace("_", " ").title()
    slug = re.sub(r"_v\d+$", "", stem)
    return "", slug.lower(), slug.replace("_", " ").title()


def norm(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


# ---- read sheet ----
r = requests.get(
    f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/'{TAB}'!A1:Z200",
    headers=sh)
r.raise_for_status()
values = r.json()["values"]
header = values[0]
H = {n: i for i, n in enumerate(header)}


def cell(row, col):
    i = H.get(col, -1)
    return row[i].strip() if 0 <= i < len(row) else ""


existing_ids, existing_names, template = set(), set(), None
for row in values[1:]:
    existing_ids.add(cell(row, "id"))
    existing_names.add(norm(cell(row, "topic")))
    if template is None and cell(row, "book") == "SMMC":
        template = row
if template is None and len(values) > 1:
    template = values[1]


def tmpl(col):
    return cell(template, col) if template else ""


COPY_COLS = ["platform", "content_type", "caption_tone", "hashtag_set", "priority", "campaign"]
today = time.strftime("%Y-%m-%d")


def cloud_upload(data, public_id):
    ts = str(int(time.time()))
    to_sign = f"overwrite=true&public_id={public_id}&timestamp={ts}"
    sig = hashlib.sha1((to_sign + CLOUD_SECRET).encode()).hexdigest()
    r = requests.post(
        f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload",
        data={"api_key": CLOUD_KEY, "timestamp": ts, "public_id": public_id,
              "overwrite": "true", "signature": sig},
        files={"file": ("img", data)})
    if r.status_code != 200:
        raise RuntimeError(f"Cloudinary {r.status_code}: {r.text[:200]}")
    return r.json()["secure_url"]


new_rows, plan = [], []
for f in files:
    code, slug, pretty = recipe_from_filename(f["name"])
    rid = f"smmc_{code}" if code else f"smmc_{slug}"
    public_id = f"{CLOUD_FOLDER}/{slug}"
    already = rid in existing_ids or norm(pretty) in existing_names
    plan.append((rid, pretty, "EXISTS" if already else "NEW"))
    if already:
        continue
    img = requests.get(
        f"https://www.googleapis.com/drive/v3/files/{f['id']}?alt=media", headers=dh)
    img.raise_for_status()
    url = cloud_upload(img.content, public_id) if APPLY else \
        f"https://res.cloudinary.com/{CLOUD_NAME}/image/upload/{public_id}.jpg"
    row = [""] * len(header)

    def setc(col, val):
        if col in H:
            row[H[col]] = val
    setc("id", rid)
    setc("book", "SMMC")
    for c in COPY_COLS:
        setc(c, tmpl(c))
    setc("content_type", tmpl("content_type") or "recipe_image")
    setc("platform", tmpl("platform") or "instagram")
    setc("topic", pretty)
    setc("raw_notes", f"{pretty} — Seoul Meets Mexico City (Vol. 2)")
    setc("status", "PENDING")
    setc("image_url", url)
    setc("asset_path", url)
    setc("created_at", today)
    new_rows.append(row)

print("\n=== PLAN ===")
for rid, pretty, st in plan:
    print(f"  [{st:6s}] {rid:18s} {pretty}")
print(f"\nNEW rows to add: {len(new_rows)}   (APPLY={'1' if APPLY else '0'})")

if not APPLY:
    print("\nDry-run. Re-run with APPLY=1 to upload + append.")
    sys.exit(0)

if new_rows:
    r = requests.post(
        f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/'{TAB}'!A1:append"
        f"?valueInputOption=RAW&insertDataOption=INSERT_ROWS",
        headers={**sh, "Content-Type": "application/json"}, json={"values": new_rows})
    r.raise_for_status()
    print(f"\nSUCCESS: appended {len(new_rows)} rows "
          f"({r.json().get('updates', {}).get('updatedCells', '?')} cells).")
else:
    print("\nNothing to add — all already present.")

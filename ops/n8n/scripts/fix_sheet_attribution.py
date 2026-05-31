#!/usr/bin/env python3
"""
One-off fixer for BK_Content_Queue attribution problems:
  - replace a stale "Tokyo Meets Tuscany" volume block with the SMMC block
  - normalize book codes (SMSM / 'Seoul Meets Mexico City' -> SMMC;
    SERIES / FUTURE -> TMT)
  - reset AWAITING_APPROVAL/APPROVED rows back to PENDING so they re-send
  - mark rows whose image is an unreachable local path as SKIP

Edit SMMC_IDS / the rules below for your specific cleanup, then run.
Secrets at runtime via n8n_lib (no secrets in source).
"""
import re, requests
from n8n_lib import google_access_token

SHEET_ID = "1-Ft2mcZIf-bY5Nn9Zhxuoive8O3odIiEAmh6eiFfvNw"
TAB = "BK_Content_Queue"

SMMC_VOL = ("This recipe is from Seoul Meets Mexico City — Vol. 2 of Borderless Kitchen, "
            "where Korean fire meets Mexican soul. Coming soon. \U0001f336️ "
            "Vol. 1, Tokyo Meets Tuscany, is out now. \U0001f4d7")
OLD_TMT_RE = re.compile(
    r"This recipe is inside Tokyo Meets Tuscany.*?(?:Stay tuned\.|out now\.\s*\U0001f4d7)",
    re.DOTALL)

SMMC_IDS = {"BK-004", "BK-005", "BK-006", "smmc_003", "smmc_004", "smmc_006"}

tok = google_access_token("googleSheetsOAuth2Api")
sh = {"Authorization": f"Bearer {tok}"}

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


def col_range(col, rownum):
    return f"'{TAB}'!{chr(ord('A') + H[col])}{rownum}"


updates = []
for i, row in enumerate(values[1:], start=2):
    rid, book, status = cell(row, "id"), cell(row, "book"), cell(row, "status")
    cap = cell(row, "generated_caption")
    img = cell(row, "image_url")

    if rid in SMMC_IDS:
        if OLD_TMT_RE.search(cap):
            updates.append({"range": col_range("generated_caption", i),
                            "values": [[OLD_TMT_RE.sub(SMMC_VOL, cap)]]})
        if book in ("SMSM", "", "Seoul Meets Mexico City"):
            updates.append({"range": col_range("book", i), "values": [["SMMC"]]})
        if status in ("AWAITING_APPROVAL", "APPROVED"):
            updates.append({"range": col_range("status", i), "values": [["PENDING"]]})
    elif rid == "BK-001" and img and not img.startswith("https://"):
        updates.append({"range": col_range("status", i), "values": [["SKIP"]]})
    elif rid in ("BK-007", "BK-010") and book in ("SERIES", "FUTURE", ""):
        updates.append({"range": col_range("book", i), "values": [["TMT"]]})

if not updates:
    print("No updates needed.")
else:
    r = requests.post(
        f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values:batchUpdate",
        headers={**sh, "Content-Type": "application/json"},
        json={"valueInputOption": "RAW", "data": updates})
    r.raise_for_status()
    j = r.json()
    print(f"Updated {j.get('totalUpdatedCells')} cells across "
          f"{j.get('totalUpdatedRows')} rows.")

"""
BK Story Cleanup — Keep 20%, archive 80%, spread dates across 18 months.

Run from the borderless-kitchen-series root:
  python scripts/bk_cleanup.py

What it does:
  1. Lists all .mdx files in content/stories/
  2. Sorts alphabetically
  3. Keeps every 5th file (~20%) with organic date distribution
  4. Moves the rest to content/_archive/stories/
  5. Updates the `date:` frontmatter field on kept files
  6. Writes a manifest: scripts/archive_manifest.json
"""

import os
import re
import json
import random
import shutil
from pathlib import Path
from datetime import date, timedelta

# ── Paths ─────────────────────────────────────────────────────────────────────
ROOT      = Path(__file__).parent.parent
STORIES   = ROOT / "content" / "stories"
ARCHIVE   = ROOT / "content" / "_archive" / "stories"
MANIFEST  = Path(__file__).parent / "archive_manifest.json"

# ── Date range for kept stories ───────────────────────────────────────────────
START_DATE = date(2025, 1, 15)   # Blog "launch" date
END_DATE   = date(2026, 6, 14)   # Latest published (leave today for manual)
TOTAL_DAYS = (END_DATE - START_DATE).days   # 515 days

# ── Collect + sort all stories ────────────────────────────────────────────────
all_files = sorted(STORIES.glob("*.mdx"))
total     = len(all_files)
print(f"Total stories found: {total}")

# ── Select every 5th to keep ─────────────────────────────────────────────────
to_keep    = [f for i, f in enumerate(all_files) if i % 5 == 0]
to_archive = [f for i, f in enumerate(all_files) if i % 5 != 0]
print(f"Keeping:  {len(to_keep)}")
print(f"Archiving: {len(to_archive)}")

# ── Generate organic date distribution ───────────────────────────────────────
# Use weighted random spacing: mostly 2-3 days apart, occasional bursts/gaps
def generate_dates(n: int, start: date, end: date) -> list[date]:
    days_available = (end - start).days
    # Create n evenly-spaced intervals then add jitter
    base_gap = days_available / n
    dates = []
    current = start
    for i in range(n):
        dates.append(current)
        # Jitter: ±30% of base gap, minimum 1 day
        jitter = random.uniform(-0.3, 0.3) * base_gap
        gap = max(1, round(base_gap + jitter))
        current = current + timedelta(days=gap)
        if current > end:
            current = end
    return dates

random.seed(42)  # Reproducible
kept_dates = generate_dates(len(to_keep), START_DATE, END_DATE)

# ── Update frontmatter date on kept stories ────────────────────────────────────
DATE_RE = re.compile(r'^(date:\s*)"[^"]*"', re.MULTILINE)

updated = 0
for mdx_file, new_date in zip(to_keep, kept_dates):
    text = mdx_file.read_text(encoding="utf-8")
    new_text = DATE_RE.sub(f'\\g<1>"{new_date.isoformat()}"', text)
    if new_text != text:
        mdx_file.write_text(new_text, encoding="utf-8")
        updated += 1

print(f"Updated {updated} date fields in kept stories")

# ── Archive the rest ───────────────────────────────────────────────────────────
ARCHIVE.mkdir(parents=True, exist_ok=True)

archived = []
for f in to_archive:
    dest = ARCHIVE / f.name
    if dest.exists():
        dest = ARCHIVE / f"_dup_{f.name}"
    shutil.move(str(f), str(dest))
    archived.append(f.name)

print(f"Archived {len(archived)} stories to {ARCHIVE}")

# ── Write manifest ────────────────────────────────────────────────────────────
manifest = {
    "total_original": total,
    "kept": len(to_keep),
    "archived": len(to_archive),
    "kept_files": [f.name for f in to_keep],
    "date_range": {
        "start": START_DATE.isoformat(),
        "end": END_DATE.isoformat(),
    },
    "archived_files": archived,
}
MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(f"Manifest written: {MANIFEST}")
print("\nDone! Run: git add -A && git commit -m 'chore: archive 80% stories, spread dates across 18 months'")

"""
Redistribute articles currently dated 2026-06-19 across a weekly publishing schedule.
Assigns 2 articles per week on Monday and Thursday, starting 2026-07-07.

Usage:
  python scripts/schedule_articles.py [--dry-run]

Options:
  --dry-run   Print assignments without modifying files.
"""

import os
import re
import sys
import random
from datetime import date, timedelta
from pathlib import Path

STORIES_DIR = Path(__file__).parent.parent / "content" / "stories"
TARGET_DATE = "2026-06-19"
START_DATE = date(2026, 7, 7)   # First Monday after June
ARTICLES_PER_WEEK = 2
DRY_RUN = "--dry-run" in sys.argv

# ── Collect all June-19 articles ─────────────────────────────────────────────
target_files = []
for mdx in sorted(STORIES_DIR.glob("*.mdx")):
    content = mdx.read_text(encoding="utf-8")
    if f'date: "{TARGET_DATE}"' in content or f"date: '{TARGET_DATE}'" in content:
        target_files.append(mdx)

print(f"Found {len(target_files)} articles dated {TARGET_DATE}")

# ── Build publish schedule (Mon + Thu cadence) ────────────────────────────────
def publish_dates(start: date, count: int) -> list[date]:
    dates = []
    current = start
    # Ensure we start on a Monday
    while current.weekday() != 0:  # 0 = Monday
        current += timedelta(days=1)
    while len(dates) < count:
        dates.append(current)         # Monday
        if len(dates) < count:
            dates.append(current + timedelta(days=3))  # Thursday
        current += timedelta(days=7)
    return dates[:count]

schedule = publish_dates(START_DATE, len(target_files))

# ── Shuffle so topics aren't grouped alphabetically ──────────────────────────
random.seed(42)
random.shuffle(target_files)

# ── Apply ─────────────────────────────────────────────────────────────────────
changed = 0
for mdx_path, pub_date in zip(target_files, schedule):
    content = mdx_path.read_text(encoding="utf-8")
    new_date_str = pub_date.strftime("%Y-%m-%d")

    # Replace date field (handles both quote styles)
    new_content = re.sub(
        r'(date:\s*["\'])' + re.escape(TARGET_DATE) + r'(["\'])',
        lambda m: m.group(1) + new_date_str + m.group(2),
        content,
    )

    if new_content == content:
        print(f"  SKIP (no match): {mdx_path.name}")
        continue

    if DRY_RUN:
        print(f"  {pub_date}  {mdx_path.name}")
    else:
        mdx_path.write_text(new_content, encoding="utf-8")
        changed += 1
        print(f"  OK {pub_date}  {mdx_path.name}")

if DRY_RUN:
    print(f"\n[dry-run] Would update {len(target_files)} files.")
    print(f"Schedule: {schedule[0]} → {schedule[-1]}")
else:
    print(f"\nDone. Updated {changed} files.")
    print(f"Schedule: {schedule[0]} → {schedule[-1]}")
    print("\nTo publish a week's articles: update their date to today and push to git.")

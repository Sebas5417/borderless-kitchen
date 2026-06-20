"""
BK Weekly Poster — Run 2-3x per week to release archived stories.

Usage:
  python scripts/bk_weekly_post.py          # releases 1 story
  python scripts/bk_weekly_post.py --count 3  # releases 3 stories
  python scripts/bk_weekly_post.py --preview  # shows what would be posted (dry run)
  python scripts/bk_weekly_post.py --count 2 --json-output  # machine-readable JSON for n8n

What it does:
  1. Picks next story from content/_archive/stories/
  2. Updates its date to today
  3. Moves it to content/stories/
  4. Commits and pushes to git (triggers Vercel rebuild)
  5. Optionally prints an IG caption for the story

Dependencies: git must be configured with push access
"""

import os
import re
import json
import argparse
import subprocess
from pathlib import Path
from datetime import date

ROOT     = Path(__file__).parent.parent
STORIES  = ROOT / "content" / "stories"
ARCHIVE  = ROOT / "content" / "_archive" / "stories"
LOG_FILE = Path(__file__).parent / "posting_log.json"
DATE_RE  = re.compile(r'^(date:\s*)"[^"]*"', re.MULTILINE)
TITLE_RE  = re.compile(r'^title:\s*"([^"]+)"', re.MULTILINE)
DEK_RE    = re.compile(r'^dek:\s*"([^"]+)"', re.MULTILINE)
HERO_RE   = re.compile(r'^heroImageSrc:\s*"([^"]+)"', re.MULTILINE)


def load_log() -> dict:
    if LOG_FILE.exists():
        return json.loads(LOG_FILE.read_text())
    return {"posted": []}


def save_log(log: dict):
    LOG_FILE.write_text(json.dumps(log, indent=2))


def pick_stories(count: int, log: dict) -> list[Path]:
    """Pick count stories from archive, skipping already-posted ones."""
    posted = set(log.get("posted", []))
    available = sorted([f for f in ARCHIVE.glob("*.mdx") if f.name not in posted])
    if not available:
        print("Archive empty — nothing to post.")
        return []
    return available[:count]


def extract_field(text: str, pattern: re.Pattern) -> str:
    m = pattern.search(text)
    return m.group(1).strip() if m else ""


def generate_ig_caption(title: str, dek: str) -> str:
    hooks = [
        f"Most people don't know this about {title.split(':')[0].lower()}. 🧵",
        f"Let's talk about {title.lower()} — the version your cooking school skipped.",
        f"'{title}' — here's what the science actually says.",
        f"The thing nobody tells you about {title.split(':')[0].lower()}.",
    ]
    import random
    hook = random.choice(hooks)
    caption = (
        f"{hook}\n\n"
        f"{dek}\n\n"
        f"Full deep-dive on the blog — link in bio 🔗\n\n"
        f"#borderlesskitchen #foodscience #cooking #culinary #cheflife "
        f"#foodblog #cookingscience #kitchenscience #homecook #foodculture"
    )
    return caption


def release_story(story_path: Path, dry_run: bool = False, quiet: bool = False) -> dict:
    text      = story_path.read_text(encoding="utf-8")
    title     = extract_field(text, TITLE_RE)
    dek       = extract_field(text, DEK_RE)
    hero      = extract_field(text, HERO_RE)
    today     = date.today().isoformat()
    slug      = story_path.stem

    new_text = DATE_RE.sub(f'\\g<1>"{today}"', text)
    dest     = STORIES / story_path.name

    if dry_run:
        if not quiet:
            print(f"\n[DRY RUN] Would post: {story_path.name}")
            print(f"  Title: {title}")
            print(f"  Date → {today}")
            ig = generate_ig_caption(title, dek)
            print(f"\n  IG Caption:\n{ig}")
        return {"file": story_path.name, "title": title, "date": today, "slug": slug, "heroImageSrc": hero, "dry_run": True}

    dest.write_text(new_text, encoding="utf-8")
    story_path.unlink()

    ig_caption = generate_ig_caption(title, dek)

    if not quiet:
        print(f"\n✓ Released: {story_path.name}")
        print(f"  Title: {title}")
        print(f"  Date:  {today}")
        print(f"\n📸 IG Caption:\n{ig_caption}")
        print("\n" + "─" * 60)

    return {
        "file": story_path.name,
        "title": title,
        "date": today,
        "slug": slug,
        "heroImageSrc": hero,
        "ig_caption": ig_caption,
    }


def git_commit_and_push(story_names: list[str]):
    msg = f"content: release {len(story_names)} story/stories — {', '.join(s.replace('.mdx','') for s in story_names[:2])}"
    if len(story_names) > 2:
        msg += f" + {len(story_names)-2} more"

    cmds = [
        ["git", "add", "-A"],
        ["git", "commit", "-m", msg],
        ["git", "push", "origin", "main"],
    ]
    for cmd in cmds:
        result = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Git error: {result.stderr}")
            return False
    print(f"\n✓ Pushed to GitHub → Vercel rebuild triggered")
    return True


def main():
    parser = argparse.ArgumentParser(description="BK Weekly Story Poster")
    parser.add_argument("--count", type=int, default=1, help="Number of stories to release")
    parser.add_argument("--preview", action="store_true", help="Dry run — show what would be posted")
    parser.add_argument("--json-output", action="store_true",
                        help="Output JSON for n8n integration (suppresses human-readable output)")
    args = parser.parse_args()

    quiet = args.json_output  # suppress prints when n8n is calling us

    log     = load_log()
    stories = pick_stories(args.count, log)

    if not stories:
        if quiet:
            print(json.dumps({"stories_released": [], "ig_captions": [], "error": "archive_empty"}))
        return

    released = []
    for story in stories:
        result = release_story(story, dry_run=args.preview, quiet=quiet)
        if not args.preview:
            released.append(result)
            log["posted"].append(story.name)

    if released:
        save_log(log)
        push_ok = git_commit_and_push([r["file"] for r in released])

        if quiet:
            # Machine-readable output consumed by wf-008 n8n workflow
            output = {
                "stories_released": [
                    {
                        "title": r["title"],
                        "date": r["date"],
                        "slug": r["slug"],
                        "heroImageSrc": r.get("heroImageSrc", ""),
                        "file": r["file"],
                    }
                    for r in released
                ],
                "ig_captions": [r.get("ig_caption", "") for r in released],
                "push_success": push_ok,
                "error": None,
            }
            print(json.dumps(output))
        else:
            remaining = len(list(ARCHIVE.glob("*.mdx"))) - len(log["posted"])
            print(f"\n📦 {remaining} stories remaining in archive")
            weeks_left = remaining // 2
            print(f"   At 2/week → {weeks_left} more weeks of content")


if __name__ == "__main__":
    main()

# n8n → Instagram/Threads Pipeline — Status Report

**Investigated: 2026-08-05.** This documents a channel that was already
built and running before this session started, found stalled while
looking into something unrelated (a Notion runbook page turned up while
searching for context on Pinterest content).

## TL;DR

The pipeline worked — 19 real posts went out to Instagram/Threads between
2026-05-24 and 2026-06-09. **It has posted nothing for ~8 weeks.** 24
pieces of content are frozen in the queue, most likely because the
workflow's schedule trigger stopped firing entirely (not just a human
approval bottleneck) sometime after 2026-06-09. This needs someone with
SSH access to the pipeline server to fix — it cannot be diagnosed or
fixed further from this environment (no SSH, no n8n API access, no
Instagram API access are available here).

## What exists (per the Notion runbook "Borderless Kitchen — n8n Social
Pipeline Runbook", last updated 2026-05-31)

- Server: `92.112.184.189` (Ubuntu, Docker), container `n8n-main`
- Workflow: "BK Daily Social Caption Generator v4" (n8n id `Msr4MCRV01YLRtGx`)
- Flow: Schedule Trigger (9AM + 5PM) → Read Next PENDING Row → Set
  GENERATING → Claude generates caption → Set AWAITING_APPROVAL → Send
  Telegram approval message → [human approves] → Build Cloudinary URL →
  Create IG Media Container → Publish IG Post → Set POSTED
- Content queue: Google Sheet `1-Ft2mcZIf-bY5Nn9Zhxuoive8O3odIiEAmh6eiFfvNw`,
  tab `BK_Content_Queue`
- **Caveat:** the runbook claims to mirror `ops/n8n/README.md` in this
  GitHub repo (`Sebas5417/borderless-kitchen`). That path does not exist
  anywhere in this repo's history (checked `git log --all`). Either the
  ops code lives in a different, inaccessible repo, or it was never
  actually committed — the Notion doc is the only surviving copy of this
  information, which is a real risk on its own.

## Evidence — read directly from the live Google Sheet

47 rows in the queue as of 2026-08-05:

| Status | Count |
|---|---|
| POSTED | 18 (19 rows carry a `posted_at` timestamp — one has a blank status despite having a timestamp, a minor data-entry gap, not chased further) |
| AWAITING_APPROVAL | 12 |
| PENDING | 11 |
| APPROVED (not yet posted) | 1 |
| NO_IMAGE (blocked, needs an asset) | 1 |
| blank/legacy rows | 4 |

**Posting history (all confirmed via real `posted_at` timestamps and
real Instagram/Threads post IDs in `post_url`):**
- First: `TEST-001`, 2026-05-24T21:38:29
- Last: `smmc_R12`, 2026-06-09T18:01:44
- Roughly matches the claimed 2×/day cadence, though not every slot fired

**The tell for what broke:** all 24 stuck rows (12 AWAITING_APPROVAL + 11
PENDING + 1 APPROVED) were created on the same day, 2026-05-31 — the "SMMC
bulk load" the runbook describes. **Every one of the 12 AWAITING_APPROVAL
rows has an empty `telegram_message_id`.** That means the "Send Telegram
approval message" step never actually ran for any of them — this isn't
"nobody tapped approve," the workflow never got that far. Combined with
zero posts since 2026-06-09, the most likely explanation is the n8n
schedule trigger stopped firing entirely (container down, workflow
disabled, or an expired credential) rather than a purely human bottleneck.

## What I could not check (no access from this environment)

- The actual n8n instance / container status, logs, or workflow
  active/disabled state
- Whether the Telegram bot credential or IG/Threads API tokens expired
- Server health at `92.112.184.189` in general
- No SSH tool, no n8n API tool, and no Instagram/Threads posting tool are
  available in this session — this is a hard limitation, not something
  worked around

## Fix runbook (for whoever has SSH access to the server)

1. `ssh` to `92.112.184.189`
2. `docker ps` — confirm `n8n-main` is actually running. If it's not,
   `docker start n8n-main` (or `docker restart n8n-main` if it's running
   but stuck)
3. Check the workflow is **Active** in the n8n UI (`Msr4MCRV01YLRtGx`) —
   a workflow can silently deactivate on certain n8n restarts/updates
4. Check recent execution history in the n8n UI for the schedule trigger
   — look for auth failures on the Telegram or Instagram Graph API nodes
   specifically, since those are the credentials most likely to expire
5. If the container had to be restarted, remember the runbook's own
   lesson from the 2026-05-31 incident: **`docker stop n8n-main` before
   editing anything in the workflow DB directly** — n8n keeps active
   workflows in memory and will flush the in-memory copy back over a live
   DB edit otherwise
6. Once the trigger is confirmed firing again, the 24 stuck rows should
   start clearing on their own via the existing PENDING → GENERATING →
   AWAITING_APPROVAL → POSTED flow — no manual sheet editing needed unless
   individual rows look corrupted

## Why this matters

This is a second content channel (Instagram + Threads) that was already
built, already had real reach, and needs an infrastructure fix rather
than new content or new strategy — the highest-leverage single fix
available right now, once someone has server access. 24 ready-or-near-ready
posts are sitting idle behind it.

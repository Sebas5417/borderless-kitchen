# Borderless Kitchen — n8n Social Pipeline Runbook

Operational record + runbook for the self-hosted n8n automation that drives the
Borderless Kitchen cookbook social-media pipeline.

> **Secrets policy:** No credentials live in this repo. The n8n encryption key,
> Cloudinary API secret, and Google/Telegram OAuth tokens stay on the server in
> the n8n SQLite DB / `.n8n/config`. Scripts read them at runtime. Placeholders
> below show where each value comes from.

---

## Infrastructure

| Thing | Value |
|-------|-------|
| Server | `92.112.184.189` (Ubuntu, Docker) |
| n8n container | `n8n-main` |
| n8n DB | `/root/n8n/.n8n/database.sqlite` |
| n8n encryption key | `/root/n8n/.n8n/config` (env `N8N_ENCRYPTION_KEY`) |
| Google Sheet | `1-Ft2mcZIf-bY5Nn9Zhxuoive8O3odIiEAmh6eiFfvNw`, tab `BK_Content_Queue` |
| Cloudinary cloud | `dawh49ucg`, folder `borderless_kitchen/content/Downloads` |
| Image source (Drive) | `SMMC Approved Done Final` folder id `1MAJ5Xhx9SE4Jlpta8dFW3Aq7rqIo9hSo` |

### Restart n8n
```bash
docker restart n8n-main
```
A successful restart just echoes the container name (`n8n-main`).

---

## Key workflow: `BK Daily Social Caption Generator v4`

n8n workflow id `Msr4MCRV01YLRtGx` (active).

```
Schedule Trigger (9AM + 5PM) ─▶ Read Next PENDING Row ─▶ Row Found?
   ─▶ Set Status GENERATING ─▶ HTTP Request (Claude, generates caption)
   ─▶ Set Status AWAITING_APPROVAL ─▶ Send Approval Message (Telegram)
   ─▶ [you approve] ─▶ Read APPROVED Row ─▶ Build Cloudinary URL
   ─▶ Create IG Media Container ─▶ Wait ─▶ Publish IG Post ─▶ Set Status POSTED
```

Important behaviours:

- **One PENDING row per trigger.** With 2 triggers/day → 2 posts/day.
- **Captions are always regenerated** by the Claude node for every PENDING row —
  the workflow never reuses an old `generated_caption`. So fixing a caption in
  the sheet is optional; the prompt is the source of truth.
- **`Build Cloudinary URL`** node inserts a transform into a full URL:
  `($json.image_url || $json.asset_path).replace('/image/upload/', '/image/upload/w_1080,h_1350,c_fill,g_auto,f_jpg,q_85/')`.
  Full `https://res.cloudinary.com/...` URLs are handled correctly (no double prefix).

### Caption prompt — data-driven volume block

The Claude HTTP node's `jsonBody` was patched so the "which book" blurb is chosen
from the row's `book` code instead of being hardcoded to Tokyo Meets Tuscany:

```
{{ ({TMT:'...Vol. 1...',SMMC:'...Vol. 2...Coming soon...',MMM:'...',BBB:'...'})
   [({SMSM:'SMMC',SMMC:'SMMC',TMT:'TMT',MMM:'MMM',BBB:'BBB',
      'SEOUL MEETS MEXICO CITY':'SMMC','TOKYO MEETS TUSCANY':'TMT', ...})
     [String($('Read Next PENDING Row').item.json.book||'').trim().toUpperCase()]||'TMT'] }}
```

`book` codes: `TMT` (Vol.1, out now), `SMMC` (Vol.2, coming soon), `MMM`,
`BBB` (upcoming). Unknown/blank → falls back to `TMT`.

---

## `BK_Content_Queue` sheet schema

Columns: `id, book, platform, content_type, topic, raw_notes, caption_tone,
hashtag_set, priority, campaign, asset_path, status, generated_caption,
telegram_message_id, approved_by, approved_at, posted_at, post_url,
rejection_reason, notes, created_at, image_url`

Status lifecycle: `PENDING → GENERATING → AWAITING_APPROVAL → APPROVED → POSTED`
(`REJECTED` / `SKIP` are terminal off-ramps).

---

## What was done (2026-05-31 session)

1. **Caption/attribution fixes** — BK-004/005/006 + smmc_003/004/006 had a
   wrong "Tokyo Meets Tuscany" volume block. Replaced with the SMMC block,
   set `book=SMMC`, reset `status=PENDING`.
2. **Book codes** — `SMSM`→`SMMC`, `Seoul Meets Mexico City`→`SMMC`,
   BK-007 `SERIES`→`TMT`, BK-010 `FUTURE`→`TMT`.
3. **BK-001** — local image path (`02_ASSETS_LIBRARY/...jpg`) is not reachable;
   set `status=SKIP` until a real image exists.
4. **Claude prompt** — patched to the data-driven volume block above.
5. **SMMC bulk load** — all 36 SMMC recipes now in the queue. 4 already present;
   32 added via `smmc_pipeline.py`: each image pulled from the Drive
   "Approved Done Final" folder, uploaded to Cloudinary, row appended with
   `book=SMMC`, `status=PENDING`, config columns copied from an existing row.
   Verified all uploaded URLs (and their IG transform variants) return HTTP 200.
6. **Cadence** — schedule trigger set to fire twice daily (09:00 and 17:00).

### Known notes / non-blockers
- Google **Drive** OAuth credential (`googleDriveOAuth2Api`) refresh token is
  **revoked** (`invalid_grant`). Drive access in scripts uses the
  **`googleSheetsTriggerOAuth2Api`** token instead, which carries full
  `drive` scope. Re-auth the Drive credential in the n8n UI when convenient.
- `smmc-recipes.json` flagged the SMMC cover author as "Jihoon Kim" — verified
  false: `SMMC_front_v2_BEST.png` is pure food art with no text. Cover redesign
  is tracked separately in the Drive `smmc-cover-redesign/` folder.

---

## Scripts (`ops/n8n/scripts/`)

All read the n8n encryption key and OAuth/Cloudinary creds at runtime — **no
secrets are stored in this repo.** Run them on the server (they need access to
`/root/n8n/.n8n/database.sqlite`). They require `pycryptodome`
(`apt-get install -y python3-pycryptodome` or `pip install --break-system-packages pycryptodome`).

| Script | Purpose |
|--------|---------|
| `n8n_lib.py` | Shared: decrypt n8n creds, refresh Google OAuth tokens |
| `fix_sheet_attribution.py` | One-off fixer for wrong vol-block / book codes / status |
| `smmc_pipeline.py` | Drive→Cloudinary→Sheet loader for SMMC recipes (idempotent; `APPLY=1` to write) |
| `patch_caption_cadence.py` | Set the schedule trigger to N times/day |

See each script's header for usage.

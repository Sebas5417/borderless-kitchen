# TikTok — posts and source assets

## Posted

### "Crossing the Bridge Noodles" — origin story slideshow
**Posted: 2026-08-05.** Live, `PUBLISH_COMPLETE`, public.

- **Format:** 7-card slideshow assembled into one 21s video (1080×1920,
  H.264 + silent AAC track, 24fps) — built as a video rather than a native
  TikTok photo post because Higgsfield's photo-import pipeline forces PNG,
  which TikTok rejects; video import preserves the real format.
- **Source cards:** `content/marketing/tiktok/card1.jpg` … `card7.jpg`
- **Source video:** `content/marketing/tiktok/crossing-the-bridge-noodles.mp4`
- **Caption:** "The noodle dish invented because his soup kept going cold 🍜
  #foodhistory #tiktokfood #noodles #cookingtips"
- **Music:** "Aesthetic" by BoominBeats (TikTok Commercial Music Library,
  #1 trending in Chill Beats at time of posting, song_clip_id
  `7472778192572942353`)
- **Settings:** public, comments/duets/stitches on, not AI-generated
  content, no commercial content disclosure (organic self-promotion, not
  branded/paid content)
- **publish_id:** `v_pub_url~v2.7670540328944420878`
- **Account:** connector_id `5cb3dea4-035c-4147-b61a-e8d79f4affc6`

## Content ready, not yet posted

None currently — the only content built so far (the 7-card story) is
posted. Next candidates for the same treatment: any of the origin-story
Reddit posts in `SOCIAL_CONTENT_BATCH_01.md` translate well to this same
card-slideshow format.

## How this was built (for repeating it)

1. Design story cards as HTML (see the generator scripts pattern used for
   `content/marketing/pinterest-pins/` — same on-brand template, 9:16 for
   TikTok / 2:3 for Pinterest)
2. Screenshot each with headless Chromium, convert to JPEG
3. Assemble into an MP4 with a silent audio track (needs a full ffmpeg
   build with libx264 + aac — install via `pip install imageio-ffmpeg` if
   the environment's default ffmpeg lacks these encoders)
4. Host the MP4 somewhere that serves a correct `video/mp4` Content-Type
   header — GitHub's raw.githubusercontent.com always serves
   `application/octet-stream` regardless of extension and will fail
   Higgsfield's import; `cdn.jsdelivr.net/gh/<owner>/<repo>@<ref>/<path>`
   mirrors any public GitHub repo and serves correct MIME types
5. `media_import_url` (type: video) → `tiktok_prepare_publish` →
   `tiktok_publish` → `tiktok_publish_status` to confirm

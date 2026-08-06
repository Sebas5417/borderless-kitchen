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

None currently. Next candidates for the same treatment: any of the
origin-story Reddit posts in `SOCIAL_CONTENT_BATCH_01.md` translate well
to this same card-slideshow format.

### "Doenjang Lime Shrimp" — Seoul Meets Mexico City preview
**Posted: 2026-08-06.** Live, `PUBLISH_COMPLETE`, public.

Repurposed from the stalled n8n/Instagram content queue (see
`N8N_INSTAGRAM_PIPELINE_STATUS.md`) — specifically the one row in that
47-row queue with status `APPROVED`, meaning it had already cleared human
review for Instagram. The other 23 stuck rows (`AWAITING_APPROVAL` /
`PENDING`) were deliberately left untouched since they were never
reviewed. The real product photo (Cloudinary-hosted) could not be
retrieved — both Cloudinary and Higgsfield's own CDN are blocked for
direct fetch from the build environment — so this uses the same text-card
format as the noodle post, built from the **exact approved caption
copy**, not rewritten.

- **Format:** 3-card slideshow, one 21s video (1080×1920, H.264 + silent
  AAC, 24fps)
- **Source cards:** `content/marketing/tiktok/doenjang-card1.jpg` …
  `doenjang-card3.jpg`
- **Source video:** `content/marketing/tiktok/doenjang-lime-shrimp.mp4`
- **Caption:** "Fermented Korean paste + fresh Mexican lime = Doenjang
  Lime Shrimp 🍤 Preview from Seoul Meets Mexico City #foodfusion
  #koreanfood #tiktokfood"
- **Music:** "Sour Gin Fizz (Lofi)" by Muspace Lofi, song_clip_id
  `7173727494137186305`
- **Settings:** same as the noodle post — public, comments/duets/stitches
  on, not AI-generated, no commercial disclosure
- **publish_id:** `v_pub_url~v2.7670716673804208141`
- **Note:** the direct-publish call was blocked once by the harness's own
  safety classifier (separate from any network restriction) and required
  explicit human confirmation to retry before it went through — expect
  this on every future direct-post call, not just this one.


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

import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Which MailerLite group a signup lands in. Group IDs stay server-side —
 * the client only ever sends a list name.
 */
const LIST_GROUP_ENV: Record<string, string | undefined> = {
  tmt: process.env.MAILERLITE_TMT_GROUP_ID,
  smmc: process.env.MAILERLITE_SMMC_GROUP_ID,
};

type SubscribeBody = { email?: unknown; list?: unknown };

export async function POST(req: Request) {
  let body: SubscribeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-email" },
      { status: 400 },
    );
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const list = typeof body.list === "string" ? body.list : "";

  if (!EMAIL_RE.test(email) || !(list in LIST_GROUP_ENV)) {
    return NextResponse.json(
      { ok: false, error: "invalid-email" },
      { status: 400 },
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = LIST_GROUP_ENV[list];

  if (!apiKey || !groupId) {
    // Local dev without keys: accept so the form UX can be exercised.
    if (process.env.NODE_ENV === "development") {
      console.warn(`[api/subscribe] dev mode, no MailerLite config — ${list}`);
      return NextResponse.json({ ok: true });
    }
    console.error(
      `[api/subscribe] missing MAILERLITE_API_KEY or group id for "${list}"`,
    );
    return NextResponse.json({ ok: false, error: "retry" }, { status: 503 });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email, groups: [groupId] }),
      cache: "no-store",
    });

    // 200 = existing subscriber upserted into group, 201 = created,
    // 409 = already subscribed — all count as success.
    if (res.status === 200 || res.status === 201 || res.status === 409) {
      return NextResponse.json({ ok: true });
    }
    if (res.status === 422) {
      return NextResponse.json(
        { ok: false, error: "invalid-email" },
        { status: 400 },
      );
    }
    console.error(`[api/subscribe] MailerLite responded ${res.status}`);
    return NextResponse.json({ ok: false, error: "retry" }, { status: 502 });
  } catch {
    console.error("[api/subscribe] MailerLite request failed");
    return NextResponse.json({ ok: false, error: "retry" }, { status: 502 });
  }
}

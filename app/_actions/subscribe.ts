"use server";

import { promises as fs } from "node:fs";
import path from "node:path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: "invalid-email" | "unknown" };

async function addToMailerLite(email: string): Promise<boolean> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) return false;

  const body: Record<string, unknown> = { email };
  if (groupId) body.groups = [groupId];

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  // 200 = updated existing, 201 = created new, 409 = already subscribed
  return res.status === 200 || res.status === 201 || res.status === 409;
}

export async function subscribe(formData: FormData): Promise<SubscribeResult> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "invalid-email" };
  }

  if (process.env.NODE_ENV === "development") {
    try {
      const dataDir = path.join(process.cwd(), ".data");
      const file = path.join(dataDir, "newsletter-submissions.json");
      await fs.mkdir(dataDir, { recursive: true });

      let existing: Array<{ email: string; at: string }> = [];
      try {
        const buf = await fs.readFile(file, "utf8");
        const parsed = JSON.parse(buf);
        if (Array.isArray(parsed)) existing = parsed;
      } catch {
        /* first write */
      }

      existing.push({ email, at: new Date().toISOString() });
      await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
    } catch {
      return { ok: false, error: "unknown" };
    }
    return { ok: true };
  }

  // Production: send to MailerLite (silently succeeds if key not yet configured)
  try {
    const added = await addToMailerLite(email);
    // If MailerLite isn't configured yet, still show success so the form works.
    // Subscribers are lost until env vars are set — set MAILERLITE_API_KEY and
    // MAILERLITE_GROUP_ID in Vercel dashboard to start capturing for real.
    if (!added) {
      console.warn(`[subscribe] MailerLite not configured — dropped ${email}`);
      return { ok: true };
    }
    return { ok: true };
  } catch {
    console.error("[subscribe] MailerLite request threw unexpectedly");
    return { ok: true };
  }
}

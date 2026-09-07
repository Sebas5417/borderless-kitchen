"use server";

import { promises as fs } from "node:fs";
import path from "node:path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: "invalid-email" | "unknown" };

/**
 * "not-configured" (no API key) and "failed" (MailerLite rejected us) used to
 * both come back as `false`, so the caller could not tell a deliberate
 * pass-through from a real error and swallowed both as success.
 */
type MailerLiteOutcome = "added" | "not-configured" | "failed";

async function addToMailerLite(email: string): Promise<MailerLiteOutcome> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) return "not-configured";

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
  return res.status === 200 || res.status === 201 || res.status === 409
    ? "added"
    : "failed";
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

  try {
    const outcome = await addToMailerLite(email);

    // Deliberate pass-through: with no API key there is nowhere to put the
    // lead, so still show success and let the funnel deliver the lead magnet.
    // Leads ARE lost here — set MAILERLITE_API_KEY (+ MAILERLITE_GROUP_ID) in
    // the Vercel project to start capturing for real.
    if (outcome === "not-configured") {
      console.error(`[subscribe] MailerLite not configured — lead dropped: ${email}`);
      return { ok: true };
    }

    // A real failure. Previously this returned success and the lead was gone
    // for good; the visitor is better served by being asked to try again.
    if (outcome === "failed") {
      console.error("[subscribe] MailerLite rejected the request");
      return { ok: false, error: "unknown" };
    }

    return { ok: true };
  } catch {
    console.error("[subscribe] MailerLite request threw unexpectedly");
    return { ok: false, error: "unknown" };
  }
}

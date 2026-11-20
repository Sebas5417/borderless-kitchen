"use client";

import { useEffect } from "react";

type WindowWithGtag = Window & {
  gtag?: (command: string, action: string, parameters?: Record<string, string>) => void;
};

/**
 * One GA4 "affiliate_click" event for every tagged Amazon link on the site (2026-10-14).
 *
 * Only the book CTA reported clicks before; the buying guides' inline links and the
 * Shop-the-pantry chips - most of the site's affiliate links - were invisible, so there
 * was no way to tell which pages send readers to Amazon. A single delegated listener
 * covers MDX content and components alike without touching each link.
 */
export function AffiliateClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      let url: URL;
      try {
        url = new URL(link.href);
      } catch {
        return;
      }
      if (!/(^|\.)amazon\.com$/.test(url.hostname)) return;
      if (url.searchParams.get("tag") !== "borderlesskitchen-20") return;
      const asin = url.pathname.match(/\/dp\/([A-Z0-9]{10})/i)?.[1];
      (window as WindowWithGtag).gtag?.("event", "affiliate_click", {
        link_type: asin ? "product" : "search",
        ...(asin ? { asin } : {}),
        ...(url.searchParams.get("k") ? { query: url.searchParams.get("k") as string } : {}),
        link_text: (link.textContent ?? "").trim().slice(0, 100),
        page_path: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  merchant: "amazon" | "bokksu";
  placement: "article-body" | "pantry-card";
};

type WindowWithGtag = Window & {
  gtag?: (
    command: "event",
    action: "affiliate_click",
    parameters: Record<string, string>,
  ) => void;
};

export function AffiliateLink({
  merchant,
  placement,
  onClick,
  onAuxClick,
  ...anchor
}: Props) {
  function recordClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented) return;
    (window as WindowWithGtag).gtag?.("event", "affiliate_click", {
      affiliate_network: merchant,
      page_path: window.location.pathname,
      source_placement: placement,
    });
  }

  return (
    <a
      {...anchor}
      onClick={(event) => {
        onClick?.(event);
        recordClick(event);
      }}
      onAuxClick={(event) => {
        onAuxClick?.(event);
        if (event.button === 1) recordClick(event);
      }}
    />
  );
}

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
    const parameters: Record<string, string> = {
      affiliate_network: merchant,
      page_path: window.location.pathname,
      source_placement: placement,
    };
    const { hostname, pathname } = event.currentTarget;
    if (merchant === "amazon" && /^(?:www\.)?amazon\.com$/i.test(hostname)) {
      const asin = pathname.match(/\/(?:dp|gp\/product)\/([a-z0-9]{10})(?:\/|$)/i)?.[1];
      if (asin) parameters.affiliate_product_asin = asin.toUpperCase();
    }
    (window as WindowWithGtag).gtag?.("event", "affiliate_click", parameters);
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

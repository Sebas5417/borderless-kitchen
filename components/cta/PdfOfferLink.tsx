"use client";
import type { AnchorHTMLAttributes } from "react";
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { productId: string; placement: string; preview?: boolean };
export function PdfOfferLink({ productId, placement, preview = false, children, ...props }: Props) {
  function track() {
    const win = window as Window & { gtag?: (command: string, action: string, params: Record<string, string>) => void };
    win.gtag?.("event", preview ? "pdf_preview_click" : "pdf_product_click", { product_id: productId, source_placement: placement, page_path: window.location.pathname, link_domain: preview ? window.location.hostname : "facelesschannel.gumroad.com" });
  }
  return <a {...props} onClick={track}>{children}</a>;
}

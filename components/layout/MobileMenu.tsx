"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/books", label: "Books" },
  { href: "/journal", label: "Journal" },
  { href: "/culture", label: "Culture" },
  { href: "/about", label: "About" },
  { href: "/connect", label: "Connect" },
  { href: "/30-day-challenge", label: "Challenge", highlight: true },
  { href: "/free", label: "Free", highlight: false },
  { href: "/seoul-meets-mexico-city", label: "Seoul Meets Mexico City — Out now", highlight: false },
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const menu = menuRef.current;
    const controls = () => Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    controls()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key === "Tab") {
        const items = controls(); const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
      >
        <span
          className={`block h-px w-6 bg-ink transition-all duration-300 origin-center ${
            open ? "rotate-45 translate-y-[6px]" : ""
          }`}
        />
        <span
          className={`block h-px w-6 bg-ink transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-px w-6 bg-ink transition-all duration-300 origin-center ${
            open ? "-rotate-45 -translate-y-[6px]" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-charcoal-deep transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        ref={menuRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal={open || undefined}
        inert={!open}
        aria-hidden={!open}
      >
        <button type="button" onClick={() => setOpen(false)} className="absolute top-6 right-6 text-paper font-ui text-sm px-4 py-2 border border-paper/40">Close menu</button>
        <div className="flex flex-col justify-center items-start min-h-full px-6 sm:px-10 py-20">
          <nav aria-label="Mobile primary">
            <ul className="space-y-2">
              {NAV.map((item, i) => (
                <li
                  key={item.href}
                  className="overflow-hidden"
                  style={{
                    transitionDelay: open ? `${i * 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block font-display text-3xl sm:text-display-2 hover:text-vermillion transition-colors duration-300 ${
                      "highlight" in item && item.highlight ? "text-vermillion" : "text-paper/90"
                    } ${
                      open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    } transition-all duration-500`}
                    style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`mt-16 border-t border-paper/10 pt-8 w-full transition-all duration-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: open ? "360ms" : "0ms" }}
          >
            <p className="font-ui text-eyebrow uppercase text-paper/40 mb-3">
              Get the free starter guide
            </p>
            <Link
              href="/free"
              className="font-display italic text-paper/80 hover:text-vermillion transition-colors duration-300"
            >
              Get the free Flavor Pairing Matrix →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

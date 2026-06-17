"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/books", label: "Books" },
  { href: "/journal", label: "Journal" },
  { href: "/culture", label: "Culture" },
  { href: "/about", label: "About" },
  { href: "/connect", label: "Connect" },
  { href: "/free", label: "Free", highlight: true },
  { href: "/preorder", label: "Vol. II — Coming Soon", highlight: false },
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
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
        className={`fixed inset-0 z-40 bg-charcoal-deep transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col justify-center items-start h-full px-10">
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
                    className={`block font-display text-display-2 hover:text-vermillion transition-colors duration-300 ${
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
            <a
              href="https://free.borderlesskitchenseries.com"
              className="font-display italic text-paper/80 hover:text-vermillion transition-colors duration-300"
            >
              free.borderlesskitchenseries.com →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

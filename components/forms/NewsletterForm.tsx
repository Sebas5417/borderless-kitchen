"use client";

import { useState, useTransition } from "react";
import { subscribe } from "@/app/_actions/subscribe";

type Props = {
  /** Eyebrow / label copy. Defaults to a quiet editorial line. */
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  /** Optional link rendered after the success message (e.g. lead magnet). */
  successLink?: { href: string; label: string };
};

export function NewsletterForm({
  label = "Letters from the kitchen",
  placeholder = "Your email",
  buttonLabel = "Subscribe",
  successLink,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "ok" }
    | { kind: "unavailable" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  return (
    <form
      className="w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
          const result = await subscribe(formData);
          if (result.ok) {
            setState({ kind: "ok" });
            (e.target as HTMLFormElement).reset();
          } else if (result.error === "not-configured") {
            // Nothing was stored, so do not promise an email. The input keeps
            // its value so a later retry does not mean retyping it.
            setState({ kind: "unavailable" });
          } else {
            setState({
              kind: "error",
              message:
                result.error === "invalid-email"
                  ? "That doesn't look like an email address."
                  : "Something went wrong. Please try again.",
            });
          }
        });
      }}
    >
      <label
        htmlFor="newsletter-email"
        className="font-ui text-eyebrow uppercase text-ink/70 block mb-3"
      >
        {label}
      </label>
      <div className="flex items-end gap-3 border-b border-ink/30 pb-2 focus-within:border-ink transition-colors duration-300">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder={placeholder}
          autoComplete="email"
          disabled={pending || state.kind === "ok"}
          className="flex-1 bg-transparent font-body text-base placeholder:text-ink/40 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={pending || state.kind === "ok"}
          className="font-ui text-eyebrow uppercase text-ink hover:text-vermillion transition-colors duration-300 disabled:opacity-50"
        >
          {state.kind === "ok" ? "Thank you" : pending ? "…" : buttonLabel}
        </button>
      </div>
      {state.kind === "error" ? (
        <p className="mt-3 font-ui text-xs text-vermillion">{state.message}</p>
      ) : state.kind === "unavailable" ? (
        <div className="mt-3">
          <p className="font-ui text-xs text-ink/70">
            Email signups aren't open right now, so your address wasn't saved.
            Please try again later.
          </p>
          {successLink ? (
            <a
              href={successLink.href}
              className="mt-3 inline-block font-ui text-eyebrow uppercase text-vermillion border-b border-vermillion pb-1 hover:opacity-80 transition-opacity duration-300"
            >
              {successLink.label}
            </a>
          ) : null}
        </div>
      ) : state.kind === "ok" ? (
        <div className="mt-3">
          <p className="font-ui text-xs text-ink/60">
            You're on the list.
          </p>
          {successLink ? (
            <a
              href={successLink.href}
              className="mt-3 inline-block font-ui text-eyebrow uppercase text-vermillion border-b border-vermillion pb-1 hover:opacity-80 transition-opacity duration-300"
            >
              {successLink.label}
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

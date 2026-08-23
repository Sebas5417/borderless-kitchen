"use client";

import { useId, useState, useTransition } from "react";

type Props = {
  /** MailerLite list this form feeds. Resolved to a group ID server-side. */
  list: "tmt" | "smmc";
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  /** Paper-on-ink styling for dark sections. */
  dark?: boolean;
  successMessage?: string;
  /** Optional link rendered after the success message (e.g. lead magnet). */
  successLink?: { href: string; label: string };
};

export function SubscribeForm({
  list,
  label,
  placeholder = "your@email.com",
  buttonLabel = "Subscribe",
  dark = false,
  successMessage = "You're on the list.",
  successLink,
}: Props) {
  const inputId = useId();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<
    { kind: "idle" } | { kind: "ok" } | { kind: "error"; message: string }
  >({ kind: "idle" });

  const inkOrPaper = dark ? "text-paper" : "text-ink";
  const mutedBorder = dark ? "border-paper/30" : "border-ink/30";
  const focusBorder = dark ? "focus-within:border-paper" : "focus-within:border-ink";

  if (state.kind === "ok") {
    return (
      <div className="w-full max-w-md" role="status">
        <p className={`font-body text-base ${inkOrPaper}`}>{successMessage}</p>
        {successLink ? (
          <a
            href={successLink.href}
            className="mt-3 inline-block font-ui text-eyebrow uppercase text-vermillion border-b border-vermillion pb-1 hover:opacity-80 transition-opacity duration-300"
          >
            {successLink.label}
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form
      className="w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        startTransition(async () => {
          try {
            const res = await fetch("/api/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, list }),
            });
            const data = (await res.json()) as {
              ok: boolean;
              error?: "invalid-email" | "retry";
            };
            if (data.ok) {
              setState({ kind: "ok" });
            } else {
              setState({
                kind: "error",
                message:
                  data.error === "invalid-email"
                    ? "That doesn't look like an email address."
                    : "Something went wrong on our end. Please try again.",
              });
            }
          } catch {
            setState({
              kind: "error",
              message: "Something went wrong on our end. Please try again.",
            });
          }
        });
      }}
    >
      {label ? (
        <label
          htmlFor={inputId}
          className={`font-ui text-eyebrow uppercase block mb-3 ${dark ? "text-paper/70" : "text-ink/70"}`}
        >
          {label}
        </label>
      ) : null}
      <div
        className={`flex items-end gap-3 border-b pb-2 transition-colors duration-300 ${mutedBorder} ${focusBorder}`}
      >
        <input
          id={inputId}
          name="email"
          type="email"
          required
          placeholder={placeholder}
          autoComplete="email"
          disabled={pending}
          className={`flex-1 bg-transparent font-body text-base focus:outline-none disabled:opacity-50 ${inkOrPaper} ${dark ? "placeholder:text-paper/40" : "placeholder:text-ink/40"}`}
        />
        <button
          type="submit"
          disabled={pending}
          className={`font-ui text-eyebrow uppercase hover:text-vermillion transition-colors duration-300 disabled:opacity-50 whitespace-nowrap ${inkOrPaper}`}
        >
          {pending ? "…" : buttonLabel}
        </button>
      </div>
      {state.kind === "error" ? (
        <p className="mt-3 font-ui text-xs text-vermillion">{state.message}</p>
      ) : null}
    </form>
  );
}

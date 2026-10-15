/**
 * Gumroad product URL for the print-quality Flavor Pairing Matrix PDF.
 * null until NEXT_PUBLIC_GUMROAD_MATRIX_URL is set — callers must hide the
 * purchase link entirely rather than ship a dead one. Same "#" guard as
 * lib/amazon.ts: a placeholder "#" is truthy and would otherwise leak into
 * every CTA.
 */
const fromEnv = process.env.NEXT_PUBLIC_GUMROAD_MATRIX_URL;

export const GUMROAD_MATRIX_URL: string | null =
  fromEnv && fromEnv !== "#" ? fromEnv : null;

/** Live Gumroad listings (also linked from /instagram). */
export const GUMROAD_SMMC = "https://facelesschannel.gumroad.com/l/dqnqe";
export const GUMROAD_PLAYBOOK = "https://facelesschannel.gumroad.com/l/uycpjs";

/**
 * The Fusion Kitchen Workbook (printable mini-course edition). null until
 * NEXT_PUBLIC_GUMROAD_WORKBOOK_URL is set after the listing is published;
 * callers hide the link until then. Same "#" guard as above.
 */
const workbookEnv = process.env.NEXT_PUBLIC_GUMROAD_WORKBOOK_URL;

export const GUMROAD_WORKBOOK_URL: string | null =
  workbookEnv && workbookEnv !== "#" ? workbookEnv : null;

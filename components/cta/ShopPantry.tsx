import type { PantryEntry } from "contentlayer/generated";
import { pantryShopUrl } from "@/lib/pantryShopLink";

/**
 * "Shop the pantry": tagged Amazon searches for the ingredients a page cooks
 * with (see lib/storyPantry.ts for how they are picked). The disclosure sits
 * directly under the links, per the Associates Operating Agreement and FTC.
 */
export function ShopPantry({ ingredients }: { ingredients: PantryEntry[] }) {
  if (ingredients.length === 0) return null;
  return (
    <div className="max-w-prose mx-auto mt-16 pt-10 border-t border-hairline">
      <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
        Shop the pantry
      </p>
      <ul className="flex flex-wrap gap-3">
        {ingredients.map((e) => (
          <li key={e.slug}>
            <a
              href={pantryShopUrl(e.term)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="font-ui text-eyebrow uppercase text-ink border border-hairline px-4 py-2 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
            >
              {e.term.replace(/\s*\([^)]*\)/, "")} on Amazon
            </a>
          </li>
        ))}
      </ul>
      <p className="font-ui text-xs leading-relaxed text-ink/45 mt-4">
        As an Amazon Associate we earn from qualifying purchases. These are
        affiliate links &mdash; they cost you nothing extra.
      </p>
    </div>
  );
}

import Link from "next/link";

type Recipe = {
  slug: string;
  title: string;
  dek: string;
  cuisine: string;
  totalTime: string;
};

/** One row of the /recipes and /recipes/cuisine/* lists (extracted 2026-09-06). */
export function RecipeListItem({ recipe }: { recipe: Recipe }) {
  return (
    <li>
      <Link
        href={`/recipes/${recipe.slug}`}
        className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-8 hover:text-vermillion transition-colors duration-300"
      >
        <span className="font-ui text-eyebrow uppercase text-ink/40 md:w-32 shrink-0">
          {recipe.cuisine.split("-")[0].trim()}
        </span>
        <div className="flex-1">
          <h2 className="font-display text-display-3 text-ink group-hover:text-vermillion transition-colors duration-300 leading-tight">
            {recipe.title}
          </h2>
          <p className="font-body text-base text-ink/60 mt-1">{recipe.dek}</p>
        </div>
        <span className="font-ui text-eyebrow uppercase text-ink/30 md:w-24 shrink-0 md:text-right">
          {recipe.totalTime.replace("PT", "").replace("M", " min")}
        </span>
      </Link>
    </li>
  );
}

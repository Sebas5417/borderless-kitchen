import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";

/**
 * NESTED TYPES
 */

const Chapter = defineNestedType(() => ({
  name: "Chapter",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    intro: { type: "string", required: true },
    recipeTeaserSlugs: { type: "list", of: { type: "string" }, required: true },
  },
}));

/**
 * BOOK
 */
export const Book = defineDocumentType(() => ({
  name: "Book",
  filePathPattern: "books/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    subtitle: { type: "string" },
    status: {
      type: "enum",
      options: ["available", "coming", "in-progress"],
      required: true,
    },
    year: { type: "number" },
    regionA: { type: "string", required: true },
    regionB: { type: "string", required: true },
    amazonUrlEnvKey: { type: "string" },
    releaseNote: { type: "string" },
    coverImageAlt: { type: "string", required: true },
    heroImageAlt: { type: "string", required: true },
    chapters: { type: "list", of: Chapter },
    ordering: { type: "number", default: 100 },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^books\//, ""),
    },
    regionPair: {
      type: "list",
      resolve: (doc) => [doc.regionA, doc.regionB],
    },
  },
}));

/**
 * RECIPE TEASER
 *
 * INVARIANT: this schema declares NO fields for ingredients or method.
 * The full recipe is reserved for the printed book. The teaser body
 * (MDX) is the editorial headnote only — story, memory, why.
 */
export const RecipeTeaser = defineDocumentType(() => ({
  name: "RecipeTeaser",
  filePathPattern: "recipes/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    bookSlug: { type: "string", required: true },
    chapter: { type: "string", required: true },
    heat: { type: "number", required: true }, // 1..5
    category: { type: "string", required: true },
    pairings: { type: "list", of: { type: "string" } },
    heroImageAlt: { type: "string", required: true },
    ordering: { type: "number", default: 100 },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").pop() ?? "",
    },
  },
}));

/**
 * STORY (Journal essay)
 */
export const Story = defineDocumentType(() => ({
  name: "Story",
  filePathPattern: "stories/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    dek: { type: "string", required: true },
    date: { type: "date", required: true },
    readingTime: { type: "number", required: true },
    themes: { type: "list", of: { type: "string" }, required: true },
    pantryRefs: { type: "list", of: { type: "string" } },
    heroImageAlt: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^stories\//, ""),
    },
  },
}));

/**
 * PANTRY ENTRY
 */
export const PantryEntry = defineDocumentType(() => ({
  name: "PantryEntry",
  filePathPattern: "pantry/*.mdx",
  contentType: "mdx",
  fields: {
    term: { type: "string", required: true },
    classification: {
      type: "enum",
      options: ["ingredient", "technique", "tradition", "term"],
      required: true,
    },
    origin: { type: "list", of: { type: "string" }, required: true },
    storyRefs: { type: "list", of: { type: "string" } },
    heroImageAlt: { type: "string" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^pantry\//, ""),
    },
  },
}));

/**
 * TESTIMONIAL
 *
 * INVARIANT: `verified` must be true. We treat any non-true value as a
 * build-time error so placeholder seeds cannot ship. No testimonials
 * are seeded at v1 — the folder exists empty until real attribution
 * is on hand.
 */
export const Testimonial = defineDocumentType(() => ({
  name: "Testimonial",
  filePathPattern: "testimonials/*.mdx",
  contentType: "mdx",
  fields: {
    source: { type: "string", required: true },
    attribution: { type: "string", required: true },
    date: { type: "date", required: true },
    verified: { type: "boolean", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        if (doc.verified !== true) {
          throw new Error(
            `Testimonial "${doc._raw.sourceFileName}" is not verified. ` +
              `Testimonials require verified: true to render. Remove the file ` +
              `or supply real attribution.`,
          );
        }
        return doc._raw.flattenedPath.replace(/^testimonials\//, "");
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Book, RecipeTeaser, Story, PantryEntry, Testimonial],
});

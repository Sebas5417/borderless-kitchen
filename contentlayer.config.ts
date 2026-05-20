import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";

const Chapter = defineNestedType(() => ({
  name: "Chapter",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    intro: { type: "string", required: true },
    recipeTeaserSlugs: { type: "list", of: { type: "string" }, required: true },
  },
}));

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
    coverImageSrc: { type: "string" },
    heroImageAlt: { type: "string", required: true },
    heroImageSrc: { type: "string" },
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
 * INVARIANT: no ingredients or method fields — full recipe is in the book.
 */
export const RecipeTeaser = defineDocumentType(() => ({
  name: "RecipeTeaser",
  filePathPattern: "recipes/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    bookSlug: { type: "string", required: true },
    chapter: { type: "string", required: true },
    heat: { type: "number", required: true },
    category: { type: "string", required: true },
    pairings: { type: "list", of: { type: "string" } },
    heroImageAlt: { type: "string", required: true },
    heroImageSrc: { type: "string" },
    ordering: { type: "number", default: 100 },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").pop() ?? "",
    },
  },
}));

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
    heroImageSrc: { type: "string" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^stories\//, ""),
    },
  },
}));

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
    heroImageSrc: { type: "string" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^pantry\//, ""),
    },
  },
}));

/**
 * INVARIANT: verified must be literal true.
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
              `Remove the file or supply real attribution.`,
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

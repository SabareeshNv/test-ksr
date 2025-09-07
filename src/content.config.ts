import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const article = defineCollection({
  loader: glob({ base: "./src/content/article", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      malayalamTitle: z.string(),
      description: z.string(),
      summary: z.string(),
      pubDate: z.coerce.date(),
      coverImage: image(),
      coverAlt: z.string().default("No Alt Specified"),
      tags: z.array(z.string()).default("Uncategorized"),
      popularPost: z.boolean().default(false).optional(),
      draft: z.boolean().default(false).optional(),
    }),
});

export const collections = { article };

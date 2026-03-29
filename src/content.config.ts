import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    category: z.string(),
    draft: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["LIVE", "IN DEVELOPMENT", "COMING SOON"]),
    category: z.string(),
    year: z.string(),
    stack: z.array(z.string()),
    links: z
      .object({
        forge: z.string().optional(),
        github: z.string().optional(),
        demo: z.string().optional(),
      })
      .optional(),
    features: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
    order: z.number().default(0),
    icon: z.string().default("terminal"),
  }),
});

export const collections = { blog, projects };

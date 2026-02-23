import { defineCollection, z } from 'astro:content';

const changelog = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    url: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = { changelog, writing };

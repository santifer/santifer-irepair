import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    author: z.string().optional(),
    image: z
      .object({
        url: z.string(),
        alt: z.string()
      })
      .optional(),
    tags: z.array(z.string()).optional(),
    guia: z.string().optional(), // Asegúrate de incluir "guia" aquí
    podcast: z.string().optional(), // Asegúrate de incluir "podcast" aquí

  }),
});

export const collections = {
  'blog': blogCollection,
};
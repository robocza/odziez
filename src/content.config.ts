// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const product = defineCollection({
    loader: glob({ base: './src/content/product', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        id: z.string(),
        order: z.number(),
        info: z.string().array(),
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { product };

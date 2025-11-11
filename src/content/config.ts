import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { docsLoader } from '@astrojs/starlight/loaders';
import { blogEntrySchema } from 'starlight-blog/schema';

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: (context) => blogEntrySchema(context),
  }),
});

export const collections = {
  docs,
};

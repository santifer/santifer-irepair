import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";
import critters from "astro-critters";
// import markdown from '@astrojs/markdown-remark';

export default defineConfig({
  site: "https://santiferirepair.es",
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    critters(),
  ],
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  experimental: {
    contentCollectionCache: true,
  },
  compressHTML: true,
});

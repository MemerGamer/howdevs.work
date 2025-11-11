import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import pagefind from "astro-pagefind";
import mermaid from "astro-mermaid";
import starlightBlog from "starlight-blog";
import { blogAuthors } from "./src/data/blogAuthors.js";
import { readFileSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  site: "https://howdevs.work",
  vite: {
    plugins: [
      {
        name: "patch-starlight-blog-page",
        load(id) {
          // Intercept when loading the original file and replace with our patch
          if (id.includes("node_modules/starlight-blog/libs/page.ts")) {
            const filePath = resolve(
              process.cwd(),
              "src/lib/starlight-blog-page-patch.ts"
            );
            return readFileSync(filePath, "utf-8");
          }
          return null;
        },
      },
    ],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  integrations: [
    starlight({
      title: "howdevs.work",
      logo: {
        light: "./src/assets/branding/logo-light.png",
        dark: "./src/assets/branding/logo-dark.png",
        alt: "howdevs.work logo",
      },
      defaultLocale: "en",
      head: [],
      locales: {
        en: {
          label: "English",
          lang: "en",
          sidebar: [],
        },
        hu: {
          label: "Magyar",
          lang: "hu",
          sidebar: [],
        },
      },
      tagline: "Developer stories, deep dives, and team practices.",
      description:
        "howdevs.work is a developer-centric blog sharing engineering culture, tooling insights, and multilingual perspectives.",
      customCss: ["./src/styles/global.css"],
      plugins: [
        starlightBlog({
          navigation: "header-end",
          authors: blogAuthors,
        }),
      ],
      components: {
        Pagination: "./src/components/EmptyPagination.astro",
      },
    }),
    pagefind(),
    mermaid({
      theme: "dark",
    }),
  ],
});

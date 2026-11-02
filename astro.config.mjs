import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import pagefind from "astro-pagefind";
import mermaid from "astro-mermaid";
import starlightBlog from "starlight-blog";
import { blogAuthors } from "./src/data/blogAuthors.js";

export default defineConfig({
  site: "https://howdevs.work",
  vite: {
    plugins: [
      {
        // starlight-blog's getPageProps() omits `date`, which the extended docs
        // schema requires for the blog tag/author pages. Inject it.
        name: "patch-starlight-blog-page-date",
        enforce: "pre",
        transform(code, id) {
          if (id.replace(/\\/g, "/").includes("starlight-blog/libs/page.ts")) {
            return code.replace("pagefind: false,", "pagefind: false,\n      date: new Date(),");
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
      description:
        "howdevs.work is a developer-centric blog sharing engineering culture, tooling insights, and multilingual perspectives.",
      customCss: ["./src/styles/global.css"],
      head: [
        {
          tag: "script",
          attrs: {
            is: "inline",
          },
          content: `
            // Make RSS link locale-aware
            document.addEventListener('DOMContentLoaded', () => {
              const rssLink = document.querySelector('header a[href*="rss.xml"]');
              if (rssLink) {
                const path = window.location.pathname;
                const locale = path.startsWith('/hu/') ? 'hu' : 'en';
                rssLink.href = \`/\${locale}/blog/rss.xml\`;
              }
            });
          `,
        },
      ],
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

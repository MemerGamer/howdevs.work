# howdevs.work

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./src/assets/branding/logo-dark.png" />
  <source media="(prefers-color-scheme: light)" srcset="./src/assets/branding/logo-light.png" />
  <img alt="howdevs.work logo" src="./src/assets/branding/logo-light.png" />
</picture>

Real developer stories, no BS.

A multilingual (English/Hungarian right now) blog built with Astro and Starlight, featuring authentic stories from developers who've been in the trenches.

## What's this about?

We write about the stuff nobody else talks about: the 3am debugging sessions, the architecture decisions that seemed brilliant until they weren't, and the human side of building software.

No marketing fluff, no "10 ways to revolutionize your workflow" clickbait. Just honest stories from people who've been there, done that, and learned something worth sharing.

## Tech Stack

- **[Astro](https://astro.build/)** - Static site framework
- **[Starlight](https://starlight.astro.build/)** - Documentation theme with built-in i18n
- **[starlight-blog](https://github.com/HiDeoo/starlight-blog)** - Blog plugin for post management, RSS, and more
- **[Pagefind](https://pagefind.app/)** - Full-text search
- **[Mermaid](https://mermaid.js.org/)** - Diagrams and flowcharts

## Quick Start

```bash
# Clone and install
git clone https://github.com/howdevs/howdevs.work.git
cd howdevs.work
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

## Writing a Post

1. Add yourself to the authors list in `astro.config.mjs`
2. Create a new `.md` file in the appropriate language folder:
   - English: `src/content/docs/en/blog/your-post.md`
   - Hungarian: `src/content/docs/hu/blog/your-post.md`
3. Add frontmatter and write your story

Check out our [contribution guide](https://howdevs.work/en/blog/how-to-contribute/) for details.

## Project Structure

```plaintext
src/
├── content/docs/           # All content (blog posts, pages)
│   ├── en/blog/           # English posts
│   └── hu/blog/           # Hungarian posts
├── data/                  # Shared data (authors, language configs)
├── pages/                 # Landing pages
└── components/            # Reusable components
```

## Contributing

Got a story to share? We'd love to hear it. Fork the repo, write your post, and open a PR.

---

## [Read the blog](https://howdevs.work) • [Contribute](https://howdevs.work/en/blog/how-to-contribute/) • [GitHub](https://github.com/howdevs/howdevs.work)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=MemerGamer/howdevs.work&type=date&legend=top-left)](https://www.star-history.com/#MemerGamer/howdevs.work&type=date&legend=top-left)

---
title: How I Built the howdevs.work Blog
description: A behind-the-scenes look at creating a multilingual developer blog using Astro, Starlight, and modern web tooling.
date: 2025-11-11
authors:
  - memergamer
  - howdevs
excerpt: The story of building howdevs.work – from choosing the tech stack to handling i18n and everything in between.
tags:
  - astro
  - starlight
  - web-development
  - i18n
---

# How I Built the howdevs.work Blog

Building a blog these days feels like it should be simple, right? Well, it is and it isn't. Sure, you could spin up a WordPress site in minutes, but as developers, we have... opinions. We want performance, we want control, and we definitely want to write in Markdown.

That's how I ended up building howdevs.work with Astro and Starlight. Here's the story of how it all came together.

## Why Astro + Starlight?

I'll be honest – I went down the usual rabbit hole of "evaluating frameworks." You know how it goes: spend three weeks researching the perfect stack instead of just building the thing.

But Astro genuinely made sense for this project:

- **Performance by default** – It ships minimal JavaScript, which means fast page loads
- **Content-focused** – Built for sites exactly like this
- **Flexible** – I can drop in React components if I need them later

Starlight was the real game-changer, though. It's like someone took all the boring parts of building a docs site (navigation, search, i18n, theming) and just... handled them. Plus it looks great out of the box.

## The multilingual challenge

This was the tricky bit. I wanted the blog to work in both English and Hungarian, but I didn't want to maintain two separate sites.

Starlight's i18n support turned out to be exactly what I needed. The setup is refreshingly straightforward:

- English posts live in `src/content/docs/en/blog/`
- Hungarian posts mirror them in `src/content/docs/hu/blog/`
- Routes get generated automatically: `/en/blog/post-title/` and `/hu/blog/post-title/`

If I don't have a Hungarian translation ready, it gracefully falls back to English. No broken links, no confused users.

## The blog plugin magic

Here's where things got really nice. Instead of building all the blog functionality myself, I used the `starlight-blog` plugin. This thing is a lifesaver – it gives you:

- Automatic post listings
- Author pages (with proper metadata)
- Tag filtering
- RSS feeds
- A clean sidebar with recent posts

Setting up authors was particularly elegant. Instead of hardcoding author info in every post, you define them once in the config:

```ts
starlightBlog({
  authors: {
    memergamer: {
      name: 'Kovács Bálint-Hunor',
      title: 'Developer & maintainer',
      picture: 'https://avatars.githubusercontent.com/u/28981854?v=4',
      url: 'https://www.kovacsbalinthunor.com',
    },
  },
})
```

Then posts just reference the slug: `authors: [memergamer]`. Clean and maintainable.

## The content workflow

I'm using Astro's Content Collections, which gives me TypeScript validation for frontmatter. That means if I mess up a date format or forget to add tags, I'll know at build time.

The schema extends Starlight's built-in validation with blog-specific fields:

```ts
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: (context) => blogSchema(context),
  }),
});
```

It's the kind of setup that just works and gets out of your way.

## Features that just work

Some things that would've taken hours to build from scratch:

- **Syntax highlighting** with Shiki (configured to match the dark theme)
- **Mermaid diagrams** for when I need to explain architecture
- **Full-text search** with Pagefind
- **Dark mode** that respects system preferences
- **Responsive design** that actually works on mobile

## What I learned

The biggest surprise was how much time I spent *not* configuring build tools. Coming from webpack-heavy setups, Astro's "it just works" approach felt almost suspicious. But that's the point – it lets you focus on writing instead of wrestling with tooling.

The plugin ecosystem is solid too. Instead of reinventing the wheel for blog functionality, I could leverage existing solutions and focus on the content.

## What's next?

I've got a few ideas brewing:

- Related posts suggestions
- Reading time estimates
- Maybe some interactive components for tutorials
- Guest author functionality

But honestly? The current setup does exactly what I need. Sometimes the best architecture is the one you don't have to think about.

## Want to contribute?

The whole site is open source. If you've got a developer story to share, check out our [contribution guide](/en/blog/how-to-contribute/)!

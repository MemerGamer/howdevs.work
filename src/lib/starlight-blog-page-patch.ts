// Minimal patch: copy entire module and only modify getPageProps to add date
import type { StarlightPageProps } from "@astrojs/starlight/props";
import type { StarlightRouteData } from "@astrojs/starlight/route-data";
import type { AstroConfig } from "astro";
import starlightConfig from "virtual:starlight/user-config";
import config from "virtual:starlight-blog-config";
import context from "virtual:starlight-blog-context";

// Inline path utilities to avoid import issues
function stripLeadingSlash(path: string) {
  return path.startsWith("/") ? path.slice(1) : path;
}

function stripTrailingSlash(path: string) {
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function ensureTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

// Define types inline since these modules aren't exported
type Locale = string | undefined;

interface StarlightBlogEntry {
  id: string;
  data: {
    title: string;
    excerpt?: string;
    [key: string]: unknown;
  };
}

const trailingSlashTransformers: Record<
  "always" | "never" | "ignore",
  (path: string) => string
> = {
  always: ensureTrailingSlash,
  ignore: ensureTrailingSlash,
  never: stripTrailingSlash,
};

const base = stripTrailingSlash(import.meta.env.BASE_URL);

export function getRelativeBlogUrl(
  path: string,
  locale: Locale,
  ignoreTrailingSlash = false
) {
  path = stripLeadingSlash(path);

  return getRelativeUrl(
    getPathWithLocale(
      path ? `/${config.prefix}/${path}` : `/${config.prefix}`,
      locale
    ),
    ignoreTrailingSlash
  );
}

export function getRelativeUrl(path: string, ignoreTrailingSlash = false) {
  path = stripLeadingSlash(path);
  path = path ? `${base}/${path}` : `${base}/`;

  if (ignoreTrailingSlash) {
    return path;
  }

  const trailingSlash = context.trailingSlash as "always" | "never" | "ignore";
  const trailingSlashTransformer = trailingSlashTransformers[trailingSlash];

  return trailingSlashTransformer(path);
}

export function getPathWithLocale(path: string, locale: Locale): string {
  const pathLocale = getLocaleFromPath(path);
  if (pathLocale === locale) return path;
  locale = locale ?? "";
  if (pathLocale === path) return locale;
  if (pathLocale)
    return stripTrailingSlash(
      path.replace(`${pathLocale}/`, locale ? `${locale}/` : "")
    );
  return path
    ? `${stripTrailingSlash(locale)}/${stripLeadingSlash(path)}`
    : locale;
}

export function isAnyBlogPage(slug: string) {
  return (
    new RegExp(
      `^${getPathWithLocale(
        config.prefix,
        getLocaleFromPath(slug)
      )}(/?$|/.+/?$)`
    ).exec(slug) !== null
  );
}

export function isAnyBlogPostPage(slug: string) {
  return (
    new RegExp(
      `^${getPathWithLocale(
        config.prefix,
        getLocaleFromPath(slug)
      )}/(?!(\\d+/?|tags/.+|authors/.+)$).+$`
    ).exec(slug) !== null
  );
}

export function isBlogRoot(slug: string) {
  return slug === getPathWithLocale(config.prefix, getLocaleFromPath(slug));
}

export function isBlogPostPage(slug: string, postSlug: string) {
  return slug === postSlug;
}

export function isBlogTagPage(slug: string, tag: string) {
  return (
    slug ===
    `${getPathWithLocale(config.prefix, getLocaleFromPath(slug))}/tags/${tag}`
  );
}

export function isBlogAuthorPage(slug: string, author: string) {
  return (
    slug ===
    `${getPathWithLocale(
      config.prefix,
      getLocaleFromPath(slug)
    )}/authors/${author}`
  );
}

// MINIMAL PATCH: Only this function is modified to add date field
export function getPageProps(title: string): StarlightPageProps {
  return {
    frontmatter: {
      pagefind: false,
      title,
      prev: false,
      next: false,
      date: new Date(),
    },
  };
}

export function getSidebarProps(
  slug: string,
  entries: StarlightBlogEntry[],
  locale: Locale
): StarlightRouteData["sidebar"] {
  return entries.map((entry) => {
    const localizedEntrySlug = getPathWithLocale(entry.id, locale);
    return {
      attrs: {},
      badge: undefined,
      href: getRelativeUrl(`/${localizedEntrySlug}`),
      isCurrent: isBlogPostPage(slug, localizedEntrySlug),
      label: entry.data.title,
      type: "link",
    };
  });
}

export function getLocaleFromPath(path: string): Locale {
  const baseSegment = path.split("/")[0];
  return starlightConfig.locales &&
    baseSegment &&
    baseSegment in starlightConfig.locales
    ? baseSegment
    : undefined;
}

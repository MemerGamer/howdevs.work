// Type declarations for virtual modules used in starlight-blog-page-patch.ts
declare module "virtual:starlight/user-config" {
  const Config: import("@astrojs/starlight/types").StarlightConfig;
  export default Config;
}

declare module "virtual:starlight-blog-config" {
  const StarlightBlogConfig: import("starlight-blog/libs/config").StarlightBlogConfig;
  export default StarlightBlogConfig;
}

declare module "virtual:starlight-blog-context" {
  const StarlightBlogContext: import("starlight-blog/libs/vite").StarlightBlogContext;
  export default StarlightBlogContext;
}

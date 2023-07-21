const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString();

const MY_BLOG_DOMAIN = "https://ydkblog.vercel.app";

const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
  const paths = await globby([
    // include
    "/Users/ydk1204/Desktop/blog/posts/**/*.mdx",
    "/Users/ydk1204/Desktop/blog/posts/*.mdx",
  ]);

  const pages = await globby([
    // include
    "/Users/ydk1204/Desktop/blog/pages/**/*.jsx",
    "/Users/ydk1204/Desktop/blog/pages/*.jsx",
    // exclude
    "!/Users/ydk1204/Desktop/blog/pages/_*.jsx"
  ]);

  const pageSitemap = `
  ${pages
      .map(p => {
        const page = p
          .replace("/Users/ydk1204/Desktop/blog/pages/", "")
          .replace(".jsx", "");
        if (page.endsWith(`/[slug]`) || page === "index") return;
        return `
        <url>
          <loc>${MY_BLOG_DOMAIN}/${page}</loc>
          <lastmod>${getDate}</lastmod>
        </url>
        `
      })
      .join("")}
  `;

  const pathSitemap = `
    ${paths
      .map(p => {
        const path = p
          .replace("/Users/ydk1204/Desktop/blog/posts/", "")
          .replace(".mdx", "");
        const routePath = path === "index" ? "" : path;
        return `
        <url>
          <loc>${MY_BLOG_DOMAIN}/${routePath}</loc>
          <lastmod>${getDate}</lastmod>
        </url>
      `
      })
      .join("")}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      <url>
          <loc>${MY_BLOG_DOMAIN}/</loc>
          <lastmod>${getDate}</lastmod>
        </url>
      ${pageSitemap}
      ${pathSitemap}
    </urlset>
  `;

  const formattedSitemap = await formatted(generatedSitemap);

  fs.writeFileSync("/Users/ydk1204/Desktop/blog/public/sitemap/sitemap.xml", formattedSitemap, "utf8");
})();
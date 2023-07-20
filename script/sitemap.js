const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString();

const YOUR_AWESOME_DOMAIN = "https://ydkblog.vercel.app";

const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
  const paths = await globby([
    // include
    "./posts/**/*.mdx",
    "./posts/*.mdx",
  ]);

  const pages = await globby([
    // include
    "./pages/**/*.jsx",
    "./pages/*.jsx",
    // exclude
    "!./pages/_*.tsx"
  ]);

  // console.log(pages);

  const pageSitemap = `
  ${pages
      .map(p => {
        const page = p
          .replace("./pages/", "")
          .replace(".jsx", "");
        if (page.endsWith(`/[slug]`) || page === "index") return;
        return `
        <url>
          <loc>${YOUR_AWESOME_DOMAIN}/${page}</loc>
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
          .replace("./posts/", "")
          .replace(".mdx", "");
        const routePath = path === "index" ? "" : path;
        return `
        <url>
          <loc>${YOUR_AWESOME_DOMAIN}/${routePath}</loc>
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
          <loc>${YOUR_AWESOME_DOMAIN}/</loc>
          <lastmod>${getDate}</lastmod>
        </url>
      ${pageSitemap}
      ${pathSitemap}
    </urlset>
  `;

  
  const formattedSitemap = await formatted(generatedSitemap);

  fs.writeFileSync("./public/sitemap.xml", formattedSitemap, "utf8");
})();
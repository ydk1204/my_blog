const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const getDate = new Date().toISOString();

const MY_BLOG_DOMAIN = "https://ydkblog.vercel.app";

const WINDOW_PATHS = "/home/ydk1204/blog/my_blog/";
const MAC_PATHS = "/Users/ydk/Desktop/Projects/my_blog/";

const WINDOW_SITE_MAP = "/home/ydk1204/blog/my_blog/public/sitemap.xml";
const MAC_SITE_MAP = "/Users/ydk/Desktop/Projects/my_blog/public/sitemap.xml";

const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
  const paths = await globby([
    `${MAC_PATHS}posts/**/*.mdx`,
    `${MAC_PATHS}posts/*.mdx`,
  ]);

  const pages = await globby([
    `${MAC_PATHS}pages/**/*.jsx`,
    `${MAC_PATHS}pages/*.jsx`,
    `!${MAC_PATHS}pages/_*.jsx`
  ]);

  const pageSitemap = `
  ${pages
      .map(p => {
        const page = p
          .replace(`${MAC_PATHS}pages/`, "")
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
          .replace(`${MAC_PATHS}posts/`, "")
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

  fs.writeFileSync(MAC_SITE_MAP, formattedSitemap, "utf8");
})();


// 아래는 윈도우랑 맥 환경 코드 둘다 존재
// 윈도우는 위에꺼 그대로, 맥은 아래 코드에서 윈도우 코드 지우고 사용

// const fs = require("fs");
// const globby = require("globby");
// const prettier = require("prettier");
// const getDate = new Date().toISOString();

// const MY_BLOG_DOMAIN = "https://ydkblog.vercel.app";

// const MAC_PATHS = "/home/ydk/blog_proejct/my_blog/";
// const MAC_PATHS = "/Users/ydk1204/Desktop/blog/";

// const MAC_SITE_MAP = "/home/ydk/blog_proejct/my_blog/public/sitemap.xml";
// const MAC_SITE_MAP = "/Users/ydk1204/Desktop/blog/public/sitemap.xml";

// const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

// (async () => {
//   const paths = await globby([
//     // include
//     "/Users/ydk1204/Desktop/blog/posts/**/*.mdx",
//     "/Users/ydk1204/Desktop/blog/posts/*.mdx",
//     `${MAC_PATHS}posts/**/*.mdx`,
//     `${MAC_PATHS}posts/*.mdx`,
//   ]);

//   const pages = await globby([
//     // include
//     "/Users/ydk1204/Desktop/blog/pages/**/*.jsx",
//     "/Users/ydk1204/Desktop/blog/pages/*.jsx",
//     `${MAC_PATHS}pages/**/*.jsx`,
//     `${MAC_PATHS}pages/*.jsx`,
//     // exclude
//     "!/Users/ydk1204/Desktop/blog/pages/_*.jsx"
//     `!${MAC_PATHS}pages/_*.jsx`
//   ]);

//   const pageSitemap = `
//   ${pages
//       .map(p => {
//         const page = p
//           .replace("/Users/ydk1204/Desktop/blog/pages/", "")
//           .replace(`${MAC_PATHS}pages/`, "")
//           .replace(".jsx", "");
//         if (page.endsWith(`/[slug]`) || page === "index") return;
//         return `
//         <url>
//           <loc>${MY_BLOG_DOMAIN}/${page}</loc>
//           <lastmod>${getDate}</lastmod>
//         </url>
//         `
//       })
//       .join("")}
//   `;
//   const pathSitemap = `
//     ${paths
//       .map(p => {
//         const path = p
//           .replace("/Users/ydk1204/Desktop/blog/posts/", "")
//           .replace(`${MAC_PATHS}posts/`, "")
//           .replace(".mdx", "");
//         const routePath = path === "index" ? "" : path;
//         return `
//         <url>
//           <loc>${MY_BLOG_DOMAIN}/${routePath}</loc>
//           <lastmod>${getDate}</lastmod>
//         </url>
//       `
//       })
//       .join("")}
//   `;
//   const generatedSitemap = `
//     <?xml version="1.0" encoding="UTF-8"?>
//     <urlset
//       xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//       xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
//     >
//       <url>
//           <loc>${MY_BLOG_DOMAIN}/</loc>
//           <lastmod>${getDate}</lastmod>
//         </url>
//       ${pageSitemap}
//       ${pathSitemap}
//     </urlset>
//   `;

//   const formattedSitemap = await formatted(generatedSitemap);

//   fs.writeFileSync("/Users/ydk1204/Desktop/blog/public/sitemap.xml", formattedSitemap, "utf8");
//   fs.writeFileSync(MAC_SITE_MAP, formattedSitemap, "utf8");
// })();
export default function robots() {
  const baseUrl = "https://kyaja.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: ` ${baseUrl}/sitemap.xml`,
  };
}

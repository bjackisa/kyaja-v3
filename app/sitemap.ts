import { getAllProducts } from "@/actions/products";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  const [products] = await Promise.all([
    getAllProducts(),
  ]);
  const safeBaseUrl = baseUrl ?? "";
  const productUrl = (products ?? []).map((product) => {
    return {
      url: `${safeBaseUrl}/p/${product.slug}`,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: safeBaseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: safeBaseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: safeBaseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...productUrl,
  ];
}

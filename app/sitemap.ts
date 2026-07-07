import { MetadataRoute } from "next";
import { ApiService } from "../services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fisto-ecommerce.vercel.app";

  // Static paths
  const staticPaths = [
    "",
    "/products",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cart",
    "/wishlist",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Dynamic Category paths
    const categories = await ApiService.getCategories();
    const categoryPaths = categories.map((cat) => ({
      url: `${baseUrl}/categories/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // Dynamic Product paths
    const products = await ApiService.getProducts();
    const productPaths = products.map((prod) => ({
      url: `${baseUrl}/products/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    return [...staticPaths, ...categoryPaths, ...productPaths];
  } catch (error) {
    console.error("Error generating sitemap dynamic paths:", error);
    return staticPaths;
  }
}

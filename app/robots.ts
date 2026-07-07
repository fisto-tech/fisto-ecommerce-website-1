import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://fisto-ecommerce-website-1.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/checkout", "/account"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

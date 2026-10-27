import type { MetadataRoute } from "next";

// Closed to search engines until Chamberlain Distributing approves the site.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}

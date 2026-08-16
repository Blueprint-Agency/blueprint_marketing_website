import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * /proposals is disallowed on purpose. Those are live client documents:
 * they carry another company's pricing, and they are meant to be opened by
 * the person the link was sent to, not found in a search result. Each one
 * also carries its own noindex, because robots.txt is a request and a meta
 * tag is an instruction.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/proposals/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

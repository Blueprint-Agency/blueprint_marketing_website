import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/clients";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    /* The service pages. Kept in step with SERVICE_PAGES in lib/services.ts —
       a service that gets a page of its own gets a line here too, or the
       nav links to something the sitemap says does not exist. */
    {
      url: `${SITE.url}/services/video-production`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/services/web-design`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...CASE_STUDIES.map((c) => ({
      url: `${SITE.url}/work/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}

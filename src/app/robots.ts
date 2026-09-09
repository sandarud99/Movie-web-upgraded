import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/watch/", "/watch-tv/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: ["/", "/movies", "/tv-shows", "/anime", "/new-popular", "/llms.txt"],
        disallow: ["/api/", "/watch/", "/watch-tv/"],
      },
    ],
    sitemap: "https://9ineflix.com/sitemap.xml",
    host: "https://9ineflix.com",
  };
}

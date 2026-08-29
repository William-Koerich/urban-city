import type { MetadataRoute } from "next";
import { produtos } from "@/lib/data/products";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasEstaticas: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/a-urbancity`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/catalogo`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/representantes`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/contato`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacidade`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${siteUrl}/cookies`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const paginasProduto: MetadataRoute.Sitemap = produtos.map((p) => ({
    url: `${siteUrl}/catalogo/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...paginasEstaticas, ...paginasProduto];
}

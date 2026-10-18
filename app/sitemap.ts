import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { getRecipes } from "@/lib/recipes";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const page = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
  });

  return [
    page("/", 1),
    page("/bolt", 0.9),
    page("/rolunk", 0.6),
    ...products.map((p) => page(`/termekek/${p.slug}`, 0.9)),
    page("/receptek", 0.8),
    ...getRecipes().map((r) => page(`/receptek/${r.slug}`, 0.7, r.published)),
    page("/kapcsolat", 0.5),
    page("/szallitas", 0.4),
    page("/aszf", 0.2),
    page("/adatvedelem", 0.2),
    page("/impresszum", 0.2),
  ];
}

import { queryOptions } from "@tanstack/react-query";
import { api, withFallback } from "./client";
import { PRODUCTS, type Product } from "@/data/catalog";

export const productsApi = {
  list: () => withFallback(async () => (await api.get<Product[]>("/products")).data, () => PRODUCTS),
  get: (slug: string) =>
    withFallback(
      async () => (await api.get<Product>(`/products/${slug}`)).data,
      () => {
        const p = PRODUCTS.find((x) => x.slug === slug);
        if (!p) throw new Error("Product not found");
        return p;
      },
    ),
};

// Catalog is served from the bundled data during SSR so pages render instantly;
// the browser refreshes from the backend when it is reachable.
export const productsQuery = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: async () => (typeof window === "undefined" ? PRODUCTS : (await productsApi.list()).data),
    initialData: PRODUCTS,
  });

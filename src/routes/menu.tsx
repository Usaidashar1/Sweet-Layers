import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { sanityClient, productsQuery, CATEGORIES, type Product } from "@/lib/sanity";

const productsOpts = queryOptions({
  queryKey: ["products", "all"],
  queryFn: () => sanityClient.fetch<Product[]>(productsQuery),
});

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/menu")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Menu — Sweet Layers Bakery" },
      { name: "description", content: "Browse cakes, cupcakes, brownies, muffins, cookies and desserts from Sweet Layers." },
      { property: "og:title", content: "Menu — Sweet Layers Bakery" },
      { property: "og:description", content: "Shop premium made-to-order bakes from Sweet Layers, Karimnagar." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsOpts),
  component: MenuPage,
});

function MenuPage() {
  const { data: products } = useSuspenseQuery(productsOpts);
  const { category } = Route.useSearch();
  const navigate = useNavigate({ from: "/menu" });
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catOk = !category || p.category === category;
      const qOk = !q || p.name.toLowerCase().includes(q.toLowerCase()) ||
        (p.description ?? "").toLowerCase().includes(q.toLowerCase());
      return catOk && qOk;
    });
  }, [products, category, q]);

  const setCat = (c?: string) =>
    navigate({ search: (prev: { category?: string }) => ({ ...prev, category: c }) });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">Our menu</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Baked with love, daily</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Explore our full range of made-to-order treats.
        </p>
      </header>

      {/* Search + Filters */}
      <div className="mt-10 flex flex-col gap-4">
        <div className="relative mx-auto w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cakes, brownies, cookies…"
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>

        <div className="mx-auto flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCat(undefined)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              !category
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                category === c.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No products match your filters. Try a different category or search.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

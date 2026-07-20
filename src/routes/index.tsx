import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Cake, Cookie, IceCream, Leaf, Sparkles, Star } from "lucide-react";
import heroImage from "@/assets/hero-cake.jpg";
import { ProductCard } from "@/components/ProductCard";
import { sanityClient, productsQuery, testimonialsQuery, type Product, type Testimonial, WHATSAPP_NUMBER } from "@/lib/sanity";

const featuredOpts = queryOptions({
  queryKey: ["products", "featured"],
  queryFn: async () => {
    const all = await sanityClient.fetch<Product[]>(productsQuery);
    return all.filter((p) => p.featured || p.bestSeller).slice(0, 6);
  },
});
const testimonialsOpts = queryOptions({
  queryKey: ["testimonials"],
  queryFn: () => sanityClient.fetch<Testimonial[]>(testimonialsQuery),
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(featuredOpts);
    context.queryClient.ensureQueryData(testimonialsOpts);
  },
  component: HomePage,
});

function HomePage() {
  const { data: featured } = useSuspenseQuery(featuredOpts);
  const { data: testimonials } = useSuspenseQuery(testimonialsOpts);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-blush" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
              Karimnagar's premium cloud bakery
            </span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] text-foreground text-balance sm:text-5xl lg:text-6xl">
              Freshly Baked, <span className="italic text-[color:var(--cocoa)]">Beautifully</span> Layered.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Handcrafted cakes, cupcakes, brownies and desserts — made to order with the finest
              ingredients and delivered to your door across Karimnagar &amp; nearby.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
              >
                Order Now <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
              >
                Explore Menu
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 text-center">
              {[
                { k: "500+", v: "Happy orders" },
                { k: "6", v: "Categories" },
                { k: "100%", v: "Made to order" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-serif text-2xl font-semibold text-foreground">{s.k}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[3rem] gradient-gold opacity-30 blur-3xl" />
            <img
              src={heroImage}
              alt="Signature Sweet Layers pastel cake with cupcakes and macarons"
              width={1600}
              height={1200}
              className="w-full rounded-[2rem] object-cover shadow-soft"
            />
          </motion.div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Leaf, title: "Fresh Ingredients", desc: "Sourced daily, nothing packaged." },
            { icon: Cake, title: "Homemade Quality", desc: "Small-batch, no shortcuts." },
            { icon: Sparkles, title: "Made to Order", desc: "Baked the day of delivery." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-gold text-white">
                <f.icon className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-serif text-base font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">Signature</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Featured favourites</h2>
          </div>
          <Link to="/menu" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex">
            View all →
          </Link>
        </div>

        {featured.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">Browse</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Something for every craving</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Cakes", icon: Cake },
              { name: "Cupcakes", icon: Cake },
              { name: "Brownies", icon: Cookie },
              { name: "Cookies", icon: Cookie },
              { name: "Muffins", icon: Cake },
              { name: "Desserts", icon: IceCream },
            ].map((c) => (
              <Link
                key={c.name}
                to="/menu"
                search={{ category: c.name.toLowerCase() }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-6 text-center shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full gradient-gold text-white transition group-hover:scale-110">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="font-serif text-sm font-semibold">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">Loved by</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Kind words from our customers</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
              >
                <div className="flex text-[color:var(--gold)]">
                  {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground">"{t.message}"</blockquote>
                <figcaption className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.name}</span>
                  {t.location && <> · {t.location}</>}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-primary p-10 text-primary-foreground shadow-soft sm:p-14">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full gradient-gold opacity-40 blur-3xl" />
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Craving something sweet?</h2>
          <p className="mt-3 max-w-md text-sm opacity-90">
            Order on WhatsApp and we'll bake it fresh for you. Same-day delivery available in Karimnagar.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
          >
            Order on WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-3xl border border-dashed border-border p-10 text-center">
      <p className="text-sm text-muted-foreground">
        No products yet. Add products in your Sanity Studio and they'll appear here automatically.
      </p>
    </div>
  );
}

import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/sanity";
import { urlFor, WHATSAPP_NUMBER } from "@/lib/sanity";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const img = product.image ? urlFor(product.image).width(800).height(800).fit("crop").auto("format").url() : null;
  const orderMsg = encodeURIComponent(`Hi! I'd like to order: ${product.name}`);
  const orderHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${orderMsg}`;
  const inStock = product.availability !== false;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition hover:shadow-glow"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-4xl">🍰</div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.bestSeller && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              <Star className="mr-1 inline h-3 w-3" /> Best Seller
            </span>
          )}
          {product.featured && !product.bestSeller && (
            <span className="rounded-full gradient-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
        </div>
        {!inStock && (
          <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
            <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">{product.name}</h3>
          <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground">
            {product.category}
          </span>
        </div>
        {product.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        )}
        {product.weight && <p className="text-xs text-muted-foreground">{product.weight}</p>}

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex items-baseline gap-2">
            {product.offerPrice ? (
              <>
                <span className="font-serif text-xl font-semibold text-foreground">₹{product.offerPrice}</span>
                <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="font-serif text-xl font-semibold text-foreground">₹{product.price}</span>
            )}
          </div>
          <a
            href={inStock ? orderHref : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!inStock}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
              inStock
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "cursor-not-allowed bg-muted text-muted-foreground"
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Order
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card">
      <div className="aspect-square animate-pulse bg-muted" />
      <div className="space-y-2 p-5">
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-8 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

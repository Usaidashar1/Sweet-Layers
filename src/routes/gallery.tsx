import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { sanityClient, galleryQuery, productsQuery, urlFor, type GalleryImage, type Product } from "@/lib/sanity";

const galleryOpts = queryOptions({
  queryKey: ["gallery"],
  queryFn: async () => {
    const [gallery, products] = await Promise.all([
      sanityClient.fetch<GalleryImage[]>(galleryQuery),
      sanityClient.fetch<Product[]>(productsQuery),
    ]);
    // Fallback: use product images if gallery is empty
    if (gallery.length > 0) return gallery.map((g) => ({ src: urlFor(g.image).width(1200).auto("format").url(), title: g.title ?? "" }));
    return products
      .filter((p) => p.image)
      .map((p) => ({ src: urlFor(p.image!).width(1200).auto("format").url(), title: p.name }));
  },
});

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Sweet Layers Bakery" },
      { name: "description", content: "A glimpse of our beautifully baked and hand-decorated creations." },
      { property: "og:title", content: "Gallery — Sweet Layers Bakery" },
      { property: "og:description", content: "See our latest cakes, cupcakes and desserts." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(galleryOpts),
  component: GalleryPage,
});

function GalleryPage() {
  const { data: images } = useSuspenseQuery(galleryOpts);
  const [zoom, setZoom] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">Gallery</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">A taste of our craft</h1>
      </header>

      {images.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Upload photos in Sanity Studio (Gallery Image) to fill this space.
          </p>
        </div>
      ) : (
        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {images.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setZoom(img.src)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              className="mb-4 block w-full overflow-hidden rounded-2xl shadow-soft transition hover:shadow-glow"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                className="w-full transition-transform duration-500 hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      )}

      {zoom && (
        <div
          role="dialog"
          aria-modal
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card border border-border"
            onClick={() => setZoom(null)}
          >
            <X className="h-4 w-4" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={zoom}
            alt="Zoomed"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-soft"
          />
        </div>
      )}
    </div>
  );
}

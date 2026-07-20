import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, Heart, Sparkles, Clock } from "lucide-react";
import heroImage from "@/assets/hero-cake.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sweet Layers — Our Story" },
      {
        name: "description",
        content:
          "Sweet Layers is a family-run cloud bakery in Karimnagar crafting made-to-order cakes and desserts with fresh, premium ingredients.",
      },
      { property: "og:title", content: "About Sweet Layers — Our Story" },
      { property: "og:description", content: "A story of layers, love and beautifully baked moments." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">Our story</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Layers of love, baked fresh</h1>
      </header>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
        <motion.img
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          src={heroImage}
          alt="Sweet Layers bakery signature cake"
          className="rounded-[2rem] shadow-soft"
        />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-5 text-muted-foreground"
        >
          <p>
            Sweet Layers began in a small home kitchen in <strong className="text-foreground">Karimnagar, Telangana</strong>,
            with a simple idea: every bake should taste like it was made for someone you love.
          </p>
          <p>
            Today we're a cloud bakery serving Karimnagar and nearby areas of Hyderabad — quietly obsessed with the
            details. Real butter. Fresh cream. Belgian chocolate. Nothing pre-made, nothing rushed.
          </p>
          <p>
            Every order is baked the day it's delivered, decorated by hand, and packaged so it arrives as beautiful
            as it tasted in the oven.
          </p>
        </motion.div>
      </div>

      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Leaf, title: "Fresh ingredients", desc: "Only the finest, sourced daily." },
          { icon: Heart, title: "Homemade quality", desc: "Small-batch, hand-decorated." },
          { icon: Sparkles, title: "Made to order", desc: "Baked the day of delivery." },
          { icon: Clock, title: "Always on time", desc: "Reliable local delivery." },
        ].map((v) => (
          <div key={v.title} className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
            <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-white">
              <v.icon className="h-4 w-4" />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold">{v.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

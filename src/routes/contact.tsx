import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { BUSINESS_HOURS, INSTAGRAM_URL, LOCATION, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/sanity";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sweet Layers Bakery" },
      { name: "description", content: "Get in touch with Sweet Layers, Karimnagar. WhatsApp, Instagram, phone and location." },
      { property: "og:title", content: "Contact — Sweet Layers Bakery" },
      { property: "og:description", content: "Order via WhatsApp or reach us on Instagram." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Order & enquire",
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
    },
    { icon: Phone, title: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE_DISPLAY.replace(/\s/g, "")}` },
    { icon: Instagram, title: "Instagram", value: "@sweetlayers", href: INSTAGRAM_URL },
    { icon: MapPin, title: "Location", value: LOCATION, href: "https://maps.google.com/?q=Karimnagar,Telangana" },
    { icon: Clock, title: "Hours", value: BUSINESS_HOURS },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">Contact</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Say hello</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          We'd love to bake for you. Reach out via WhatsApp for fastest response.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          {items.map((it) => {
            const Inner = (
              <>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full gradient-gold text-white">
                  <it.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{it.title}</p>
                  <p className="truncate font-serif text-lg font-semibold text-foreground">{it.value}</p>
                </div>
              </>
            );
            return it.href ? (
              <a
                key={it.title}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                {Inner}
              </a>
            ) : (
              <div key={it.title} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
                {Inner}
              </div>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
          <iframe
            title="Sweet Layers location — Karimnagar"
            src="https://www.google.com/maps?q=Karimnagar,Telangana&output=embed"
            className="h-full min-h-[380px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

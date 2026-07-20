import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Phone, MapPin } from "lucide-react";
import { BUSINESS_HOURS, INSTAGRAM_URL, LOCATION, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/sanity";
import logoLight from "@/assets/sweet-layers-logo-light.png.asset.json";
import logoDark from "@/assets/sweet-layers-logo-dark.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={logoLight.url} alt="Sweet Layers" className="h-11 w-11 rounded-full object-cover dark:hidden" />
            <img src={logoDark.url} alt="Sweet Layers" className="hidden h-11 w-11 rounded-full object-cover dark:block" />
            <span className="font-serif text-lg font-semibold">Sweet Layers</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Freshly baked, beautifully layered. A cloud bakery in Karimnagar crafting cakes,
            cupcakes, brownies and more — made to order with the finest ingredients.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/menu" className="hover:text-foreground">Menu</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Get in touch</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {LOCATION}</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> {PHONE_DISPLAY}</li>
            <li>{BUSINESS_HOURS}</li>
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border hover:bg-accent"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Sweet Layers. All rights reserved.</p>
          <p>Handcrafted in Karimnagar, Telangana.</p>
        </div>
      </div>
    </footer>
  );
}

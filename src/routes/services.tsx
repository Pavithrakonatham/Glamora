import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowRight, Clock, Crown, Flower2, Hand, Heart, Scissors, Sparkles, Star } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { catalog, salons } from "@/lib/salons";

const CATEGORIES = ["All", "Hair", "Skin", "Spa", "Makeup", "Nails"] as const;
type Category = (typeof CATEGORIES)[number];

const searchSchema = z.object({
  category: z.enum(["All", "Hair", "Skin", "Spa", "Makeup", "Nails", "Bridal"]).optional(),
});

export const Route = createFileRoute("/services")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Beauty Services — GLAMORA Guntur" },
      { name: "description", content: "Explore hair, skin, makeup, nails and spa services across Guntur. Transparent pricing, verified salons and instant booking." },
    ],
  }),
  component: ServicesPage,
});

const iconMap: Record<Category, any> = {
  All: Sparkles, Hair: Scissors, Skin: Heart, Spa: Flower2, Makeup: Crown, Nails: Hand,
};

function ServicesPage() {
  const { category } = Route.useSearch();
  const active: Category = (category as Category) ?? "All";
  const [query, setQuery] = useState("");

  const services = useMemo(() => {
    return catalog.filter((s) => {
      const inCategory =
        active === "All" ||
        s.category === active ||
        (active === "Makeup" && s.category === "Bridal");
      const matchQ = !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase());
      return inCategory && matchQ;
    });
  }, [active, query]);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Nav />
      <section className="pt-32 pb-12 bg-gradient-nude">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs tracking-[0.2em] uppercase text-gold">Services</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight">
            Every ritual, <em className="text-gradient-gold not-italic">expertly crafted</em>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {services.length} curated services across Guntur's finest salons. Filter, compare and book in seconds.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services (e.g. keratin, facial, manicure)…"
              className="flex-1 px-5 py-3 rounded-full bg-white border border-border outline-none focus:border-gold text-sm"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const Icon = iconMap[c];
              const isActive = active === c;
              return (
                <Link
                  key={c}
                  to="/services"
                  search={c === "All" ? {} : { category: c }}
                  className={`px-4 py-2 rounded-full text-sm border transition flex items-center gap-2 ${
                    isActive ? "bg-ink text-primary-foreground border-ink" : "bg-white border-border hover:border-gold"
                  }`}
                >
                  <Icon className="size-4" /> {c}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          {services.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No services match your search.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => {
                const salon = salons.find((x) => x.id === s.salonId);
                return (
                  <article
                    key={s.slug}
                    className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-luxe hover:-translate-y-1 transition-all duration-500 flex flex-col"
                  >
                    <Link to="/services/$slug" params={{ slug: s.slug }} className="relative aspect-[4/3] overflow-hidden block">
                      <img
                        src={s.img}
                        alt={s.name}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="size-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1 glass rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider">
                        {s.category}
                      </div>
                      <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[11px] flex items-center gap-1">
                        <Star className="size-3 fill-gold text-gold" /> {s.rating}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-primary-foreground">
                        <span className="font-display text-2xl drop-shadow-lg">₹{s.price.toLocaleString()}+</span>
                        <span className="text-xs glass rounded-full px-2.5 py-1 text-foreground flex items-center gap-1">
                          <Clock className="size-3 text-gold" /> {s.duration} min
                        </span>
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-xl leading-tight">{s.name}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                      {salon && (
                        <div className="mt-3 text-xs text-muted-foreground">
                          at{" "}
                          <Link to="/salons/$id" params={{ id: salon.id }} className="text-foreground hover:text-gold">
                            {salon.name}
                          </Link>{" "}
                          · {salon.area}
                        </div>
                      )}
                      <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="rounded-xl border border-border py-2.5 text-sm hover:bg-nude transition text-center"
                        >
                          View details
                        </Link>
                        <Link
                          to="/book/$id"
                          params={{ id: s.salonId }}
                          search={{ service: s.name }}
                          className="rounded-xl bg-ink text-primary-foreground py-2.5 text-sm hover:opacity-90 transition flex items-center justify-center gap-1.5"
                        >
                          Book Now <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

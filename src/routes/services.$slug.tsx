import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Calendar, CheckCircle2, Clock, MapPin, Star } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { catalog, getCatalogItem, getSalon, type CatalogItem } from "@/lib/salons";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { item: CatalogItem } => {
    const item = getCatalogItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.item.name} — GLAMORA Guntur` : "Service — GLAMORA" },
      { name: "description", content: loaderData?.item.description ?? "Premium beauty service in Guntur." },
      { property: "og:image", content: loaderData?.item.img },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-40 text-center">
        <h1 className="font-display text-4xl">Service not found</h1>
        <Link to="/services" className="mt-6 inline-block text-gold hover:underline">Back to services</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background pt-40 text-center">
      <p className="text-destructive">{error.message}</p>
      <button onClick={reset} className="mt-4 underline">Retry</button>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { item } = Route.useLoaderData() as { item: CatalogItem };
  const salon = getSalon(item.salonId);
  const related = catalog.filter((c) => c.category === item.category && c.slug !== item.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Nav />

      {/* Hero */}
      <section className="pt-28 pb-10 bg-gradient-nude">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Link to="/services" className="hover:text-foreground">Services</Link>
            <span>/</span>
            <Link to="/services" search={{ category: item.category === "Bridal" ? "Makeup" : (item.category as any) }} className="hover:text-foreground">
              {item.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{item.name}</span>
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-10 items-start">
            <div className="relative rounded-3xl overflow-hidden shadow-luxe aspect-[4/3]">
              <img src={item.img} alt={item.name} width={1024} height={1024} className="size-full object-cover" />
              <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs uppercase tracking-wider">{item.category}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-gold uppercase tracking-[0.2em]">
                <BadgeCheck className="size-4" /> Verified service
              </div>
              <h1 className="mt-2 font-display text-4xl md:text-5xl tracking-tight">{item.name}</h1>
              <p className="mt-3 text-muted-foreground">{item.longDescription}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-border">
                  <Star className="size-4 fill-gold text-gold" /> {item.rating} · {item.reviews} reviews
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-border">
                  <Clock className="size-4 text-gold" /> {item.duration} min
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-border font-display text-base">
                  ₹{item.price.toLocaleString()}+
                </span>
              </div>

              {salon && (
                <Link
                  to="/salons/$id"
                  params={{ id: salon.id }}
                  className="mt-5 flex items-center gap-3 p-3 rounded-2xl bg-white border border-border hover:border-gold transition"
                >
                  <img src={salon.img} alt={salon.name} loading="lazy" className="size-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Performed at</div>
                    <div className="font-medium">{salon.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" /> {salon.area}</div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              )}

              <div className="mt-6 flex gap-3">
                <Link
                  to="/book/$id"
                  params={{ id: item.salonId }}
                  search={{ service: item.name }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-primary-foreground px-6 py-3.5 hover:opacity-90 transition shadow-luxe"
                >
                  <Calendar className="size-4" /> Book Appointment
                </Link>
                <Link
                  to="/glow-ai"
                  className="rounded-full border border-border px-5 py-3.5 hover:bg-nude transition text-sm"
                >
                  Ask Glow AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-3xl">Why book this service</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {item.benefits.map((b) => (
              <div key={b} className="rounded-2xl bg-card border border-border p-5">
                <CheckCircle2 className="size-5 text-gold" />
                <p className="mt-3 text-sm leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl">More in {item.category}</h2>
              <Link to="/services" className="text-sm text-gold hover:underline">View all</Link>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-luxe hover:-translate-y-1 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={r.img} alt={r.name} loading="lazy" className="size-full object-cover group-hover:scale-110 transition duration-700" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl">{r.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{r.description}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="font-display">₹{r.price.toLocaleString()}+</span>
                      <span className="text-muted-foreground flex items-center gap-1"><Clock className="size-3.5" /> {r.duration} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

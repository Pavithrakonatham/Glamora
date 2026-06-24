import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Clock, MapPin, Star } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getSalon, type Salon } from "@/lib/salons";

export const Route = createFileRoute("/salons/$id")({
  loader: ({ params }): { salon: Salon } => {
    const salon = getSalon(params.id);
    if (!salon) throw notFound();
    return { salon };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.salon.name} — GLAMORA Guntur` },
          { name: "description", content: loaderData.salon.about },
          { property: "og:image", content: loaderData.salon.img },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl">Salon not found</h1>
        <Link to="/salons" className="mt-4 inline-block text-gold">Browse all salons</Link>
      </div>
    </div>
  ),
  component: SalonDetail,
});

function SalonDetail() {
  const { salon } = Route.useLoaderData() as { salon: Salon };

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24">
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img src={salon.img} alt={salon.name} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-12">
            <div className="mx-auto max-w-7xl text-primary-foreground">
              <div className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs text-foreground">
                <BadgeCheck className="size-3.5 text-gold" /> {salon.badge}
              </div>
              <h1 className="mt-3 font-display text-4xl md:text-6xl">{salon.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-5 text-sm">
                <span className="flex items-center gap-1"><Star className="size-4 fill-gold text-gold" /> {salon.rating} · {salon.reviews} reviews</span>
                <span className="flex items-center gap-1"><MapPin className="size-4" /> {salon.area}</span>
                <span className="flex items-center gap-1"><Clock className="size-4" /> {salon.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-display text-3xl">About</h2>
              <p className="mt-4 text-muted-foreground">{salon.about}</p>
            </div>

            <div>
              <h2 className="font-display text-3xl">Gallery</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {salon.gallery.map((g, i) => (
                  <img key={i} src={g} alt="" className="aspect-square object-cover rounded-2xl" />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl">Services & Prices</h2>
              <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
                {salon.services.map((s) => (
                  <div key={s.name} className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.duration} min · {s.category}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-xl">₹{s.price.toLocaleString()}</span>
                      <Link to="/book/$id" params={{ id: salon.id }} search={{ service: s.name }} className="text-sm px-4 py-2 rounded-full bg-ink text-primary-foreground hover:opacity-90">Book</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl">Reviews</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {salon.reviewList.map((r) => (
                  <div key={r.name} className="rounded-2xl border border-border p-5 bg-card">
                    <div className="flex gap-0.5 text-gold">
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-3.5 fill-gold" />)}
                    </div>
                    <p className="mt-3 text-sm">"{r.text}"</p>
                    <div className="mt-3 text-xs text-muted-foreground">{r.name} · {r.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 sticky top-28">
              <div className="text-xs uppercase tracking-wider text-gold">Ready to glow?</div>
              <h3 className="mt-2 font-display text-2xl">Book your appointment</h3>
              <p className="mt-2 text-sm text-muted-foreground">Real-time availability. Free cancellation up to 4 hours before.</p>
              <Link to="/book/$id" params={{ id: salon.id }} className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink text-primary-foreground py-3 text-sm hover:opacity-90 transition">
                Book Appointment <ArrowRight className="size-4" />
              </Link>
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                <div className="flex items-start gap-3"><MapPin className="size-4 text-gold mt-0.5" /><span>{salon.address}</span></div>
                <div className="flex items-start gap-3"><Clock className="size-4 text-gold mt-0.5" /><span>{salon.hours}</span></div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h4 className="font-display text-lg">Our Stylists</h4>
              <div className="mt-4 space-y-3">
                {salon.stylists.map((st) => (
                  <div key={st.name} className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-nude grid place-items-center font-display text-gold">{st.name[0]}</div>
                    <div>
                      <div className="text-sm font-medium">{st.name}</div>
                      <div className="text-xs text-muted-foreground">{st.role} · {st.experience}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

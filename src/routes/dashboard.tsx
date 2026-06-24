import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Clock, LogOut, MapPin, Sparkles, Star } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { clearUser, getBookings, getSaved, getUser, type Booking } from "@/lib/auth";
import { salons } from "@/lib/salons";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — GLAMORA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate({ to: "/signin" });
      return;
    }
    setLocalUser(u);
    setBookings(getBookings());
    setSaved(getSaved());
  }, [navigate]);

  if (!user) return null;

  const savedSalons = salons.filter((s) => saved.includes(s.id));
  const recommendations = salons.slice(0, 3);

  const signOut = () => {
    clearUser();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs tracking-[0.2em] uppercase text-gold">Your Dashboard</div>
              <h1 className="mt-3 font-display text-4xl md:text-5xl">Welcome back, <em className="text-gradient-gold not-italic">{user.split("@")[0]}</em></h1>
            </div>
            <button onClick={signOut} className="text-sm flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-nude transition">
              <LogOut className="size-4" /> Sign out
            </button>
          </div>

          <div className="mt-10 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl">Upcoming appointments</h2>
                {bookings.length === 0 ? (
                  <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                    <Calendar className="size-8 mx-auto text-gold" />
                    <p className="mt-3 text-sm text-muted-foreground">No appointments yet.</p>
                    <Link to="/salons" className="mt-4 inline-block text-sm px-4 py-2 rounded-full bg-ink text-primary-foreground">Browse salons</Link>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {bookings.map((b) => (
                      <div key={b.id} className="rounded-2xl border border-border bg-card p-5 flex gap-4">
                        <img src={b.salonImg} alt="" className="size-20 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="text-xs text-gold uppercase tracking-wider">Booking #{b.id}</div>
                          <div className="font-display text-xl">{b.salonName}</div>
                          <div className="text-sm text-muted-foreground">{b.service} · with {b.stylist}</div>
                          <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="size-3" /> {b.date}</span>
                            <span className="flex items-center gap-1"><Clock className="size-3" /> {b.time}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-xl">₹{b.price.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-display text-2xl">Recommended for you</h2>
                <div className="mt-4 grid sm:grid-cols-3 gap-4">
                  {recommendations.map((s) => (
                    <Link key={s.id} to="/salons/$id" params={{ id: s.id }} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-luxe transition">
                      <img src={s.img} alt={s.name} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <div className="font-medium text-sm">{s.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Star className="size-3 fill-gold text-gold" /> {s.rating} · {s.area}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl bg-card border border-border p-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-nude grid place-items-center font-display text-gold text-xl">{user[0].toUpperCase()}</div>
                  <div>
                    <div className="font-medium">{user.split("@")[0]}</div>
                    <div className="text-xs text-muted-foreground">{user}</div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-border grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="font-display text-2xl text-gold">{bookings.length}</div>
                    <div className="text-xs text-muted-foreground">Bookings</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-gold">{saved.length}</div>
                    <div className="text-xs text-muted-foreground">Saved</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-display text-lg">Saved salons</h3>
                {savedSalons.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">No saved salons yet.</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {savedSalons.map((s) => (
                      <li key={s.id}>
                        <Link to="/salons/$id" params={{ id: s.id }} className="flex items-center gap-3 hover:bg-nude rounded-lg p-2 transition">
                          <img src={s.img} alt="" className="size-10 rounded-lg object-cover" />
                          <div className="flex-1 text-sm">
                            <div className="font-medium">{s.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" /> {s.area}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link to="/glow-ai" className="block rounded-2xl bg-ink text-primary-foreground p-6 hover:opacity-90 transition">
                <Sparkles className="size-6 text-gold" />
                <div className="mt-3 font-display text-lg">Ask Glow AI</div>
                <div className="text-xs text-primary-foreground/70 mt-1">Get instant personalised recommendations.</div>
              </Link>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

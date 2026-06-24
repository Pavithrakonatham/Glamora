import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowRight, BadgeCheck, Calendar, Clock, MapPin, Star } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getSalon, type Salon } from "@/lib/salons";
import { addBooking, getUser, type Booking } from "@/lib/auth";
import { useEffect } from "react";

const search = z.object({ service: z.string().optional() });

export const Route = createFileRoute("/book/$id")({
  validateSearch: search,
  loader: ({ params }): { salon: Salon } => {
    const salon = getSalon(params.id);
    if (!salon) throw notFound();
    return { salon };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Book ${loaderData.salon.name} — GLAMORA` : "Book — GLAMORA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingPage,
});

const slots = ["10:00 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM", "8:00 PM"];

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}
function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}
function fmtDateLabel(d: Date) {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function BookingPage() {
  const navigate = useNavigate();
  const { salon } = Route.useLoaderData() as { salon: Salon };
  const { service: presetService } = Route.useSearch();

  useEffect(() => {
    if (typeof window !== "undefined" && !getUser()) {
      try { sessionStorage.setItem("glamora_redirect", `/book/${salon.id}`); } catch {}
      navigate({ to: "/signin" });
    }
  }, [navigate, salon.id]);

  const dates = useMemo(() => Array.from({ length: 7 }, (_, i) => todayPlus(i)), []);

  const [serviceName, setServiceName] = useState(presetService || salon.services[0].name);
  const [stylist, setStylist] = useState(salon.stylists[0].name);
  const [date, setDate] = useState(fmtDate(dates[0]));
  const [time, setTime] = useState(slots[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const selectedService = salon.services.find((s) => s.name === serviceName) || salon.services[0];

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.includes("@") || phone.length < 10) {
      setError("Please fill all fields correctly.");
      return;
    }
    const id = "GN" + Date.now().toString().slice(-7);
    const booking: Booking = {
      id,
      salonId: salon.id,
      salonName: salon.name,
      salonImg: salon.img,
      service: selectedService.name,
      price: selectedService.price,
      stylist,
      date,
      time,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    navigate({ to: "/booking-success", search: { id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-xs tracking-[0.2em] uppercase text-gold">Book Appointment</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Reserve your slot at <em className="text-gradient-gold not-italic">{salon.name}</em></h1>

          <div className="mt-10 grid lg:grid-cols-3 gap-8">
            <form onSubmit={confirm} className="lg:col-span-2 space-y-6 rounded-3xl border border-border bg-card p-6 md:p-8">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Service</label>
                <select value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl bg-white border border-border outline-none focus:border-gold">
                  {salon.services.map((s) => (
                    <option key={s.name} value={s.name}>{s.name} — ₹{s.price.toLocaleString()} · {s.duration} min</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Professional</label>
                <div className="mt-2 grid sm:grid-cols-3 gap-2">
                  {salon.stylists.map((st) => (
                    <button
                      type="button"
                      key={st.name}
                      onClick={() => setStylist(st.name)}
                      className={`text-left rounded-xl border p-3 transition ${stylist === st.name ? "border-gold bg-nude" : "border-border bg-white hover:border-gold/40"}`}
                    >
                      <div className="text-sm font-medium">{st.name}</div>
                      <div className="text-xs text-muted-foreground">{st.role}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2"><Calendar className="size-3.5 text-gold" /> Date</label>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                  {dates.map((d) => {
                    const val = fmtDate(d);
                    const active = date === val;
                    return (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setDate(val)}
                        className={`shrink-0 px-4 py-3 rounded-xl border text-center min-w-[88px] transition ${active ? "border-gold bg-ink text-primary-foreground" : "border-border bg-white hover:border-gold/40"}`}
                      >
                        <div className="text-xs">{fmtDateLabel(d).split(",")[0]}</div>
                        <div className="text-sm font-medium">{fmtDateLabel(d).split(",")[1]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2"><Clock className="size-3.5 text-gold" /> Time slot</label>
                <div className="mt-2 grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {slots.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setTime(s)}
                      className={`text-xs py-2 rounded-lg border transition ${time === s ? "border-gold bg-ink text-primary-foreground" : "border-border bg-white hover:border-gold/40"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <h3 className="font-display text-xl">Your details</h3>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-white border border-border outline-none focus:border-gold" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="px-4 py-3 rounded-xl bg-white border border-border outline-none focus:border-gold" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone number" className="px-4 py-3 rounded-xl bg-white border border-border outline-none focus:border-gold" />
                </div>
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}

              <button type="submit" className="w-full rounded-xl bg-ink text-primary-foreground py-3.5 text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
                Confirm Appointment <ArrowRight className="size-4" />
              </button>
            </form>

            <aside className="rounded-3xl border border-border bg-card p-6 h-fit sticky top-28">
              <img src={salon.img} alt={salon.name} className="w-full h-40 object-cover rounded-2xl" />
              <div className="mt-4">
                <div className="inline-flex items-center gap-1.5 text-xs glass rounded-full px-2 py-0.5"><BadgeCheck className="size-3 text-gold" /> {salon.badge}</div>
                <h3 className="mt-2 font-display text-2xl">{salon.name}</h3>
                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="size-3" /> {salon.area}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1"><Star className="size-3 fill-gold text-gold" /> {salon.rating} · {salon.reviews} reviews</div>
              </div>
              <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selectedService.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Stylist</span><span className="font-medium">{stylist}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">When</span><span className="font-medium">{date} · {time}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{selectedService.duration} min</span></div>
                <div className="flex justify-between pt-3 border-t border-border"><span>Total</span><span className="font-display text-2xl">₹{selectedService.price.toLocaleString()}</span></div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Free cancellation up to 4 hours before. Pay at salon or via UPI/card.</p>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

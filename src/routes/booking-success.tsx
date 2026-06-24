import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { CalendarPlus, CheckCircle2, Clock, MapPin, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getBooking, type Booking } from "@/lib/auth";

export const Route = createFileRoute("/booking-success")({
  validateSearch: z.object({ id: z.string() }),
  head: () => ({
    meta: [
      { title: "Appointment Confirmed — GLAMORA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function makeIcsUrl(b: Booking) {
  const start = new Date(`${b.date}T${convertTo24(b.time)}:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${b.id}@glownest`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${b.service} at ${b.salonName}`,
    `DESCRIPTION:GLAMORA booking ${b.id} with ${b.stylist}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
}
function convertTo24(t: string) {
  const [time, mer] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (mer === "PM" && h !== 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function SuccessPage() {
  const { id } = Route.useSearch();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    setBooking(getBooking(id) || null);
  }, [id]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <section className="pt-40 pb-20 text-center">
          <p className="text-muted-foreground">Booking not found.</p>
          <Link to="/salons" className="mt-4 inline-block text-gold">Browse salons</Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-20 bg-gradient-nude">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="inline-flex size-16 rounded-full bg-ink items-center justify-center shadow-luxe">
            <CheckCircle2 className="size-8 text-gold" />
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-6xl">Appointment Confirmed 🎉</h1>
          <p className="mt-3 text-muted-foreground">A confirmation has been sent to {booking.customerEmail}.</p>

          <div className="mt-10 glass rounded-3xl p-6 md:p-8 text-left shadow-soft">
            <div className="flex items-center gap-4">
              <img src={booking.salonImg} alt="" className="size-20 rounded-2xl object-cover" />
              <div>
                <div className="text-xs uppercase tracking-wider text-gold">Booking #{booking.id}</div>
                <h2 className="font-display text-2xl mt-1">{booking.salonName}</h2>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
              <Detail icon={Sparkles} label="Service" value={booking.service} />
              <Detail icon={Sparkles} label="Stylist" value={booking.stylist} />
              <Detail icon={MapPin} label="Date" value={booking.date} />
              <Detail icon={Clock} label="Time" value={booking.time} />
            </div>

            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-3xl">₹{booking.price.toLocaleString()}</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href={makeIcsUrl(booking)} download={`glownest-${booking.id}.ics`} className="flex-1 rounded-xl bg-ink text-primary-foreground py-3 text-sm flex items-center justify-center gap-2 hover:opacity-90">
                <CalendarPlus className="size-4" /> Add to calendar
              </a>
              <Link to="/dashboard" className="flex-1 rounded-xl border border-border py-3 text-sm hover:bg-nude transition text-center">View dashboard</Link>
            </div>
          </div>

          <Link to="/" className="mt-8 inline-block text-sm text-muted-foreground hover:text-gold">← Back to home</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/70 p-4">
      <div className="text-xs text-muted-foreground flex items-center gap-1.5"><Icon className="size-3 text-gold" /> {label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

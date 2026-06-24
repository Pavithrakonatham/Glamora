import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Gift, Sparkles, Tag } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Memberships — GLAMORA Guntur" },
      { name: "description", content: "Seasonal beauty offers, first-booking discounts, and the GLAMORA Club membership — only on GLAMORA Guntur." },
    ],
  }),
  component: OffersPage,
});

const offers = [
  { tag: "First Booking", title: "Flat 25% off your first appointment", sub: "On any service across 600+ partner salons. Use code GLOW25 at checkout.", icon: Gift, code: "GLOW25" },
  { tag: "Festive", title: "Diwali Glow Package", sub: "Signature Facial + Hair Spa + Mani-Pedi at ₹2,499 (worth ₹4,800).", icon: Sparkles, code: "DIWALI24" },
  { tag: "Membership", title: "GLAMORA Club", sub: "Unlimited 15% off + priority slots + 2 free hair spas / year — ₹999/yr.", icon: Crown, code: "JOIN" },
  { tag: "Weekday", title: "Mid-week Pamper", sub: "20% off all spa rituals Mon–Thu before 4 PM.", icon: Tag, code: "MIDWEEK20" },
  { tag: "Bridal", title: "Bride-to-Be Bundle", sub: "Pre-bridal + trial + bridal day at 30% off when booked together.", icon: Crown, code: "BRIDE30" },
  { tag: "Refer", title: "Refer a friend", sub: "Both get ₹500 credit when your friend completes their first booking.", icon: Gift, code: "REFER500" },
];

function OffersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-12 bg-gradient-nude">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs tracking-[0.2em] uppercase text-gold">Offers</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight">
            Indulgences worth <em className="text-gradient-gold not-italic">unwrapping</em>
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((o) => (
            <div key={o.title} className="group relative rounded-3xl bg-card border border-border p-7 hover:border-gold/60 hover:shadow-luxe transition overflow-hidden">
              <div className="absolute -top-10 -right-10 size-40 rounded-full bg-gold/10 blur-2xl group-hover:bg-gold/20 transition" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider rounded-full bg-ink text-primary-foreground px-2.5 py-1">
                  <Tag className="size-3 text-gold" /> {o.tag}
                </div>
                <div className="mt-5 size-12 rounded-xl bg-nude grid place-items-center">
                  <o.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.sub}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs px-3 py-1.5 rounded-md bg-nude font-mono">{o.code}</span>
                  <Link to="/salons" className="text-sm text-gold hover:underline">Use offer →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

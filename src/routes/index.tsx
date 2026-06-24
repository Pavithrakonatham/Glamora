import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Sparkles, Bot, Star, ChevronDown, Send, Gift, Tag, Crown, Clock, Scissors, Flower2, Heart, Hand, MapPin } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SalonCard } from "@/components/site/SalonCard";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { salons, categories } from "@/lib/salons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GLAMORA Guntur — Book Premium Salons & Beauty Services" },
      { name: "description", content: "Guntur's premium beauty marketplace. Book verified salons for hair, makeup, bridal, spa, skincare & home services. AI-powered recommendations." },
    ],
  }),
  component: Index,
});

const gunturAreas = ["Brodipet", "Arundelpet", "Lakshmipuram", "Amaravathi Road", "Pattabhipuram", "Mangalagiri", "Nallapadu", "Inner Ring Road", "Vidya Nagar", "Kothapet"];

const categoryIcons: Record<string, any> = { hair: Scissors, makeup: Sparkles, spa: Flower2, skin: Heart, nails: Hand, bridal: Crown };

const reviews = [
  { name: "Aisha Reddy", role: "Bride • Arundelpet", text: "GLAMORA made finding my bridal artist effortless. The booking was seamless and the team felt curated for me.", rating: 5 },
  { name: "Sanya Mehra", role: "Working Professional", text: "I book my monthly facial in 30 seconds. Reminders, rebooking, even my stylist's notes are saved. Total game changer.", rating: 5 },
  { name: "Karthik Rao", role: "Amaravathi Road", text: "Home grooming on a Sunday morning, no calls, no haggling. The professional arrived in 20 minutes. Quiet luxury.", rating: 5 },
];

const offers = [
  { tag: "First Booking", title: "Flat 25% off your first appointment", sub: "On any service across 600+ partner salons", icon: Gift },
  { tag: "Festive", title: "Diwali Glow Package", sub: "Facial + Hair Spa + Mani-Pedi at ₹2,499", icon: Sparkles },
  { tag: "Membership", title: "GLAMORA Club", sub: "Unlimited 15% off + priority slots, ₹999/yr", icon: Crown },
];

const faqs = [
  { q: "How do I book an appointment?", a: "Search by location or service, pick a salon, choose your service, professional and time slot — confirm in under a minute." },
  { q: "Can I cancel or reschedule?", a: "Yes. Free cancellation up to 4 hours before your appointment, directly from your bookings." },
  { q: "Are the salons on GLAMORA verified?", a: "Every partner is hand-vetted for hygiene, licensing, and service quality. Look for the gold Verified badge." },
  { q: "Do you offer home salon services?", a: "Absolutely. Choose 'At Home' at checkout — our certified professionals arrive with sanitised tools and premium products." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <Nav />
      <HeroCarousel />
      <LocationStrip />
      <Categories />
      <FeaturedSalons />
      <GlowAIPreview />
      <BookingFlow />
      <OffersPreview />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
}

function LocationStrip() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold flex items-center gap-2"><MapPin className="size-3.5" /> Find salons near you</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Popular areas in <em className="text-gradient-gold not-italic">Guntur</em></h2>
          </div>
          <Link to="/salons" className="text-sm flex items-center gap-2 hover:text-gold transition">View all areas <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {gunturAreas.map((a) => (
            <Link key={a} to="/salons" className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-gold hover:bg-nude transition">
              <MapPin className="size-3 inline text-gold mr-1" />{a}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs tracking-[0.2em] uppercase text-gold">{eyebrow}</div>
      <h2 className="mt-3 font-display text-4xl md:text-5xl tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Categories() {
  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Categories" title={<>Every ritual, <em className="text-gradient-gold not-italic font-normal">expertly crafted</em></>} sub="From a quick blow-dry to a full bridal trousseau — explore services curated by our beauty editors." />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => {
            const Icon = categoryIcons[c.slug];
            return (
              <Link key={c.slug} to="/services" search={{ category: c.label as any }} className="group relative rounded-2xl border border-border bg-card p-6 hover:border-gold/60 hover:shadow-luxe transition-all">
                <div className="size-12 rounded-xl bg-nude grid place-items-center group-hover:bg-gold/15 transition">
                  <Icon className="size-6 text-ink group-hover:text-gold transition" />
                </div>
                <div className="mt-4 font-display text-xl">{c.label}</div>
                <div className="text-xs text-muted-foreground">{c.count}</div>
                <ArrowRight className="absolute top-6 right-6 size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition text-gold" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedSalons() {
  const featured = useMemo(() => salons.slice(0, 4), []);
  return (
    <section id="salons" className="py-20 md:py-28 bg-gradient-nude">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeader eyebrow="Featured Salons" title={<>Guntur's <em className="text-gradient-gold not-italic font-normal">finest</em>, hand-picked</>} />
          <Link to="/salons" className="text-sm flex items-center gap-2 hover:text-gold transition">View all 600+ <ArrowRight className="size-4" /></Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((s) => <SalonCard key={s.id} s={s} />)}
        </div>
      </div>
    </section>
  );
}

function GlowAIPreview() {
  return (
    <section id="glow-ai" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-ink text-primary-foreground px-3 py-1 text-xs">
            <Bot className="size-3.5 text-gold" /> Powered by Glow AI
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-5xl tracking-tight">
            Meet <em className="text-gradient-gold not-italic">Glow AI</em> — your personal beauty concierge
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Describe the look you want, your skin type or your event — Glow AI matches you with the right salon, the right artist and the right service in seconds.
          </p>
          <Link to="/glow-ai" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-primary-foreground px-6 py-3 text-sm hover:opacity-90 transition">
            Chat with Glow AI <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-gold-soft/30 to-nude-deep/30 rounded-[2.5rem] blur-2xl" />
          <div className="relative glass rounded-[2rem] p-5 shadow-luxe">
            <div className="flex items-center gap-3 pb-4 border-b border-border/70">
              <div className="size-10 rounded-full bg-ink grid place-items-center"><Sparkles className="size-5 text-gold" /></div>
              <div>
                <div className="font-medium text-sm">Glow AI</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-500" /> Online</div>
              </div>
            </div>
            <div className="py-5 space-y-4">
              <Bubble who="ai">Hi! Tell me what you're planning — a date night, a wedding, or a self-care reset?</Bubble>
              <Bubble who="me">A friend's sangeet next Saturday. Soft glam.</Bubble>
              <Bubble who="ai">Try <b>Velvet Bridal Studio</b> or <b>Maison Lumière</b> — both 4.9★ for soft glam.</Bubble>
            </div>
            <Link to="/glow-ai" className="flex items-center gap-2 rounded-2xl bg-white border border-border px-4 py-3 text-sm text-muted-foreground hover:border-gold transition">
              <span className="flex-1 text-left">Ask Glow anything…</span>
              <span className="size-9 rounded-full bg-ink text-primary-foreground grid place-items-center"><Send className="size-4" /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ who, children }: { who: "ai" | "me"; children: React.ReactNode }) {
  const isAi = who === "ai";
  return (
    <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[80%] text-sm rounded-2xl px-4 py-2.5 ${isAi ? "bg-nude rounded-bl-sm" : "bg-ink text-primary-foreground rounded-br-sm"}`}>
        {children}
      </div>
    </div>
  );
}

function BookingFlow() {
  const steps = [
    { n: "01", t: "Select service", d: "Choose from hair, makeup, spa or bridal — with transparent pricing." },
    { n: "02", t: "Pick a professional", d: "Browse stylist profiles, portfolios and specialisations." },
    { n: "03", t: "Choose date & time", d: "Real-time availability across all partner salons." },
    { n: "04", t: "Confirm appointment", d: "Pay securely or at salon. Get instant confirmation & reminders." },
  ];
  return (
    <section className="py-20 md:py-28 bg-ink text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-gold/30 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="text-center">
          <div className="text-xs tracking-[0.2em] uppercase text-gold">Booking, refined</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Four taps to your next <em className="text-gradient-gold not-italic">glow up</em></h2>
        </div>
        <div className="mt-14 grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative glass-dark rounded-2xl p-6">
              <div className="font-display text-5xl text-gold/80">{s.n}</div>
              <div className="mt-4 font-display text-xl">{s.t}</div>
              <p className="mt-2 text-sm text-primary-foreground/70">{s.d}</p>
              {i < steps.length - 1 && <ArrowRight className="hidden md:block absolute top-1/2 -right-3 size-5 text-gold/60" />}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/salons" className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-6 py-3 text-sm font-medium hover:brightness-105 transition">
            <Clock className="size-4" /> Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}

function OffersPreview() {
  return (
    <section id="offers" className="py-20 md:py-28 bg-gradient-nude">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Offers" title={<>Indulgences worth <em className="text-gradient-gold not-italic">unwrapping</em></>} />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
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
                <Link to="/offers" className="mt-6 text-sm flex items-center gap-2 text-foreground hover:text-gold transition">Claim offer <ArrowRight className="size-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Loved in Guntur" title={<>Real stories, <em className="text-gradient-gold not-italic">real glow</em></>} />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-3xl border border-border bg-card p-7 hover:shadow-soft transition">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-4 fill-gold" />)}
              </div>
              <blockquote className="mt-4 font-display text-xl leading-snug">"{r.text}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-nude grid place-items-center font-display text-gold">{r.name[0]}</div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28 bg-gradient-nude">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader eyebrow="FAQ" title={<>Questions, <em className="text-gradient-gold not-italic">answered</em></>} />
        <div className="mt-10 divide-y divide-border rounded-2xl bg-card border border-border overflow-hidden">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-nude/50 transition">
                  <span className="font-display text-lg">{f.q}</span>
                  <ChevronDown className={`size-5 text-gold shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <div className="px-6 pb-6 text-sm text-muted-foreground -mt-2">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

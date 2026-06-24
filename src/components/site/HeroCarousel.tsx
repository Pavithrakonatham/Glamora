import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import heroSalon from "@/assets/hero-salon.jpg";
import salonBridal from "@/assets/salon-bridal.jpg";
import salonSpa from "@/assets/salon-spa.jpg";
import salonHair from "@/assets/salon-hair.jpg";

type Slide = { img: string; eyebrow: string; title: string; subtitle: string; cta: string; to: string };

const slides: Slide[] = [
  { img: heroSalon, eyebrow: "Guntur · Premium Marketplace", title: "Premium Salon Experience in Guntur", subtitle: "600+ verified salons, beauty experts & home professionals — all in one place.", cta: "Explore Salons", to: "/salons" },
  { img: salonHair, eyebrow: "Hair & Beauty", title: "Your Perfect Hair & Beauty Look", subtitle: "Precision cuts, color, keratin & styling by master stylists.", cta: "Book Appointment", to: "/services" },
  { img: salonBridal, eyebrow: "Powered by Glow AI", title: "AI Powered Beauty Recommendations", subtitle: "Tell Glow your event, skin or hair goals — get matched in seconds.", cta: "Try Glow AI", to: "/glow-ai" },
  { img: salonSpa, eyebrow: "Limited Time", title: "Exclusive Offers Near You", subtitle: "Up to 25% off first bookings, festive packages & member-only slots.", cta: "View Offers", to: "/offers" },
];

export function HeroCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", duration: 28 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  useEffect(() => {
    if (!embla) return;
    const on = () => setIndex(embla.selectedScrollSnap());
    embla.on("select", on);
    on();
    return () => { embla.off("select", on); };
  }, [embla]);

  useEffect(() => {
    if (!embla || paused) return;
    const id = setInterval(() => embla.scrollNext(), 4500);
    return () => clearInterval(id);
  }, [embla, paused]);

  return (
    <section className="relative pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-3 md:px-4">
        <div
          className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] shadow-luxe"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {slides.map((s, i) => (
                <div key={i} className="relative min-w-0 shrink-0 grow-0 basis-full">
                  <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
                    <img src={s.img} alt={s.title} className="size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/40 to-transparent" />
                    <div className="absolute inset-0 flex items-end md:items-center">
                      <div className="p-6 md:p-14 max-w-2xl text-primary-foreground">
                        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[11px] text-foreground">
                          <span className="size-1.5 rounded-full bg-gold" /> {s.eyebrow}
                        </div>
                        <h1 className="mt-5 font-display text-4xl md:text-7xl leading-[1.02] tracking-tight">
                          {s.title.split(" ").slice(0, -2).join(" ")}{" "}
                          <span className="text-gradient-gold italic">{s.title.split(" ").slice(-2).join(" ")}</span>
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-primary-foreground/85 max-w-lg">{s.subtitle}</p>
                        <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
                          <Link to={s.to} className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-6 py-3 text-sm font-medium hover:brightness-105 transition">
                            {s.cta} <ArrowRight className="size-4" />
                          </Link>
                          <Link to="/glow-ai" className="text-sm px-5 py-3 rounded-full border border-white/30 text-primary-foreground hover:bg-white/10 transition">
                            Ask Glow AI
                          </Link>
                        </div>
                        <div className="mt-5 text-xs text-primary-foreground/75 flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-gold" /> Serving Brodipet, Arundelpet, Lakshmipuram & 7+ more areas
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button onClick={() => embla?.scrollPrev()} aria-label="Previous slide" className="hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 size-11 rounded-full glass place-items-center hover:bg-white">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={() => embla?.scrollNext()} aria-label="Next slide" className="hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 size-11 rounded-full glass place-items-center hover:bg-white">
            <ChevronRight className="size-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-3 bg-white/60 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

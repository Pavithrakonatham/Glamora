import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import type { Salon } from "@/lib/salons";

export function SalonCard({ s }: { s: Salon }) {
  return (
    <article className="group rounded-3xl bg-card overflow-hidden border border-border hover:shadow-luxe transition-all hover:-translate-y-1 flex flex-col">
      <Link to="/salons/$id" params={{ id: s.id }} className="relative aspect-[4/5] overflow-hidden block">
        <img src={s.img} alt={s.name} loading="lazy" className="size-full object-cover group-hover:scale-105 transition duration-700" />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 glass rounded-full px-2.5 py-1 text-[10px] font-medium">
          <BadgeCheck className="size-3 text-gold" /> {s.badge}
        </div>
        <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[11px] flex items-center gap-1">
          <Star className="size-3 fill-gold text-gold" /> {s.rating}
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to="/salons/$id" params={{ id: s.id }} className="font-display text-xl leading-tight hover:text-gold transition">
            {s.name}
          </Link>
          <span className="text-xs text-muted-foreground">{s.priceLevel}</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="size-3" /> {s.area} · {s.reviews} reviews
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {s.tags.map((sv) => (
            <span key={sv} className="text-[10px] px-2 py-0.5 rounded-full bg-nude text-foreground/70">{sv}</span>
          ))}
        </div>
        <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
          <Link
            to="/salons/$id"
            params={{ id: s.id }}
            className="rounded-xl border border-border py-2.5 text-sm hover:bg-nude transition text-center"
          >
            View
          </Link>
          <Link
            to="/book/$id"
            params={{ id: s.id }}
            className="rounded-xl bg-ink text-primary-foreground py-2.5 text-sm hover:opacity-90 transition flex items-center justify-center gap-1.5"
          >
            Book Now <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

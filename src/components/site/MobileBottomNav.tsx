import { Link } from "@tanstack/react-router";
import { Home, Scissors, Sparkles, Calendar, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/salons", label: "Salons", icon: Scissors },
  { to: "/glow-ai", label: "Glow AI", icon: Sparkles },
  { to: "/offers", label: "Offers", icon: Calendar },
  { to: "/dashboard", label: "Account", icon: User },
] as const;

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-3 inset-x-3 z-50 glass rounded-2xl shadow-luxe px-2 py-1.5 flex items-center justify-between">
      {items.map((it) => (
        <Link
          key={it.to}
          to={it.to}
          activeProps={{ className: "text-gold" }}
          activeOptions={{ exact: it.to === "/" }}
          className="flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[10px] text-foreground/70 hover:text-foreground transition"
        >
          <it.icon className="size-5" />
          {it.label}
        </Link>
      ))}
    </nav>
  );
}

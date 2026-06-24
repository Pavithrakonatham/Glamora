import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, MapPin, LogOut, Calendar as CalIcon, User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { clearUser } from "@/lib/auth";

export function Nav() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") setUser(localStorage.getItem("glownest_user"));
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const links = [
    { to: "/salons" as const, label: "Salons" },
    { to: "/services" as const, label: "Services" },
    { to: "/glow-ai" as const, label: "Glow AI" },
    { to: "/offers" as const, label: "Offers" },
    { to: "/dashboard" as const, label: "Appointments" },
  ];

  const signOut = () => {
    clearUser();
    setUser(null);
    setMenu(false);
    navigate({ to: "/" });
  };

  const initial = user ? user[0].toUpperCase() : "";

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass rounded-full px-5 py-3 flex items-center justify-between shadow-soft">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-ink grid place-items-center">
              <span className="font-display text-gold text-lg leading-none">G</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl tracking-[0.18em]">GLAMORA</div>
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="size-2.5" /> Guntur
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-foreground/80">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-foreground transition" activeProps={{ className: "text-gold" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenu((v) => !v)}
                  className="size-9 rounded-full bg-gradient-to-br from-gold to-nude-deep grid place-items-center text-ink font-display text-sm shadow-soft"
                  aria-label="Profile menu"
                >
                  {initial}
                </button>
                {menu && (
                  <div className="absolute right-0 mt-2 w-56 glass rounded-2xl p-2 shadow-luxe text-sm">
                    <div className="px-3 py-2 border-b border-border/60">
                      <div className="font-medium truncate">{user.split("@")[0]}</div>
                      <div className="text-xs text-muted-foreground truncate">{user}</div>
                    </div>
                    <Link to="/dashboard" onClick={() => setMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-nude">
                      <UserIcon className="size-4" /> Profile
                    </Link>
                    <Link to="/dashboard" onClick={() => setMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-nude">
                      <CalIcon className="size-4" /> My bookings
                    </Link>
                    <button onClick={signOut} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-nude text-left">
                      <LogOut className="size-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="hidden sm:inline text-sm px-4 py-2 rounded-full hover:bg-nude transition">
                Sign in
              </Link>
            )}
            <Link to="/salons" className="hidden sm:inline-flex text-sm px-4 py-2 rounded-full bg-ink text-primary-foreground hover:opacity-90 transition">
              Book Appointment
            </Link>
            <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden glass mt-2 rounded-2xl p-4 flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            {!user && <Link to="/signin" onClick={() => setOpen(false)}>Sign in</Link>}
          </div>
        )}
      </div>
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-primary-foreground pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-full bg-gold/20 grid place-items-center">
                <span className="font-display text-gold text-xl">G</span>
              </div>
              <div>
                <div className="font-display text-2xl">GLAMORA</div>
                <div className="text-xs text-primary-foreground/60">Guntur</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-primary-foreground/70 max-w-sm">
              The premium beauty marketplace — connecting Guntur with its most loved salons, artists and at-home professionals.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Ic, i) => (
                <a key={i} href="#" aria-label="social" className="size-10 rounded-full border border-white/15 grid place-items-center hover:bg-gold hover:text-ink hover:border-gold transition">
                  <Ic className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gold">Explore</div>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/salons" className="hover:text-primary-foreground">Salons</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground">Services</Link></li>
              <li><Link to="/glow-ai" className="hover:text-primary-foreground">Glow AI</Link></li>
              <li><Link to="/offers" className="hover:text-primary-foreground">Offers</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium text-gold">For Salons</div>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground">Partner with us</a></li>
              <li><a href="#" className="hover:text-primary-foreground">GLAMORA for Business</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Success stories</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium text-gold">Support</div>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground">Help center</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Contact</a></li>
              <li><Link to="/signin" className="hover:text-primary-foreground">Sign in</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap gap-3 items-center justify-between text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} GLAMORA Beauty Pvt. Ltd. · Made with care in Guntur.</div>
          <div className="flex gap-5"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div>
        </div>
      </div>
    </footer>
  );
}

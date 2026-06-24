import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — GLAMORA Guntur" },
      { name: "description", content: "Sign in to GLAMORA to manage your appointments, saved salons and beauty profile." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");

  const goNext = () => {
    let next = "/dashboard";
    try {
      const r = sessionStorage.getItem("glamora_redirect");
      if (r) { next = r; sessionStorage.removeItem("glamora_redirect"); }
    } catch {}
    navigate({ to: next });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) return setError("Please enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setUser(email);
    goNext();
  };

  const googleLogin = () => {
    setUser("guest@glamora.in");
    goNext();
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-20 bg-gradient-nude min-h-screen">
        <div className="mx-auto max-w-md px-4">
          <div className="text-center">
            <div className="inline-flex size-12 rounded-2xl bg-ink text-gold items-center justify-center">
              <Sparkles className="size-6" />
            </div>
            <h1 className="mt-5 font-display text-4xl">{mode === "signin" ? "Welcome back" : "Create account"}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "signin" ? "Sign in to manage your bookings and saved salons." : "Join GLAMORA and discover Guntur's best beauty experiences."}
            </p>
          </div>

          <div className="mt-8 glass rounded-3xl p-6 shadow-luxe">
            <button
              onClick={googleLogin}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white border border-border py-3 text-sm font-medium hover:bg-nude transition"
            >
              <GoogleIcon /> Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" /> or {mode === "signin" ? "sign in with email" : "sign up with email"} <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-white border border-border outline-none focus:border-gold transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Password</label>
                  {mode === "signin" && (
                    <button type="button" className="text-xs text-gold hover:underline">Forgot password?</button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-white border border-border outline-none focus:border-gold transition"
                  placeholder="••••••••"
                />
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}

              <button type="submit" className="w-full rounded-xl bg-ink text-primary-foreground py-3 text-sm font-medium hover:opacity-90 transition">
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-muted-foreground">
              {mode === "signin" ? (
                <>New to GLAMORA? <button onClick={() => setMode("signup")} className="text-gold hover:underline">Create account</button></>
              ) : (
                <>Already have an account? <button onClick={() => setMode("signin")} className="text-gold hover:underline">Sign in</button></>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-gold">← Back to home</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

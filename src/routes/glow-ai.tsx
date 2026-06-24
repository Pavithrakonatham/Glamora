import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { salons } from "@/lib/salons";

export const Route = createFileRoute("/glow-ai")({
  head: () => ({
    meta: [
      { title: "Glow AI — Your Personal Beauty Concierge | GLAMORA" },
      { name: "description", content: "Chat with Glow AI — describe your event, style or skin goals and get personalised salon, artist and service recommendations." },
    ],
  }),
  component: GlowAIPage,
});

type Msg = { role: "ai" | "me"; text: string; salonIds?: string[] };

function respond(input: string): Msg {
  const q = input.toLowerCase();
  let salonIds: string[] = [];
  let text = "";

  if (q.includes("bridal") || q.includes("wedding") || q.includes("sangeet")) {
    salonIds = ["velvet-bridal", "rouge-makeup"];
    text = "For bridal looks, I'd recommend Velvet Bridal Studio (Arundelpet, 4.95★) — they specialise in HD and airbrush. Rouge Makeup Loft is also excellent for engagement and reception looks.";
  } else if (q.includes("hair") || q.includes("keratin") || q.includes("color")) {
    salonIds = ["maison-lumiere"];
    text = "Maison Lumière in Brodipet is the go-to for keratin, balayage and precision cuts. Stylists Anaya and Rohan are Paris-trained.";
  } else if (q.includes("spa") || q.includes("massage") || q.includes("relax")) {
    salonIds = ["aurum-spa"];
    text = "Aurum Spa & Wellness in Lakshmipuram is rated 4.8★ — Balinese-trained therapists, deep tissue, aroma, and a beautiful couples ritual.";
  } else if (q.includes("nail") || q.includes("mani") || q.includes("pedi")) {
    salonIds = ["nail-atelier"];
    text = "The Nail Atelier (Amaravathi Road) is Guntur's best for gel extensions and nail art. OPI + Essie + impeccable hygiene.";
  } else if (q.includes("skin") || q.includes("facial") || q.includes("acne") || q.includes("glow")) {
    salonIds = ["ivory-skin", "aurum-spa"];
    text = "For skin goals, Ivory Skin Clinic offers dermatologist-led medi-facials and chemical peels. Aurum's Hydra-Brightening Facial is a beautiful glow-on-demand option.";
  } else if (q.includes("near me") || q.includes("best salon")) {
    salonIds = salons.slice(0, 3).map((s) => s.id);
    text = "Here are 3 top-rated salons across Guntur based on reviews and verified quality:";
  } else {
    salonIds = salons.slice(0, 2).map((s) => s.id);
    text = "Lovely! Based on what you've shared, here are two salons I think you'll love. Tap any to explore services and book.";
  }
  return { role: "ai", text, salonIds };
}

function GlowAIPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm Glow ✨ Tell me what you're planning — a date night, a wedding, or just a self-care reset?" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "me", text }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, respond(text)]), 600);
  };

  const suggestions = [
    "I need bridal makeup",
    "Suggest a hairstyle",
    "Best salon near me",
    "Recommend a spa for relaxation",
    "I have acne — what should I book?",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-ink text-primary-foreground px-3 py-1 text-xs">
              <Bot className="size-3.5 text-gold" /> Powered by Glow AI
            </div>
            <h1 className="mt-5 font-display text-4xl md:text-6xl tracking-tight">
              Your personal <em className="text-gradient-gold not-italic">beauty concierge</em>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Tell Glow what you need — events, skin type, hair goals — and get matched with the right salon instantly.
            </p>
          </div>

          <div className="mt-10 glass rounded-[2rem] p-5 shadow-luxe">
            <div className="flex items-center gap-3 pb-4 border-b border-border/70">
              <div className="size-10 rounded-full bg-ink grid place-items-center"><Sparkles className="size-5 text-gold" /></div>
              <div>
                <div className="font-medium text-sm">Glow AI</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-500" /> Online</div>
              </div>
            </div>

            <div ref={scrollRef} className="py-5 space-y-4 max-h-[55vh] overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "ai" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] text-sm rounded-2xl px-4 py-3 ${m.role === "ai" ? "bg-nude rounded-bl-sm" : "bg-ink text-primary-foreground rounded-br-sm"}`}>
                    <div>{m.text}</div>
                    {m.salonIds && m.salonIds.length > 0 && (
                      <div className="mt-3 grid gap-2">
                        {m.salonIds.map((sid) => {
                          const s = salons.find((x) => x.id === sid);
                          if (!s) return null;
                          return (
                            <Link key={sid} to="/salons/$id" params={{ id: s.id }} className="flex items-center gap-3 rounded-xl bg-white p-2 hover:shadow-soft transition border border-border">
                              <img src={s.img} alt="" className="size-12 rounded-lg object-cover" />
                              <div className="flex-1">
                                <div className="text-sm font-medium text-foreground">{s.name}</div>
                                <div className="text-xs text-muted-foreground">{s.area} · {s.rating}★</div>
                              </div>
                              <span className="text-xs text-gold">View →</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full bg-nude hover:bg-gold/15 transition">{s}</button>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 rounded-2xl bg-white border border-border px-4 py-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Glow anything…"
                className="flex-1 bg-transparent outline-none text-sm py-2"
              />
              <button type="submit" className="size-9 rounded-full bg-ink text-primary-foreground grid place-items-center hover:opacity-90">
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

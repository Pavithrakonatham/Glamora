import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SalonCard } from "@/components/site/SalonCard";
import { salons } from "@/lib/salons";

export const Route = createFileRoute("/salons")({
  head: () => ({
    meta: [
      { title: "Browse Salons — GLAMORA Guntur" },
      { name: "description", content: "Browse verified salons in Guntur. Filter by area, service, and rating to book your next appointment." },
    ],
  }),
  component: SalonsPage,
});

const areas = ["All", "Brodipet", "Arundelpet", "Lakshmipuram", "Amaravathi Road", "Pattabhipuram", "Mangalagiri", "Nallapadu", "Inner Ring Road", "Vidya Nagar", "Kothapet"];

function SalonsPage() {
  const [q, setQ] = useState("");
  const [area, setArea] = useState("All");

  const filtered = useMemo(() => {
    return salons.filter((s) => {
      const matchesQ = !q || s.name.toLowerCase().includes(q.toLowerCase()) || s.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()));
      const matchesArea = area === "All" || s.area === area;
      return matchesQ && matchesArea;
    });
  }, [q, area]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-12 bg-gradient-nude">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs tracking-[0.2em] uppercase text-gold">Browse Salons</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight">
            Guntur's <em className="text-gradient-gold not-italic">finest</em>, all in one place
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {filtered.length} verified salons matching your search. Filter, compare, and book instantly.
          </p>

          <div className="mt-8 glass rounded-2xl p-3 flex flex-col md:flex-row gap-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white flex-1">
              <Search className="size-4 text-gold" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search salons, services…"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white text-sm outline-none border border-border"
            >
              {areas.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No salons match your filters.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => <SalonCard key={s.id} s={s} />)}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

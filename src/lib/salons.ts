import heroSalon from "@/assets/hero-salon.jpg";
import salonBridal from "@/assets/salon-bridal.jpg";
import salonHair from "@/assets/salon-hair.jpg";
import salonSpa from "@/assets/salon-spa.jpg";
import salonNails from "@/assets/salon-nails.jpg";

// Per-service hero imagery — one unique image per service
import svcHaircut from "@/assets/svc-haircut.jpg";
import svcHairColor from "@/assets/svc-hair-color.jpg";
import svcKeratin from "@/assets/svc-keratin.jpg";
import svcLuxuryFacial from "@/assets/svc-luxury-facial.jpg";
import svcGlowFacial from "@/assets/svc-glow-facial.jpg";
import svcAntiAging from "@/assets/svc-anti-aging.jpg";
import svcMassage from "@/assets/svc-massage.jpg";
import svcAromatherapy from "@/assets/svc-aromatherapy.jpg";
import svcBodyTherapy from "@/assets/svc-body-therapy.jpg";
import svcBridalMakeup from "@/assets/svc-bridal-makeup.jpg";
import svcPartyMakeup from "@/assets/svc-party-makeup.jpg";
import svcHdMakeup from "@/assets/svc-hd-makeup.jpg";
import svcNailArt from "@/assets/svc-nail-art.jpg";
import svcManicure from "@/assets/svc-manicure.jpg";
import svcPedicure from "@/assets/svc-pedicure.jpg";

export type Service = {
  name: string;
  price: number;
  duration: number; // minutes
  category: "Hair" | "Makeup" | "Spa" | "Skin" | "Nails" | "Bridal";
};

export type Stylist = {
  name: string;
  role: string;
  experience: string;
};

export type Review = {
  name: string;
  rating: number;
  text: string;
  date: string;
};

export type Salon = {
  id: string;
  name: string;
  img: string;
  gallery: string[];
  area: string;
  address: string;
  rating: number;
  reviews: number;
  priceLevel: "₹₹" | "₹₹₹" | "₹₹₹₹";
  tags: string[];
  badge: "Verified" | "Premium" | "Trending";
  about: string;
  hours: string;
  services: Service[];
  stylists: Stylist[];
  reviewList: Review[];
};

export const salons: Salon[] = [
  {
    id: "maison-lumiere",
    name: "Maison Lumière",
    img: salonHair,
    gallery: [salonHair, heroSalon, salonSpa],
    area: "Brodipet",
    address: "Road No. 12, Brodipet, Hyderabad 500034",
    rating: 4.9,
    reviews: 1284,
    priceLevel: "₹₹₹",
    tags: ["Hair", "Color", "Keratin"],
    badge: "Verified",
    about:
      "A serene, atelier-style salon in Brodipet known for precision cuts, balayage, and Olaplex treatments. Our master stylists have trained in Paris and London.",
    hours: "Mon–Sun · 10:00 AM – 9:00 PM",
    services: [
      { name: "Signature Haircut", price: 1800, duration: 60, category: "Hair" },
      { name: "Global Hair Color", price: 4500, duration: 120, category: "Hair" },
      { name: "Balayage", price: 8500, duration: 180, category: "Hair" },
      { name: "Keratin Treatment", price: 6500, duration: 150, category: "Hair" },
      { name: "Hair Spa Ritual", price: 2200, duration: 75, category: "Hair" },
    ],
    stylists: [
      { name: "Anaya Kapoor", role: "Master Stylist", experience: "12 yrs" },
      { name: "Rohan Iyer", role: "Color Specialist", experience: "8 yrs" },
      { name: "Meera Joshi", role: "Senior Stylist", experience: "6 yrs" },
    ],
    reviewList: [
      { name: "Sneha R.", rating: 5, text: "The best balayage I've had in Hyderabad. Anaya is a magician.", date: "2 weeks ago" },
      { name: "Priya M.", rating: 5, text: "Calm space, attentive team, great results.", date: "1 month ago" },
    ],
  },
  {
    id: "velvet-bridal",
    name: "Velvet Bridal Studio",
    img: salonBridal,
    gallery: [salonBridal, heroSalon, salonNails],
    area: "Arundelpet",
    address: "Road No. 36, Arundelpet, Hyderabad 500033",
    rating: 4.95,
    reviews: 842,
    priceLevel: "₹₹₹₹",
    tags: ["Bridal", "HD Makeup", "Hair"],
    badge: "Premium",
    about:
      "Hyderabad's most sought-after bridal studio. Specialising in airbrush, HD, and traditional South Indian bridal looks with bespoke trials.",
    hours: "Tue–Sun · 9:00 AM – 8:00 PM",
    services: [
      { name: "Bridal HD Makeup", price: 25000, duration: 180, category: "Bridal" },
      { name: "Engagement Makeup", price: 12000, duration: 120, category: "Makeup" },
      { name: "Pre-Bridal Package", price: 18000, duration: 240, category: "Bridal" },
      { name: "Reception Look", price: 15000, duration: 150, category: "Bridal" },
      { name: "Party Makeup", price: 6500, duration: 90, category: "Makeup" },
    ],
    stylists: [
      { name: "Tara Sanghvi", role: "Lead Bridal Artist", experience: "15 yrs" },
      { name: "Zoya Khan", role: "HD Makeup Artist", experience: "9 yrs" },
    ],
    reviewList: [
      { name: "Aisha R.", rating: 5, text: "Tara made my wedding day unforgettable.", date: "3 weeks ago" },
      { name: "Divya P.", rating: 5, text: "Worth every rupee. Absolutely flawless.", date: "2 months ago" },
    ],
  },
  {
    id: "aurum-spa",
    name: "Aurum Spa & Wellness",
    img: salonSpa,
    gallery: [salonSpa, heroSalon, salonHair],
    area: "Lakshmipuram",
    address: "DLF Cyber City, Lakshmipuram, Hyderabad 500032",
    rating: 4.8,
    reviews: 612,
    priceLevel: "₹₹₹",
    tags: ["Spa", "Massage", "Facial"],
    badge: "Verified",
    about:
      "An award-winning urban wellness retreat with Balinese-trained therapists, hammam rituals, and signature facials using organic Indian botanicals.",
    hours: "Mon–Sun · 9:00 AM – 10:00 PM",
    services: [
      { name: "Deep Tissue Massage (60m)", price: 3200, duration: 60, category: "Spa" },
      { name: "Aroma Therapy (90m)", price: 4200, duration: 90, category: "Spa" },
      { name: "Signature Glow Facial", price: 3500, duration: 75, category: "Skin" },
      { name: "Hydra-Brightening Facial", price: 4800, duration: 90, category: "Skin" },
      { name: "Couples Spa Ritual", price: 8500, duration: 120, category: "Spa" },
    ],
    stylists: [
      { name: "Lakshmi Devi", role: "Senior Therapist", experience: "10 yrs" },
      { name: "Arjun Nair", role: "Wellness Lead", experience: "7 yrs" },
    ],
    reviewList: [
      { name: "Karthik R.", rating: 5, text: "Pure tranquility. Best massage in the city.", date: "1 week ago" },
      { name: "Neha S.", rating: 5, text: "The hydra facial transformed my skin.", date: "1 month ago" },
    ],
  },
  {
    id: "nail-atelier",
    name: "The Nail Atelier",
    img: salonNails,
    gallery: [salonNails, heroSalon, salonBridal],
    area: "Amaravathi Road",
    address: "Inorbit Mall, Amaravathi Road, Hyderabad 500081",
    rating: 4.85,
    reviews: 428,
    priceLevel: "₹₹",
    tags: ["Nails", "Mani", "Pedi"],
    badge: "Trending",
    about:
      "Hyderabad's premier nail studio with OPI, Essie, and gel-extension specialists. Hygienic, fully-sanitised tools, and Instagram-worthy nail art.",
    hours: "Mon–Sun · 11:00 AM – 9:00 PM",
    services: [
      { name: "Classic Manicure", price: 800, duration: 45, category: "Nails" },
      { name: "Gel Polish Mani", price: 1500, duration: 60, category: "Nails" },
      { name: "Spa Pedicure", price: 1200, duration: 60, category: "Nails" },
      { name: "Gel Extensions", price: 3200, duration: 120, category: "Nails" },
      { name: "Nail Art (per nail)", price: 250, duration: 15, category: "Nails" },
    ],
    stylists: [
      { name: "Riya Sharma", role: "Lead Nail Artist", experience: "6 yrs" },
      { name: "Pooja Verma", role: "Gel Specialist", experience: "4 yrs" },
    ],
    reviewList: [
      { name: "Aanya K.", rating: 5, text: "Stunning gel extensions, lasted 4 weeks!", date: "2 weeks ago" },
    ],
  },
  {
    id: "ivory-skin",
    name: "Ivory Skin Clinic",
    img: salonSpa,
    gallery: [salonSpa, salonBridal],
    area: "Pattabhipuram",
    address: "Botanical Garden Road, Pattabhipuram, Hyderabad 500084",
    rating: 4.7,
    reviews: 356,
    priceLevel: "₹₹₹",
    tags: ["Skin", "Facial", "Peel"],
    badge: "Verified",
    about: "Dermatologist-led skin clinic offering medi-facials, chemical peels, and result-driven skincare protocols.",
    hours: "Mon–Sat · 10:00 AM – 8:00 PM",
    services: [
      { name: "Medi Facial", price: 3800, duration: 75, category: "Skin" },
      { name: "Chemical Peel", price: 4500, duration: 45, category: "Skin" },
      { name: "Acne Treatment", price: 2800, duration: 60, category: "Skin" },
      { name: "Brow Shape & Tint", price: 900, duration: 30, category: "Skin" },
    ],
    stylists: [
      { name: "Dr. Ananya Rao", role: "Dermatologist", experience: "14 yrs" },
      { name: "Sneha Patil", role: "Skin Therapist", experience: "7 yrs" },
    ],
    reviewList: [
      { name: "Ritu S.", rating: 5, text: "My acne is finally under control.", date: "3 weeks ago" },
    ],
  },
  {
    id: "rouge-makeup",
    name: "Rouge Makeup Loft",
    img: salonBridal,
    gallery: [salonBridal, salonHair],
    area: "Mangalagiri",
    address: "Image Gardens Road, Mangalagiri, Hyderabad 500081",
    rating: 4.82,
    reviews: 521,
    priceLevel: "₹₹₹",
    tags: ["Makeup", "Hair Style", "Party"],
    badge: "Trending",
    about: "Party makeup, editorial looks, and event-ready hair styling by celebrity-trained artists.",
    hours: "Mon–Sun · 10:00 AM – 9:00 PM",
    services: [
      { name: "Party Makeup", price: 5500, duration: 75, category: "Makeup" },
      { name: "Airbrush Makeup", price: 8500, duration: 90, category: "Makeup" },
      { name: "Hair Styling", price: 2200, duration: 45, category: "Hair" },
      { name: "Saree Draping", price: 1500, duration: 30, category: "Makeup" },
    ],
    stylists: [
      { name: "Kavya Reddy", role: "Lead MUA", experience: "9 yrs" },
      { name: "Isha Mehta", role: "Hair Stylist", experience: "5 yrs" },
    ],
    reviewList: [
      { name: "Tanya M.", rating: 5, text: "Loved the airbrush finish for my engagement.", date: "1 month ago" },
    ],
  },
];

export function getSalon(id: string): Salon | undefined {
  return salons.find((s) => s.id === id);
}

export const categories = [
  { slug: "hair", label: "Hair", count: "320+ salons" },
  { slug: "makeup", label: "Makeup", count: "180+ artists" },
  { slug: "spa", label: "Spa", count: "140+ studios" },
  { slug: "skin", label: "Skin", count: "210+ experts" },
  { slug: "nails", label: "Nails", count: "160+ studios" },
  { slug: "bridal", label: "Bridal", count: "95+ artists" },
];

// Curated marketplace catalog — drives the Services page.
// Each entry links to a real salon so "Book Now" routes correctly.
export type CatalogItem = {
  slug: string;
  name: string;
  category: "Hair" | "Skin" | "Makeup" | "Nails" | "Spa" | "Bridal";
  description: string;
  longDescription: string;
  benefits: string[];
  duration: number;
  price: number;
  rating: number;
  reviews: number;
  img: string;
  salonId: string;
};

export const catalog: CatalogItem[] = [
  // ───────── HAIR ─────────
  {
    slug: "signature-hair-cut",
    name: "Signature Hair Cut",
    category: "Hair",
    description: "Precision cut tailored to your face shape by senior stylists.",
    longDescription: "A consultation-led precision haircut shaped to your face, lifestyle and hair texture. Includes a relaxing wash, blow-dry and styling finish.",
    benefits: ["Personalised face-shape consultation", "Wash, blow-dry & finish included", "Senior stylists with 6+ yrs experience", "Premium product line"],
    duration: 45, price: 499, rating: 4.9, reviews: 1280,
    img: svcHaircut, salonId: "maison-lumiere",
  },
  {
    slug: "hair-coloring",
    name: "Hair Coloring",
    category: "Hair",
    description: "Global color, highlights & balayage with premium ammonia-free brands.",
    longDescription: "From subtle highlights to bold balayage transformations using L'Oréal & Wella ammonia-free color systems for vibrant, long-lasting shine.",
    benefits: ["Ammonia-free premium color", "Free patch test included", "Strand-by-strand customisation", "Aftercare kit recommendation"],
    duration: 120, price: 1499, rating: 4.9, reviews: 940,
    img: svcHairColor, salonId: "maison-lumiere",
  },
  {
    slug: "keratin-treatment",
    name: "Keratin Treatment",
    category: "Hair",
    description: "Frizz-free, glossy hair for up to 6 months with salon-grade keratin.",
    longDescription: "Smooth, shiny, manageable hair for up to 6 months. Cysteine + keratin protein therapy seals the cuticle for mirror-finish gloss.",
    benefits: ["Lasts 4–6 months", "Cuts blow-dry time in half", "Frizz & humidity proof", "Damage-repair complex included"],
    duration: 180, price: 2499, rating: 4.9, reviews: 612,
    img: svcKeratin, salonId: "maison-lumiere",
  },

  // ───────── SKIN ─────────
  {
    slug: "luxury-facial",
    name: "Luxury Facial",
    category: "Skin",
    description: "Signature multi-step facial with serums, mask and lymphatic massage.",
    longDescription: "Seven-step ritual with deep cleanse, exfoliation, serum infusion, sheet mask and lymphatic drainage massage for radiant, plumped skin.",
    benefits: ["7-step signature ritual", "Lymphatic drainage massage", "Vitamin-C brightening serum", "Visible glow from first session"],
    duration: 60, price: 1199, rating: 4.9, reviews: 820,
    img: svcLuxuryFacial, salonId: "aurum-spa",
  },
  {
    slug: "glow-facial",
    name: "Glow Facial",
    category: "Skin",
    description: "Hydra-brightening facial for an instant radiant finish.",
    longDescription: "A quick-fix hydra-brightening facial perfect before an event. Niacinamide + hyaluronic serum delivers instant dewy glow.",
    benefits: ["Instant pre-event glow", "Deep hydration boost", "Niacinamide for even tone", "Zero downtime"],
    duration: 45, price: 999, rating: 4.85, reviews: 540,
    img: svcGlowFacial, salonId: "aurum-spa",
  },
  {
    slug: "anti-aging-facial",
    name: "Anti Aging Facial",
    category: "Skin",
    description: "Collagen-boost facial targeting fine lines and firmness.",
    longDescription: "Collagen-stimulating facial combining peptide serums, gold-mask infusion and facial sculpting massage to firm and lift mature skin.",
    benefits: ["Peptide & retinol-safe blend", "24K gold mask infusion", "Firming face-sculpt massage", "Reduces fine lines visibly"],
    duration: 90, price: 1999, rating: 4.88, reviews: 410,
    img: svcAntiAging, salonId: "ivory-skin",
  },

  // ───────── SPA ─────────
  {
    slug: "relaxation-massage",
    name: "Relaxation Massage",
    category: "Spa",
    description: "Full-body Swedish massage to unwind and de-stress.",
    longDescription: "Long, flowing Swedish strokes ease muscle tension, improve circulation and induce deep relaxation. Warm towel finish.",
    benefits: ["Certified Swedish technique", "Stress & cortisol reduction", "Improves blood circulation", "Warm towel ritual finish"],
    duration: 60, price: 1499, rating: 4.9, reviews: 720,
    img: svcMassage, salonId: "aurum-spa",
  },
  {
    slug: "aromatherapy",
    name: "Aromatherapy",
    category: "Spa",
    description: "Essential-oil therapy with candles and zen ambience.",
    longDescription: "Personalised essential-oil blend (lavender, ylang-ylang, eucalyptus) paired with rhythmic massage in a candle-lit room for full sensory escape.",
    benefits: ["Custom essential-oil blend", "Calms nervous system", "Improves sleep quality", "Candle-lit zen ambience"],
    duration: 90, price: 1999, rating: 4.92, reviews: 560,
    img: svcAromatherapy, salonId: "aurum-spa",
  },
  {
    slug: "body-therapy",
    name: "Body Therapy",
    category: "Spa",
    description: "Hot stone + herbal pouch wellness ritual.",
    longDescription: "Two-hour signature wellness ritual combining heated basalt stones, herbal poultice and deep-tissue work to release chronic tension.",
    benefits: ["Heated basalt-stone therapy", "Herbal poultice infusion", "Targets chronic tension", "Includes herbal tea finish"],
    duration: 120, price: 2499, rating: 4.9, reviews: 380,
    img: svcBodyTherapy, salonId: "aurum-spa",
  },

  // ───────── MAKEUP ─────────
  {
    slug: "bridal-makeup",
    name: "Bridal Makeup",
    category: "Bridal",
    description: "Airbrush bridal look with trial, draping and hair styling included.",
    longDescription: "Full bridal package: pre-wedding trial, airbrush HD base, eye look, lashes, hair styling and saree/lehenga draping. Long-wear formula tested for 12+ hours.",
    benefits: ["Pre-wedding trial included", "Airbrush HD long-wear base", "Hair styling + draping", "On-location available"],
    duration: 180, price: 8999, rating: 4.95, reviews: 480,
    img: svcBridalMakeup, salonId: "velvet-bridal",
  },
  {
    slug: "party-makeup",
    name: "Party Makeup",
    category: "Makeup",
    description: "Event-ready glam — soft, bold or editorial finish.",
    longDescription: "Event glam in 75 minutes — choose between soft glam, smokey eye or editorial. Lashes, contour and setting spray included.",
    benefits: ["Choose your glam style", "Lashes & contour included", "16hr setting spray finish", "Express 75-min session"],
    duration: 75, price: 2999, rating: 4.85, reviews: 620,
    img: svcPartyMakeup, salonId: "rouge-makeup",
  },
  {
    slug: "hd-makeup",
    name: "HD Makeup",
    category: "Makeup",
    description: "High-definition flawless base that photographs beautifully.",
    longDescription: "Pixel-perfect high-definition makeup using micro-particle foundation that reads flawlessly on 4K cameras — ideal for shoots and receptions.",
    benefits: ["4K-camera ready finish", "Micro-particle HD base", "Customisable eye look", "Touch-up kit included"],
    duration: 90, price: 4999, rating: 4.9, reviews: 390,
    img: svcHdMakeup, salonId: "velvet-bridal",
  },

  // ───────── NAILS ─────────
  {
    slug: "nail-art",
    name: "Nail Art",
    category: "Nails",
    description: "Custom hand-painted nail art with premium gel finish.",
    longDescription: "Hand-painted nail art with OPI / Essie gel polish. Choose from 200+ designs or co-create your own. Lasts 3+ weeks chip-free.",
    benefits: ["200+ design library", "OPI & Essie gel polish", "Chip-free for 3+ weeks", "UV-cured glossy finish"],
    duration: 60, price: 599, rating: 4.85, reviews: 540,
    img: svcNailArt, salonId: "nail-atelier",
  },
  {
    slug: "manicure",
    name: "Manicure",
    category: "Nails",
    description: "Classic mani — shape, cuticle care, polish and hand massage.",
    longDescription: "Salon-grade manicure with nail shaping, cuticle care, exfoliating scrub, hand massage and polish of your choice.",
    benefits: ["Hygienic single-use tools", "Exfoliating hand scrub", "Hot-towel hand massage", "Wide polish selection"],
    duration: 45, price: 799, rating: 4.8, reviews: 460,
    img: svcManicure, salonId: "nail-atelier",
  },
  {
    slug: "pedicure",
    name: "Pedicure",
    category: "Nails",
    description: "Spa pedicure with exfoliation, mask and relaxing foot massage.",
    longDescription: "Indulgent spa pedicure: warm soak with rose petals, callus removal, foot mask, calf massage and polish finish.",
    benefits: ["Rose-petal warm soak", "Callus removal & foot mask", "Relaxing calf massage", "Long-wear polish finish"],
    duration: 60, price: 899, rating: 4.85, reviews: 510,
    img: svcPedicure, salonId: "nail-atelier",
  },
];

export function getCatalogItem(slug: string): CatalogItem | undefined {
  return catalog.find((c) => c.slug === slug);
}


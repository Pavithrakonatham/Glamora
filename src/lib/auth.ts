// Lightweight client-side demo auth + bookings store (localStorage)
export type Booking = {
  id: string;
  salonId: string;
  salonName: string;
  salonImg: string;
  service: string;
  price: number;
  stylist: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
};

const USER_KEY = "glownest_user";
const BOOKINGS_KEY = "glownest_bookings";
const SAVED_KEY = "glownest_saved";

export function getUser(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_KEY);
}
export function setUser(email: string) {
  localStorage.setItem(USER_KEY, email);
}
export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  } catch {
    return [];
  }
}
export function addBooking(b: Booking) {
  const all = getBookings();
  all.unshift(b);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
}
export function getBooking(id: string): Booking | undefined {
  return getBookings().find((b) => b.id === id);
}

export function getSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  } catch {
    return [];
  }
}
export function toggleSaved(salonId: string) {
  const saved = getSaved();
  const idx = saved.indexOf(salonId);
  if (idx >= 0) saved.splice(idx, 1);
  else saved.push(salonId);
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  return saved;
}

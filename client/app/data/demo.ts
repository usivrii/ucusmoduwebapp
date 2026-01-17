"use client";

/**
 * Uçuş Modu UI Kit + Sayfalar (React + Tailwind v4)
 *
 * Bu dosya sadece DEMO verisi ve paylaşılan tipleri içerir.
 * Gerçek projede API veya state katmanınızdan besleyin.
 */

export type Event = {
  id: string;
  title: string;
  city: string;
  venue: string;
  address:string;
  dateISO: string; // YYYY-MM-DD
  time: string;
  genre: "Music" | "Workshop" | "Party" | "Networking";
  priceFromEUR: number;
  status: "OnSale" | "FewLeft" | "SoldOut";
  stockLeft?: number;
  imageUrl: string;
  mapUrl: string;
  organizer: {
    name: string;
    description: string;
    trustNote: string;
  };
  isPopular?: boolean;
};

export type Ticket = {
  id: string;
  eventId: string;
  type: "Early" | "Regular" | "VIP";
  qty: number;
  purchaserEmail: string;
  purchasedAtISO: string;
  qrToken: string;
  state: "Upcoming" | "Used" | "Refunded";
};

export type Order = {
  id: string;
  purchasedAtISO: string;
  totalEUR: number;
  status: "Paid" | "Refunded" | "Pending";
  ticketIds: string[];
};

export type User = {
  handle: string;
  name: string;
  email: string;
  city?: string;
};

export const DEMO_EVENTS: Event[] = [
  {
    id: "ev-berlin-001",
    title: "Uçuş Modu Nights – Berlin",
    city: "Berlin",
    venue: "Astra Kulturhaus",
    address: "Revaler Str. 99, 10245 Berlin",
    dateISO: "2026-02-21",
    time: "21:00",
    genre: "Party",
    priceFromEUR: 19,
    status: "OnSale",
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop",
    mapUrl: "https://www.google.com/maps?q=Astra+Kulturhaus+Berlin&output=embed",
    organizer: {
      name: "Uçuş Modu Events",
      description:
        "Berlin’de gençlik etkinlikleri ve after-party organizasyonlarında uzman ekip.",
      trustNote: "10+ başarılı organizasyon • 4.8/5 katılımcı memnuniyeti",
    },
    isPopular: true,
  },
  {
    id: "ev-hamburg-002",
    title: "Gençlik Konseri: Indie Wave",
    city: "Hamburg",
    venue: "Docks",
    address: "Spielbudenpl. 19, 20359 Hamburg",
    dateISO: "2026-03-06",
    time: "20:00",
    genre: "Music",
    priceFromEUR: 29,
    status: "FewLeft",
    stockLeft: 5,
    imageUrl: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop",
    mapUrl: "https://www.google.com/maps?q=Docks+Hamburg&output=embed",
    organizer: {
      name: "Indie Wave Collective",
      description: "Hamburg’un yükselen indie sahnesini bir araya getirir.",
      trustNote: "Biletler resmi kanal üzerinden güvenli satılır.",
    },
    isPopular: true,
  },
  {
    id: "ev-koln-003",
    title: "Rhein Beats Festival",
    city: "Köln",
    venue: "Tanzbrunnen",
    address: "Rheinparkweg 1, 50679 Köln",
    dateISO: "2026-05-10",
    time: "14:00",
    genre: "Networking",
    priceFromEUR: 49,
    status: "OnSale",
    imageUrl: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=1200&auto=format&fit=crop",
    mapUrl: "https://www.google.com/maps?q=Tanzbrunnen+Koln&output=embed",
    organizer: {
      name: "Rhein Beats",
      description:
        "Müzik, kültür ve networking buluşmalarını bir araya getiren festival ekibi.",
      trustNote: "Yerel partnerlerle resmi etkinlik lisansı.",
    },
    isPopular: true,
  },
  {
    id: "ev-munich-004",
    title: "Stand-up Night: Yeni Nesil",
    city: "München",
    venue: "Backstage",
    address: "Reitknechtstraße 6, 80639 München",
    dateISO: "2026-01-30",
    time: "19:30",
    genre: "Workshop",
    priceFromEUR: 24,
    status: "SoldOut",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
    mapUrl: "https://www.google.com/maps?q=Backstage+Munich&output=embed",
    organizer: {
      name: "München Creator Hub",
      description:
        "Komedi ve sahne performanslarına yeni isimler kazandıran yerel platform.",
      trustNote: "Bilet iadeleri 24 saat içinde güvenle işlenir.",
    },
  },
];

export const DEMO_USER: User = {
  handle: "genc",
  name: "Genç Üye",
  email: "genc@ornek.com",
  city: "Berlin",
};

export const DEMO_TICKETS: Ticket[] = [
  {
    id: "tkt-1001",
    eventId: "ev-berlin-001",
    type: "Regular",
    qty: 2,
    purchaserEmail: "genc@ornek.com",
    purchasedAtISO: "2026-01-10T12:05:00Z",
    qrToken: "UM-QR-9F2A-1001",
    state: "Upcoming",
  },
  {
    id: "tkt-1002",
    eventId: "ev-hamburg-002",
    type: "Early",
    qty: 1,
    purchaserEmail: "genc@ornek.com",
    purchasedAtISO: "2025-12-22T18:20:00Z",
    qrToken: "UM-QR-2C11-1002",
    state: "Upcoming",
  },
  {
    id: "tkt-0999",
    eventId: "ev-munich-004",
    type: "Regular",
    qty: 1,
    purchaserEmail: "genc@ornek.com",
    purchasedAtISO: "2025-11-01T11:00:00Z",
    qrToken: "UM-QR-77BA-0999",
    state: "Refunded",
  },
];

export const DEMO_ORDERS: Order[] = [
  {
    id: "ord-7001",
    purchasedAtISO: "2026-01-10T12:05:00Z",
    totalEUR: 38,
    status: "Paid",
    ticketIds: ["tkt-1001"],
  },
  {
    id: "ord-7000",
    purchasedAtISO: "2025-12-22T18:20:00Z",
    totalEUR: 29,
    status: "Paid",
    ticketIds: ["tkt-1002"],
  },
  {
    id: "ord-6991",
    purchasedAtISO: "2025-11-01T11:00:00Z",
    totalEUR: 24,
    status: "Refunded",
    ticketIds: ["tkt-0999"],
  },
];

export function formatDateTR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function formatDateTimeShort(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yy = d.getUTCFullYear();
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${yy} ${hh}:${mi}`;
}

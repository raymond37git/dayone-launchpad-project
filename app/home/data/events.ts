import { TAG_STYLES } from "@/app/lib/tags";

function t(...labels: string[]) {
  return labels.map((label) => ({ label, ...TAG_STYLES[label] }));
}

export type Organizer = {
  name: string;
  initials: string;
  color: string;
};

export type Tag = {
  label: string;
  bg: string;
  text: string;
};

export type Event = {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  lat?: number;
  lng?: number;
  isVirtual?: boolean;
  organizers: Organizer[];
  status?: "Sold Out" | "Waitlist";
  attendeeCount?: number;
  price?: string;
  category?: string;
  tags: Tag[];
  gradient: string;
  image?: string;
};

export const EVENTS: Event[] = [
  {
    id: "evt-1",
    title: "Day One × Founders Coffee Morning",
    dateTime: "2026-06-28T09:00:00",
    location: "Level 1, 1 Martin Place, Sydney NSW 2000",
    lat: -33.8678, lng: 151.2082,
    organizers: [
      { name: "Jordan Shen", initials: "JS", color: "#6366f1" },
      { name: "Constance Tang", initials: "CT", color: "#f59e0b" },
      { name: "Andrew Suryanto", initials: "AS", color: "#10b981" },
    ],
    attendeeCount: 7,
    tags: t("Startups", "Consulting"),
    gradient: "from-violet-400 to-purple-600",
    image: "/startupimage/event-1.png",
  },
  {
    id: "evt-2",
    title: "AI Tools Workshop: Build Faster with Claude & Cursor",
    dateTime: "2026-06-28T14:00:00",
    location: "Google Meet (Virtual)",
    isVirtual: true,
    organizers: [
      { name: "Annie Liao", initials: "AL", color: "#ec4899" },
      { name: "Jeremy Yee", initials: "JY", color: "#3b82f6" },
    ],
    attendeeCount: 5,
    tags: t("AI", "Product"),
    gradient: "from-cyan-400 to-blue-600",
    image: "/startupimage/event-2.png",
  },
  {
    id: "evt-3",
    title: "Build Week Kickoff — Networking Night",
    dateTime: "2026-06-29T18:00:00",
    location: "Level 3, 55 Clarence Street, Sydney NSW 2000",
    lat: -33.8672, lng: 151.2055,
    organizers: [
      { name: "Saurabh Kaura", initials: "SK", color: "#f97316" },
      { name: "Regina Lin", initials: "RL", color: "#14b8a6" },
      { name: "Arafat Tehsin", initials: "AT", color: "#8b5cf6" },
    ],
    attendeeCount: 9,
    tags: t("Startups", "Design"),
    gradient: "from-amber-400 to-orange-500",
    image: "/startupimage/event-3.png",
  },
  {
    id: "evt-4",
    title: "No-Code Startup Sprint: 48hr Product Challenge",
    dateTime: "2026-07-01T10:00:00",
    location: "Level 2, 11 York Street, Sydney NSW 2000",
    lat: -33.8688, lng: 151.2047,
    organizers: [
      { name: "Kevin Zhu", initials: "KZ", color: "#0ea5e9" },
      { name: "Talin Roche", initials: "TR", color: "#d946ef" },
    ],
    status: "Waitlist",
    attendeeCount: 4,
    tags: t("Product", "Startups"),
    gradient: "from-rose-400 to-pink-600",
    image: "/startupimage/event-4.png",
  },
  {
    id: "evt-5",
    title: "Founder Demo Night — June Edition",
    dateTime: "2026-07-02T18:30:00",
    location: "10 Shelley Street, Sydney NSW 2000",
    lat: -33.8657, lng: 151.2030,
    organizers: [
      { name: "Amber Main", initials: "AM", color: "#f59e0b" },
      { name: "Neha Panwar", initials: "NP", color: "#10b981" },
      { name: "Jordan Shen", initials: "JS", color: "#6366f1" },
    ],
    attendeeCount: 6,
    tags: t("Startups", "Product"),
    gradient: "from-emerald-400 to-teal-600",
    image: "/startupimage/event-5.png",
  },
  {
    id: "evt-6",
    title: "Web3 & AI: The Convergence [Online]",
    dateTime: "2026-07-03T12:00:00",
    location: "Google Meet (Virtual)",
    isVirtual: true,
    organizers: [
      { name: "Eugene Tan", initials: "ET", color: "#3b82f6" },
      { name: "Johan Nguyen", initials: "JN", color: "#ef4444" },
    ],
    attendeeCount: 8,
    tags: t("AI", "Finance"),
    gradient: "from-sky-400 to-indigo-600",
    image: "/startupimage/event-6.png",
  },
  {
    id: "evt-7",
    title: "Day One × YC Alumni Mixer — Sydney",
    dateTime: "2026-07-05T17:00:00",
    location: "Kensington Street, Chippendale NSW 2008",
    lat: -33.8853, lng: 151.2003,
    organizers: [
      { name: "Andrew Suryanto", initials: "AS", color: "#10b981" },
      { name: "Edouard Hakim", initials: "EH", color: "#8b5cf6" },
      { name: "Constance Tang", initials: "CT", color: "#f59e0b" },
    ],
    price: "A$25",
    tags: t("Startups", "Finance"),
    gradient: "from-fuchsia-400 to-purple-600",
    image: "/startupimage/event-7.png",
  },
  {
    id: "evt-8",
    title: "Agentic AI Hackathon 2026 — Sydney",
    dateTime: "2026-07-08T09:00:00",
    location: "341 George Street, Sydney NSW 2000",
    lat: -33.8694, lng: 151.2069,
    organizers: [
      { name: "Annie Liao", initials: "AL", color: "#ec4899" },
      { name: "Kevin Zhu", initials: "KZ", color: "#0ea5e9" },
      { name: "Saurabh Kaura", initials: "SK", color: "#f97316" },
    ],
    status: "Sold Out",
    attendeeCount: 3,
    tags: t("AI", "Cybersecurity"),
    gradient: "from-red-400 to-rose-600",
    image: "/startupimage/event-8.png",
  },
  {
    id: "evt-9",
    title: "Product Growth Masterclass: From 0 to 10K Users",
    dateTime: "2026-07-10T10:00:00",
    location: "Google Meet (Virtual)",
    isVirtual: true,
    organizers: [
      { name: "Himanshu Jain", initials: "HJ", color: "#22c55e" },
      { name: "Syed Fahad", initials: "SF", color: "#a855f7" },
    ],
    attendeeCount: 5,
    price: "A$15",
    tags: t("Product", "Marketing"),
    gradient: "from-lime-400 to-green-600",
    image: "/startupimage/event-9.png",
  },
  {
    id: "evt-10",
    title: "Day One Annual Summit 2026 — The Future of Building",
    dateTime: "2026-07-15T09:00:00",
    location: "14 Darling Drive, Sydney NSW 2000",
    lat: -33.8753, lng: 151.1997,
    organizers: [
      { name: "Annie Liao", initials: "AL", color: "#ec4899" },
      { name: "Jordan Shen", initials: "JS", color: "#6366f1" },
      { name: "Amber Main", initials: "AM", color: "#f59e0b" },
      { name: "Andrew Suryanto", initials: "AS", color: "#10b981" },
    ],
    price: "A$75",
    attendeeCount: 9,
    category: "Conference",
    tags: t("Startups", "Consulting"),
    gradient: "from-yellow-400 to-amber-500",
    image: "/startupimage/event-10.png",
  },
  {
    id: "evt-11",
    title: "Founder Fireside: Building in Public with AI",
    dateTime: "2026-07-18T18:00:00",
    location: "Hickson Road, Barangaroo NSW 2000",
    lat: -33.8609, lng: 151.2019,
    organizers: [
      { name: "Neha Panwar", initials: "NP", color: "#10b981" },
      { name: "Regina Lin", initials: "RL", color: "#14b8a6" },
    ],
    attendeeCount: 4,
    tags: t("AI", "Startups"),
    gradient: "from-orange-400 to-red-500",
    image: "/startupimage/event-11.png",
  },
  {
    id: "evt-12",
    title: "Secret Tech Garden Party 🍃",
    dateTime: "2026-07-22T15:00:00",
    location: "Location Revealed on RSVP, Sydney NSW",
    organizers: [
      { name: "Amber Main", initials: "AM", color: "#f59e0b" },
    ],
    price: "A$50",
    tags: t("Design", "Marketing"),
    gradient: "from-green-400 to-emerald-600",
    image: "/startupimage/event-12.png",
  },
];

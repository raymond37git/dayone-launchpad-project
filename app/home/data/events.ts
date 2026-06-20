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
  isVirtual?: boolean;
  organizers: Organizer[];
  status?: "Sold Out" | "Waitlist";
  attendeeCount?: number;
  price?: string;
  category?: string;
  tags: Tag[];
  gradient: string;
};

export const EVENTS: Event[] = [
  {
    id: "evt-1",
    title: "Day One × Founders Coffee Morning",
    dateTime: "2026-06-20T09:00:00",
    location: "Spaces Martin Place, Sydney NSW",
    organizers: [
      { name: "Jordan Shen", initials: "JS", color: "#6366f1" },
      { name: "Constance Tang", initials: "CT", color: "#f59e0b" },
      { name: "Andrew Suryanto", initials: "AS", color: "#10b981" },
    ],
    attendeeCount: 45,
    tags: [
      { label: "Sydney", bg: "#dbeafe", text: "#1d4ed8" },
      { label: "Networking", bg: "#f3e8ff", text: "#7e22ce" },
    ],
    gradient: "from-violet-400 to-purple-600",
  },
  {
    id: "evt-2",
    title: "AI Tools Workshop: Build Faster with Claude & Cursor",
    dateTime: "2026-06-20T14:00:00",
    location: "Google Meet (Virtual)",
    isVirtual: true,
    organizers: [
      { name: "Annie Liao", initials: "AL", color: "#ec4899" },
      { name: "Jeremy Yee", initials: "JY", color: "#3b82f6" },
    ],
    attendeeCount: 128,
    tags: [
      { label: "Virtual", bg: "#fce7f3", text: "#9d174d" },
      { label: "AI", bg: "#ede9fe", text: "#5b21b6" },
    ],
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    id: "evt-3",
    title: "Build Week Kickoff — Networking Night",
    dateTime: "2026-06-21T18:00:00",
    location: "Tank Stream Labs, Sydney NSW",
    organizers: [
      { name: "Saurabh Kaura", initials: "SK", color: "#f97316" },
      { name: "Regina Lin", initials: "RL", color: "#14b8a6" },
      { name: "Arafat Tehsin", initials: "AT", color: "#8b5cf6" },
    ],
    attendeeCount: 67,
    tags: [
      { label: "Sydney", bg: "#dbeafe", text: "#1d4ed8" },
      { label: "Networking", bg: "#f3e8ff", text: "#7e22ce" },
    ],
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "evt-4",
    title: "No-Code Startup Sprint: 48hr Product Challenge",
    dateTime: "2026-06-23T10:00:00",
    location: "Fishburners, Sydney NSW",
    organizers: [
      { name: "Kevin Zhu", initials: "KZ", color: "#0ea5e9" },
      { name: "Talin Roche", initials: "TR", color: "#d946ef" },
    ],
    status: "Waitlist",
    attendeeCount: 31,
    tags: [
      { label: "Sydney", bg: "#dbeafe", text: "#1d4ed8" },
      { label: "Hackathon", bg: "#ffedd5", text: "#9a3412" },
    ],
    gradient: "from-rose-400 to-pink-600",
  },
  {
    id: "evt-5",
    title: "Founder Demo Night — June Edition",
    dateTime: "2026-06-25T18:30:00",
    location: "Wynyard, Sydney NSW",
    organizers: [
      { name: "Amber Main", initials: "AM", color: "#f59e0b" },
      { name: "Neha Panwar", initials: "NP", color: "#10b981" },
      { name: "Jordan Shen", initials: "JS", color: "#6366f1" },
    ],
    attendeeCount: 89,
    tags: [
      { label: "Sydney", bg: "#dbeafe", text: "#1d4ed8" },
      { label: "Demo", bg: "#dcfce7", text: "#15803d" },
    ],
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "evt-6",
    title: "Web3 & AI: The Convergence [Online]",
    dateTime: "2026-06-26T12:00:00",
    location: "Google Meet (Virtual)",
    isVirtual: true,
    organizers: [
      { name: "Eugene Tan", initials: "ET", color: "#3b82f6" },
      { name: "Johan Nguyen", initials: "JN", color: "#ef4444" },
    ],
    attendeeCount: 214,
    tags: [
      { label: "Virtual", bg: "#fce7f3", text: "#9d174d" },
      { label: "AI", bg: "#ede9fe", text: "#5b21b6" },
    ],
    gradient: "from-sky-400 to-indigo-600",
  },
  {
    id: "evt-7",
    title: "Day One × YC Alumni Mixer — Sydney",
    dateTime: "2026-06-28T17:00:00",
    location: "Spice Alley, Haymarket NSW",
    organizers: [
      { name: "Andrew Suryanto", initials: "AS", color: "#10b981" },
      { name: "Edouard Hakim", initials: "EH", color: "#8b5cf6" },
      { name: "Constance Tang", initials: "CT", color: "#f59e0b" },
    ],
    price: "A$25",
    tags: [
      { label: "Sydney", bg: "#dbeafe", text: "#1d4ed8" },
      { label: "Networking", bg: "#f3e8ff", text: "#7e22ce" },
    ],
    gradient: "from-fuchsia-400 to-purple-600",
  },
  {
    id: "evt-8",
    title: "Agentic AI Hackathon 2026 — Sydney",
    dateTime: "2026-07-02T09:00:00",
    location: "Atlassian HQ, Sydney NSW",
    organizers: [
      { name: "Annie Liao", initials: "AL", color: "#ec4899" },
      { name: "Kevin Zhu", initials: "KZ", color: "#0ea5e9" },
      { name: "Saurabh Kaura", initials: "SK", color: "#f97316" },
    ],
    status: "Sold Out",
    attendeeCount: 300,
    tags: [
      { label: "Sydney", bg: "#dbeafe", text: "#1d4ed8" },
      { label: "Hackathon", bg: "#ffedd5", text: "#9a3412" },
      { label: "AI", bg: "#ede9fe", text: "#5b21b6" },
    ],
    gradient: "from-red-400 to-rose-600",
  },
  {
    id: "evt-9",
    title: "Product Growth Masterclass: From 0 to 10K Users",
    dateTime: "2026-07-05T10:00:00",
    location: "Google Meet (Virtual)",
    isVirtual: true,
    organizers: [
      { name: "Himanshu Jain", initials: "HJ", color: "#22c55e" },
      { name: "Syed Fahad", initials: "SF", color: "#a855f7" },
    ],
    attendeeCount: 156,
    price: "A$15",
    tags: [
      { label: "Virtual", bg: "#fce7f3", text: "#9d174d" },
      { label: "Product", bg: "#dcfce7", text: "#15803d" },
    ],
    gradient: "from-lime-400 to-green-600",
  },
  {
    id: "evt-10",
    title: "Day One Annual Summit 2026 — The Future of Building",
    dateTime: "2026-07-10T09:00:00",
    location: "ICC Sydney, Darling Harbour NSW",
    organizers: [
      { name: "Annie Liao", initials: "AL", color: "#ec4899" },
      { name: "Jordan Shen", initials: "JS", color: "#6366f1" },
      { name: "Amber Main", initials: "AM", color: "#f59e0b" },
      { name: "Andrew Suryanto", initials: "AS", color: "#10b981" },
    ],
    price: "A$75",
    attendeeCount: 1200,
    category: "Conference",
    tags: [
      { label: "Sydney", bg: "#dbeafe", text: "#1d4ed8" },
      { label: "Conference", bg: "#fef9c3", text: "#854d0e" },
    ],
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    id: "evt-11",
    title: "Founder Fireside: Building in Public with AI",
    dateTime: "2026-07-15T18:00:00",
    location: "Millers Point, Sydney NSW",
    organizers: [
      { name: "Neha Panwar", initials: "NP", color: "#10b981" },
      { name: "Regina Lin", initials: "RL", color: "#14b8a6" },
    ],
    attendeeCount: 52,
    tags: [
      { label: "Sydney", bg: "#dbeafe", text: "#1d4ed8" },
      { label: "AI", bg: "#ede9fe", text: "#5b21b6" },
    ],
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "evt-12",
    title: "Secret Tech Garden Party 🍃",
    dateTime: "2026-07-20T15:00:00",
    location: "Melbourne VIC (Location Revealed on RSVP)",
    organizers: [
      { name: "Amber Main", initials: "AM", color: "#f59e0b" },
    ],
    price: "A$50",
    tags: [
      { label: "Melbourne", bg: "#d1fae5", text: "#065f46" },
      { label: "Social", bg: "#fce7f3", text: "#9d174d" },
    ],
    gradient: "from-green-400 to-emerald-600",
  },
];

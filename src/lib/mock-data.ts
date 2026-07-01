// ── Persistent mock data for admin dashboard ──────────────────────────────────
// Mutations are saved to /data/*.json so they survive server restarts.
// Replace Server Action returns with Prisma queries when DB is ready.

import fs from "fs";
import path from "path";
import type {
  AdminMenuItem, Category, AdminOrder, CateringRequest,
  AdminGalleryImage, AdminReview, AdminAnnouncement,
  OpeningHour, RestaurantSettings, DashboardStats,
} from "@/types/admin";

// ── Disk helpers (used only at module-init time) ───────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data");

function readDisk<T>(filename: string, fallback: T): T {
  try {
    const p = path.join(DATA_DIR, filename);
    if (!fs.existsSync(p)) return fallback;
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

// ── Static / non-mutable data ─────────────────────────────────────────────────

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat1", name: "Charcoal Grills", slug: "charcoal-grills", visible: true, displayOrder: 0, _count: { items: 7 } },
  { id: "cat2", name: "Shawarma Wraps", slug: "shawarma-wraps", visible: true, displayOrder: 1, _count: { items: 7 } },
  { id: "cat3", name: "Platters", slug: "platters", visible: true, displayOrder: 2, _count: { items: 5 } },
  { id: "cat4", name: "Sides", slug: "sides", visible: true, displayOrder: 3, _count: { items: 5 } },
  { id: "cat5", name: "Dips & Sauces", slug: "dips-sauces", visible: true, displayOrder: 4, _count: { items: 4 } },
  { id: "cat6", name: "Salads", slug: "salads", visible: true, displayOrder: 5, _count: { items: 3 } },
  { id: "cat7", name: "Kids Meals", slug: "kids-meals", visible: true, displayOrder: 6, _count: { items: 3 } },
  { id: "cat8", name: "Drinks", slug: "drinks", visible: true, displayOrder: 7, _count: { items: 4 } },
  { id: "cat9", name: "Desserts", slug: "desserts", visible: false, displayOrder: 8, _count: { items: 2 } },
  { id: "cat10", name: "Lunch Specials", slug: "lunch-specials", visible: true, displayOrder: 9, _count: { items: 3 } },
];

const DEFAULT_MENU_ITEMS: AdminMenuItem[] = [
  {
    id: "m1", name: "Chicken Shish Kebab", description: "Tender chicken pieces marinated in herbs and grilled over charcoal.", price: "$19.90",
    categoryId: "cat1", category: { id: "cat1", name: "Charcoal Grills" }, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80",
    popular: true, vegetarian: false, spicy: false, charcoalGrilled: true, available: true, archived: false,
    badge: "Best Seller", includes: ["Pita bread", "House salad", "Garlic sauce"], displayOrder: 0,
    extras: [{ id: "e1", name: "Extra Sauce", price: 1.5, maxQty: 3, menuItemId: "m1" }],
    createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "m2", name: "Mixed Grill", description: "A generous selection of our house-marinated meats grilled fresh to order.",
    price: "$28.00", categoryId: "cat1", category: { id: "cat1", name: "Charcoal Grills" },
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    popular: true, vegetarian: false, spicy: false, charcoalGrilled: true, available: true, archived: false,
    badge: "Signature", includes: ["Pita bread", "Salad", "Hummus", "Garlic sauce"], displayOrder: 1,
    extras: [], createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "m3", name: "Chicken Shawarma", description: "Slow-roasted chicken with fresh salad, pickles and garlic sauce wrapped in fresh pita.",
    price: "$14.90", categoryId: "cat2", category: { id: "cat2", name: "Shawarma Wraps" },
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80",
    popular: true, vegetarian: false, spicy: false, charcoalGrilled: false, available: true, archived: false,
    badge: "Bestseller", includes: [], displayOrder: 0,
    extras: [{ id: "e2", name: "Extra Garlic Sauce", price: 1.0, maxQty: 2, menuItemId: "m3" }],
    createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "m4", name: "Falafel Wrap", description: "Crispy falafel, fresh vegetables, tahini and house dressing in warm pita.",
    price: "$13.90", categoryId: "cat2", category: { id: "cat2", name: "Shawarma Wraps" },
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    popular: false, vegetarian: true, spicy: false, charcoalGrilled: false, available: true, archived: false,
    badge: "Veg", includes: [], displayOrder: 1, extras: [],
    createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "m5", name: "Family Platter", description: "Serves 4. Mixed grilled meats, salads, pita, hummus and sauces.",
    price: "$89.00", categoryId: "cat3", category: { id: "cat3", name: "Platters" },
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80",
    popular: true, vegetarian: false, spicy: false, charcoalGrilled: true, available: true, archived: false,
    badge: "Family", includes: ["4x pita", "Hummus", "Garlic sauce", "Mixed salad", "Drinks"], displayOrder: 0,
    extras: [], createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "m6", name: "Lamb Shawarma", description: "Succulent seasoned lamb, slow-cooked to perfection, wrapped in soft bread with tahini, tomato, and onion.",
    price: "$15.90", categoryId: "cat2", category: { id: "cat2", name: "Shawarma Wraps" },
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&q=80",
    popular: true, vegetarian: false, spicy: false, charcoalGrilled: false, available: true, archived: false,
    badge: "Popular", includes: [], displayOrder: 2,
    extras: [], createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "m7", name: "Shish Meal", description: "Our namesake dish — skewered tender cuts of marinated meat grilled over hot charcoal, served with pita and sides.",
    price: "$22.00", categoryId: "cat1", category: { id: "cat1", name: "Charcoal Grills" },
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80",
    popular: true, vegetarian: false, spicy: false, charcoalGrilled: true, available: true, archived: false,
    badge: "Must Try", includes: ["Pita bread", "Side"], displayOrder: 2,
    extras: [], createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "m8", name: "HSP", description: "Halal snack pack — crispy seasoned chips topped with your choice of meat, cheese, and house sauces. A Melbourne favourite.",
    price: "$16.00", categoryId: "cat3", category: { id: "cat3", name: "Platters" },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    popular: true, vegetarian: false, spicy: false, charcoalGrilled: false, available: true, archived: false,
    badge: "Fan Favourite", includes: [], displayOrder: 1,
    extras: [], createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "m9", name: "Wraps", description: "Fresh wraps filled with grilled meats, crisp salad, and our signature sauces — perfect for a quick, satisfying meal.",
    price: "$12.00", categoryId: "cat2", category: { id: "cat2", name: "Shawarma Wraps" },
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
    popular: true, vegetarian: false, spicy: false, charcoalGrilled: false, available: true, archived: false,
    badge: "Quick Bite", includes: [], displayOrder: 3,
    extras: [], createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T08:00:00Z",
  },
];

export const MOCK_ORDERS: AdminOrder[] = [
  {
    id: "o1", orderRef: "SHG-1Q2W3E4R", customer: { id: "c1", name: "Sarah Johnson", phone: "0412 345 678", email: "sarah@example.com" },
    items: [
      { id: "oi1", name: "Chicken Shish Kebab", basePrice: 19.90, quantity: 2, extras: [], notes: "No onion" },
      { id: "oi2", name: "Falafel Wrap", basePrice: 13.90, quantity: 1, extras: [] },
    ],
    orderType: "PICKUP", pickupTime: "asap", paymentMethod: "card",
    subtotal: 53.70, deliveryFee: 0, discount: 0, total: 53.70,
    status: "PENDING", createdAt: new Date(Date.now() - 5 * 60000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "o2", orderRef: "SHG-5T6Y7U8I", customer: { id: "c2", name: "Michael Chen", phone: "0423 456 789" },
    items: [{ id: "oi3", name: "Mixed Meat Grill", basePrice: 28.00, quantity: 1, extras: [] }],
    orderType: "DELIVERY", deliveryAddress: { street: "12 Collins St", suburb: "Melbourne", postcode: "3000" },
    paymentMethod: "card", subtotal: 28.00, deliveryFee: 5.00, discount: 0, total: 33.00,
    status: "PREPARING", createdAt: new Date(Date.now() - 20 * 60000).toISOString(), updatedAt: new Date().toISOString(),
  },
];

export const MOCK_CATERING: CateringRequest[] = [
  {
    id: "cr1", name: "Lena Novak", phone: "0412 111 222", email: "lena@company.com.au",
    eventType: "Corporate Lunch", guestCount: "30-40", date: "2026-07-15", time: "12:00",
    collectionType: "delivery", venueAddress: "Level 12, 1 Collins St Melbourne VIC 3000",
    budget: "$800-$1200", specialRequests: "Several vegetarian guests.",
    status: "NEW", createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
];

// ── Default factories ─────────────────────────────────────────────────────────

function defaultAnnouncement(): AdminAnnouncement {
  return {
    id: "ann1",
    message: "Now accepting catering enquiries for corporate events and gatherings.",
    type: "info",
    enabled: true,
    dismissible: true,
    createdAt: "2026-01-01T00:00:00Z",
  };
}

function defaultHours(): OpeningHour[] {
  return [
    { id: "h1", day: "Monday",    open: "11:00", close: "22:00", closed: false },
    { id: "h2", day: "Tuesday",   open: "11:00", close: "22:00", closed: false },
    { id: "h3", day: "Wednesday", open: "11:00", close: "22:00", closed: false },
    { id: "h4", day: "Thursday",  open: "11:00", close: "22:00", closed: false },
    { id: "h5", day: "Friday",    open: "11:00", close: "23:00", closed: false },
    { id: "h6", day: "Saturday",  open: "11:00", close: "23:00", closed: false },
    { id: "h7", day: "Sunday",    open: "12:00", close: "21:30", closed: false },
  ];
}

function defaultSettings(): RestaurantSettings {
  return {
    id: "main",
    name: "Shish Shawarma & Grill",
    phone: "+61XXXXXXXXX",
    email: "orders@shishshawarma.com.au",
    address: "[Street Address], Melbourne VIC 3000",
    googleMapsUrl: "https://maps.google.com",
    whatsappNumber: "+61XXXXXXXXX",
    instagramUrl: "https://www.instagram.com/shish_shawarma_grill/?hl=en",
    facebookUrl: "", tiktokUrl: "", logoUrl: null, faviconUrl: null,
    seoTitle: "Shish Shawarma & Grill | Authentic Charcoal Grill in Melbourne",
    seoDescription: "Freshly grilled meats and handcrafted wraps in Melbourne. 100% Halal.",
    deliveryFee: 5, minDelivery: 30, preparationTime: 20, deliveryTime: 40,
  };
}

function defaultGallery(): AdminGalleryImage[] {
  return [
    { id: "g1", src: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", alt: "Chicken shawarma wrap", category: "food", featured: true, aspect: "portrait", displayOrder: 0, createdAt: "2024-01-01T00:00:00Z" },
    { id: "g2", src: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400&q=80", alt: "Mixed meat platter", category: "food", featured: true, aspect: "landscape", displayOrder: 1, createdAt: "2024-01-02T00:00:00Z" },
    { id: "g3", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80", alt: "Restaurant interior", category: "restaurant", featured: false, aspect: "landscape", displayOrder: 2, createdAt: "2024-01-03T00:00:00Z" },
    { id: "g4", src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&q=80", alt: "Charcoal grill kitchen", category: "kitchen", featured: true, aspect: "portrait", displayOrder: 3, createdAt: "2024-01-04T00:00:00Z" },
    { id: "g5", src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80", alt: "Catering event", category: "events", featured: false, aspect: "landscape", displayOrder: 4, createdAt: "2024-01-05T00:00:00Z" },
  ];
}

function defaultReviews(): AdminReview[] {
  return [
    { id: "rv1", author: "Sarah K.", rating: 5, text: "Best shawarma in Melbourne! The charcoal grill makes such a difference. I've been coming here every week.", date: "2026-06-15", featured: true, hidden: false, pinned: true, source: "google" },
    { id: "rv2", author: "James T.", rating: 5, text: "Massive portions and the garlic sauce is incredible. Great value, very friendly staff.", date: "2026-06-10", featured: true, hidden: false, pinned: false, source: "google" },
    { id: "rv3", author: "Amira L.", rating: 5, text: "Finally a proper halal charcoal grill restaurant! The mixed grill platter is perfect for the whole family.", date: "2026-06-05", featured: false, hidden: false, pinned: false, source: "manual" },
    { id: "rv4", author: "David W.", rating: 4, text: "Really good food, especially the kofta. Service was fast and friendly. Will definitely be back.", date: "2026-05-28", featured: false, hidden: false, pinned: false, source: "google" },
    { id: "rv5", author: "Anonymous", rating: 2, text: "Long wait time on a busy Friday night.", date: "2026-05-20", featured: false, hidden: true, pinned: false, source: "google" },
  ];
}

// ── Persistent singletons — loaded from disk, fallback to defaults ─────────────
// The object references are stable; mutations via Object.assign / splice / push
// update in-memory state AND are flushed to disk by the save actions.

export const MOCK_ANNOUNCEMENT: AdminAnnouncement =
  readDisk("announcement.json", defaultAnnouncement());

export const MOCK_HOURS: OpeningHour[] =
  readDisk("hours.json", defaultHours());

export const MOCK_SETTINGS: RestaurantSettings =
  readDisk("settings.json", defaultSettings());

export const MOCK_MENU_ITEMS: AdminMenuItem[] =
  readDisk("menu-items.json", DEFAULT_MENU_ITEMS);

export const MOCK_GALLERY: AdminGalleryImage[] =
  readDisk("gallery.json", defaultGallery());

export const MOCK_REVIEWS: AdminReview[] =
  readDisk("reviews.json", defaultReviews());

// ── Dashboard stats (always derived fresh) ────────────────────────────────────

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalMenuItems: 32,
  activeOrders: 3,
  todayOrders: 24,
  todayRevenue: 1187.40,
  pendingCatering: 1,
  galleryImages: 18,
  weeklyOrders: [
    { day: "Mon", count: 18, revenue: 892 },
    { day: "Tue", count: 22, revenue: 1104 },
    { day: "Wed", count: 19, revenue: 945 },
    { day: "Thu", count: 25, revenue: 1238 },
    { day: "Fri", count: 38, revenue: 1892 },
    { day: "Sat", count: 44, revenue: 2198 },
    { day: "Sun", count: 31, revenue: 1543 },
  ],
  recentOrders: MOCK_ORDERS.slice(0, 5),
  recentCatering: MOCK_CATERING.slice(0, 3),
};

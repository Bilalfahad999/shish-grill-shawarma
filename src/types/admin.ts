// ── Admin TypeScript types ────────────────────────────────────────────────────
// These mirror the Prisma schema. When Prisma is configured, use generated
// types from @/generated/prisma instead.

export type Role = "OWNER" | "MANAGER" | "STAFF";
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED";
export type OrderType = "PICKUP" | "DELIVERY";
export type CateringStatus = "NEW" | "CONTACTED" | "QUOTED" | "CONFIRMED" | "COMPLETED" | "ARCHIVED";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string | null;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  visible: boolean;
  displayOrder: number;
  _count?: { items: number };
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  maxQty: number;
  menuItemId: string;
}

export interface AdminMenuItem {
  id: string;
  name: string;
  description: string;
  longDescription?: string | null;
  price: string;
  categoryId: string;
  category: { id: string; name: string };
  image: string;
  popular: boolean;
  vegetarian: boolean;
  spicy: boolean;
  charcoalGrilled: boolean;
  available: boolean;
  archived: boolean;
  badge?: string | null;
  includes: string[];
  displayOrder: number;
  extras: Extra[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
}

export interface OrderItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  extras: { name: string; price: number; quantity: number }[];
  notes?: string | null;
}

export interface AdminOrder {
  id: string;
  orderRef: string;
  customer: Customer;
  items: OrderItem[];
  orderType: OrderType;
  pickupTime?: string | null;
  deliveryAddress?: { street: string; suburb: string; postcode: string; notes?: string } | null;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  coupon?: string | null;
  status: OrderStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CateringRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  guestCount: string;
  date: string;
  time: string;
  collectionType: string;
  venueAddress?: string | null;
  budget?: string | null;
  specialRequests?: string | null;
  status: CateringStatus;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminGalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  featured: boolean;
  aspect: string;
  displayOrder: number;
  createdAt: string;
}

export interface AdminReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  featured: boolean;
  hidden: boolean;
  pinned: boolean;
  source: string;
}

export interface AdminAnnouncement {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
  enabled: boolean;
  dismissible: boolean;
  startAt?: string | null;
  endAt?: string | null;
  createdAt: string;
}

export interface OpeningHour {
  id: string;
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface RestaurantSettings {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  googleMapsUrl?: string | null;
  whatsappNumber?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  deliveryFee: number;
  minDelivery: number;
  preparationTime: number;
  deliveryTime: number;
}

// ── Server Action response types ──────────────────────────────────────────────

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

// ── Dashboard stats ───────────────────────────────────────────────────────────

export interface DashboardStats {
  totalMenuItems: number;
  activeOrders: number;
  todayOrders: number;
  todayRevenue: number;
  pendingCatering: number;
  galleryImages: number;
  weeklyOrders: { day: string; count: number; revenue: number }[];
  recentOrders: AdminOrder[];
  recentCatering: CateringRequest[];
}

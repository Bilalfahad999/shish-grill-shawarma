export type GalleryCategory = "food" | "restaurant" | "kitchen" | "events";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  featured?: boolean;
  // aspect ratio hint for masonry layout (portrait = taller)
  aspect?: "landscape" | "portrait" | "square";
}

export const GALLERY_CATEGORIES: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "food", label: "Food" },
  { value: "restaurant", label: "Restaurant" },
  { value: "kitchen", label: "Kitchen" },
  { value: "events", label: "Events" },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // Food
  {
    id: "f1",
    src: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=85",
    alt: "Charcoal-grilled chicken shawarma wrap",
    category: "food",
    featured: true,
    aspect: "portrait",
  },
  {
    id: "f2",
    src: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=800&q=85",
    alt: "Mixed meat platter with salads and dips",
    category: "food",
    aspect: "landscape",
  },
  {
    id: "f3",
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=85",
    alt: "Fresh pita bread with hummus",
    category: "food",
    aspect: "square",
  },
  {
    id: "f4",
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=85",
    alt: "Falafel wrap with fresh vegetables",
    category: "food",
    aspect: "portrait",
  },
  {
    id: "f5",
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=85",
    alt: "Grilled shish kebab skewers",
    category: "food",
    featured: true,
    aspect: "landscape",
  },
  {
    id: "f6",
    src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=85",
    alt: "House-made garlic sauce and dips",
    category: "food",
    aspect: "square",
  },
  {
    id: "f7",
    src: "https://images.unsplash.com/photo-1610614819513-58e34989848b?w=800&q=85",
    alt: "Family platter with mixed grills",
    category: "food",
    aspect: "landscape",
  },
  {
    id: "f8",
    src: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&q=85",
    alt: "Fresh salad bowl with herbs",
    category: "food",
    aspect: "portrait",
  },
  // Restaurant
  {
    id: "r1",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85",
    alt: "Restaurant dining area",
    category: "restaurant",
    featured: true,
    aspect: "landscape",
  },
  {
    id: "r2",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
    alt: "Warm restaurant interior atmosphere",
    category: "restaurant",
    aspect: "portrait",
  },
  {
    id: "r3",
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85",
    alt: "Restaurant entrance and seating",
    category: "restaurant",
    aspect: "square",
  },
  {
    id: "r4",
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=85",
    alt: "Dining tables set for guests",
    category: "restaurant",
    aspect: "landscape",
  },
  // Kitchen
  {
    id: "k1",
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=85",
    alt: "Charcoal grill in the kitchen",
    category: "kitchen",
    featured: true,
    aspect: "portrait",
  },
  {
    id: "k2",
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85",
    alt: "Chef preparing fresh ingredients",
    category: "kitchen",
    aspect: "landscape",
  },
  {
    id: "k3",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85",
    alt: "Freshly grilled meats on the charcoal",
    category: "kitchen",
    aspect: "square",
  },
  {
    id: "k4",
    src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=85",
    alt: "Wrap assembly station with fresh ingredients",
    category: "kitchen",
    aspect: "portrait",
  },
  // Events
  {
    id: "e1",
    src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=85",
    alt: "Catering spread for a corporate event",
    category: "events",
    featured: true,
    aspect: "landscape",
  },
  {
    id: "e2",
    src: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=85",
    alt: "Family gathering with food spread",
    category: "events",
    aspect: "portrait",
  },
  {
    id: "e3",
    src: "https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=800&q=85",
    alt: "Community event catering setup",
    category: "events",
    aspect: "landscape",
  },
];

export interface GalleryVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  // placeholder — owner will add real video URL
  videoUrl?: string;
}

export const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    id: "v1",
    title: "The Charcoal Grill",
    description: "Watch our meats being cooked over real charcoal — the way it should be.",
    thumbnail: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=700&q=85",
  },
  {
    id: "v2",
    title: "Fresh Every Morning",
    description: "A look inside our kitchen as we prepare for the day ahead.",
    thumbnail: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&q=85",
  },
];

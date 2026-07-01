"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import {
  MOCK_ANNOUNCEMENT, MOCK_HOURS, MOCK_SETTINGS,
  MOCK_GALLERY, MOCK_REVIEWS,
} from "@/lib/mock-data";
import { writeJSON } from "@/lib/persist";
import type {
  AdminAnnouncement, OpeningHour, RestaurantSettings,
  AdminGalleryImage, AdminReview, ActionResult,
} from "@/types/admin";

// ── Announcements ─────────────────────────────────────────────────────────────

export async function getAnnouncement(): Promise<AdminAnnouncement | null> {
  // TODO Prisma: prisma.announcement.findFirst({ where: { enabled: true }, orderBy: { createdAt: "desc" } })
  return MOCK_ANNOUNCEMENT;
}

export async function saveAnnouncement(data: Partial<AdminAnnouncement>): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  // TODO Prisma: prisma.announcement.upsert({ where: { id: data.id ?? "ann1" }, create: { ...data }, update: { ...data } })
  Object.assign(MOCK_ANNOUNCEMENT, data);
  writeJSON("announcement.json", MOCK_ANNOUNCEMENT);

  revalidatePath("/", "layout");
  revalidatePath("/admin/announcements");
  return { success: true, data: undefined };
}

// ── Opening Hours ─────────────────────────────────────────────────────────────

export async function getOpeningHours(): Promise<OpeningHour[]> {
  // TODO Prisma: prisma.openingHour.findMany({ orderBy: { day: "asc" } })
  return MOCK_HOURS;
}

export async function saveOpeningHours(hours: OpeningHour[]): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  // TODO Prisma:
  // await prisma.$transaction(hours.map(h => prisma.openingHour.upsert({ where: { day: h.day }, create: h, update: h })))
  for (const updated of hours) {
    const existing = MOCK_HOURS.find((h) => h.id === updated.id);
    if (existing) Object.assign(existing, updated);
  }
  writeJSON("hours.json", MOCK_HOURS);

  revalidatePath("/", "layout");
  revalidatePath("/admin/hours");
  return { success: true, data: undefined };
}

// ── Settings ──────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<RestaurantSettings> {
  // TODO Prisma: prisma.restaurantSettings.findUnique({ where: { id: "main" } })
  return MOCK_SETTINGS;
}

export async function saveSettings(data: Partial<RestaurantSettings>): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  // TODO Prisma:
  // await prisma.restaurantSettings.upsert({ where: { id: "main" }, create: { id: "main", ...data }, update: data })
  Object.assign(MOCK_SETTINGS, data);
  writeJSON("settings.json", MOCK_SETTINGS);

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { success: true, data: undefined };
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export async function getGalleryImages(): Promise<AdminGalleryImage[]> {
  // TODO Prisma: prisma.galleryImage.findMany({ orderBy: { displayOrder: "asc" } })
  return MOCK_GALLERY;
}

export async function deleteGalleryImage(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const index = MOCK_GALLERY.findIndex((g) => g.id === id);
  if (index === -1) return { success: false, error: "Image not found" };

  // TODO Prisma: await prisma.galleryImage.delete({ where: { id } })
  MOCK_GALLERY.splice(index, 1);
  writeJSON("gallery.json", MOCK_GALLERY);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true, data: undefined };
}

export async function updateGalleryImage(id: string, data: Partial<AdminGalleryImage>): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const image = MOCK_GALLERY.find((g) => g.id === id);
  if (!image) return { success: false, error: "Image not found" };

  // TODO Prisma: await prisma.galleryImage.update({ where: { id }, data })
  Object.assign(image, data);
  writeJSON("gallery.json", MOCK_GALLERY);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true, data: undefined };
}

export async function addGalleryImage(data: Omit<AdminGalleryImage, "id" | "createdAt">): Promise<ActionResult<AdminGalleryImage>> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  // TODO Prisma: const img = await prisma.galleryImage.create({ data })
  const img: AdminGalleryImage = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  MOCK_GALLERY.push(img);
  writeJSON("gallery.json", MOCK_GALLERY);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true, data: img };
}

// ── Reviews ───────────────────────────────────────────────────────────────────

export async function getReviews(): Promise<AdminReview[]> {
  // TODO Prisma: prisma.review.findMany({ orderBy: [{ pinned: "desc" }, { createdAt: "desc" }] })
  return MOCK_REVIEWS;
}

export async function updateReview(id: string, data: Partial<AdminReview>): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const review = MOCK_REVIEWS.find((r) => r.id === id);
  if (!review) return { success: false, error: "Review not found" };

  // TODO Prisma: await prisma.review.update({ where: { id }, data })
  Object.assign(review, data);
  writeJSON("reviews.json", MOCK_REVIEWS);

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true, data: undefined };
}

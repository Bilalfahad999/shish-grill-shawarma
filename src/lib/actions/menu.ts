"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  MOCK_MENU_ITEMS, MOCK_CATEGORIES,
} from "@/lib/mock-data";
import { writeJSON } from "@/lib/persist";
import type { AdminMenuItem, Category, ActionResult } from "@/types/admin";
import type { MenuItem as PublicMenuItem, MenuCategory as PublicMenuCategory } from "@/data/menu";

// Picks a representative emoji for a category based on its name — admin categories
// don't carry their own icon, so this keeps the public menu's visual language without
// requiring the admin to manage icons manually.
const CATEGORY_ICONS: [RegExp, string][] = [
  [/grill|charcoal|kebab|skewer/i, "🔥"],
  [/wrap/i, "🌯"],
  [/platter|family|meal/i, "🍽"],
  [/side/i, "🍟"],
  [/dip|sauce/i, "🥣"],
  [/salad/i, "🥗"],
  [/kid/i, "🧒"],
  [/drink|beverage/i, "🥤"],
  [/dessert|sweet/i, "🍰"],
  [/lunch|special/i, "🍱"],
];

function iconForCategory(name: string): string {
  return CATEGORY_ICONS.find(([pattern]) => pattern.test(name))?.[1] ?? "🍴";
}

// ── Validation schemas ────────────────────────────────────────────────────────

const menuItemSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(5, "Description is required"),
  longDescription: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().url("Valid image URL required"),
  popular: z.boolean().default(false),
  vegetarian: z.boolean().default(false),
  spicy: z.boolean().default(false),
  charcoalGrilled: z.boolean().default(false),
  available: z.boolean().default(true),
  badge: z.string().optional(),
  includes: z.array(z.string()).default([]),
  displayOrder: z.number().default(0),
});

type MenuItemInput = z.infer<typeof menuItemSchema>;

// ── Queries ───────────────────────────────────────────────────────────────────

export async function getMenuItems(): Promise<AdminMenuItem[]> {
  // TODO Prisma: return prisma.menuItem.findMany({ include: { category: true, extras: true }, orderBy: { displayOrder: "asc" } })
  return MOCK_MENU_ITEMS;
}

export async function getMenuItem(id: string): Promise<AdminMenuItem | null> {
  // TODO Prisma: return prisma.menuItem.findUnique({ where: { id }, include: { category: true, extras: true } })
  return MOCK_MENU_ITEMS.find((m) => m.id === id) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  // TODO Prisma: return prisma.category.findMany({ include: { _count: { select: { items: true } } }, orderBy: { displayOrder: "asc" } })
  return MOCK_CATEGORIES;
}

/**
 * Live, public-facing view of the admin-managed menu — this is what the storefront
 * (/menu, homepage featured sections, etc.) renders, so admin changes (add/edit/delete/
 * toggle availability) show up on the live site immediately.
 */
export async function getPublicMenu(): Promise<{ categories: PublicMenuCategory[]; items: PublicMenuItem[] }> {
  const visibleCategories = MOCK_CATEGORIES
    .filter((c) => c.visible)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const items: PublicMenuItem[] = MOCK_MENU_ITEMS
    .filter((item) => !item.archived)
    .map((item) => ({
      id: item.id,
      name: item.name,
      category: item.categoryId,
      description: item.description,
      longDescription: item.longDescription ?? undefined,
      price: item.price,
      image: item.image,
      popular: item.popular,
      vegetarian: item.vegetarian,
      spicy: item.spicy,
      charcoalGrilled: item.charcoalGrilled,
      available: item.available,
      includes: item.includes,
      extras: item.extras.map((e) => ({ name: e.name, price: e.price ? `+$${e.price.toFixed(2)}` : undefined })),
      badge: item.badge ?? undefined,
    }));

  const categories: PublicMenuCategory[] = visibleCategories
    .filter((cat) => items.some((i) => i.category === cat.id))
    .map((cat) => ({
      id: cat.id,
      label: cat.name,
      icon: iconForCategory(cat.name),
      intro: cat.description ?? `Explore our ${cat.name.toLowerCase()} selection.`,
    }));

  return { categories, items };
}

// ── Mutations ─────────────────────────────────────────────────────────────────
// Note: until DATABASE_URL is configured, these mutate the in-memory MOCK_* arrays
// directly so admin changes are visible immediately. State resets on server restart.

export async function createMenuItem(
  input: MenuItemInput
): Promise<ActionResult<AdminMenuItem>> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const parsed = menuItemSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Validation error" };
  }

  const category = MOCK_CATEGORIES.find((c) => c.id === parsed.data.categoryId);
  if (!category) return { success: false, error: "Category not found" };

  // TODO Prisma:
  // const item = await prisma.menuItem.create({ data: { ...parsed.data }, include: { category: true, extras: true } })

  const item: AdminMenuItem = {
    ...parsed.data,
    id: crypto.randomUUID(),
    category: { id: category.id, name: category.name },
    extras: [],
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  MOCK_MENU_ITEMS.push(item);
  if (category._count) category._count.items += 1;
  writeJSON("menu-items.json", MOCK_MENU_ITEMS);

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  return { success: true, data: item };
}

export async function updateMenuItem(
  id: string,
  input: Partial<MenuItemInput>
): Promise<ActionResult<AdminMenuItem>> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const index = MOCK_MENU_ITEMS.findIndex((m) => m.id === id);
  if (index === -1) return { success: false, error: "Item not found" };

  // TODO Prisma: const item = await prisma.menuItem.update({ where: { id }, data: input, include: { category: true, extras: true } })

  const existing = MOCK_MENU_ITEMS[index];
  const category = input.categoryId ? MOCK_CATEGORIES.find((c) => c.id === input.categoryId) : null;
  const updated: AdminMenuItem = {
    ...existing,
    ...input,
    category: category ? { id: category.id, name: category.name } : existing.category,
    updatedAt: new Date().toISOString(),
  };
  MOCK_MENU_ITEMS[index] = updated;
  writeJSON("menu-items.json", MOCK_MENU_ITEMS);

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  return { success: true, data: updated };
}

export async function toggleAvailability(
  id: string,
  available: boolean
): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const item = MOCK_MENU_ITEMS.find((m) => m.id === id);
  if (!item) return { success: false, error: "Item not found" };

  // TODO Prisma: await prisma.menuItem.update({ where: { id }, data: { available } })
  item.available = available;
  item.updatedAt = new Date().toISOString();
  writeJSON("menu-items.json", MOCK_MENU_ITEMS);

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  return { success: true, data: undefined };
}

export async function deleteMenuItem(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const index = MOCK_MENU_ITEMS.findIndex((m) => m.id === id);
  if (index === -1) return { success: false, error: "Item not found" };

  // TODO Prisma: await prisma.menuItem.delete({ where: { id } })
  const [removed] = MOCK_MENU_ITEMS.splice(index, 1);
  const category = MOCK_CATEGORIES.find((c) => c.id === removed.categoryId);
  if (category?._count) category._count.items = Math.max(0, category._count.items - 1);
  writeJSON("menu-items.json", MOCK_MENU_ITEMS);

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  return { success: true, data: undefined };
}

export async function archiveMenuItem(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const item = MOCK_MENU_ITEMS.find((m) => m.id === id);
  if (!item) return { success: false, error: "Item not found" };

  // TODO Prisma: await prisma.menuItem.update({ where: { id }, data: { archived: true } })
  item.archived = true;
  item.updatedAt = new Date().toISOString();
  writeJSON("menu-items.json", MOCK_MENU_ITEMS);

  revalidatePath("/admin/menu");
  return { success: true, data: undefined };
}

export async function duplicateMenuItem(id: string): Promise<ActionResult<AdminMenuItem>> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const existing = MOCK_MENU_ITEMS.find((m) => m.id === id);
  if (!existing) return { success: false, error: "Item not found" };

  // TODO Prisma:
  // const { id: _, createdAt: __, updatedAt: ___, ...data } = existing
  // const copy = await prisma.menuItem.create({ data: { ...data, name: data.name + " (Copy)", displayOrder: data.displayOrder + 1 } })

  const copy: AdminMenuItem = {
    ...existing,
    id: crypto.randomUUID(),
    name: existing.name + " (Copy)",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  MOCK_MENU_ITEMS.push(copy);
  const category = MOCK_CATEGORIES.find((c) => c.id === existing.categoryId);
  if (category?._count) category._count.items += 1;
  writeJSON("menu-items.json", MOCK_MENU_ITEMS);

  revalidatePath("/admin/menu");
  return { success: true, data: copy };
}

// ── Category mutations ────────────────────────────────────────────────────────

export async function createCategory(name: string): Promise<ActionResult<Category>> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // TODO Prisma: const cat = await prisma.category.create({ data: { name, slug, displayOrder: 99 } })
  const category: Category = {
    id: crypto.randomUUID(),
    name,
    slug,
    visible: true,
    displayOrder: MOCK_CATEGORIES.length,
    _count: { items: 0 },
  };
  MOCK_CATEGORIES.push(category);

  revalidatePath("/admin/categories");
  revalidatePath("/menu");
  return { success: true, data: category };
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const category = MOCK_CATEGORIES.find((c) => c.id === id);
  if (!category) return { success: false, error: "Category not found" };

  // TODO Prisma: await prisma.category.update({ where: { id }, data })
  Object.assign(category, data);

  revalidatePath("/admin/categories");
  revalidatePath("/menu");
  return { success: true, data: undefined };
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const index = MOCK_CATEGORIES.findIndex((c) => c.id === id);
  if (index === -1) return { success: false, error: "Category not found" };

  // TODO Prisma: await prisma.category.delete({ where: { id } })
  MOCK_CATEGORIES.splice(index, 1);

  revalidatePath("/admin/categories");
  return { success: true, data: undefined };
}

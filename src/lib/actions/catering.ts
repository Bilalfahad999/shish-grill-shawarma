"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { MOCK_CATERING } from "@/lib/mock-data";
import type { CateringRequest, CateringStatus, ActionResult } from "@/types/admin";

export async function getCateringRequests(filters?: {
  status?: CateringStatus;
  search?: string;
}): Promise<{ requests: CateringRequest[]; total: number }> {
  // TODO Prisma: prisma.cateringRequest.findMany({ where, orderBy: { createdAt: "desc" } })
  let filtered = MOCK_CATERING;
  if (filters?.status) filtered = filtered.filter((r) => r.status === filters.status);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.eventType.toLowerCase().includes(q)
    );
  }
  return { requests: filtered, total: filtered.length };
}

export async function getCateringRequest(id: string): Promise<CateringRequest | null> {
  // TODO Prisma: prisma.cateringRequest.findUnique({ where: { id } })
  return MOCK_CATERING.find((r) => r.id === id) ?? null;
}

export async function updateCateringStatus(
  id: string,
  status: CateringStatus
): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const request = MOCK_CATERING.find((r) => r.id === id);
  if (!request) return { success: false, error: "Catering request not found" };

  // TODO Prisma: await prisma.cateringRequest.update({ where: { id }, data: { status } })
  request.status = status;
  request.updatedAt = new Date().toISOString();

  revalidatePath("/admin/catering");
  return { success: true, data: undefined };
}

export async function updateCateringNotes(
  id: string,
  adminNotes: string
): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const request = MOCK_CATERING.find((r) => r.id === id);
  if (!request) return { success: false, error: "Catering request not found" };

  // TODO Prisma: await prisma.cateringRequest.update({ where: { id }, data: { adminNotes } })
  request.adminNotes = adminNotes;
  request.updatedAt = new Date().toISOString();

  revalidatePath("/admin/catering");
  return { success: true, data: undefined };
}

export async function archiveCatering(id: string): Promise<ActionResult> {
  return updateCateringStatus(id, "ARCHIVED");
}

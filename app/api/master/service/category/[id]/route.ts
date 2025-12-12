import { prisma } from "@/app/lib/prisma";
import { storeUpdateSchema } from "./../validation";
import { success, fail } from "@/app/lib/response";
import { adminMiddleware } from "@/app/api/middleware/admin.middleware";
import { NextRequest } from "next/server";

// Show
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params sebagai Promise
) {
  const mid = await adminMiddleware(req);
  if (mid) return mid;

  try {
    const { id } = await context.params;
    const data = await prisma.mServiceCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!data) return fail("Service category tidak ditemukan!");

    return success(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

// Update
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const mid = await adminMiddleware(req);
  if (mid) return mid;

  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = storeUpdateSchema.parse({
      id: Number(id),
      ...body,
    });

    const data = await prisma.mServiceCategory.findUnique({
      where: { id: Number(id) },
    });
    if (!data) return fail("Service category tidak ditemukan!");

    const updatedData = await prisma.mServiceCategory.update({
      where: { id: Number(id) },
      data: { name: parsed.name },
    });

    return success(updatedData, "Service category berhasil di update!");
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

// Destroy
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const mid = await adminMiddleware(req);
  if (mid) return mid;

  try {
    const { id } = await context.params;
    const data = await prisma.mServiceCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!data) return fail("Service category tidak ditemukan!");

    await prisma.mServiceCategory.delete({
      where: { id: Number(id) },
    });

    return success(null, "Service category berhasil dihapus!");
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

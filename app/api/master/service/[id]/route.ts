import { prisma } from "@/app/lib/prisma";
import { storeUpdateSchema } from "./../validation";
import { success, fail, validationError } from "@/app/lib/response";
import { adminMiddleware } from "@/app/api/middleware/admin.middleware";
import { NextRequest } from "next/server";

// Show
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const mid = await adminMiddleware(req);
  if (mid) return mid;

  try {
    const { id } = await context.params;
    const data = await prisma.mService.findUnique({
      where: { id: Number(id) },
      include: {
        serviceCategories: true,
        serviceTypes: true
      }
    });

    if (!data) return fail("Service tidak ditemukan!");

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
    const parsed = await storeUpdateSchema.safeParseAsync(body);

    if (!parsed.success) {
      return validationError(parsed.error.flatten());
    }

    const data = await prisma.mService.findUnique({
      where: { id: Number(id) },
    });
    if (!data) return fail("Service tidak ditemukan!");

    const updatedData = await prisma.mService.update({
      where: { id: Number(id) },
      data: {
        icon: parsed.data.icon,
        name: parsed.data.name,
        description: parsed.data.description,
        unit: parsed.data.unit,
        status: parsed.data.status,
        serviceCategories: {
          set: parsed.data.categories.map((catId) => ({ id: catId })),
        },
      },
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
    const data = await prisma.mService.findUnique({
      where: { id: Number(id) },
    });

    if (!data) return fail("Service tidak ditemukan!");

    await prisma.mService.delete({
      where: { id: Number(id) }
    });

    return success(null, "Service berhasil dihapus!");
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

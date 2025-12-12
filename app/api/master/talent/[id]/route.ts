import { prisma } from "@/app/lib/prisma";
import { storeUpdateSchema } from "./../validation";
import { success, fail, validationError } from "@/app/lib/response";
import { adminMiddleware } from "@/app/api/middleware/admin.middleware";
import { NextRequest } from "next/server";

// Show
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const mid = await adminMiddleware(req);
  if (mid) return mid;

  try {
    const data = await prisma.mTalents.findUnique({
      where: { id: Number(params.id) },
    });

    if (!data) return fail("Talent tidak ditemukan!");

    return success(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

// Update
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const mid = await adminMiddleware(req);
  if (mid) return mid;

  try {
    const body = await req.json();
    const parsed = await storeUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return validationError(parsed.error.flatten());
    }

    const data = await prisma.mTalents.findUnique({
      where: { id: Number(params.id) },
    });
    if (!data) return fail("Talent tidak ditemukan!");

    const updatedData = await prisma.mTalents.update({
      where: { id: Number(params.id) },
      data: {
        name: parsed.data.name,
        img_url: parsed.data.img_url,
        jobdesc: parsed.data.jobdesc,
        detail_jobdesc: parsed.data.detail_jobdesc,
        portfolio_url: parsed.data.portfolio_url,
      },
    });

    return success(updatedData, "Talent berhasil di update!");
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

// Destroy
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const mid = await adminMiddleware(req);
  if (mid) return mid;

  try {
    const data = await prisma.mTalents.findUnique({
      where: { id: Number(params.id) },
    });

    if (!data) return fail("Talent tidak ditemukan!");

    await prisma.mTalents.delete({
      where: { id: Number(params.id) }
    });

    return success(null, "Talent berhasil dihapus!");
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

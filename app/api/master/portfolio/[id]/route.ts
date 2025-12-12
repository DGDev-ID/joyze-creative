import { prisma } from "@/app/lib/prisma";
import { storeUpdateSchema } from "./../validation";
import { success, fail, validationError } from "@/app/lib/response";
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
    const data = await prisma.mPortfolio.findUnique({
      where: { id: Number(id) },
      include: {
        portfolioCategories: true,
        portfolioImages: true
      }
    });

    if (!data) return fail("Portfolio tidak ditemukan!");

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

    const data = await prisma.mPortfolio.findUnique({
      where: { id: Number(id) },
    });
    if (!data) return fail("Portfolio tidak ditemukan!");

    const updatedData = await prisma.mPortfolio.update({
      where: { id: Number(id) },
      data: {
        name: parsed.data.name,
        description: parsed.data.description,
      },
    });

    await prisma.portfolioCategory.deleteMany({ where: { portfolio_id: updatedData.id } });
    await prisma.portfolioImage.deleteMany({ where: { portfolio_id: updatedData.id } });

    await prisma.portfolioCategory.createMany({
      data: parsed.data.categories.map(catId => ({
        portfolio_id: updatedData.id,
        category_id: catId
      }))
    });

    await prisma.portfolioImage.createMany({
      data: parsed.data.img_urls.map(img_url => ({
        portfolio_id: updatedData.id,
        img_url
      }))
    });

    return success(updatedData, "Portfolio category berhasil di update!");
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
    const data = await prisma.mPortfolio.findUnique({
      where: { id: Number(id) },
    });

    if (!data) return fail("Portfolio tidak ditemukan!");

    await prisma.mPortfolio.delete({
      where: { id: Number(id) }
    });

    return success(null, "Portfolio berhasil dihapus!");
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

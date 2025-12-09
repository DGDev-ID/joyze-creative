import { prisma } from "@/app/lib/prisma";
import { storeUpdateSchema } from "./../validation";
import { success, fail, validationError } from "@/app/lib/response";
import { adminMiddleware } from "@/app/api/middleware/admin.middleware";

// Show
export async function GET(req: Request, { params }: any) {
    const mid = await adminMiddleware(req);
    if (mid) return mid;

    try {
        const data = await prisma.mServiceCategory.findUnique({
            where: { id: Number(params.id) },
        });

        if (!data) return fail("Service category tidak ditemukan!")

        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}

// Update
export async function PUT(req: Request, { params }: any) {
    const mid = await adminMiddleware(req);
    if (mid) return mid;

    try {
        const body = await req.json();
        const parsed = storeUpdateSchema.parse({
            id: Number(params.id),
            ...body,
        });

        const data = await prisma.mServiceCategory.findUnique({
            where: { id: Number(params.id) },
        });
        if (!data) return fail("Service category tidak ditemukan!")

        const updatedData = await prisma.mServiceCategory.update({
            where: { id: Number(params.id) },
            data: { name: parsed.name },
        });

        return success(updatedData, "Service category berhasil di update!");
    } catch (e: any) {
        return fail(e.message);
    }
}

// Destroy
export async function DELETE(req: Request, { params }: any) {
    const mid = await adminMiddleware(req);
    if (mid) return mid;

    try {
        const data = await prisma.mServiceCategory.findUnique({
            where: { id: Number(params.id) },
        });

        if (!data) return fail("Service category tidak ditemukan!")

        await prisma.mServiceCategory.delete({
            where: { id: Number(params.id) }
        })

        return success(null, "Service category berhasil dihapus!");
    } catch (e: any) {
        return fail(e.message);
    }
}
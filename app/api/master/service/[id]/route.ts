import { prisma } from "@/app/lib/prisma";
import { storeUpdateSchema } from "./../validation";
import { success, fail, validationError } from "@/app/lib/response";
import { adminMiddleware } from "@/app/api/middleware/admin.middleware";

// Show
export async function GET(req: Request, { params }: any) {
    const mid = await adminMiddleware(req);
    if (mid) return mid;

    try {
        const data = await prisma.mService.findUnique({
            where: { id: Number(params.id) },
            include: {
                serviceCategories: true,
                serviceTypes: true
            }
        });

        if (!data) return fail("Service tidak ditemukan!")

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
        const parsed = await storeUpdateSchema.safeParseAsync(body);

        if (!parsed.success) {
            return validationError(parsed.error.flatten());
        }

        const data = await prisma.mService.findUnique({
            where: { id: Number(params.id) },
        });
        if (!data) return fail("Service tidak ditemukan!");

        const updatedData = await prisma.mService.update({
            where: { id: Number(params.id) },
            data: {
                icon: parsed.data.icon,
                name: parsed.data.name,
                description: parsed.data.description,
                unit: parsed.data.unit,
                status: parsed.data.status,

                serviceCategories: {
                    set: parsed.data.categories.map((id) => ({ id })),
                },
            },
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
        const data = await prisma.mService.findUnique({
            where: { id: Number(params.id) },
        });

        if (!data) return fail("Service tidak ditemukan!")

        await prisma.mService.delete({
            where: { id: Number(params.id) }
        })

        return success(null, "Service berhasil dihapus!");
    } catch (e: any) {
        return fail(e.message);
    }
}
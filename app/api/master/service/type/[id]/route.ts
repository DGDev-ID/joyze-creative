import { prisma } from "@/app/lib/prisma";
import { storeUpdateSchema } from "./../validation";
import { success, fail, validationError } from "@/app/lib/response";
import { adminMiddleware } from "@/app/api/middleware/admin.middleware";

// Show
export async function GET(req: Request, { params }: any) {
    const mid = await adminMiddleware(req);
    if (mid) return mid;

    try {
        const data = await prisma.serviceType.findUnique({
            where: { id: Number(params.id) },
            include: {
                service: true,
                serviceTypeDescriptions: true
            }
        });

        if (!data) return fail("Service type tidak ditemukan!")

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

        const data = await prisma.serviceType.findUnique({
            where: { id: Number(params.id) },
        });
        if (!data) return fail("Service type tidak ditemukan!");

        const updatedData = await prisma.serviceType.update({
            where: { id: Number(params.id) },
            data: {
                service_id: parsed.data.service_id,
                name: parsed.data.name,
                price: parsed.data.price,
            },
        });

        if (parsed.data.descriptions.length > 0) {
            await prisma.serviceTypeDescription.deleteMany({
                where: { id: Number(params.id) }
            })
            await prisma.serviceTypeDescription.createMany({
                data: parsed.data.descriptions.map(desc => ({
                    service_type_id: updatedData.id,
                    description: desc
                }))
            });
        }

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
        const data = await prisma.serviceType.findUnique({
            where: { id: Number(params.id) },
        });

        if (!data) return fail("Service type tidak ditemukan!")

        await prisma.serviceType.delete({
            where: { id: Number(params.id) }
        })

        return success(null, "Service type berhasil dihapus!");
    } catch (e: any) {
        return fail(e.message);
    }
}
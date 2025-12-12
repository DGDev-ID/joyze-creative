import { prisma } from "@/app/lib/prisma";
import { storeUpdateSchema } from "./validation";
import { success, fail, validationError } from "@/app/lib/response";
import { adminMiddleware } from "@/app/api/middleware/admin.middleware";

// Index
export async function GET(req: Request) {
    const mid = await adminMiddleware(req);
    if (mid) return mid;
    
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get("name") ?? "";

        const data = await prisma.serviceType.findMany({
            where: name
                ? {
                    name: {
                        contains: name,
                        mode: "insensitive",
                    },
                }
                : undefined,
            orderBy: { name: "asc" },
        });

        return success(data);
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return fail(message);
    }
}

// Store
export async function POST(req: Request) {
    const mid = await adminMiddleware(req);
    if (mid) return mid;

    try {
        const body = await req.json();
        const parsed = await storeUpdateSchema.safeParseAsync(body);

        if (!parsed.success) return validationError(parsed.error.flatten());

        const data = await prisma.serviceType.create({
            data: {
                service_id: parsed.data.service_id,
                name: parsed.data.name,
                price: parsed.data.price,
            }
        })

        if (parsed.data.descriptions.length > 0) {
            await prisma.serviceTypeDescription.createMany({
                data: parsed.data.descriptions.map(desc => ({
                    service_type_id: data.id,
                    description: desc
                }))
            });
        }

        return success(data, "Service type berhasil dibuat")
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return fail(message);
    }
}


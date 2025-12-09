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

        const data = await prisma.mPortfolio.findMany({
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
    } catch (e: any) {
        return fail(e.message);
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

        const data = await prisma.mPortfolio.create({
            data: {
                name: parsed.data.name,
                description: parsed.data.description,

                portfolioCategories: {
                    create: parsed.data.categories.map(id => ({
                        category_id: id
                    }))
                },
                portfolioImages: {
                    create: parsed.data.img_urls.map(url => ({
                        img_url: url
                    }))
                }
            }
        })

        return success(data, "Portfolio category berhasil dibuat")
    } catch (e: any) {
        return fail(e.message);
    }
}


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

        const data = await prisma.mTalents.findMany({
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
        const parsed = await storeUpdateSchema.safeParse(body);

        if (!parsed.success) return validationError(parsed.error.flatten());

        const data = await prisma.mTalents.create({
            data: {
                name: parsed.data.name,
                img_url: parsed.data.img_url,
                jobdesc: parsed.data.jobdesc,
                detail_jobdesc: parsed.data.detail_jobdesc,
                portfolio_url: parsed.data.portfolio_url,
            }
        })

        return success(data, "Talent berhasil dibuat")
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return fail(message);
    }
}


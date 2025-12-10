import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";

// Index
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit");

        const data = await prisma.mServiceCategory.findMany({
            take: limit ? Number(limit) : undefined
        });

        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}

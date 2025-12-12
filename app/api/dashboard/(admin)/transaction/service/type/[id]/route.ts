import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";

// Show
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const service_id = Number(params.id);
        const data = await prisma.serviceType.findMany({
            where: {
                service_id
            }
        })
        return success(data);
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return fail(message);
    }
}

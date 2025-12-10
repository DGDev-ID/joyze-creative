import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";

// Show
export async function GET(req: Request, { params }: any) {
    try {
        const service_id = Number(params.id);
        const data = await prisma.serviceType.findMany({
            where: {
                service_id
            }
        })
        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}

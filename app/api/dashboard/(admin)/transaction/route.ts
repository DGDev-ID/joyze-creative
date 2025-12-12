import { TransactionStatus } from "@/app/generated/prisma/enums";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";

// Index
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") as TransactionStatus | null;
        const serviceTypeId = searchParams.get("service-type-id");

    const whereClause: Prisma.TransactionWhereInput = {};
    if (status) whereClause.status = status;
    if (serviceTypeId) whereClause.service_type_id = Number(serviceTypeId);


        const data = await prisma.transaction.findMany({
            where: whereClause,
            include: {
                serviceType: {
                    include: {
                        service: true
                    }
                }
            }
        })

        return success(data);
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return fail(message);
    }
}

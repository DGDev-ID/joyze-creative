import { TransactionStatus } from "@/app/generated/prisma/enums";
import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";

// Index
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") as TransactionStatus | null;
        const serviceTypeId = searchParams.get("service-type-id");

        const whereClause: any = {};
        if (status) whereClause.status = status;
        if (serviceTypeId) whereClause.service_type_id = serviceTypeId;


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
    } catch (e: any) {
        return fail(e.message);
    }
}

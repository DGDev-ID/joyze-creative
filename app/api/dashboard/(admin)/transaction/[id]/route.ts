import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";

// Show
export async function GET(req: Request, { params }: any) {
    try {
        const transaction_id = Number(params.id);
        
        const data = await prisma.transaction.findUnique({
            where: {
                id: transaction_id
            },
            
            include: {
                transactionLogs: true,

                orders: {
                    include: {
                        orderLogs: true
                    }
                },

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

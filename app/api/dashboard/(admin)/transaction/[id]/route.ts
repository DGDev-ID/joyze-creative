import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";

// Show
export async function GET(req: Request, { params }: { params: { id: string } }) {
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
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return fail(message);
    }
}

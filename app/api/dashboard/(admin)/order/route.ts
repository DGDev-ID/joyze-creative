import { OrderStatus } from "@/app/generated/prisma/enums";
import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";

// Index
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") as OrderStatus | null;

        const data = await prisma.order.findMany({
            where: status ? {
                status: status
            } : undefined,

            select: {
                id: true,
                status: true,
                transaction_id: true,
                transaction: {
                    select: {
                        id: true,
                        cust_email: true,
                        total_price: true,
                        start_date: true,
                        end_date: true
                    }
                }
            }
        })

        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}

export async function POST(req: Request) {
    try { 
        const body = await req.json();
        const { order_id, log } = body;

        const data = await prisma.orderLog.create({
            data: {
                order_id,
                log
            }
        })

        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}

import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";

// Show
export async function GET(req: Request, { params }: any) {
    try {
        const order_id = Number(params.id);
        
        const data = await prisma.order.findUnique({
            where: {
                id: order_id
            },
            
            include: {
                transaction: {
                    include: {
                        serviceType: {
                            include: {
                                service: true
                            }
                        }
                    }
                },

                orderLogs: true
            }
        })

        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}


// Show
export async function PATCH(req: Request, { params }: any) {
    try {
        const order_id = Number(params.id);
        
        const data = await prisma.order.findUnique({
            where: {
                id: order_id
            },
        })

        if(!data) return fail("Order tidak ditemukan", 404);

        await prisma.order.update({
            data: {
                status: "DONE"
            },

            where: {
                id: data.id
            }
        })

        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}

// Store
export async function POST(req: Request, { params }: any) {
    try {
        const order_id = Number(params.id);
        const body = await req.json();
        const { log } = body;
        
        const data = await prisma.order.findUnique({
            where: {
                id: order_id
            },
        })

        if(!data) return fail("Order tidak ditemukan", 404);

        await prisma.orderLog.create({
            data: {
                order_id: order_id,
                log: log
            }
        })

        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}
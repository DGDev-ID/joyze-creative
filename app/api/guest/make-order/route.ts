import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";
import { adminMiddleware } from "@/app/api/middleware/admin.middleware";
import { storeSchema } from "./validation";
import midtransClient from "midtrans-client";
import { Transaction } from "@/app/generated/prisma/client";
import { randomUUID } from "crypto";


// Store
export async function POST(req: Request) {
    const mid = await adminMiddleware(req);
    if (mid) return mid;

    try {
        const body = await req.json();
        const parsed = await storeSchema.safeParseAsync(body);

        if (!parsed.success) return validationError(parsed.error.flatten());

        const serviceType = await prisma.serviceType.findUnique({
            where: { id: parsed.data.service_type_id }
        })
        if (!serviceType) return fail("Service type tidak ditemukan", 404);

        const data = await prisma.transaction.create({
            data: {
                service_type_id: serviceType.id,
                total_price: serviceType.price,
                cust_name: parsed.data.cust_name,
                cust_email: parsed.data.cust_email,
                cust_phone: parsed.data.cust_phone,
                start_date: parsed.data.start_date,
                end_date: parsed.data.end_date,
                status: "PENDING",

                transactionLogs: {
                    create: {
                        log: "Transaksi berhasil dibuat."
                    }
                }
            }
        })

        const redirect_url = await createMidtransTransaction(data)

        return success(redirect_url, "Transaksi berhasil dibuat. Silahkan selesaikan pembayaran!")
    } catch (e: any) {
        return fail(e.message);
    }
}

async function createMidtransTransaction(transaction: Transaction ) {
    let snap = new midtransClient.Snap({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
        serverKey: String(process.env.MIDTRANS_SERVER_KEY),
        clientKey: String(process.env.MIDTRANS_CLIENT_KEY)
    })

    const orderId = String(randomUUID);

    let parameter = {
        "transaction_details": {
            "order_id": orderId,
            "gross_amount": Number(transaction.total_price)
        }
    };

    const midtransTransaction = await snap.createTransaction(parameter);

    await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
            midtrans_order_id: orderId,
            midtrans_redirect_url: midtransTransaction.redirect_url
        }
    })

    return midtransTransaction.redirect_url;
}
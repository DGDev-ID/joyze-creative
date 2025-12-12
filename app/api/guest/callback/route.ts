import crypto from "crypto";
import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";
import { Transaction, TransactionStatus } from "@/app/generated/prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const notificationJson = await req.json();

        const isValid = verifyMidtransSignature(
            notificationJson.order_id,
            notificationJson.status_code,
            notificationJson.gross_amount,
            process.env.MIDTRANS_SERVER_KEY!,
            notificationJson.signature_key
        );

        if (!isValid) {
            return fail("Invalid signature", 401)
        }

        const acceptableTransactionStatus = [
            ["capture", "SUCCESS", "Transaksi berhasil dibayar."],
            ["settlement", "SUCCESS", "Transaksi berhasil dibayar."],
            ["deny", "FAILED", "Transaksi ditolak oleh sistem."],
            ["cancel", "FAILED", "Transaksi dibatalkan."],
            ["expire", "FAILED", "Transaksi expired."],
            ["failure", "FAILED", "Transaksi gagal."]
        ];

        const getTransactionStatus = notificationJson.transaction_status;
        function checkStatus(status: string) {
            const found = acceptableTransactionStatus.find(item => item[0] === status);
            return found ? found : 0;
        }

        const resultStatus = checkStatus(getTransactionStatus);
        if (!resultStatus) return success(null, "success");

        const transaction = await prisma.transaction.findUnique({ where: { midtrans_order_id: notificationJson.order_id } })
        const updatedTransaction = await setStatusTransaction(transaction!, resultStatus[1] as TransactionStatus, resultStatus[2])

        return success(updatedTransaction, "success");
    } catch (error: unknown) {
        console.error("Midtrans callback error:", error);
        const message = error instanceof Error ? error.message : String(error);
        return fail(message, 500);
    }
}

function verifyMidtransSignature(order_id: string, status_code: string, gross_amount: string, serverKey: string, signature_key: string) {
    const payload = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const calculatedSignature = crypto.createHash("sha512").update(payload).digest("hex");

    return calculatedSignature === signature_key;
}

async function setStatusTransaction(transaction: Transaction, status: TransactionStatus, log: string) {
    const updatedTransaction = await prisma.transaction.update({
        where: {
            id: transaction.id
        },

        data: {
            status,
            transactionLogs: {
                create: {
                    log
                }
            }
        }
    });

    if (status === "SUCCESS") {
        await prisma.order.create({
            data: {
                transaction_id: updatedTransaction.id,
                status: "PENDING",

                orderLogs: {
                    create: {
                        log: "Transaksi berhasil, Order berhasil dibuat."
                    }
                }
            }
        })
    }

    return updatedTransaction;
}
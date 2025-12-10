import { TransactionStatus } from "@/app/generated/prisma/enums";
import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";

// Index
export async function GET(req: Request) {
    try {
        const data = await prisma.mService.findMany()
        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}

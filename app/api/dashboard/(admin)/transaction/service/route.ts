import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";

// Index
export async function GET() {
    try {
        const data = await prisma.mService.findMany()
        return success(data);
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return fail(message);
    }
}

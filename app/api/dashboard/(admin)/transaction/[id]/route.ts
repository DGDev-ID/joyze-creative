import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";
import { NextRequest } from "next/server";

// Show
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params sebagai Promise
) {
  try {
    const { id } = await context.params; // ambil id dari Promise
    const order_id = Number(id);

    const data = await prisma.order.findUnique({
      where: { id: order_id },
      include: {
        transaction: {
          include: {
            serviceType: { include: { service: true } }
          }
        },
        orderLogs: true
      }
    });

    return success(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

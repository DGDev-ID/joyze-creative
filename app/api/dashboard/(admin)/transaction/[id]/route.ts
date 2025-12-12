import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";
import { NextRequest } from "next/server";

// Show
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order_id = Number(params.id);

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

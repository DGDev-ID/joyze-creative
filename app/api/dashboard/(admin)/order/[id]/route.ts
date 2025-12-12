import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";
import { NextRequest } from "next/server";

// GET /api/dashboard/order/[id]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params sebagai Promise
) {
  try {
    const { id } = await context.params;
    const order_id = Number(id);

    const data = await prisma.order.findUnique({
      where: { id: order_id },
      include: {
        transaction: { include: { serviceType: { include: { service: true } } } },
        orderLogs: true,
      }
    });

    return success(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

// PATCH /api/dashboard/order/[id]
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const order_id = Number(id);

    const data = await prisma.order.findUnique({ where: { id: order_id } });
    if (!data) return fail("Order tidak ditemukan", 404);

    const updated = await prisma.order.update({
      where: { id: data.id },
      data: { status: "DONE" }
    });

    return success(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

// POST /api/dashboard/order/[id]
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const order_id = Number(id);

    const body = await req.json();
    const { log } = body;

    const data = await prisma.order.findUnique({ where: { id: order_id } });
    if (!data) return fail("Order tidak ditemukan", 404);

    await prisma.orderLog.create({ data: { order_id, log } });

    return success(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

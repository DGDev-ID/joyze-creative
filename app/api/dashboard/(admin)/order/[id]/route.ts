import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";
import { NextRequest, NextResponse } from "next/server";

// GET /api/dashboard/order/[id]
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
            serviceType: {
              include: { service: true }
            }
          }
        },
        orderLogs: true
      }
    });

    return NextResponse.json(success(data));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(fail(message));
  }
}

// PATCH /api/dashboard/order/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order_id = Number(params.id);

    const data = await prisma.order.findUnique({ where: { id: order_id } });
    if (!data) return NextResponse.json(fail("Order tidak ditemukan", 404));

    const updated = await prisma.order.update({
      where: { id: data.id },
      data: { status: "DONE" }
    });

    return NextResponse.json(success(updated));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(fail(message));
  }
}

// POST /api/dashboard/order/[id]
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order_id = Number(params.id);
    const body = await req.json();
    const { log } = body;

    const data = await prisma.order.findUnique({ where: { id: order_id } });
    if (!data) return NextResponse.json(fail("Order tidak ditemukan", 404));

    await prisma.orderLog.create({
      data: { order_id, log }
    });

    return NextResponse.json(success(data));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(fail(message));
  }
}

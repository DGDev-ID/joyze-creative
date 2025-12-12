import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";
import { NextRequest } from "next/server";

// Index
export async function GET(
  req: NextRequest,
  { params }: { params: { service_id: string } }
) {
  try {
    const service_id = Number(params.service_id);

    const data = await prisma.serviceType.findMany({
      where: { service_id }
    });

    return success(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

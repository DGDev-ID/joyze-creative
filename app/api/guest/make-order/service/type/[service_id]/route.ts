import { prisma } from "@/app/lib/prisma";
import { success, fail } from "@/app/lib/response";
import { NextRequest } from "next/server";

// Index
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ service_id: string }> } // params sebagai Promise
) {
  try {
    const { service_id } = await context.params; // ambil service_id dari Promise
    const serviceIdNum = Number(service_id);

    const data = await prisma.serviceType.findMany({
      where: { service_id: serviceIdNum }
    });

    return success(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return fail(message);
  }
}

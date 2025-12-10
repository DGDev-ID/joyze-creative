import { prisma } from "@/app/lib/prisma";
import { success, fail, validationError } from "@/app/lib/response";

// Index
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("category-id");

        const data = await prisma.mService.findMany({
            where: categoryId
                ? {
                    serviceCategories: {
                        some: {
                            id: Number(categoryId)
                        }
                    }
                }
                : undefined,
                
            include: {
                serviceCategories: true,
                serviceTypes: {
                    include: {
                        serviceTypeDescriptions: true
                    }
                }
            }
        });

        return success(data);
    } catch (e: any) {
        return fail(e.message);
    }
}

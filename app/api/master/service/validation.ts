import { z } from "zod"
import { MServiceUnit, MServiceStatus } from "@/app/generated/prisma/enums"
import { prisma } from "@/app/lib/prisma";

export const storeUpdateSchema = z.object({
    icon: z.string().min(1, "Icon service wajib diisi"),
    name: z.string().min(1, "Nama service wajib diisi"),
    description: z.string().min(1, "Deskripsi service wajib diisi"),
    unit: z.enum(MServiceUnit),
    status: z.enum(MServiceStatus),
    
    categories: z
        .array(z.number().int().positive("ID kategori tidak valid"))
        .min(1, "Minimal pilih 1 kategori")
})
    .superRefine(async (data, ctx) => {
        const ids = data.categories;

        const existing = await prisma.mServiceCategory.findMany({
            where: { id: { in: ids } },
            select: { id: true }
        });

        const existingIds = existing.map((c) => c.id);

        const notExists = ids.filter((id) => !existingIds.includes(id));

        if (notExists.length > 0) {
            ctx.addIssue({
                path: ["categories"],
                code: z.ZodIssueCode.custom,
                message: `Kategori dengan ID berikut tidak ditemukan: ${notExists.join(", ")}`
            });
        }
    })
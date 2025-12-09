import { z } from "zod"
import { prisma } from "@/app/lib/prisma";

export const storeUpdateSchema = z.object({
    name: z.string().min(1, "Nama service wajib diisi"),
    description: z.string().min(1, "Deskripsi service wajib diisi"),
    
    categories: z
        .array(z.number().int().positive("ID kategori tidak valid"))
        .min(1, "Minimal pilih 1 kategori"),

    img_urls: z.array(z.string().min(1, "Minimal isi 1 image url"))
})
    .superRefine(async (data, ctx) => {
        const ids = data.categories;

        const existing = await prisma.mPortfolioCategory.findMany({
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
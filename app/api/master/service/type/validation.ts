import { z } from "zod";
import { prisma } from "@/app/lib/prisma";

export const storeUpdateSchema = z.object({
    service_id: z.number().int().min(1, "Service id wajib diisi"),
    name: z.string().min(1, "Service type name wajib diisi"),
    price: z.coerce.bigint(),
    descriptions: z.array(
        z.string().min(1, "Minimal isi 1 deskripsi")
    ).min(1, "Minimal isi 1 deskripsi")
})
    .superRefine(async (data, ctx) => {
        const existing = await prisma.mService.findUnique({
            where: { id: data.service_id },
            select: { id: true }
        });

        if (!existing) {
            ctx.addIssue({
                path: ["service_id"],
                code: z.ZodIssueCode.custom,
                message: "Service id tidak ditemukan!"
            });
        }
    });

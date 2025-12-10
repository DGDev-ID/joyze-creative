import { z } from "zod";
import { prisma } from "@/app/lib/prisma";

export const storeSchema = z.object({
    cust_name: z.string().min(1, "Nama customer wajib diisi"),
    cust_email: z
        .string()
        .min(1, "Email customer wajib diisi")
        .email("Format email tidak valid"),
    cust_phone: z.string().min(1, "Telepon customer wajib diisi"),

    service_id: z.number().int().min(1, "Service wajib diisi"),
    service_type_id: z.number().int().min(1, "Tipe service wajib diisi"),

    start_date: z.coerce.date(),
    end_date: z.coerce.date()
})
.superRefine(async (data, ctx) => {

    // 🔍 Validasi service_id exists
    const service = await prisma.mService.findUnique({
        where: { id: data.service_id }
    });
    if (!service) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Service tidak ditemukan",
            path: ["service_id"]
        });
    }

    // 🔍 Validasi service_type_id exists
    const serviceType = await prisma.serviceType.findUnique({
        where: { id: data.service_type_id }
    });
    if (!serviceType) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Tipe service tidak ditemukan",
            path: ["service_type_id"]
        });
    }

    // 🔍 Validasi tanggal (opsional tetapi umum)
    if (data.end_date < data.start_date) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Tanggal selesai tidak boleh lebih awal dari tanggal mulai",
            path: ["end_date"]
        });
    }
});

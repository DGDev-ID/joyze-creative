import { z } from "zod"

export const storeUpdateSchema = z.object({
    name: z.string().min(1, "Nama service wajib diisi"),
})
import { z } from "zod"

export const storeUpdateSchema = z.object({
    name: z.string().min(1, "Name wajib diisi"),
    img_url: z.string().min(1, "Img Url wajib diisi"),
    jobdesc: z.string().min(1, "Jobdesc wajib diisi"),
    detail_jobdesc: z.string().min(1, "Detail jobdesc wajib diisi"),
    portfolio_url: z.string().optional(),
})
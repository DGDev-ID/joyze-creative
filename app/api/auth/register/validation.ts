import { prisma } from "@/app/lib/prisma"
import { z } from "zod"

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z.string().min(1, "Email wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
})
  .superRefine(async (data, ctx) => {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email sudah terdaftar",
        path: ["email"],
      });
    }
  });
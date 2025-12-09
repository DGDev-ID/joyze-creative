import { prisma } from "@/app/lib/prisma";
import { registerSchema } from "./validation";
import { success, fail, validationError } from "@/app/lib/response";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = await registerSchema.safeParseAsync(body);

        if (!parsed.success) return validationError(parsed.error.flatten());

        const hashedPassword = await bcrypt.hash(parsed.data.password, 10)

        const user = await prisma.user.create({
            data: {
                name: parsed.data.name,
                email: parsed.data.email,
                password: hashedPassword,
                role: "CUSTOMER"
            }
        })
        return success({id: user.id, email: user.email}, "Register berhasil!")
    } catch (e: any) {
        return fail(e.message);
    }
}
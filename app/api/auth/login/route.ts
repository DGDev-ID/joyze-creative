import { prisma } from "@/app/lib/prisma";
import { loginSchema } from "./validation";
import { success, fail, validationError } from "@/app/lib/response";
import bcrypt from "bcrypt";
import { signToken } from "@/app/lib/jwt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = await loginSchema.safeParse(body);

        if (!parsed.success) return validationError(parsed.error.flatten());

        const user = await prisma.user.findUnique({
            where: { email: parsed.data.email }
        });

        if (!user) return fail("Email atau password salah!");

        const match = await bcrypt.compare(parsed.data.password, user.password);
        if (!match) return fail("Email atau password salah!");

        const token = signToken({
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        return success(
            {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            "Login berhasil"
        );
    } catch (e: any) {
        return fail(e.message);
    }
}


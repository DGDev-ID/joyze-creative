import { auth } from "./auth";
import { adminOnly } from "./role";

export async function adminMiddleware(req: Request) {
    const { user, error } = await auth(req);
    if (error) return error;

    const roleCheck = adminOnly(user);
    if (roleCheck) return roleCheck;

    return undefined;
}
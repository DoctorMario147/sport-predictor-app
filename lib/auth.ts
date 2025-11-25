import { cookies } from "next/headers";

export async function requireUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) return null;

    return Number(userId);
}
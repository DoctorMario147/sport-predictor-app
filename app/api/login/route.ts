import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { passcode } = await req.json();

    const user = await prisma.user.findUnique({
        where: { passcode },
    });

    if (!user) {
        return new NextResponse("Invalid passcode", { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("userId", String(user.id), {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });

    return res;
}
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {UpdatePredictionBody} from "@/types/prediction";

export async function POST(req: Request) {
    const { predictions } = (await req.json()) as UpdatePredictionBody;

    const cookieHeader = req.headers.get("cookie") || "";
    const userIdCookie = cookieHeader
        .split("; ")
        .find((c) => c.startsWith("userId="))
            ?.split("=")[1];

    if (!userIdCookie) {
        return new NextResponse("Not logged in", { status : 401 });
    }

    const userId = Number(userIdCookie);

    const entries = Object.entries(predictions);

    for (const [fixtureId, p] of entries) {
        const fixtureInt = Number(fixtureId);

        await prisma.fixturePrediction.upsert({
            where: {
                userId_fixtureId: {
                    userId: userId,
                    fixtureId: fixtureInt,
                },
            },
            create: {
                userId: userId,
                fixtureId: fixtureInt,
                predictedHome: Number(p.home),
                predictedAway: Number(p.away),
            },
            update: {
                predictedHome: Number(p.home),
                predictedAway: Number(p.away),
            },
        });
    }

    return NextResponse.json({ ok: true })
}
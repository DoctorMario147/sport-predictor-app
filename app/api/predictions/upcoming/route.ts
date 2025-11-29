import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const cookieHeader = req.headers.get("cookie") || "";
    const userIdCookie = cookieHeader
        .split("; ")
        .find((c) => c.startsWith("userId="))
        ?.split("=")[1];

    if (!userIdCookie) {
        return new NextResponse("Not logged in", { status : 401 });
    }
    const userId = Number(userIdCookie);

    const fixtures = await prisma.fixture.findMany({
        where: {
            homeScore: null,
            awayScore: null,
        },
        orderBy: {
            matchTime: "asc",
        },
        include: {
            predictions: {
                where: { userId },
                select: {
                    predictedHome: true,
                    predictedAway: true
                }
            }
        }
    });

    const response = fixtures.map(f => ({
        id: f.id,
        homeTeam: f.homeTeam,
        awayTeam: f.awayTeam,
        matchTime: f.matchTime,
        predictedHome: f.predictions[0]?.predictedHome ?? 0,
        predictedAway: f.predictions[0]?.predictedAway ?? 0,
    }));

    return NextResponse.json(response);
}
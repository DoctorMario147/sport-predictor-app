import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const fixtures = await prisma.fixture.findMany({
        where: {
            homeScore: null,
            awayScore: null,
        },
        orderBy: {
            matchTime: "asc",
        },
    });

    return NextResponse.json(fixtures);
}
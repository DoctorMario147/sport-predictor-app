import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const season = process.env.CURRENT_SEASON;

        if (!season) {
            return NextResponse.json(
                { error: "CURRENT_SEASON environment variable is missing." },
                { status: 500 }
            );
        }

        const result = await prisma.fixture.aggregate({
            where: {season: season },
            _min: { matchday: true },
            _max: { matchday: true }
        });

        return NextResponse.json({
            min: result._min.matchday ?? 1,
            max: result._max.matchday ?? 1,
        });
    } catch (err) {
        console.error("Error fetching matchday range: ", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
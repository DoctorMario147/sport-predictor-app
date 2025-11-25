import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const users = await prisma.user.findMany({
        include: {
            predictions: {
                include: {
                    Fixture: true
                }
            }
        }
    });

    const leaderboard = users.map(user => {
        let points = 0;

        user.predictions.forEach(pred => {
            if (pred.correctScore) points += 4;
            else if (pred.correctResult) points += 1;
        });

        return {
            name: user.name,
            points
        };
    });

    leaderboard.sort((a, b) => b.points - a.points);

    return NextResponse.json({leaderboard});
}
import prisma from "@/lib/prisma";
import {fetchFixturesByDate} from "@/lib/apiClient";

export async function syncGameweek(): Promise<number> {
    console.log("Syncing next gameweek...");

    const agg = await prisma.fixture.aggregate({
        _max: { matchday: true }
    });

    const highest = agg._max.matchday ?? null;
    console.log("Highest matchday in DB: ", highest)

    const maxDays = 30;

    let foundMatchday: number | null = null;
    let fixturesToSave: any[] = [];
    let stopEarly = false;

    for (let offset = 0; offset < maxDays && !stopEarly; offset++) {
        const d = new Date();
        d.setDate(d.getDate() + offset);
        const dateFrom = d.toISOString().slice(0, 10);
        d.setDate(d.getDate() + 1);
        const dateTo = d.toISOString().slice(0, 10);

        console.log("Checking: ", dateFrom, " to ", dateTo);

        const fixtures = await fetchFixturesByDate(dateFrom, dateTo);

        if (fixtures.length === 0) continue;

        if (foundMatchday === null) {
            const candidate = fixtures.find(f => f.matchday && (highest === null || f.matchday > highest));
            if (!candidate) continue;

            foundMatchday = candidate.matchday!;
            console.log("Found new matchday:", foundMatchday);
        }

        const hasNextWeek = fixtures.some(f => f.matchday && f.matchday > foundMatchday!);
        if (hasNextWeek) stopEarly = true;

        const daysForTarget = fixtures.filter(f => f.matchday === foundMatchday);
        fixturesToSave.push(...daysForTarget);
    }

    if (foundMatchday === null) {
        console.log("No new gameweek found in the next 30 days.");
        return 0;
    }

    for (const fx of fixturesToSave) {
        await prisma.fixture.upsert({
            where: { id: fx.id },
            create: {
                id: fx.id,
                homeTeam: fx.homeTeam,
                awayTeam: fx.awayTeam,
                matchTime: new Date(fx.matchTime),
                homeScore: fx.homeScore,
                awayScore: fx.awayScore,
                matchday: fx.matchday,
                season: fx.season,
            },
            update: {
                homeTeam: fx.homeTeam,
                awayTeam: fx.awayTeam,
                matchTime: new Date(fx.matchTime),
                homeScore: fx.homeScore,
                awayScore: fx.awayScore,
                matchday: fx.matchday,
                season: fx.season,
            }
        });
    }

    return fixturesToSave.length;
}
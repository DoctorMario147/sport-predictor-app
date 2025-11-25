import prisma from "@/lib/prisma";
import {fetchFixturesByIds} from "@/lib/apiClient";
import {getResult} from "@/lib/util";

export async function updateResults(): Promise<number> {
    console.log("Updating results...");

    const fixtures = await prisma.fixture.findMany({
        where: { homeScore: null },
    });

    if (fixtures.length === 0) {
        console.log("No fixtures to update.");
        return 0;
    }

    const ids = fixtures.map(f => f.id);

    console.log(`Checking ${ids.length} fixtures...`);

    const matches = await fetchFixturesByIds(ids);
    let updatedFixtures = 0;

    for (const m of matches) {
        const home = m.score?.fullTime?.home;
        const away = m.score?.fullTime?.away;

        if (home === null || home === undefined) continue;

        const result = getResult(m);

        await prisma.fixture.update({
            where: { id: m.id },
            data: {
                homeScore: home,
                awayScore: away,
            },
        });

        const predictions = await prisma.fixturePrediction.findMany({
            where: { fixtureId: m.id },
        });

        for (const p of predictions) {
            const correctScore = p.predictedHome === home && p.predictedAway === away;

            const predictedResult =
                p.predictedHome === p.predictedAway
                    ? "D"
                    : p.predictedHome > p.predictedAway
                    ? "H"
                    : "A";

            const correctResult = predictedResult === result;

            await prisma.fixturePrediction.update({
                where: { id: p.id },
                data: {
                    correctScore,
                    correctResult,
                },
            });
        }

        updatedFixtures++;
    }

    return updatedFixtures;
}
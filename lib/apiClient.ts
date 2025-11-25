import {formatSeason} from "@/lib/util";

export type FixtureDTO = {
    externalId: number;
    homeTeam: string;
    awayTeam: string;
    matchTime: string;
    matchday: number;
    season: string;
    homeScore: number | null;
    awayScore: number | null;
}

const API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = "https://api.football-data.org/v4/matches";

export async function fetchFixturesByDate(dateFrom : string, dateTo : string): Promise<FixtureDTO[]> {
    const url = `${BASE_URL}?competitions=2021&dateFrom=${dateFrom}&dateTo=${dateTo}`;

    async function makeRequest() {
        try {
            return await fetch(url, { headers: { "X-Auth-Token": API_KEY ?? "" } });
        } catch (err: any) {
            console.warn("Network error, retrying once in 5s...", err.message);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return await fetch(url, { headers: { "X-Auth-Token": API_KEY ?? "" } });
        }
    }

    let res = await makeRequest();

    if (res.status === 429) {
        console.warn(`Hit API rate limit. Waiting 60 seconds before retry...`)

        await new Promise((resolve) => setTimeout(resolve, 60000));

        res = await makeRequest();

        if (res.status === 429) {
            throw new Error("API rate limit exceeded twice; aborting.");
        }
    }

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }

    const json = await res.json();
    const matches = json.matches ?? [];

    return matches.map((m: any) => ({
        id: m.id,
        homeTeam: m.homeTeam.name,
        awayTeam: m.awayTeam.name,
        matchTime: m.utcDate,
        matchday: m.matchday ?? null,
        season: formatSeason(m.season.startDate),
        homeScore: m.score?.fullTime?.home ?? null,
        awayScore: m.awayScore?.fullTime?.awayScore ?? null,
    }));
}

export async function fetchFixturesByIds(ids: number[]) {
    if (ids.length === 0) return [];

    const url = `${BASE_URL}?ids=${ids.join(',')}`;

    const res = await fetch(url, {
        headers: { "X-Auth-Token": API_KEY ?? "" }
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }

    const json = await res.json();
    return json.matches ?? [];
}
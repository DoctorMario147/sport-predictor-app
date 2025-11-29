export type Fixture = {
    id: number;
    externalId: number;
    homeTeam: string;
    awayTeam: string;
    matchTime: string;
    matchday: number;
    homeScore: number | null;
    awayScore: number | null;
    season: string;
};

export type UpcomingFixture = Fixture & {
    predictedHome: number;
    predictedAway: number;
}
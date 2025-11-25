import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const data = {
    matches: [
        {
            "area": {
                "id": 2072,
                "name": "England",
                "code": "ENG",
                "flag": "https://crests.football-data.org/770.svg"
            },
            "competition": {
                "id": 2021,
                "name": "Premier League",
                "code": "PL",
                "type": "LEAGUE",
                "emblem": "https://crests.football-data.org/PL.png"
            },
            "season": {
                "id": 2403,
                "startDate": "2025-08-15",
                "endDate": "2026-05-24",
                "currentMatchday": 12,
                "winner": null
            },
            "id": 537893,
            "utcDate": "2025-11-08T12:30:00Z",
            "status": "FINISHED",
            "matchday": 11,
            "stage": "REGULAR_SEASON",
            "group": null,
            "lastUpdated": "2025-11-16T00:21:05Z",
            "homeTeam": {
                "id": 73,
                "name": "Tottenham Hotspur FC",
                "shortName": "Tottenham",
                "tla": "TOT",
                "crest": "https://crests.football-data.org/73.png"
            },
            "awayTeam": {
                "id": 66,
                "name": "Manchester United FC",
                "shortName": "Man United",
                "tla": "MUN",
                "crest": "https://crests.football-data.org/66.png"
            },
            "score": {
                "winner": "DRAW",
                "duration": "REGULAR",
                "fullTime": {
                    "home": 2,
                    "away": 2
                },
                "halfTime": {
                    "home": 0,
                    "away": 1
                }
            },
            "odds": {
                "msg": "Activate Odds-Package in User-Panel to retrieve odds."
            },
            "referees": [
                {
                    "id": 213813,
                    "name": "Sam Barrott",
                    "type": "REFEREE",
                    "nationality": "England"
                }
            ]
        },
        {
            "area": {
                "id": 2072,
                "name": "England",
                "code": "ENG",
                "flag": "https://crests.football-data.org/770.svg"
            },
            "competition": {
                "id": 2021,
                "name": "Premier League",
                "code": "PL",
                "type": "LEAGUE",
                "emblem": "https://crests.football-data.org/PL.png"
            },
            "season": {
                "id": 2403,
                "startDate": "2025-08-15",
                "endDate": "2026-05-24",
                "currentMatchday": 12,
                "winner": null
            },
            "id": 537894,
            "utcDate": "2025-11-08T15:00:00Z",
            "status": "FINISHED",
            "matchday": 11,
            "stage": "REGULAR_SEASON",
            "group": null,
            "lastUpdated": "2025-11-16T00:21:05Z",
            "homeTeam": {
                "id": 563,
                "name": "West Ham United FC",
                "shortName": "West Ham",
                "tla": "WHU",
                "crest": "https://crests.football-data.org/563.png"
            },
            "awayTeam": {
                "id": 328,
                "name": "Burnley FC",
                "shortName": "Burnley",
                "tla": "BUR",
                "crest": "https://crests.football-data.org/328.png"
            },
            "score": {
                "winner": "HOME_TEAM",
                "duration": "REGULAR",
                "fullTime": {
                    "home": 3,
                    "away": 2
                },
                "halfTime": {
                    "home": 1,
                    "away": 1
                }
            },
            "odds": {
                "msg": "Activate Odds-Package in User-Panel to retrieve odds."
            },
            "referees": [
                {
                    "id": 11405,
                    "name": "Michael Salisbury",
                    "type": "REFEREE",
                    "nationality": "England"
                }
            ]
        },
        {
            "area": {
                "id": 2072,
                "name": "England",
                "code": "ENG",
                "flag": "https://crests.football-data.org/770.svg"
            },
            "competition": {
                "id": 2021,
                "name": "Premier League",
                "code": "PL",
                "type": "LEAGUE",
                "emblem": "https://crests.football-data.org/PL.png"
            },
            "season": {
                "id": 2403,
                "startDate": "2025-08-15",
                "endDate": "2026-05-24",
                "currentMatchday": 12,
                "winner": null
            },
            "id": 537890,
            "utcDate": "2025-11-08T15:00:00Z",
            "status": "FINISHED",
            "matchday": 11,
            "stage": "REGULAR_SEASON",
            "group": null,
            "lastUpdated": "2025-11-16T00:21:05Z",
            "homeTeam": {
                "id": 62,
                "name": "Everton FC",
                "shortName": "Everton",
                "tla": "EVE",
                "crest": "https://crests.football-data.org/62.png"
            },
            "awayTeam": {
                "id": 63,
                "name": "Fulham FC",
                "shortName": "Fulham",
                "tla": "FUL",
                "crest": "https://crests.football-data.org/63.png"
            },
            "score": {
                "winner": "HOME_TEAM",
                "duration": "REGULAR",
                "fullTime": {
                    "home": 2,
                    "away": 0
                },
                "halfTime": {
                    "home": 1,
                    "away": 0
                }
            },
            "odds": {
                "msg": "Activate Odds-Package in User-Panel to retrieve odds."
            },
            "referees": [
                {
                    "id": 11423,
                    "name": "Andy Madley",
                    "type": "REFEREE",
                    "nationality": "England"
                }
            ]
        },
        {
            "area": {
                "id": 2072,
                "name": "England",
                "code": "ENG",
                "flag": "https://crests.football-data.org/770.svg"
            },
            "competition": {
                "id": 2021,
                "name": "Premier League",
                "code": "PL",
                "type": "LEAGUE",
                "emblem": "https://crests.football-data.org/PL.png"
            },
            "season": {
                "id": 2403,
                "startDate": "2025-08-15",
                "endDate": "2026-05-24",
                "currentMatchday": 12,
                "winner": null
            },
            "id": 537885,
            "utcDate": "2025-11-08T17:30:00Z",
            "status": "FINISHED",
            "matchday": 11,
            "stage": "REGULAR_SEASON",
            "group": null,
            "lastUpdated": "2025-11-16T00:21:05Z",
            "homeTeam": {
                "id": 71,
                "name": "Sunderland AFC",
                "shortName": "Sunderland",
                "tla": "SUN",
                "crest": "https://crests.football-data.org/71.png"
            },
            "awayTeam": {
                "id": 57,
                "name": "Arsenal FC",
                "shortName": "Arsenal",
                "tla": "ARS",
                "crest": "https://crests.football-data.org/57.png"
            },
            "score": {
                "winner": "DRAW",
                "duration": "REGULAR",
                "fullTime": {
                    "home": 2,
                    "away": 2
                },
                "halfTime": {
                    "home": 1,
                    "away": 0
                }
            },
            "odds": {
                "msg": "Activate Odds-Package in User-Panel to retrieve odds."
            },
            "referees": [
                {
                    "id": 11585,
                    "name": "Craig Pawson",
                    "type": "REFEREE",
                    "nationality": "England"
                }
            ]
        },
        {
            "area": {
                "id": 2072,
                "name": "England",
                "code": "ENG",
                "flag": "https://crests.football-data.org/770.svg"
            },
            "competition": {
                "id": 2021,
                "name": "Premier League",
                "code": "PL",
                "type": "LEAGUE",
                "emblem": "https://crests.football-data.org/PL.png"
            },
            "season": {
                "id": 2403,
                "startDate": "2025-08-15",
                "endDate": "2026-05-24",
                "currentMatchday": 12,
                "winner": null
            },
            "id": 537889,
            "utcDate": "2025-11-08T20:00:00Z",
            "status": "FINISHED",
            "matchday": 11,
            "stage": "REGULAR_SEASON",
            "group": null,
            "lastUpdated": "2025-11-16T00:21:05Z",
            "homeTeam": {
                "id": 61,
                "name": "Chelsea FC",
                "shortName": "Chelsea",
                "tla": "CHE",
                "crest": "https://crests.football-data.org/61.png"
            },
            "awayTeam": {
                "id": 76,
                "name": "Wolverhampton Wanderers FC",
                "shortName": "Wolverhampton",
                "tla": "WOL",
                "crest": "https://crests.football-data.org/76.png"
            },
            "score": {
                "winner": "HOME_TEAM",
                "duration": "REGULAR",
                "fullTime": {
                    "home": 3,
                    "away": 0
                },
                "halfTime": {
                    "home": 0,
                    "away": 0
                }
            },
            "odds": {
                "msg": "Activate Odds-Package in User-Panel to retrieve odds."
            },
            "referees": [
                {
                    "id": 113767,
                    "name": "Andrew Kitchen",
                    "type": "REFEREE",
                    "nationality": "England"
                }
            ]
        }
    ]
}

function calcSeason(startDate: string): string {
    const year = Number(startDate.substring(2, 4));
    return `${year}/${year + 1}`;
}

async function main() {
    console.log("Seeding fixtures...");

    const userId = 1;

    for (const m of data.matches) {
        const season = calcSeason(m.season.startDate);

        await prisma.fixture.upsert({
            where: { id: m.id },
            create: {
                id: m.id,
                homeTeam: m.homeTeam.name,
                awayTeam: m.awayTeam.name,
                matchTime: new Date(m.utcDate),
                matchday: m.matchday,
                season: season,
                homeScore: null,
                awayScore: null,
            },
            update: {
                homeTeam: m.homeTeam.name,
                awayTeam: m.awayTeam.name,
                matchTime: new Date(m.utcDate),
                matchday: m.matchday,
                season: season,
                homeScore: null,
                awayScore: null,
            }
        });

        await prisma.fixturePrediction.create({
            data: {
                userId,
                fixtureId: m.id,
                predictedHome: 3,
                predictedAway: 0,
            },
        });

        console.log(`Seeded fixture ${m.id}`);
    }

    console.log("Fixture seed complete.");
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(() => prisma.$disconnect());
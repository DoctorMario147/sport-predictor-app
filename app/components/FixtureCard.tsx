"use client";

import Image from "next/image";
import { teamColours } from "@/data/teamColours";
import { formatTeamKey } from "@/lib/util";

interface FixtureCardProps {
    f: {
        id: number;
        homeTeam: string;
        awayTeam: string;
        predictedHome?: string;
        predictedAway?: string;
        onPredict?: (fixtureId: number, side: "home" | "away", value: string) => void;
    };
}

export default function FixtureCard({ f } : FixtureCardProps) {
    const homeColour = teamColours[formatTeamKey(f.homeTeam)];
    const awayColour = teamColours[formatTeamKey(f.awayTeam)];

    return (
        <div key={f.id} className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden relative h-32">
            <div
                className="absolute inset-0"
                style={{background: `linear-gradient(to right, ${homeColour} 25%, ${awayColour} 75%)`}}
            ></div>

            <div className="relative flex items-center justify-between px-6 h-full">
                <div className="flex items-center gap-3">
                    <img
                        src={`/teams/${formatTeamKey(f.homeTeam)}.png`}
                        className="w-12 h-12 object-contain"
                        alt={f.homeTeam}
                    />
                </div>

                <div className="flex items-center gap-2 justify-center flex-1">
                    <input
                        type="number"
                        value={f.predictedHome ?? ""}
                        placeholder="0"
                        pattern="[0-9]*"
                        className="w-12 bg-transparent text-white text-4xl font-bold text-center focus:outline-none"
                        onChange={(e) =>
                            f.onPredict?.(
                                f.id,
                                "home",
                                e.target.value
                            )
                        }
                    />

                    <span className="text-white text-4xl font-bold">-</span>

                    <input
                        type="number"
                        value={f.predictedAway ?? ""}
                        placeholder="0"
                        pattern="[0-9]*"
                        className="w-12 bg-transparent text-white text-4xl font-bold text-center focus:outline-none"
                        onChange={(e) =>
                            f.onPredict?.(
                                f.id,
                                "away",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div className="flex items-center gap-3 flex-row-reverse">
                    <img
                        src={`/teams/${formatTeamKey(f.awayTeam)}.png`}
                        className="w-12 h-12 object-contain"
                        alt={f.awayTeam}
                    />
                </div>
            </div>
        </div>
    );
}
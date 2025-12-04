"use client";

import Navbar from "@/app/components/Navbar";
import {useEffect, useRef, useState} from "react";
import { PredictionMap } from "@/types/prediction";
import {Fixture, UpcomingFixture} from "@/types/fixture";
import FixtureCard from "@/app/components/FixtureCard";
import { useRouter } from "next/navigation";

export default function PredictionsPage() {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [predictions, setPredictions] = useState<PredictionMap>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [minMatchday, setMinMatchday] = useState<number | null>(null);
    const [maxMatchday, setMaxMatchday] = useState<number | null>(null);
    const [matchday, setMatchday] = useState<number | null>(null);

    const homeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            if (minMatchday === null || maxMatchday === null) {
                const rangeRes = await fetch("/api/predictions/matchdays");
                const rangeData = await rangeRes.json();

                setMinMatchday(rangeData.min);
                setMaxMatchday(rangeData.max);

                if (matchday === null) {
                    setMatchday(rangeData.max);
                }

                return;
            }

            if (matchday === null) return;

            const res = await fetch(`/api/predictions/upcoming?matchday=${matchday}`);

            if (res.status === 401) {
                router.push("/login");
                return;
            }

            const data: UpcomingFixture[] = await res.json();
            setFixtures(data);

            const initialPreds: PredictionMap = {};
            data.forEach(f => {
                initialPreds[f.id] = {
                    home: f.predictedHome.toString(),
                    away: f.predictedAway.toString()
                };
            });

            setPredictions(initialPreds);
            setLoading(false);
        };

        loadData();
    }, [matchday, minMatchday, maxMatchday, router]);

    const updatePrediction = (fixtureId: number, field: "home" | "away", rawValue: string) => {
        let value = Number(rawValue);

        if (value < 0) value = 0;
        if (value > 9) value = 9;

        setPredictions((prev) => ({
            ...prev,
            [fixtureId]: {
                ...prev[fixtureId],
                [field]: value.toString(),
            },
        }));
    };

    const handleSubmit = async() => {
        for (const f of fixtures) {
            const p = predictions[f.id];
            if (!p || p.home === "" || p.away === "") {
                alert("All prediction fields must be filled.");
                return;
            }
        }

        setSubmitting(true);

        const res = await fetch("/api/predictions/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ predictions }),
        });

        setSubmitting(false);

        if (!res.ok) {
            alert("Error submitting predictions.")
            return;
        }

        alert("Predictions updated!");
    };

    if (loading) return <div className="max-w-4xl mx-auto p-6"> <Navbar /> <p className="p-4">Loading...</p> </div>;

    return (
      <div className="max-w-4xl mx-auto p-6">
          <Navbar />

          {matchday !== null && minMatchday !== null && maxMatchday !== null && (
              <div className="flex justify-center items-center gap-4 my-6">
                  <button
                      className="px-4 py-2 bg-blue-600 rounded disabled:bg-blue-300"
                      onClick={() => setMatchday(prev => prev! - 1)}
                      disabled={matchday <= minMatchday}
                  >
                      ←
                  </button>

                  <div className="font-semibold text-lg">Matchday {matchday}</div>

                  <button
                      className="px-4 py-2 bg-blue-600 rounded disabled:bg-blue-300"
                      onClick={() => setMatchday(prev => prev! + 1)}
                      disabled={matchday >= maxMatchday}
                  >
                      →
                  </button>
              </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fixtures.map((f, index) => (
                  <FixtureCard
                      key = {f.id}
                      index={index}
                      total={fixtures.length}
                      setHomeRef={(el) => (homeInputRefs.current[index] = el)}
                      focusNext={() => {
                          const next = homeInputRefs.current[index + 1];
                          if (next) {
                              next.focus();
                              next.select();
                          }
                      }}
                      f={{
                        id: f.id,
                        homeTeam: f.homeTeam,
                        awayTeam: f.awayTeam,
                        predictedHome: predictions[f.id]?.home || "",
                        predictedAway: predictions[f.id]?.away || "",
                        onPredict: updatePrediction,
                      }}
                  />
              ))}
          </div>

          <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-8 w-1/2 mx-auto bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold block"
          >
              {submitting ? "Saving..." : "Update Predictions"}
          </button>
      </div>
    );
}
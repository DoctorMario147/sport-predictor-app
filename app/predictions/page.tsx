"use client";

import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { PredictionMap } from "@/types/prediction";
import { Fixture } from "@/types/fixture";
import { teamColours } from "@/data/teamColours";
import { formatTeamKey } from "@/lib/util";
import FixtureCard from "@/app/components/FixtureCard";
import {requireUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {useRouter} from "next/router";

export default function PredictionsPage() {
    const [userId, setUserId] = useState<string | null>(null);
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [predictions, setPredictions] = useState<PredictionMap>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find((c) => c.startsWith("userId="))
            ?.split("=")[1];

        if (!cookie) {
            window.location.href = "/login";
            return;
        }

        setUserId(cookie);

        const load = async () => {
            const res = await fetch("/api/predictions/upcoming");
            const data = await res.json();
            setFixtures(data);
            setLoading(false);
        };
        load();
    }, []);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fixtures.map((f) => (
                  <FixtureCard
                      key = {f.id}
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
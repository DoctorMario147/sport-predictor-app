"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";

type LeaderboardEntry = {
    name: string;
    points: number;
}

export default function LeaderboardPage() {
    const [data, setData] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        fetch("/api/leaderboard")
            .then(res => res.json())
            .then(json => setData(json.leaderboard));
    }, [])

    return (
        <div className="p-8">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, idx) => (
                        <tr key={idx} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
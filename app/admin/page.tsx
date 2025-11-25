"use client";

import { useState } from "react";

export default function AdminPage() {
    const [gameweekStatus, setGameweekStatus] = useState("");
    const [resultStatus, setResultStatus] = useState("");

    async function handleLoadGameweek() {
        setGameweekStatus("Loading...");
        try {
            const res = await fetch("/api/admin/load-gameweek", { method: "POST" });
            const data = await res.json();
            setGameweekStatus(data.message);
        } catch (err) {
            setGameweekStatus("Error loading gameweek.");
        }
    }

    async function handleUpdateResults() {
        setResultStatus("Updating...");
        try {
            const res = await fetch("/api/admin/update-results", { method: "POST" });
            const data = await res.json();
            setResultStatus(data.message);
        } catch (err) {
            setResultStatus("Error updating results.");
        }
    }

    return (
        <div className="p-6 max-w 3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <div className="p-4 border rounded-1g shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">Load Next Gameweek</h2>
                <button onClick={handleLoadGameweek} className="px-4 py-2 bg-blue-600 text-white rounded">Load Gameweek</button>
                <p className="mt-2 text-gray-600">{gameweekStatus}</p>
            </div>

            <div className="p-4 border rounded-1g shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">Update Results</h2>
                <button onClick={handleUpdateResults} className="px-4 py-2 bg-green-600 text-white rounded">Update Results</button>
                <p className="mt-2 text-gray-600">{resultStatus}</p>
            </div>
        </div>
    );
}
"use client";

import { useState } from "react";

export default function LoginPage() {
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch("api/login", {
            method: "POST",
            body: JSON.stringify({ passcode }),
        });

        if (res.ok) {
            window.location.href = "/predictions";
        } else {
            setError("Invalid login passcode");
        }
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="border w-full p-3 rounded"
                    placeholder="Enter code"
                />

                {error && <p className="text-red-600">{error}</p>}

                <button className="w-full bg-blue-600 text-white p-3 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
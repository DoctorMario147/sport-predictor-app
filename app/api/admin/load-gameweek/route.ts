import { NextResponse } from "next/server";
import { syncGameweek } from "@/scripts/syncGameweek";

export async function POST() {
    try {
        const count = await syncGameweek();
        return NextResponse.json({ message: `Loaded ${count} fixtures`});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: `Failed to load the game week` }, { status: 500 });
    }
}
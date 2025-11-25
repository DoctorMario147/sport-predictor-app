import { NextResponse } from "next/server";
import { updateResults } from "@/scripts/updateResults";

export async function POST() {
    try {
        const updated = await updateResults();
        return NextResponse.json({ message: `Updated ${updated} results.`});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: `Failed to update results.` }, { status: 500 });
    }
}
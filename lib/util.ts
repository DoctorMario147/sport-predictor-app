export function formatSeason(seasonStart: string): string {
    const year = new Date(seasonStart).getFullYear();
    const yy = year % 100;
    const next = (yy + 1) % 100;
    return `${yy.toString().padStart(2, "0")}/${next.toString().padStart(2, "0")}`;
}

export function getResult(m: any): "H" | "A" | "D" | null {
    const w = m.score?.winner;
    if (w === "HOME_TEAM") return "H";
    if (w === "AWAY_TEAM") return "A";
    if (w === "DRAW") return "D";
    return null;
}

export function formatTeamKey(name: string): string {
    return name.replace(/\s+/g, "").toLowerCase();
}
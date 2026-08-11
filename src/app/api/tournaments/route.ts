import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the shape of our parsed tournament data
export interface Tournament {
  id: number;
  name: string;
  shortName: string;
  mode: string;
  format: string;
  rankLimitMin: string;
  rankLimitMax: string;
  regStart: string;
  regEnd: string;
  tourneyStart: string;
  tourneyEnd: string;
  forumPost?: string;
  forumId?: string;
  url?: string;
  regLimit?: string;
  badge?: string;
  badgeUrl?: string;
}

export async function GET() {
  const filePath = path.join(process.cwd(), "src/data/tournaments.md");
  let fileContent = "";

  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error("Failed to read tournaments.md:", err);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }

  const tournaments: Tournament[] = [];
  const blocks = fileContent.split("## ").slice(1);

  blocks.forEach((block, index) => {
    const lines = block.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const name = lines[0];

    // Initialize with empty defaults
    const obj: any = { id: index + 1, name };

    lines.slice(1).forEach(line => {
      const match = line.match(/-\s+\*\*(.+?)\*\*:\s+(.+)/);
      if (match) {
        obj[match[1]] = match[2].trim();
      }
    });
    tournaments.push(obj as Tournament);
  });

  return NextResponse.json(tournaments);
}

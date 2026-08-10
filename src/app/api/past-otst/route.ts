import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface PastEvent {
  title: string;
  id: string;
  date: string;
  winner: string;
  description: string;
  color: string;
  imagePath: string;
  participantCount: string;
  backgroundImagePath: string;
}

export async function GET() {
  const filePath = path.join(process.cwd(), "src/data/past_otst.md");
  let fileContent = "";

  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error("Failed to read past_otst.md:", err);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }

  const events: PastEvent[] = [];
  const blocks = fileContent.split("## ").slice(1);

  blocks.forEach((block) => {
    const lines = block.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const title = lines[0];

    const obj: any = { title };

    lines.slice(1).forEach(line => {
      const match = line.match(/-\s+\*\*(.+?)\*\*:\s+(.+)/);
      if (match) {
        obj[match[1]] = match[2].trim();
      }
    });
    events.push(obj as PastEvent);
  });

  return NextResponse.json(events);
}

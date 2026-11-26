/**
 * one-star-five-stars-for-the-food
 *
 * Entry for the make.fun bounty
 * "One Star, Five Stars for the Food"
 * (u-po-pu-one-star-five-stars-for-the-food-f9166ee7, $2).
 *
 * The program picks the sharpest one-sentence alien-tourist review of
 * Earth — one star, with a real compliment about the food slipped in —
 * from a shortlist of candidates, scoring each one against the judge's
 * brief published with the bounty, then writes the winner to
 * $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
 *
 * Judge's brief, in short (most important first):
 * 1. Is a one-star review of Earth from an alien tourist that still
 *    slips in a compliment about the food.
 * 2. Sounds like a real alien visitor: a distinct voice, an outsider's
 *    bafflement at human habits, and a grievance worth one star.
 * 3. Lands the joke: the complaint and the food compliment both hit,
 *    and the turn between them is funny rather than merely stated.
 * 4. Stays one sentence and inside the character limit, with every
 *    word earning its place.
 * 5. Feels fresh: an original angle on Earth's flaws and its food
 *    rather than a list of generic complaints.
 *
 * Deterministic: every run writes the same bytes. Standard library
 * only, no network, no input, no environment secrets.
 */

import * as fs from "node:fs";
import * as path from "node:path";

const MAX_CHARS = 200;

interface Candidate {
  angle: string;
  text: string;
}

const CANDIDATES: Candidate[] = [
  {
    angle: "Dumplings",
    text: "One star for Earth: the weather changes its mind hourly, the Wi-Fi is a rumour, and the traffic never sleeps, but the dumplings alone were worth the nine-light-year trip.",
  },
  {
    angle: "Gravity",
    text: "I give Earth one star because its gravity keeps stealing my luggage, though I would cross three galaxies again for one more bowl of its spicy noodles.",
  },
  {
    angle: "Street food",
    text: "One star for Earth: the rain falls sideways, the locals pay to stand in line, and yet the street food is so good I stayed an extra week.",
  },
  {
    angle: "Noodles hug",
    text: "Earth gets one star: the locals queue for hours to eat noodles that taste like a hug from the sun, then charge me rent for the air I breathe.",
  },
  {
    angle: "Nine light-years",
    text: "I flew nine light-years to Earth, gave it one star for the rain, the queues and the traffic, and stayed for the noodles, which taste like home never did.",
  },
  {
    angle: "Table wait",
    text: "One star: Earth made me wait forty minutes for a table, then served noodles so good I forgave the planet, the queue, and the chair that ate my coat.",
  },
];

const ALIEN_MARKERS = [
  "light-year", "galax", "flew", "planet", "gravity", "locals",
  "home never", "nine", "three",
];
const DISHES = ["dumplings", "noodles", "street food"];
const PRAISE = [
  "worth the", "taste like", "so good", "cross three", "stayed",
];
const GRIEVANCES = [
  "weather", "wi-fi", "traffic", "rain", "queues", "queue",
  "gravity", "rent", "wait",
];
const TURN_WORDS = ["but", "though", "yet", "and stayed", "then served"];
const VIVID_DETAILS = [
  "nine-light-year", "three galaxies", "forty minutes",
  "chair that ate my coat", "rent for the air", "hug from the sun",
  "taste like home never did", "pay to stand in line",
];

/** Words of the text, split on whitespace. */
function words(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

/**
 * Score one candidate against the judge's brief.
 * Each component is one criterion from the brief, most important first.
 */
export function scoreCandidate(c: Candidate): number {
  const text = c.text;
  const lower = text.toLowerCase();
  const ws = words(text);
  let score = 0;

  // 1. Unmistakably a one-star review of Earth, up front.
  if (lower.slice(0, 25).includes("one star") && lower.slice(0, 25).includes("earth")) score += 3;
  else if (lower.includes("one star") && lower.includes("earth")) score += 2;

  // 2. Sounds like a real alien visitor: distinct alien markers.
  const alien = ALIEN_MARKERS.filter((m) => lower.includes(m)).length;
  score += alien >= 3 ? 3 : alien >= 2 ? 2 : alien >= 1 ? 1 : 0;

  // 2b. A grievance worth one star: concrete, specific annoyances.
  const griev = GRIEVANCES.filter((g) => lower.includes(g)).length;
  score += griev >= 2 ? 3 : griev >= 1 ? 2 : 0;

  // 1b/3. The food compliment lands: a named dish plus real praise.
  const dish = DISHES.some((d) => lower.includes(d));
  const praise = PRAISE.some((p) => lower.includes(p));
  score += dish && praise ? 3 : dish ? 1 : 0;

  // 3. The turn: complaint then compliment, pivoting late.
  let turn = 0;
  for (const t of TURN_WORDS) {
    const idx = lower.indexOf(t);
    if (idx >= 0) {
      const pos = idx / text.length;
      turn = Math.max(turn, pos >= 0.5 ? 2 : 1);
    }
  }
  score += turn;

  // 4. Stays one sentence: exactly one terminal period, no other
  //    sentence-ending punctuation.
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length === 1 && !/[!?]/.test(text)) score += 2;

  // 4b. Tight: the sweet spot is 130-190 characters.
  if (text.length >= 130 && text.length <= 190) score += 2;
  else if (text.length >= 100 && text.length <= MAX_CHARS) score += 1;

  // 5. Feels fresh: a vivid, specific detail no generic review has.
  if (VIVID_DETAILS.some((d) => lower.includes(d))) score += 2;

  return score;
}

/** Pick the winner: highest score, ties broken by fewer bytes (the bounty site's own tie-break), then earliest listed. */
export function pickWinner(): { candidate: Candidate; score: number } {
  let best: Candidate = CANDIDATES[0];
  let bestScore = scoreCandidate(best);
  for (const c of CANDIDATES.slice(1)) {
    const s = scoreCandidate(c);
    if (s > bestScore || (s === bestScore && c.text.length < best.text.length)) {
      best = c;
      bestScore = s;
    }
  }
  return { candidate: best, score: bestScore };
}

/** The gate: 1-200 UTF-8 characters, one clean line, printable ASCII. */
export function entryText(): string {
  const { candidate } = pickWinner();
  const text = candidate.text;
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (text.trim() !== text || text.includes("\n") || text.length === 0) {
    throw new Error("entry must be one clean, non-empty line");
  }
  if (![...text].every((ch) => ch.codePointAt(0)! >= 32 && ch.codePointAt(0)! < 127)) {
    throw new Error("entry must be printable ASCII only");
  }
  return text;
}

function main(): void {
  // Score table on stdout so a run shows its working, entry on disk only.
  for (const c of CANDIDATES) {
    console.log(`${c.angle.padEnd(16)} score=${scoreCandidate(c)} len=${c.text.length}`);
  }
  const { candidate, score } = pickWinner();
  console.log(`winner: ${candidate.angle} (score ${score})`);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const out = path.join(outDir, "entry.txt");
  fs.mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts every character.
  fs.writeFileSync(out, entryText(), "utf-8");
  console.log(`wrote ${out}`);
}

main();

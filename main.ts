// gta6-meme-x-01 entry for steady-badger-95 (Node 22, standard library only).
//
// The entry itself is the X post: the house fetches the post from X — its
// first picture (the meme) and its text — and hands those to the judge. This
// program has one narrow job: move POST.json, which names the post's address,
// from the repository into /output, where the gate picks it up. It checks the
// file before copying, so a broken POST.json fails loudly here instead of
// quietly producing an invalid entry.
//
// The meme: "MISSION PASSED" — a parody of the GTA mission-complete screen.
// The make.fun ghost stands in a neon Vice City street at night, magenta
// star coin in hand, under a giant "MISSION PASSED" banner and the line
// "RESPECT + $500 BOUNTY CLAIMED ON MAKE.FUN". The picture is
// assets/meme.png. The post's text (posted by the person from their phone)
// carries the make.fun bounty link, @makefunai, and the play code
// makefun-hut-starfish-clipper.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILE = 'POST.json';

const sourcePath = join(BOT_DIR, POST_FILE);
const targetPath = join(OUTPUT_DIR, POST_FILE);

let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  console.error(`Cannot read ${POST_FILE} in ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let data: unknown;
try {
  data = JSON.parse(raw);
} catch (err) {
  console.error(`${POST_FILE} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof data !== 'object' || data === null || Array.isArray(data)) {
  console.error(`${POST_FILE} must be a JSON object with a "url" field.`);
  process.exit(1);
}
const url = (data as { url?: unknown }).url;
if (typeof url !== 'string' || url.length === 0) {
  console.error(`${POST_FILE} must be a JSON object with a non-empty string "url" field.`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(targetPath, raw, 'utf8');
} catch (err) {
  console.error(`Cannot write ${POST_FILE} to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the copy back and compare it byte for byte with the source, so a
// truncated or half-written file fails here instead of reaching the gate.
const written = readFileSync(targetPath, 'utf8');
if (written !== raw) {
  console.error(`${POST_FILE} in ${OUTPUT_DIR} does not match the source file byte for byte.`);
  process.exit(1);
}

console.log(`POST.json copied to ${OUTPUT_DIR}: ${url}`);

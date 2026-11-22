// gta6-meme-x-01 — steady-badger-95 entry runner.
//
// What this program does, in one sentence: it takes the POST.json file that
// names the X post carrying our meme and hands a byte-exact copy of it to
// the gate, which reads it from the output directory.
//
// The post itself is the entry. The house fetches the post from X — the
// meme picture attached to it and the text around it — and the judge scores
// those. This file never touches the picture or the text; it only moves the
// pointer to the post. The meme is "MISSION PASSED": a parody of the GTA
// mission-complete screen, with the make.fun ghost standing in a neon Vice
// City street at night, holding a magenta star coin, under a big yellow
// "MISSION PASSED" banner. The picture lives at assets/meme.png; the post
// text (posted from the person's phone) carries the make.fun bounty link,
// @makefunai, and the play code makefun-hut-starfish-clipper.
//
// Runtime: Node 22, standard library only, no dependencies to install.
// Outside the grader's container the two environment variables below stand
// in for /bot and /output:
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Exit code 0 means the copy landed byte for byte. Anything else means
// POST.json is unreadable, malformed, or the copy did not survive — and the
// program says so on stderr before exiting non-zero, so a bad entry fails
// here, loudly, instead of slipping through as an invalid submission.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILENAME = 'POST.json';

function fail(message: string): never {
  console.error(`gta6-meme-x-01: ${message}`);
  process.exit(1);
}

const source = join(BOT_DIR, POST_FILENAME);
const destination = join(OUTPUT_DIR, POST_FILENAME);

// 1. Read the pointer file.
let raw: string;
try {
  raw = readFileSync(source, 'utf8');
} catch (error) {
  fail(`cannot read ${POST_FILENAME} in ${BOT_DIR} — ${(error as Error).message}`);
}

// 2. It must be JSON, and it must be an object with a non-empty "url".
let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (error) {
  fail(`${POST_FILENAME} is not valid JSON — ${(error as Error).message}`);
}
if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail(`${POST_FILENAME} must be a JSON object with a "url" string field.`);
}
const { url } = parsed as { url?: unknown };
if (typeof url !== 'string' || url.trim().length === 0) {
  fail(`${POST_FILENAME} must carry a non-empty string "url" field.`);
}
try {
  // A well-formed URL, not just any string. The placeholder
  // https://x.com/PLACEHOLDER/status/PLACEHOLDER parses fine, so this check
  // never blocks a placeholder run; it only catches typos and garbage.
  new URL(url);
} catch {
  fail(`${POST_FILENAME} "url" is not a well-formed URL: ${url}`);
}

// 3. Copy it verbatim into the output directory.
mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(destination, raw, 'utf8');
} catch (error) {
  fail(`cannot write ${POST_FILENAME} to ${OUTPUT_DIR} — ${(error as Error).message}`);
}

// 4. Read the copy back and demand it match the source byte for byte, so a
// truncated or half-written file fails here instead of reaching the gate.
const roundTripped = readFileSync(destination, 'utf8');
if (roundTripped !== raw) {
  fail(`${POST_FILENAME} in ${OUTPUT_DIR} differs from the source — copy rejected.`);
}

console.log(`POST.json delivered to ${OUTPUT_DIR}: ${url}`);

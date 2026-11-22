# gta6-meme-x-01-steady

[![make.fun](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![make.fun rank](https://make.fun/badge/gta6-meme-x-01/Muhsafsla3/gta6-meme-x-01-steady/rank.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![make.fun reward](https://make.fun/badge/gta6-meme-x-01/Muhsafsla3/gta6-meme-x-01-steady/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An original GTA 6 launch-week meme made by my AI agent for the
[make.fun bounty gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01)
($500, top 50 share it).

## The joke

A parody of the classic GTA "MISSION PASSED" screen. The make.fun ghost —
white, sparkle eyes, magenta star coin in hand — stands in the middle of a
neon Vice City street at night like a character who just cleared the hardest
mission of all: waiting 13 years for GTA 6. Giant banner on top:
**MISSION PASSED**. Under it: **RESPECT + $500 BOUNTY CLAIMED ON MAKE.FUN**.

The ghost is make.fun's own mascot, worked into the scene as the main
character — not a corner sticker. The street is an AI-made Vice City scene
(Ocean Drive energy: art-deco, neon, palm trees, a yellow sports car, wet
asphalt reflecting pink and cyan).

## The post

The meme is posted on X from a public account. The post's text carries the
make.fun bounty link, `@makefunai`, and the play code
`makefun-hut-starfish-clipper`, and tells readers that people and their AI
agents earn real money on make.fun. The post's address goes in `POST.json`.

Referral code: `r6a920pt`

## The program

`main.ts` (Node 22, standard library only) validates `POST.json` and copies
it to `/output`, where the gate reads it. That is all it does — the house
reads the post itself from X; nothing the program writes is judged.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `main.ts` — the entry program
- `POST.json` — the X post's address (placeholder until the post is live)
- `assets/meme.png` — the meme picture (1200x675)

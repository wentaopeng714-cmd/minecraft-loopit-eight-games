# Twenty independent Minecraft browser games

Complete standalone projects for further polishing and Loopit handoff. Each has its own controls, scene, goal and replay flow.

## Download

> ZIP import reports: eight optional [image-reference investigation packages](loopit-import/README.md) are available. Original game ZIPs remain unchanged. Platform import of the investigation packages is not yet verified.

Each ZIP includes the playable `dist/` build, full source, tests, matching textures and model data, provenance, handoff prompts and observed validation notes. Extract it and run `python3 play.py` to play locally. Editing requires Node.js and `npm ci`.

| Case | Game | Complete ZIP |
| --- | --- | --- |
| 1 | My Track, My Ride | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.1/01-my-track-my-ride.zip) |
| 2 | Creeper Toss — Blockyard Duel | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.1/02-creeper-toss.zip) |
| 3 | Pocket Bed Wars | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/03-pocket-bed-wars.zip) |
| 4 | Steve Sky Stack | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/04-steve-sky-stack.zip) |
| 5 | Farm Feeding Time | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/05-farm-feeding-time.zip) |
| 6 | Bobber & Bite | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/06-bobber-and-bite.zip) |
| 7 | Woolly Good Day | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/07-woolly-good-day.zip) |
| 8 | Redstone Lights | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/08-redstone-lights.zip) |
| 9 | TNT Quarry Crew | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/09-tnt-quarry-crew.zip) |
| 10 | Golem Village Watch | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/10-golem-village-watch.zip) |

## Minecart and Creeper Toss packages (0.3.1)

Two additional independent complete ZIPs: My Track, My Ride gameplay version 1.2.0, and Creeper Toss gameplay version 1.1.0. These retain the existing goal, scoring, feedback and replay revisions. This release packages them without changing gameplay. All 14 minecart rule checks and 8 Creeper Toss checks pass, and both production builds pass. Existing desktop/phone-size browser observations are preserved with their dates and limitations. Each ZIP includes its playable build, source, art provenance, matching textures, historical screenshots, local preview launcher and Loopit handoff prompt. The earlier eight download links remain available.

## Revision 0.3

- TNT is a freely destructible voxel yard. Ground, walls, roofs, props and trees break. Craters change walkable terrain, and nearby TNT chains. Unlimited explosives; use flint and steel to light them.
- Farm feeding gradually unlocks rabbit, wolf, horse and cat, for eight animals and six foods. Eighteen orders per day. Matching horse UVs and quadruped body poses were corrected.
- Colored sheep wool follows the body bone and touches the body surface. All 164 patches are reachable; the next-uncut-area control reveals remaining surfaces, and swept dragging catches patches between input events.
- The other five projects retain their revision 0.2 gameplay.

## Validation

31 focused rule checks and all eight production builds pass. Browser play checks include ground and wall TNT blasts, walking into a crater, end/reset, an eighteen-order farm day, and clearing an entire 164-patch sheep. Each game's `validation.json` states the actual coverage and remaining limits. Phone-size browser input was checked; no physical iOS/Android device test is claimed. These are reviewable games, not a claim of Loopit publication or final user approval.

## Art and dependencies

Minecraft artwork and character identities belong to Mojang/Microsoft. This is an unofficial fan project, not an official Minecraft product. Asset URLs and provenance are listed per game in `public/assets/sources.json`; third-party code notices are in `public/THIRD_PARTY_NOTICES.txt`. Library licenses do not relicense the artwork. No blanket license is granted for third-party assets.


## Cases 11–20 · release 0.4.0

Ten more independent games, each with a playable build, full source, bundled matching art, a real PNG reference and handoff prompt. These have been browser-tested at desktop and phone sizes, with 30 focused rules tests and ten production builds passing. No physical-device or Loopit-import approval is claimed. Each validation.json states specific observations and limits. Existing 1–10 links remain unchanged.

| Case | Game | Complete ZIP |
| --- | --- | --- |
| 11 | Wolf Trail Home | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.1/11-wolf-trail-home-v0.2.0.zip) |
| 12 | Piston Pocket Lab | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.1/12-piston-pocket-lab-v0.2.0.zip) |
| 13 | Pearl Pocket Golf | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.1/13-pearl-pocket-golf-v0.2.0.zip) |
| 14 | Anvil After Hours | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.1/14-anvil-after-hours-v0.2.0.zip) |
| 15 | Last Second Bucket | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.0/15-last-second-bucket.zip) |
| 16 | Slime Split Mine | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.0/16-slime-split-mine.zip) |
| 17 | Ice Boat Express | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.0/17-ice-boat-express.zip) |
| 18 | TNT Floor Frenzy | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.1/18-tnt-floor-frenzy-v0.2.0.zip) |
| 19 | Piston Pause Run | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.1/19-piston-pause-run-v0.2.0.zip) |
| 20 | Elytra Ring Post | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.0/20-elytra-ring-post.zip) |

## Six-game differentiation · 0.4.1

Cases 11, 12, 13, 14, 18 and 19 are gameplay version 0.2.0. Forest escort is now free third-person exploration; only Piston Lab remains an overhead board; Pearl and Piston Sprint use first-person views with different aiming and stop/run decisions; Anvil is a side-view drag-and-release press; TNT is a close third-person last-standing contest. See [camera, gameplay and UI changes](SIX_GAME_DIFFERENTIATION.md). Nineteen rules checks and six builds pass. Actual full Wolf, Pearl and Piston Sprint goals were completed; see per-game validation for limits. Earlier ZIP release URLs remain available.

## Loopit portable variants · cases 11–20

These independent packages preserve gameplay while embedding the original PNG textures, model JSON and font. Each ready-to-run dist/index.html is self-contained. It avoids runtime image asset IDs, image proxy URLs and model-file fetch paths. All ten start/end/retry/pause flows were checked in a phone-size browser; actual Loopit import still requires verification. Original releases stay available.

| Case | Game | Portable complete ZIP |
|---|---|---|
| 11 | Wolf Trail Home | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/11-wolf-trail-home-loopit-portable.zip) |
| 12 | Piston Pocket Lab | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/12-piston-pocket-lab-loopit-portable.zip) |
| 13 | Pearl Pocket Golf | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/13-pearl-pocket-golf-loopit-portable.zip) |
| 14 | Anvil After Hours | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/14-anvil-after-hours-loopit-portable.zip) |
| 15 | Last Second Bucket | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/15-last-second-bucket-loopit-portable.zip) |
| 16 | Slime Split Mine | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/16-slime-split-mine-loopit-portable.zip) |
| 17 | Ice Boat Express | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/17-ice-boat-express-loopit-portable.zip) |
| 18 | TNT Floor Frenzy | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/18-tnt-floor-frenzy-loopit-portable.zip) |
| 19 | Piston Pause Run | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/19-piston-pause-run-loopit-portable.zip) |
| 20 | Elytra Ring Post | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.4.2/20-elytra-ring-post-loopit-portable.zip) |

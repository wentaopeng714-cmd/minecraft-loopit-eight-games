# Eight independent Minecraft browser games

Complete standalone projects for further polishing and Loopit handoff. Each has its own controls, scene, goal and replay flow.

## Download

Each ZIP includes the playable `dist/` build, full source, tests, matching textures and model data, provenance, handoff prompts and observed validation notes. Extract it and run `python3 play.py` to play locally. Editing requires Node.js and `npm ci`.

| Case | Game | Complete ZIP |
| --- | --- | --- |
| 3 | Pocket Bed Wars | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/03-pocket-bed-wars.zip) |
| 4 | Steve Sky Stack | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/04-steve-sky-stack.zip) |
| 5 | Farm Feeding Time | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/05-farm-feeding-time.zip) |
| 6 | Bobber & Bite | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/06-bobber-and-bite.zip) |
| 7 | Woolly Good Day | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/07-woolly-good-day.zip) |
| 8 | Redstone Lights | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/08-redstone-lights.zip) |
| 9 | TNT Quarry Crew | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/09-tnt-quarry-crew.zip) |
| 10 | Golem Village Watch | [Download](https://github.com/wentaopeng714-cmd/minecraft-loopit-eight-games/releases/download/v0.3.0/10-golem-village-watch.zip) |

## Revision 0.3

- TNT is a freely destructible voxel yard. Ground, walls, roofs, props and trees break. Craters change walkable terrain, and nearby TNT chains. Unlimited explosives; use flint and steel to light them.
- Farm feeding gradually unlocks rabbit, wolf, horse and cat, for eight animals and six foods. Eighteen orders per day. Matching horse UVs and quadruped body poses were corrected.
- Colored sheep wool follows the body bone and touches the body surface. All 164 patches are reachable; the next-uncut-area control reveals remaining surfaces, and swept dragging catches patches between input events.
- The other five projects retain their revision 0.2 gameplay.

## Validation

31 focused rule checks and all eight production builds pass. Browser play checks include ground and wall TNT blasts, walking into a crater, end/reset, an eighteen-order farm day, and clearing an entire 164-patch sheep. Each game's `validation.json` states the actual coverage and remaining limits. Phone-size browser input was checked; no physical iOS/Android device test is claimed. These are reviewable games, not a claim of Loopit publication or final user approval.

## Art and dependencies

Minecraft artwork and character identities belong to Mojang/Microsoft. This is an unofficial fan project, not an official Minecraft product. Asset URLs and provenance are listed per game in `public/assets/sources.json`; third-party code notices are in `public/THIRD_PARTY_NOTICES.txt`. Library licenses do not relicense the artwork. No blanket license is granted for third-party assets.

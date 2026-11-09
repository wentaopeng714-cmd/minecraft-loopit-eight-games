# Slime Split Mine

史莱姆分裂矿场 · 独立3D游戏 · Case 16

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Drag and release to launch a large Slime. It bounces and deals 2 damage to thick Ore. Tap SPLIT during flight to fan into two smaller Slimes; each has half impact strength. At most four are active. Keeping one big Slime vs splitting is the key decision. After all return, the mine advances and a new row appears. Ore touching the red line loses. Diamonds are worth 150, other blocks 50, plus 10 per hit. Every ten broken blocks offers impact +1 or split +1. Endless turns, varied Ore and rising HP create pressure.

## 镜头、美术与动作

An oblique 3D mine tray with textured Ore, HP pips, Obsidian rails, a visible red danger line, timber posts and lamps. The floor must remain below the aim line. Authentic Slime inner/outer layers, translucent green outer cube and expressive inner face; no detached flat stickers.

Visible launch squash, stretch in motion, contact compression, readable split fan-out, recovery on return. Ore cracks/chips disappear on real hits. Upgrade choices pause the action. Steve reacts beside the tray, without blocking the board.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- A real large-Slime launch broke Diamond Ore for 160 points.
- A real in-flight SPLIT produced two Slimes; a following hit took the score to 170.
- Return and row advance were observed.

仍需用户验收：

- The ten-block upgrade threshold and very long endless performance were not manually reached.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

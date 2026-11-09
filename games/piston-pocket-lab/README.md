# Piston Pocket Lab

活塞推箱实验室 · 独立3D游戏 · Case 12

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Tap a 3D Piston to push the first Ore block or connected chain in its row by one cell. Match Diamond, Iron and Gold to their corresponding pressure plates. Choose the order, because a blocked boundary stops the entire push. UNDO is free, HINT costs 25. A solved machine earns max(100,550-20*pushes-25*hints). Continue to rotated and mixed layouts; twelve authored layout variations repeat.

## 镜头、美术与动作

A fixed isometric workshop board with textured Pistons, visible heads, four numbered Piston labels and large colored Ore targets. Timber supports, lamps and a stone floor frame the puzzle without hiding target plates. Keep a complete board visible on phones.

Pistons anticipate, extend, contact the block, then retract. Blocks slide into cells instead of teleporting. Matched plates brighten; Steve watches, reacts and celebrates.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- First machine solved by three real Piston taps for 490 points.
- UNDO restored the previous state. All 24 generated test layouts had a valid solution.

仍需用户验收：

- Later layouts are solver-tested rather than all manually played.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

# Wolf Trail Home

小狼跟我走 · 独立3D游戏 · Case 11

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Draw one continuous connected trail past Wolves to CAMP, then tap WALK TRAIL; tap again to pause and redraw. Water blocks the route. The Zombie warning ring gives a visible escape cue. Each rescued Wolf earns 200, with a time bonus and a scare penalty. Reaching CAMP is required for rescue credit; stopping early only records progress. Three scares lose the trip. NEXT CAMP retains earned rescue points.

## 镜头、美术与动作

A grassy lantern camp, textured Wolves, a Bone held by Steve, a patrol Zombie and a welcoming Villager. An oblique overhead camera shows the connected trail, Wolves, danger and destination together. Warm greens and golden route lines distinguish safe travel from the red warning.

Steve carries the Bone with a stable arm grip, blends walking and stopping, recoils when scared and celebrates a delivery. Wolves follow behind, wag and turn toward the guide. The camp Villager reacts to arrival.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- Default trail delivered one Wolf to camp; result and next camp worked.
- Drawn trail uses water-aware adjacency.

仍需用户验收：

- A three-Wolf detour has not been manually completed in the final build.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

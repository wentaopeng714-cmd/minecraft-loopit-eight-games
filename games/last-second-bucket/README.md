# Last Second Bucket

落地水桶救命 · 独立3D游戏 · Case 15

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Automatic first-person falls; drag or use the stick to align with the cross. Place Water only when ground is within reach (about 6m) and the target is aligned. Water remains where actually placed: the player must still land in the pool. The first jump pauses at reachable height to teach the action; later jumps continue falling. Three dry landings end the streak. Streak goals 5,10,20 and shifting drops sustain play.

## 镜头、美术与动作

True first-person hand and correctly sized Water Bucket, a downward view of a village landing yard with grass, trees and timber/stone markers. Reach cue changes to green. On safe landing use a short third-person celebration cut, then return to the next fall.

Stable bucket grip, placement anticipation/contact, a water splash at the actual pool, an elastic landing recovery and separate dry-hit response. Do not cover the landing target with the held tool or clip into the head.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- A real safe Water landing gave 160 points, one streak and all three hearts.
- Too-early placement showed the out-of-reach cue.

仍需用户验收：

- Higher streak goals have not been manually completed.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

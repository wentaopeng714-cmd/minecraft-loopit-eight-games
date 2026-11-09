# Piston Pause Run

活塞夹缝冲刺 · 独立3D游戏 · Case 19

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Hold RUN or Space to advance, release to stop immediately. Twelve paired Pistons have real matching visible and collision motion. Wait on gold strips, leave on green, amber warns before closing. Each passed gate is 100. Every third gate is a checkpoint. A hit costs a heart and immediately restores that checkpoint. Clear all twelve to earn the arrival bonus; next course offsets timing. END early records only passed gates.

## 镜头、美术与动作

Side-rear third-person follow camera, textured stone corridor, moving full Piston heads, green/amber lamps, gold safety strips and the next few obstacles visible. Timber supports, trees and an exit village give the corridor a destination. Closed heads visibly narrow the actual gap.

Blend run/stop naturally, express focus before crossing, show clear squeeze/hurt and recovery at checkpoint. Piston anticipation and extension must agree with the lamp and collision window. Gate scores stay compact and out of the face.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- Actual rush into a closing gate lost one heart and respawned at the checkpoint.
- Final phone-size hold/release waited at a strip and passed gate one for 100 with three hearts.

仍需用户验收：

- All twelve gates were not manually cleared in a single final run.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

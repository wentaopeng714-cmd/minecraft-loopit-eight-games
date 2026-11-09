# Anvil After Hours

铁砧砸怪流水线 · 独立3D游戏 · Case 14

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Tap lane 1,2,3 to drop its Anvil after a short fall delay. Strike Zombies inside the actual ground shadow. Grouping two enemies yields a combo, while armored Zombies require two hits. Let blue-tagged friendly Villagers pass. Five escaped enemies or friendly hits break the gate. Earn 100 per kill plus combo rewards; friendly hits lose points. The endless shift introduces faster and armored combinations.

## 镜头、美术与动作

Three readable frontal lanes in a village workshop, textured anvils and Zombies, friendly Villagers, a five-heart gate HUD, three large lane buttons. A transparent thin overhead beam preserves faces; gold ground shadows show where contact happens.

Anvils fall with weight and rebound, Zombies have distinct hurt/stun and defeat feedback, friendly mistakes use a different warning, Steve and the host react. Use a metallic impact sound, dust and restrained hit pause.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- Actual Anvil hit defeated a Zombie for 100 with five gate hearts remaining.
- Actual shadow lane telemetry matched the highlighted control.

仍需用户验收：

- High waves and armored combinations were rule-tested but not played through to an extended record.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

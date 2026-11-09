# TNT Floor Frenzy

TNT地板别停下 · 独立3D游戏 · Case 18

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Move freely using the left stick/WASD and tap JUMP/Space. Each stepped tile pulses orange for 0.95s then falls. Three real 11x11 layers and two competing runners create route decisions; short jumps bridge gaps. Three falls below the arena end the run; safe respawn is immediate. Survival landmarks every 30 seconds, fresh-tile points and endless continuation support a roughly three-minute session without waiting.

## 镜头、美术与动作

High third-person view over a complete three-layer TNT arena. Sand, Stone and blue Wool distinguish upper surfaces over TNT sides. Lower floors become visible when falling; upper floors must stop hiding the actor. Obsidian posts, lava below and a small Villager spectator balcony complete the scene. Stable layer-follow camera without jump bob.

Smooth run anticipation, jump takeoff/landing, warning pulse then actual falling block, distinct void fall and instant recovery. Other runners walk and jump; spectators react warmly. Keep the full head/body visible when moving between layers.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- Actual walking, Space jump and falling tiles were observed.
- A real drop to the second floor kept the complete character visible.

仍需用户验收：

- Long survival landmarks have not been manually completed.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

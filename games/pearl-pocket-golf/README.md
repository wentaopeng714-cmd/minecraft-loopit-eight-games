# Pearl Pocket Golf

末影珍珠高尔夫 · 独立3D游戏 · Case 13

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Drag the landing marker and release to throw an Ender Pearl; green is a platform and red is the void. Reach is 5.4 units. The first aim teaches one safe landing; later aims require the player to choose. Teleport only after the Pearl lands. Four misses lose the trip. Reach the purple flag with fewer throws; optional islands offer Diamonds worth 125. Repeating the authored course lets the player improve the route and collect more Diamonds.

## 镜头、美术与动作

Floating End Stone islands above a purple void, dark Obsidian undersides and columns, purple finish flag and a Villager. Oblique overhead framing keeps all useful landings readable; a visible curved flight preview and full landing footprint communicate reach and safety.

Steve winds up, releases after the throwing pose, follows through and recovers. The held Pearl disappears only when the projectile launches, then returns after landing. Purple particles mark actual teleport and failure. Arrival gets a visible celebration.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- Final manual-drag route completed in four throws, collecting three Diamonds, zero misses, 1115 points.

仍需用户验收：

- The base island layout repeats; it is not a procedural world.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

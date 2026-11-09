# Elytra Ring Post

鞘翅穿环快递 · 独立3D游戏 · Case 20

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

Automatic forward flight. Drag the scene in two axes or use WASD to steer through 25 gold rings over 650m. Clean passes earn 100 plus capped combo. Four missed rings lose the mail run. BOOST is optional: 2s faster with a 6s cooldown. Reach the actual village arch, then land for 500 plus remaining-heart bonus. END early earns passed-ring points only. Replay improves accuracy and combo on the authored route.

## 镜头、美术与动作

Third-person perspective chase camera showing Steve in a horizontal glide with an authentic textured ElytraObject and parcel. Both wings stay inside the phone frame. Floating grassy islands, trees, clouds and a real village destination. Gold rings stand out against light cyan air. Compact screen notices prevent points from covering the horizon.

Flying body pose, wing bank and easing, stable parcel attachment, distinct missed-ring reaction, then deceleration and standing/celebrating on delivery. No walking pose in mid-air and no clipped wings.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- Full final flight passed all 25 rings, zero misses, four hearts, 65 seconds, 7500 points.
- Next route reset to zero; early END gave zero with no arrival bonus, and Retry reset correctly.

仍需用户验收：

- The course repeats; it does not claim a procedurally varied world.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

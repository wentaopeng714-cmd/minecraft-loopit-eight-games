# Ice Boat Express

冰船漂移快递 · 独立3D游戏 · Case 17

## 立即试玩

解压后运行 `python3 play.py`，浏览器会打开预构建版本。请通过本地网页服务打开，不要直接双击 dist/index.html。

编辑：`npm ci`、`npm run dev`。检查：`npm test`、`npm run build`。

## 玩法

The Boat moves forward automatically. Drag sideways or A/D to steer, anticipating ice momentum; hold BRAKE to settle a bend. Pass between flags for 75 plus combo up to 150. Banks and rocks lose one of five cargo. Reach the actual village at 330m to earn delivery 500, 100 per cargo and time bonus. Ending early gives no arrival reward. The next delivery increases speed on the same authored track.

## 镜头、美术与动作

Third-person perspective chase camera behind the entire Boat, forward-looking bends, blue ice, snow banks, fir trees, rocks, flag gates and an actual Snowbell village endpoint. Boat hull, oars, seated Steve and crate cargo form one coherent object. Keep the whole boat and both sides of the next gate inside phone framing.

Seated Steve faces forward and leans with sideways drift; legs remain seated and hands anchored. Oars cycle, collision jolts and drops cargo, host reacts at arrival. Use compact screen notices for gate scores, never enormous world text flying into the chase camera.

## 交接到 Loopit

上传完整ZIP，粘贴 prompt.txt。000-reference.png 是对应实机截图；不是精灵表，不含平台资源ID。直接沿用 src/ 与 public/assets，不需要重新找图。IMPORT.txt 中有图片选择失败时的交接说明。此包尚未经过 Loopit 导入验证。

## 实际验证

三项核心规则测试与生产构建通过；电脑1280×800和手机尺寸390×844完成操作检查，以及开始/结束/重玩/帮助暂停。不是实体手机测试。

- Actual full 330m delivery: 11 gates, four cargo, 66 seconds, 2458 points.
- Next trip and early END recorded zero without delivery reward.
- Phone-size pointer hold steered from x=0 to x=1.1; early END displayed cargo remaining without an unearned multiplier.

仍需用户验收：

- Track geometry is authored and repeats; later trips get faster rather than claiming newly generated roads.

## 素材来源

Steve 使用 skinview3d 的贴图角色结构；外部角色几何、纹理和方块资源逐项保留在 public/assets/sources.json。主要来源：[Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)、[skinview3d](https://github.com/bs-community/skinview3d)、[Minecraft Three.js textures](https://github.com/vyse12138/minecraft-threejs)。第三方代码许可证见 public/THIRD_PARTY_NOTICES.txt；字体见 OFL.txt。Minecraft 美术与角色权利仍归 Mojang/Microsoft，库的MIT许可不会覆盖原作美术。本项目为非官方二创。

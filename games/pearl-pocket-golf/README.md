# Pearl Pocket Golf · 0.2.0

末影珍珠高尔夫 / Case 13 / 独立3D游戏

本次重做：瞄准与传送路线选择，第一人称，手持珍珠与准星。上一版相似的俯视场地和按钮操作已经重新区分。

## 试玩和编辑

解压后运行 `python3 play.py`，浏览器打开 dist/ 可玩版本。不要直接双击 dist/index.html。编辑用 `npm ci`、`npm run dev`；检查用 `npm test`、`npm run build`。

## 操作、目标和持续玩法

从岛上第一人称拖动视线瞄准，以曲线和绿/红落点判断安全，按THROW投掷后才传送。首投给安全朝向，后续需要重新瞄准。最大5.4m，四次虚空落点结束。选择稳妥路线或绕路拿钻石，抵达紫旗，用更少投掷取更好成绩。

## 实际检查

Actual first-person touch-drag course: four throws, three Diamonds, zero misses, 1115 points.

3项规则检查及构建通过；电脑1280×800、手机尺寸390×844完成操作与开始/结束/重玩/帮助暂停检查。不是实体手机测试。

仍有限制：The authored island layout repeats. No free island walking is claimed. Loopit导入未验证，最终美术与乐趣仍需用户验收。

## Loopit交接

上传整包，粘贴 prompt.txt，使用 000-reference.png 对照这一版的镜头与美术；它是真实游戏截图，不是精灵表，也没有虚构的图片ID。保留当前玩法与独立项目，避免再次改回同一套俯视棋盘。差异化详情见 DIFFERENTIATION.md。

## 素材与权利

匹配贴图和模型均在 public/assets，来源逐项记录于 sources.json。Steve 使用 [skinview3d](https://github.com/bs-community/skinview3d)，主要Minecraft资源来自 [Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)。完整库、字体许可见 public/THIRD_PARTY_NOTICES.txt 和 OFL.txt。Minecraft原作美术及角色权利仍归Mojang/Microsoft，代码库MIT许可不会覆盖原作美术。这是非官方二创。

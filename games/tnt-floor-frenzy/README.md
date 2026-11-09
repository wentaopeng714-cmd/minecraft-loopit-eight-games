# TNT Floor Frenzy · 0.2.0

TNT地板别停下 / Case 18 / 独立3D游戏

本次重做：争夺落脚点的跑跳竞技，近景第三人称，可转镜头。上一版相似的俯视场地和按钮操作已经重新区分。

## 试玩和编辑

解压后运行 `python3 play.py`，浏览器打开 dist/ 可玩版本。不要直接双击 dist/index.html。编辑用 `npm ci`、`npm run dev`；检查用 `npm test`、`npm run build`。

## 操作、目标和持续玩法

取消总览棋盘镜头。左摇杆自由移动，JUMP跳过缺口，踩过的格子闪烁后坍塌。两名对手也会消耗地面；切断对方路线、为自己保留新地板。三层地板是真正落脚面，三次掉出场地结束。淘汰一个对手200分，最后存活再奖500，可继续新场。

## 实际检查

Actual touch JUMP plus held movement stick moved 1.4m while airborne; three hearts remained. Start/END/retry/pause and close framing were checked.

3项规则检查及构建通过；电脑1280×800、手机尺寸390×844完成操作与开始/结束/重玩/帮助暂停检查。不是实体手机测试。

仍有限制：Last-standing victory and long competitive survival have not been manually completed in this revision. Loopit导入未验证，最终美术与乐趣仍需用户验收。

## Loopit交接

上传整包，粘贴 prompt.txt，使用 000-reference.png 对照这一版的镜头与美术；它是真实游戏截图，不是精灵表，也没有虚构的图片ID。保留当前玩法与独立项目，避免再次改回同一套俯视棋盘。差异化详情见 DIFFERENTIATION.md。

## 素材与权利

匹配贴图和模型均在 public/assets，来源逐项记录于 sources.json。Steve 使用 [skinview3d](https://github.com/bs-community/skinview3d)，主要Minecraft资源来自 [Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)。完整库、字体许可见 public/THIRD_PARTY_NOTICES.txt 和 OFL.txt。Minecraft原作美术及角色权利仍归Mojang/Microsoft，代码库MIT许可不会覆盖原作美术。这是非官方二创。

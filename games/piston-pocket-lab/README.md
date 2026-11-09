# Piston Pocket Lab · 0.2.0

活塞推箱实验室 / Case 12 / 独立3D游戏

本次重做：机关推送解谜，正上方顶视工作台。上一版相似的俯视场地和按钮操作已经重新区分。

## 试玩和编辑

解压后运行 `python3 play.py`，浏览器打开 dist/ 可玩版本。不要直接双击 dist/index.html。编辑用 `npm ci`、`npm run dev`；检查用 `npm test`、`npm run build`。

## 操作、目标和持续玩法

本批唯一保留的棋盘解谜。用P1—P4推送第一排矿石与连块，判断先后顺序，将钻石/铁/金推上对应板。撤销免费，提示扣25，少步数奖励高。箭头说明推送方向。12个布局变体循环。

## 实际检查

Actual three-button-push solve gave 490 points. Piston buttons became available again after each physical extension and recovery.

3项规则检查及构建通过；电脑1280×800、手机尺寸390×844完成操作与开始/结束/重玩/帮助暂停检查。不是实体手机测试。

仍有限制：Later variants are solver-tested rather than all manually completed. Loopit导入未验证，最终美术与乐趣仍需用户验收。

## Loopit交接

上传整包，粘贴 prompt.txt，使用 000-reference.png 对照这一版的镜头与美术；它是真实游戏截图，不是精灵表，也没有虚构的图片ID。保留当前玩法与独立项目，避免再次改回同一套俯视棋盘。差异化详情见 DIFFERENTIATION.md。

## 素材与权利

匹配贴图和模型均在 public/assets，来源逐项记录于 sources.json。Steve 使用 [skinview3d](https://github.com/bs-community/skinview3d)，主要Minecraft资源来自 [Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)。完整库、字体许可见 public/THIRD_PARTY_NOTICES.txt 和 OFL.txt。Minecraft原作美术及角色权利仍归Mojang/Microsoft，代码库MIT许可不会覆盖原作美术。这是非官方二创。

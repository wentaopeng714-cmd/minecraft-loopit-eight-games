# Piston Pause Run · 0.2.0

活塞夹缝冲刺 / Case 19 / 独立3D游戏

本次重做：走停与开合时机，第一人称纵深通道。上一版相似的俯视场地和按钮操作已经重新区分。

## 试玩和编辑

解压后运行 `python3 play.py`，浏览器打开 dist/ 可玩版本。不要直接双击 dist/index.html。编辑用 `npm ci`、`npm run dev`；检查用 `npm test`、`npm run build`。

## 操作、目标和持续玩法

取消侧后方总览。按住RUN/Space前进，松手立即停。站在金色安全线看绿灯通过、黄灯前停；实体活塞头与碰撞窗口一致。每道100分，每三道有检查点，受伤立即回检查点。完成12道到出口有额外奖励，下一条改变时序。

## 实际检查

Full actual first-person course: twelve gates, three hearts, 33s, 1751 points.

3项规则检查及构建通过；电脑1280×800、手机尺寸390×844完成操作与开始/结束/重玩/帮助暂停检查。不是实体手机测试。

仍有限制：The next offset-timing course has not been fully cleared in this revision. Loopit导入未验证，最终美术与乐趣仍需用户验收。

## Loopit交接

上传整包，粘贴 prompt.txt，使用 000-reference.png 对照这一版的镜头与美术；它是真实游戏截图，不是精灵表，也没有虚构的图片ID。保留当前玩法与独立项目，避免再次改回同一套俯视棋盘。差异化详情见 DIFFERENTIATION.md。

## 素材与权利

匹配贴图和模型均在 public/assets，来源逐项记录于 sources.json。Steve 使用 [skinview3d](https://github.com/bs-community/skinview3d)，主要Minecraft资源来自 [Mojang Bedrock Samples](https://github.com/Mojang/bedrock-samples)。完整库、字体许可见 public/THIRD_PARTY_NOTICES.txt 和 OFL.txt。Minecraft原作美术及角色权利仍归Mojang/Microsoft，代码库MIT许可不会覆盖原作美术。这是非官方二创。

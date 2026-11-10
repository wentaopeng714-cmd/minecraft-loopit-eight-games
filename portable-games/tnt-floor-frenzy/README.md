# TNT Floor Frenzy · Loopit portable

18. TNT地板别停下 · 原玩法版本 0.2.0 · 资源打包修复 portable.1

原始PNG纹理、模型JSON与字体已随程序内嵌，保持原贴图、造型、玩法、动作、镜头和UI。运行时不需要图片素材ID、外链纹理、图片代理或几何JSON网络请求。

## Loopit 导入

直接将 **dist/index.html** 原样作为作品入口。这一份HTML已包含完整JS/CSS/字体/贴图/模型，不能只读取根目录开发用index.html，也不需要重新根据参考图制作游戏。请先复制现成可玩产物，再测试实际预览。000-reference.png仅用于对照。

## 本地试玩与编辑

`python3 play.py` 启动现成版本；编辑用 `npm ci`、`npm run dev`。`npm test`检查规则，`npm run build`会生成并内联完整单文件构建。所有原始美术资源及来源仍保留于public/assets，库与字体许可保留于public/THIRD_PARTY_NOTICES.txt及OFL.txt。

## 验证范围

原规则未改动。资源内嵌版已通过构建、手机尺寸390×844下的加载、开始、结束、重玩与暂停检查；未声称实体手机验证。Loopit内实际运行仍需在导入后检查。PORTABILITY.json说明嵌入内容，validation.json记录当前检查。

Minecraft美术与角色原有权利归Mojang/Microsoft；第三方代码许可不改变美术权利。本项目为非官方二创。

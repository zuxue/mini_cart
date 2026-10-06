# WILD MARKET 跨端电商小程序

一套完全离线运行的精品生活电商项目。同一份 uni-app 代码可编译为微信小程序和支付宝小程序，不依赖后端接口、云服务或网络图片。

## 已包含的业务流程

- 首页、搜索反馈、分类与商品详情
- 规格选择、购物袋、优惠券、地址
- 登录、确认订单、收银台、支付结果
- 限时秒杀、多人拼团
- 订单列表、会员中心与个人中心
- 持久化购物袋、用户、地址和订单

所有业务数据均保存在设备端，无需连接服务端。

## UI 主题配置

项目内置“活力商城”“自然生活”“极简黑白”三套完整 UI 方案。打包前修改 `src/config/index.js` 中的 `uiTheme`，可选值为 `commerce`、`forest`、`minimal`，然后重新运行对应平台的构建命令。每套方案不仅包含颜色和圆角，还会切换首页轮播、活动 Banner、分类导航、商品列表及个人中心的布局。前台不提供主题切换入口，也不会读取用户本地主题记录。

新增 UI 风格时，在 `themes` 中增加一个主题对象，除基础颜色、圆角、原生导航栏和 TabBar 外，通过 `layout` 配置选择 `home`、`hero`、`category`、`products`、`banner` 和 `profile` 的布局变体。页面统一使用设计变量和布局名称，无需逐页复制颜色值。

主题定义统一维护在 `src/config/themes.js`，主题加载逻辑位于 `src/utils/theme.js`。如需增加新的通用样式变量，请同时在该文件的 `cssVariables` 方法和 `src/App.vue` 的默认变量中补充。

## 运行

```bash
npm install
npm run dev:mp-weixin
npm run dev:mp-alipay
```

构建产物分别位于 `dist/dev/mp-weixin` 和 `dist/dev/mp-alipay`，用对应平台开发者工具导入即可。正式接入前，请在 `src/manifest.json` 中替换平台 AppID。

也可以在 HBuilderX 中打开项目，通过“运行到小程序模拟器”选择微信或支付宝。

// 打包前在这里选择整套 UI 风格：commerce | forest | minimal
export const appConfig = {
  uiTheme: 'commerce',

  // 外部支付页签名前缀。发布前必须替换为双方约定的固定值。
  // 最终签名 = md5(参数字符串 + '&key=' + SignKeyPrefix + 页面参数中的 key)。
  SignKeyPrefix: 'LUVWd@nTW%bQI@Jf'
}

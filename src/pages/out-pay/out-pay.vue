<template>
  <view v-if="query" class="out-pay-page">
    <view class="amount">
      <text class="currency">￥</text>
      <text>{{ query.price }}</text>
    </view>
    <text class="label">{{ query.label }}</text>
    <image
      class="check-image"
      src="/static/payment/alipay_check.png"
      mode="widthFix"
    />

    <button
      class="pay-button"
      type="primary"
      :loading="paying"
      :disabled="paying"
      @tap="handlePay"
    >
      {{ paying ? '支付处理中…' : '立即支付' }}
    </button>

    <template v-if="query.debug">
      <button class="code-button" :disabled="gettingCode" @tap="getDebugCode">
        获取 Code
      </button>
      <text class="auth-code" selectable>{{ authCode }}</text>
    </template>
  </view>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { appConfig } from '../../config/index.js'
import md5 from '../../utils/md5.js'

const query = ref(null)
const authCode = ref('')
const paying = ref(false)
const gettingCode = ref(false)

/**
 * 页面参数说明
 *
 * 参数既可以放在打开页面的 URL query 中，也可以作为支付宝小程序的启动参数传入：
 *
 * - price:       必填，展示的支付金额；不能是空字符串，例如 "99.00"。
 * - label:       可选，金额下方的订单说明，例如 "购买会员"。
 * - debug:       可选，字符串 "true" 时显示“获取 Code”按钮及 authCode；其他值均视为 false。
 * - key:         必填，签名后缀；不参与参数字符串的排序和拼接。
 * - sign:        必填，调用方生成的 MD5 签名（十六进制，不区分大小写）。
 * - trade_no:    直接支付模式使用，支付宝交易号。传入后会直接调用 tradePay。
 * - order_str:   直接支付模式使用，支付宝订单字符串。传入后会直接调用 tradePay。
 * - request_url: 接口换单模式使用，获取支付参数的后端接口地址。
 * - order_id:    接口换单模式使用，提交给 request_url 的业务订单号。
 * - method:      接口换单模式使用，提交给 request_url 的支付方式标识。
 *
 * 支持的参数组合：
 *
 * 所有组合均必须额外携带 key + sign：
 *
 * 1. 直接支付-trade_no：price + trade_no + key + sign
 *    label、debug 可选。
 *
 * 2. 直接支付-order_str：price + order_str + key + sign
 *    label、debug 可选；order_str 通常较长，放入 URL 前必须使用 encodeURIComponent 编码。
 *
 * 3. 接口换单：price + request_url + order_id + method + key + sign
 *    页面先通过 my.getAuthCode 获取 code，再向 request_url 发起 POST：
 *    { order_id, method, code }
 *    接口响应的 status 需要为 200，并在 data 中返回 trade_no 或 order_str 至少一个：
 *    { status: 200, data: { trade_no: "..." } }
 *    { status: 200, data: { order_str: "..." } }
 *
 * 签名算法：
 * 1. 取实际传入的全部参数，排除 sign、key，以及 Boolean(value) 为 false 的参数。
 * 2. 参数名按 ASCII 降序排列。
 * 3. 每项拼成 name=value，再使用 & 连接得到 str；使用的是 URL 解码后的原始值。
 * 4. sign = md5(str + "&key=" + appConfig.SignKeyPrefix + key)。
 * 注意：遵循 JavaScript 布尔转换规则；字符串 "0"、"false" 为 true，仍会参与签名。
 *
 * 示例：参数 { price: "99.00", trade_no: "2026", key: "client01" }
 * ASCII 降序结果：trade_no=2026&price=99.00
 * sign = md5("trade_no=2026&price=99.00&key=" + 固定前缀 + "client01")
 * URL 中还需追加 &sign=上述计算结果；所有参数值均应使用 encodeURIComponent 编码。
 *
 * 注意：
 * - 参数优先级为 trade_no > order_str > 接口换单参数。
 * - 使用任一直接支付参数时，request_url、order_id、method 即使传入也不会使用。
 * - 未传 price 或 price 为空时，页面会返回首页。
 * - 该页面依赖支付宝的 my.getAuthCode / my.tradePay，只能在支付宝小程序中完成支付。
 */
const goHome = () => {
  uni.reLaunch({ url: '/pages/home/home' })
}

const verifySign = params => {
  const keySuffix = params.key == null ? '' : String(params.key)
  const receivedSign = params.sign == null ? '' : String(params.sign).trim().toLowerCase()
  if (!appConfig.SignKeyPrefix) return { valid: false, message: '支付签名前缀未配置' }
  if (!keySuffix || !receivedSign) return { valid: false, message: '缺少支付签名参数' }

  // 参数名均为 ASCII 字符，比较运算符可以稳定地按 ASCII 码降序排列。
  const source = Object.keys(params)
    .filter(name => name !== 'sign' && name !== 'key' && Boolean(params[name]))
    .sort((a, b) => (a === b ? 0 : a > b ? -1 : 1))
    .map(name => `${name}=${String(params[name])}`)
    .join('&')
  const expectedSign = md5(source + '&key=' + appConfig.SignKeyPrefix + keySuffix)
  return { valid: expectedSign === receivedSign, message: '支付参数签名错误' }
}

const showResult = title => {
    console.log('showResult', title, query.value?.debug)
  uni.showModal({
    title: String(title || '未知错误'),
    showCancel: false,
    success: result => {
      if (result.confirm && !query.value?.debug) goHome()
    }
  })
}

const getAlipayApi = () => {
  // 支付宝小程序运行时会提供全局 my 对象。
  if (typeof my !== 'undefined') return my
  return null
}

const tradePay = payment => {
  const alipay = getAlipayApi()
  if (!alipay) {
    paying.value = false
    showResult('请在支付宝小程序中打开此页面')
    return
  }

  const params = {
    success: () => {
      paying.value = false
      showResult('支付成功')
    },
    fail: error => {
      paying.value = false
      showResult(error?.errorMessage || error?.errMsg || '支付失败')
    }
  }
  if (query.value?.magic) {
    params.bizContext = JSON.stringify({
      sc: "tinyapp",
      tinyAppId: "2021004134675067",
      pluginAppId: "tinyapp",
    })
  }
  if (payment.trade_no) params.tradeNO = payment.trade_no
  if (payment.order_str) params.orderStr = payment.order_str
  alipay.tradePay(params)
}

const requestPayment = code => {
  const { request_url, order_id, method } = query.value
  if (!request_url) {
    paying.value = false
    showResult('缺少支付请求地址')
    return
  }

  uni.request({
    url: request_url,
    method: 'POST',
    data: { order_id, method, code },
    success: response => {
      const result = response.data || {}
      const payment = result.data || {}
      const hasPayment = [payment.trade_no, payment.order_str].some(
        value => value != null && String(value).trim() !== ''
      )
      if (String(result.status) === '200' && hasPayment) {
        tradePay(payment)
      } else {
        paying.value = false
        showResult(result.message || '未知错误')
      }
    },
    fail: () => {
      paying.value = false
      showResult('支付失败')
    }
  })
}

const getAuthCode = ({ success, fail }) => {
  const alipay = getAlipayApi()
  if (!alipay) {
    fail?.('请在支付宝小程序中打开此页面')
    return
  }
  alipay.getAuthCode({ scopes: 'auth_base', success, fail })
}

const handlePay = () => {
  if (!query.value || paying.value) return
  paying.value = true

  if (query.value.trade_no || query.value.order_str) {
    tradePay(query.value.trade_no
      ? { trade_no: query.value.trade_no }
      : { order_str: query.value.order_str })
    return
  }

  getAuthCode({
    success: result => {
      if (result.authCode) requestPayment(result.authCode)
      else {
        paying.value = false
        showResult('获取 authCode 失败')
      }
    },
    fail: message => {
      paying.value = false
      showResult(message || '获取 authCode 失败')
    }
  })
}

const getDebugCode = () => {
  if (gettingCode.value) return
  gettingCode.value = true
  getAuthCode({
    success: result => {
      gettingCode.value = false
      if (result.authCode) authCode.value = result.authCode
      else showResult('获取 authCode 失败')
    },
    fail: message => {
      gettingCode.value = false
      showResult(message || '获取 authCode 失败')
    }
  })
}

onLoad(options => {
  const launchQuery = uni.getLaunchOptionsSync?.().query || {}
  const params = { ...launchQuery, ...options }
  const signResult = verifySign(params)
  if (!signResult.valid) {
    showResult(signResult.message)
    return
  }
  const price = params.price == null ? '' : String(params.price).trim()
  if (!price) {
    goHome()
    return
  }

  // 所有模式都必须传 key、sign；直接支付传 trade_no 或 order_str；接口换单传 request_url、order_id、method。
  query.value = {
    request_url: params.request_url,
    order_id: params.order_id,
    method: params.method,
    label: params.label || '',
    price,
    trade_no: params.trade_no,
    order_str: params.order_str,
    key: params.key,
    sign: params.sign,
    debug: String(params.debug) === 'true',
    magic: String(params.magic) === 'true',
  }
  nextTick(handlePay)
})
</script>

<style scoped>
.out-pay-page {
  min-height: 100vh;
  padding: 60rpx 64rpx calc(40rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
  background: #fff;
  text-align: center;
}

.amount {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
  color: #222;
  font-size: 116rpx;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -3rpx;
}

.currency {
  margin-top: 18rpx;
  margin-right: 8rpx;
  font-size: 48rpx;
  line-height: 1;
  letter-spacing: 0;
}

.label {
  display: block;
  margin-bottom: 60rpx;
  color: #222;
  font-size: 38rpx;
  line-height: 1.4;
}

.check-image {
  display: block;
  width: 100%;
  margin-bottom: 80rpx;
}

.pay-button,
.code-button {
  width: 100%;
  height: 92rpx;
  border-radius: 999rpx;
  font-size: 32rpx;
  line-height: 92rpx;
}

.pay-button {
  background: #3875f6;
  color: #fff;
}

.pay-button[disabled] {
  background: #8bacf4;
  color: #fff;
}

.code-button {
  margin-top: 30rpx;
  border: 1rpx solid #ddd;
  background: #fff;
  color: #333;
}

.auth-code {
  display: block;
  margin-top: 24rpx;
  color: #666;
  font-size: 24rpx;
  line-height: 1.5;
  word-break: break-all;
}
</style>

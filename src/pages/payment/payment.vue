<template>
  <view class="page payment-page" :style="$themeStyle"><view class="amount"><text>订单金额</text><text><text class="yen">¥</text>{{order.total}}</text><text>请在 29:{{seconds}} 内完成支付</text></view>
    <view class="pay-card card"><text class="pay-title">选择支付方式</text><view v-for="method in methods" :key="method.id" class="method" :class="{disabled:!method.available}" @tap="selectMethod(method)"><image class="method-icon" :src="method.logo" mode="aspectFit"/><view class="method-info"><view><text>{{method.name}}</text><text v-if="!method.available" class="unavailable">当前不可用</text></view><text>{{method.available?method.desc:'请在对应支付平台小程序中使用'}}</text></view><text class="radio" :class="{active:selected===method.id,disabled:!method.available}">{{selected===method.id?'✓':''}}</text></view></view>
    <view class="offline-note"><text>安全支付</text><text>将通过{{selectedName}}完成本次付款</text></view><button class="btn-primary pay-btn" :disabled="paying" @tap="pay">{{paying?'支付处理中…':'确认支付 ¥'+order.total}}</button>
  </view>
</template>
<script setup>
import{computed,ref,onMounted,onUnmounted}from'vue'

let platformMethod='balance'
// #ifdef MP-WEIXIN
platformMethod='wechat'
// #endif
// #ifdef MP-ALIPAY
platformMethod='alipay'
// #endif

const order=ref(uni.getStorageSync('pending_order')||{total:'0.00'})
const selected=ref(platformMethod)
const seconds=ref('59')
const timer=ref()
const paying=ref(false)
const BALANCE_KEY='account_balance_cents'
const storedBalance=uni.getStorageSync(BALANCE_KEY)
const initialBalance=storedBalance===''||storedBalance===null||typeof storedBalance==='undefined'?52000:Number(storedBalance)
const balanceCents=ref(Number.isFinite(initialBalance)?Math.max(0,Math.round(initialBalance)):52000)
const toCents=value=>{
  const amount=Number(String(value===null||typeof value==='undefined'?0:value).replace(/[^\d.-]/g,''))
  return Number.isFinite(amount)?Math.max(0,Math.round(amount*100)):0
}
const orderCents=computed(()=>toCents(order.value.total))
const formatMoney=value=>(Math.max(0,value)/100).toFixed(2)
const methods=computed(()=>[
  {id:'wechat',logo:'/static/icons/payment-wechat.png',name:'微信支付',desc:'微信安全支付',available:platformMethod==='wechat'},
  {id:'alipay',logo:'/static/icons/payment-alipay.png',name:'支付宝支付',desc:'支付宝安全支付',available:platformMethod==='alipay'},
  {id:'unionpay',logo:'/static/icons/payment-unionpay.png',name:'云闪付支付',desc:'银联云闪付安全支付',available:platformMethod==='unionpay'},
  {id:'balance',logo:'/static/icons/payment-balance.png',name:'账户余额',desc:'可用余额 ¥'+formatMoney(balanceCents.value),available:true}
])
const selectedName=computed(()=>{
  const method=methods.value.find(item=>item.id===selected.value)
  return method?method.name:'账户余额'
})
const selectMethod=method=>{
  if(!method.available)return uni.showToast({title:'当前小程序暂不支持该支付方式',icon:'none'})
  selected.value=method.id
}
onMounted(()=>timer.value=setInterval(()=>{let s=Number(seconds.value)-1;seconds.value=String(s<0?59:s).padStart(2,'0')},1000))
onUnmounted(()=>clearInterval(timer.value))
const pay=()=>{
  if(paying.value)return
  if(selected.value==='balance'&&balanceCents.value<orderCents.value){
    return uni.showModal({
      title:'余额不足',
      content:'当前余额 ¥'+formatMoney(balanceCents.value)+'，还需 ¥'+formatMoney(orderCents.value-balanceCents.value),
      showCancel:false,
      confirmText:'我知道了'
    })
  }
  paying.value=true
  uni.showLoading({title:'支付处理中'})
  setTimeout(()=>{
    if(selected.value==='balance'){
      if(balanceCents.value<orderCents.value){
        paying.value=false
        uni.hideLoading()
        return uni.showToast({title:'余额不足',icon:'none'})
      }
      balanceCents.value=balanceCents.value-orderCents.value
      uni.setStorageSync(BALANCE_KEY,balanceCents.value)
    }
    uni.hideLoading()
    const done={...order.value,status:'待发货',paymentMethod:selectedName.value}
    const list=uni.getStorageSync('demo_orders')||[]
    list.unshift(done)
    uni.setStorageSync('demo_orders',list)
    uni.redirectTo({url:`/pages/result/result?id=${done.id}`})
  },900)
}
</script>
<style scoped>
.payment-page{padding-top:55rpx}.amount{text-align:center}.amount>text{display:block;color:var(--muted);font-size:23rpx}.amount>text:nth-child(2){color:var(--ink);font-size:76rpx;font-weight:700;margin:18rpx 0}.yen{font-size:32rpx;margin-right:7rpx}.pay-card{margin-top:65rpx;padding:30rpx}.pay-title{display:block;font-weight:700;font-size:31rpx;padding-bottom:18rpx}.method{display:flex;align-items:center;padding:25rpx 0;border-top:1rpx solid var(--line)}.method.disabled{opacity:.38}.method-icon{display:block;width:72rpx;height:72rpx;border-radius:18rpx;margin-right:20rpx;flex-shrink:0}.method-info{flex:1;min-width:0}.method-info>view{display:flex;align-items:center;gap:12rpx}.method-info text{display:block}.method-info>text{font-size:21rpx;color:var(--muted);margin-top:7rpx}.unavailable{font-size:17rpx!important;color:var(--muted);padding:3rpx 9rpx;border:1rpx solid var(--line);border-radius:6rpx}.radio{width:38rpx;height:38rpx;line-height:38rpx;text-align:center;border:1rpx solid var(--muted);border-radius:50%;flex-shrink:0}.radio.active{background:var(--accent);border-color:var(--accent);color:#fff}.radio.disabled{background:var(--paper)}.offline-note{text-align:center;background:var(--accent-soft);border-radius:var(--card-radius);padding:22rpx;margin-top:30rpx}.offline-note text{display:block;font-size:21rpx;color:var(--muted)}.offline-note text:first-child{font-weight:700;color:var(--ink);margin-bottom:7rpx}.pay-btn{position:fixed;bottom:calc(30rpx + env(safe-area-inset-bottom));left:28rpx;right:28rpx;width:auto}
</style>

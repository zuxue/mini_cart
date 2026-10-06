<template>
  <view class="service-page safe-bottom" :style="$themeStyle">
    <view class="service-hero">
      <view class="agent">客</view><view><text>WILD 专属客服</text><text><i></i> 在线 · 通常立即回复</text></view>
    </view>
    <view class="quick card"><text class="quick-title">猜你想问</text><view class="quick-grid"><text v-for="item in quick" :key="item" @tap="ask(item)">{{item}}</text></view></view>
    <view class="chat">
      <view v-for="(message,index) in messages" :key="index" class="message" :class="message.role">
        <view v-if="message.role==='service'" class="mini-avatar">客</view><text>{{message.text}}</text>
      </view>
    </view>
    <view class="contact-card card"><view @tap="call"><text>☏</text><view><text>电话客服</text><text>400-820-2026 · 09:00—22:00</text></view><text>›</text></view></view>
    <view class="input-bar"><input v-model="input" confirm-type="send" placeholder="请输入你的问题" @confirm="send"/><button @tap="send">发送</button></view>
  </view>
</template>
<script setup>
import { ref, nextTick } from 'vue'
const quick=['订单发货了吗','如何修改地址','退换货政策','优惠券怎么用']
const messages=ref([{role:'service',text:'你好，我是 WILD 专属客服。关于商品、配送或售后，有什么可以帮你？'}])
const input=ref('')
const replies={
  '订单发货了吗':'付款后通常会在 48 小时内发出，你可以在“我的订单”中查看最新状态。',
  '如何修改地址':'进入“我的—收货地址”，选择地址即可修改。订单提交后请尽快联系我们处理。',
  '退换货政策':'商品签收后 7 天内，保持商品及包装完好，可申请退换货。',
  '优惠券怎么用':'结算时进入优惠券列表，选择满足使用条件的优惠券即可抵扣。'
}
const reply=text=>setTimeout(()=>messages.value.push({role:'service',text:replies[text]||'收到你的问题，我们会尽快为你处理。你也可以拨打客服电话获得帮助。'}),450)
const ask=text=>{messages.value.push({role:'user',text});reply(text)}
const send=()=>{const text=input.value.trim();if(!text)return;input.value='';ask(text)}
const call=()=>uni.makePhoneCall({phoneNumber:'4008202026'})
</script>
<style scoped>
.service-page{padding-bottom:150rpx}.service-hero{height:180rpx;background:linear-gradient(135deg,var(--accent-start),var(--accent-end));color:#fff;padding:40rpx 30rpx;box-sizing:border-box;display:flex;align-items:center}.agent{width:92rpx;height:92rpx;line-height:92rpx;text-align:center;border-radius:50%;background:#d8c7a6;color:var(--ink);font-size:36rpx;font-weight:700;margin-right:22rpx}.service-hero>view:last-child text{display:block}.service-hero>view:last-child text:first-child{font-size:32rpx;font-weight:700}.service-hero>view:last-child text:last-child{font-size:21rpx;opacity:.65;margin-top:10rpx}.service-hero i{display:inline-block;width:12rpx;height:12rpx;background:#73c48a;border-radius:50%;margin-right:7rpx}.quick{margin:24rpx;padding:28rpx}.quick-title{display:block;font-weight:700;margin-bottom:20rpx}.quick-grid{display:flex;flex-wrap:wrap;gap:14rpx}.quick-grid text{padding:14rpx 20rpx;border-radius:30rpx;background:#efebe4;font-size:22rpx}.chat{padding:10rpx 28rpx}.message{display:flex;margin:22rpx 0;align-items:flex-start}.message>text{max-width:72%;padding:20rpx 24rpx;border-radius:8rpx 25rpx 25rpx 25rpx;background:#fff;line-height:1.55;font-size:24rpx}.message.user{justify-content:flex-end}.message.user>text{background:var(--accent);color:#fff;border-radius:25rpx 8rpx 25rpx 25rpx}.mini-avatar{width:52rpx;height:52rpx;line-height:52rpx;text-align:center;border-radius:50%;background:#d8c7a6;margin-right:13rpx;font-size:21rpx}.contact-card{margin:28rpx;padding:0 28rpx}.contact-card>view{display:flex;align-items:center;padding:25rpx 0;border-bottom:1rpx solid var(--line)}.contact-card>view:last-child{border:0}.contact-card>view>text:first-child{font-size:32rpx;width:60rpx}.contact-card>view>view{flex:1}.contact-card>view>view text{display:block}.contact-card>view>view text+text{font-size:20rpx;color:var(--muted);margin-top:7rpx}.input-bar{position:fixed;z-index:8;bottom:0;left:0;right:0;display:flex;padding:18rpx 24rpx calc(18rpx + env(safe-area-inset-bottom));background:#fff;gap:16rpx}.input-bar input{height:72rpx;flex:1;background:#f0ede7;border-radius:40rpx;padding:0 25rpx}.input-bar button{width:120rpx;height:72rpx;margin:0;background:var(--ink);color:#fff;border-radius:38rpx;font-size:24rpx;line-height:1}
</style>

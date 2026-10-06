<template>
  <view class="result-page" :style="$themeStyle + ';padding-top:' + top + 'px'"><view class="success-mark"><text>✓</text></view><text class="result-title">支付成功</text><text class="result-sub">好物正在向你奔来</text><view class="order-no">订单号：{{id}}</view><view class="actions"><button class="btn-primary" @tap="orders">查看订单</button><button class="btn-ghost" @tap="home">返回首页</button></view><view class="result-art"><text>☕</text><text>🧺</text><text>🕯️</text></view><text class="footer">WILD MARKET · THANK YOU</text></view>
</template>
<script setup>
import{ref}from'vue';import{onLoad}from'@dcloudio/uni-app';const top=(uni.getSystemInfoSync().statusBarHeight||20)+40,id=ref('');onLoad(o=>id.value=o.id||'WM20261006');const orders=()=>uni.redirectTo({url:'/pages/orders/orders'});const home=()=>uni.switchTab({url:'/pages/home/home'})
</script>
<style scoped>
.result-page{min-height:100vh;box-sizing:border-box;text-align:center;padding-left:50rpx;padding-right:50rpx;background:var(--accent-soft)}.success-mark{width:120rpx;height:120rpx;line-height:120rpx;margin:80rpx auto 32rpx;background:var(--ink);color:#fff;border-radius:50%;font-size:55rpx}.result-title,.result-sub{display:block}.result-title{font-size:52rpx;font-weight:700}.result-sub{color:var(--muted);margin-top:15rpx}.order-no{font-size:21rpx;color:#777;margin-top:34rpx}.actions{display:flex;gap:18rpx;margin-top:55rpx}.actions button{flex:1;font-size:25rpx}.result-art{height:280rpx;display:flex;align-items:flex-end;justify-content:center;gap:8rpx;font-size:100rpx}.result-art text:nth-child(2){font-size:140rpx}.footer{font-size:18rpx;letter-spacing:4rpx;color:#829080}
</style>

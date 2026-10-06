<template>
  <view class="login-page" :style="$themeStyle + ';padding-top:' + top + 'px'">
    <text class="close" @tap="back">×</text><view class="login-art"><text>W</text><view class="orbit"></view></view>
    <view class="login-box"><text class="login-en">WELCOME TO</text><text class="login-title">WILD MARKET</text><text class="login-copy">登录后，收藏每一份喜欢，记录每一次认真生活。</text>
      <button class="btn-primary login-btn" @tap="login">手机号快捷登录</button><button class="btn-ghost guest-btn" @tap="guest">先逛一逛</button>
      <view class="agreement"><text :class="{checked:agree}" @tap="agree=!agree">{{agree?'✓':''}}</text><view>我已阅读并同意《用户协议》和《隐私政策》</view></view>
      <text class="demo-tip">登录即享会员价、积分与专属权益</text>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'; import { onLoad } from '@dcloudio/uni-app'; const top=uni.getSystemInfoSync().statusBarHeight||20; const agree=ref(true),next=ref(''); onLoad(o=>next.value=decodeURIComponent(o.next||''));
const back=()=>uni.navigateBack(); const guest=back; const login=()=>{if(!agree.value)return uni.showToast({title:'请先同意用户协议',icon:'none'});uni.setStorageSync('demo_user',{nickname:'林小野',phone:'138****2026'});uni.showToast({title:'登录成功'});setTimeout(()=>{if(next.value)uni.redirectTo({url:next.value});else back()},500)}
</script>
<style scoped>
.login-page{min-height:100vh;box-sizing:border-box;background:linear-gradient(145deg,var(--accent-start),var(--accent-end));color:#fff;position:relative;overflow:hidden}.close{position:absolute;z-index:3;top:80rpx;left:32rpx;font-size:52rpx}.login-art{height:43vh;position:relative;display:flex;align-items:center;justify-content:center}.login-art>text{font-family:Georgia,serif;font-size:190rpx;z-index:2}.orbit{position:absolute;width:330rpx;height:330rpx;border:1rpx solid rgba(255,255,255,.3);border-radius:48% 52% 45% 55%;transform:rotate(20deg)}.login-box{min-height:57vh;background:var(--paper);color:var(--ink);border-radius:50rpx 50rpx 0 0;padding:54rpx 48rpx;box-sizing:border-box}.login-en,.login-title,.login-copy{display:block;text-align:center}.login-en{font-size:17rpx;letter-spacing:5rpx;color:#999}.login-title{font-family:Georgia,serif;font-size:48rpx;letter-spacing:4rpx;margin-top:15rpx}.login-copy{font-size:24rpx;color:var(--muted);line-height:1.7;margin:26rpx auto 42rpx;max-width:500rpx}.login-btn,.guest-btn{margin-top:20rpx;font-size:27rpx}.guest-btn{height:92rpx;line-height:92rpx}.agreement{display:flex;justify-content:center;align-items:flex-start;font-size:20rpx;color:#888;margin-top:34rpx}.agreement>text{width:28rpx;height:28rpx;line-height:28rpx;text-align:center;border:1rpx solid #999;border-radius:50%;margin-right:10rpx}.agreement>text.checked{background:var(--ink);color:#fff}.demo-tip{display:block;text-align:center;color:#aaa;font-size:19rpx;margin-top:28rpx}
</style>

<template>
  <view class="page settings-page safe-bottom" :style="$themeStyle">
    <view class="setting-group card">
      <view class="setting-row" @tap="go('/pages/account/account')"><text>账号与个人资料</text><text class="muted">›</text></view>
      <view class="setting-row"><text>订单状态通知</text><switch :color="$themeAccent" :checked="settings.orderNotice" @change="change('orderNotice',$event.detail.value)"/></view>
      <view class="setting-row"><text>优惠活动通知</text><switch :color="$themeAccent" :checked="settings.promoNotice" @change="change('promoNotice',$event.detail.value)"/></view>
    </view>
    <view class="setting-group card">
      <view class="setting-row" @tap="privacy"><text>隐私设置</text><text class="muted">›</text></view>
      <view class="setting-row" @tap="clearCache"><text>清理缓存</text><text class="muted">{{cacheText}}　›</text></view>
      <view class="setting-row" @tap="about"><text>关于 WILD MARKET</text><text class="muted">v1.0.0　›</text></view>
    </view>
    <button v-if="loggedIn" class="logout card" @tap="logout">退出登录</button>
    <text class="record">WILD MARKET · 用心挑选日常好物</text>
  </view>
</template>
<script setup>
import { reactive, ref } from 'vue'
const saved=uni.getStorageSync('shop_settings')||{}
const settings=reactive({orderNotice:saved.orderNotice!==false,promoNotice:saved.promoNotice!==false})
const loggedIn=ref(!!uni.getStorageSync('demo_user')),cacheText=ref('12.6 MB')
const change=(key,value)=>{settings[key]=value;uni.setStorageSync('shop_settings',{...settings})}
const go=url=>uni.navigateTo({url})
const privacy=()=>uni.showModal({title:'隐私设置',content:'我们仅保存完成购物所需的信息。你可以随时清理设备中的购物记录与偏好设置。',showCancel:false,confirmText:'我知道了'})
const about=()=>uni.showModal({title:'WILD MARKET',content:'认真挑选每一件日常好物\n当前版本 1.0.0',showCancel:false,confirmText:'关闭'})
const clearCache=()=>uni.showModal({title:'清理缓存',content:'将清除图片缓存和临时数据，不影响订单、收藏和收货地址。',success:res=>{if(!res.confirm)return;cacheText.value='0 KB';uni.showToast({title:'清理完成'})}})
const logout=()=>uni.showModal({title:'退出登录',content:'退出后仍会保留购物袋中的商品。',confirmColor:'#de5b3d',success:res=>{if(!res.confirm)return;uni.removeStorageSync('demo_user');loggedIn.value=false;uni.showToast({title:'已退出'});setTimeout(()=>uni.switchTab({url:'/pages/profile/profile'}),500)}})
</script>
<style scoped>
.settings-page{padding-top:24rpx}.setting-group{padding:0 30rpx;margin-bottom:22rpx}.setting-row{height:104rpx;display:flex;align-items:center;border-bottom:1rpx solid var(--line)}.setting-row:last-child{border:0}.setting-row>text:first-child{flex:1}.setting-row switch{transform:scale(.82);transform-origin:right center}.logout{width:100%;height:100rpx;margin-top:35rpx;background:var(--card);color:var(--accent);font-size:28rpx;line-height:1;border-radius:28rpx}.record{display:block;text-align:center;color:#aaa;font-size:19rpx;letter-spacing:2rpx;margin-top:70rpx}
</style>

<template>
  <view class="page profile-page" :class="'profile-' + $themeLayout.profile" :style="$themeStyle">
    <view class="profile-card" @tap="openAccount"><view class="avatar">{{ user ? (user.nickname || '野').slice(-1) : '○' }}</view><view class="user-info"><text class="user-name">{{ user ? user.nickname : '点击登录 / 注册' }}</text><text>{{ user ? 'WILD MEMBER · 银叶会员' : '登录享会员价与专属权益' }}</text></view><text>›</text></view>
    <view class="member-card" @tap="openMember"><text class="member-en">WILD MEMBER</text><text class="member-title">把日常过成喜欢的样子</text><view class="between member-bottom"><text>{{user?'成长值 680 / 1000':'登录后查看会员权益'}}</text><text>会员中心 →</text></view></view>
    <view class="order-card card"><view class="between order-head"><text>我的订单</text><text class="muted" @tap="orders(0)">全部订单 ›</text></view><view class="order-types"><view v-for="(item,i) in orderTypes" :key="item.name" @tap="orders(i+1)"><image class="order-icon" :src="item.icon" mode="aspectFit"/><text>{{item.name}}</text><text v-if="item.badge" class="badge">{{item.badge}}</text></view></view></view>
    <view class="tools card">
      <view v-for="item in tools" :key="item.name" class="tool" @tap="go(item.url)"><image class="tool-icon" :src="item.icon" mode="aspectFit"/><text>{{item.name}}</text><text class="muted">›</text></view>
    </view>
    <view class="promise"><text>WILD MARKET</text><text>认真挑选每一件日常好物</text></view>
  </view>
</template>

<script setup>
import { ref } from 'vue'; import { onShow } from '@dcloudio/uni-app'; import { requireLogin } from '../../utils/shop'
const user=ref(null); onShow(()=>user.value=uni.getStorageSync('demo_user')||null)
const orderTypes=[{icon:'/static/icons/profile/pay.png',name:'待付款',badge:1},{icon:'/static/icons/profile/ship.png',name:'待发货'},{icon:'/static/icons/profile/receive.png',name:'待收货',badge:2},{icon:'/static/icons/profile/review.png',name:'待评价'},{icon:'/static/icons/profile/after.png',name:'售后'}]
const tools=[{icon:'/static/icons/profile/address.png',name:'收货地址',url:'/pages/address/address'},{icon:'/static/icons/profile/coupon.png',name:'优惠券',url:'/pages/coupons/coupons'},{icon:'/static/icons/profile/favorite.png',name:'我的收藏',url:'/pages/favorites/favorites'},{icon:'/static/icons/profile/service.png',name:'联系客服',url:'/pages/service/service'},{icon:'/static/icons/profile/settings.png',name:'设置',url:'/pages/settings/settings'}]
const openAccount=()=>{if(user.value)go('/pages/account/account');else go('/pages/login/login')}; const openMember=()=>{if(requireLogin('/pages/member/member'))go('/pages/member/member')}; const go=url=>url?uni.navigateTo({url}):uni.showToast({title:'功能即将开放',icon:'none'}); const orders=tab=>{if(requireLogin(`/pages/orders/orders?tab=${tab}`))go(`/pages/orders/orders?tab=${tab}`)}
</script>

<style scoped>
.profile-page{padding-top:28rpx}.profile-card{display:flex;align-items:center;padding:22rpx 8rpx 34rpx}.avatar{width:112rpx;height:112rpx;line-height:112rpx;text-align:center;border-radius:50%;background:var(--accent-soft);color:var(--accent);font-size:42rpx;font-weight:700}.user-info{flex:1;margin-left:24rpx}.user-info text{display:block;font-size:22rpx;color:var(--muted);margin-top:10rpx}.user-info .user-name{font-size:36rpx;font-weight:700;color:var(--ink);margin:0}.member-card{height:240rpx;padding:38rpx;box-sizing:border-box;background:linear-gradient(135deg,var(--accent-start),var(--accent-end));color:white;border-radius:var(--card-radius);position:relative;box-shadow:0 12rpx 28rpx rgba(0,0,0,.10)}.member-en,.member-title{display:block}.member-en{font-size:17rpx;letter-spacing:4rpx;opacity:.65}.member-title{font-size:35rpx;font-weight:700;margin-top:20rpx}.member-bottom{font-size:21rpx;opacity:.85;margin-top:36rpx}.order-card{padding:30rpx;margin-top:22rpx}.order-head>text:first-child{font-weight:700;font-size:31rpx}.order-types{display:flex;justify-content:space-between;margin-top:34rpx}.order-types>view{position:relative;text-align:center;font-size:20rpx}.order-types text{display:block}.order-icon{display:block;width:52rpx;height:52rpx;margin:0 auto 13rpx}.badge{position:absolute;right:2rpx;top:-12rpx!important;background:var(--accent);color:white;border-radius:50%;width:30rpx;height:30rpx;line-height:30rpx}.tools{margin-top:22rpx;padding:4rpx 28rpx}.tool{height:94rpx;display:flex;align-items:center;border-bottom:1rpx solid var(--line)}.tool:last-child{border:0}.tool-icon{width:42rpx;height:42rpx;margin-right:20rpx;flex-shrink:0}.tool .muted{margin-left:auto}.promise{text-align:center;padding:60rpx 0;color:#aaa}.promise text{display:block;font-size:20rpx;letter-spacing:3rpx;margin-top:10rpx}

/* 自然生活：封面式个人中心 */
.profile-cover{padding-top:0}.profile-cover .profile-card{margin:0 -28rpx;padding:58rpx 38rpx 125rpx;background:var(--accent-soft)}
.profile-cover .avatar{width:126rpx;height:126rpx;line-height:126rpx;background:var(--card);border:1rpx solid var(--line);color:var(--ink)}
.profile-cover .member-card{height:250rpx;margin-top:-86rpx;padding:40rpx 42rpx;border-radius:34rpx;background:linear-gradient(145deg,var(--accent-start),var(--accent-end));box-shadow:0 18rpx 42rpx rgba(31,48,38,.18)}
.profile-cover .member-title{font-family:Georgia,serif;font-size:39rpx}.profile-cover .order-card{margin-top:30rpx;border-radius:30rpx}.profile-cover .tools{border-radius:30rpx}

/* 极简黑白：模块化仪表盘 */
.profile-dashboard{padding-top:12rpx}.profile-dashboard .profile-card{padding:32rpx 6rpx;border-bottom:1rpx solid var(--line)}
.profile-dashboard .avatar{border-radius:0;background:var(--ink);color:#fff}.profile-dashboard .user-name{font-family:Georgia,serif}
.profile-dashboard .member-card{height:180rpx;margin-top:20rpx;padding:28rpx 32rpx;border-radius:0;background:var(--ink);box-shadow:none}.profile-dashboard .member-title{font-size:30rpx;margin-top:10rpx}.profile-dashboard .member-bottom{margin-top:24rpx}
.profile-dashboard .order-card{border:1rpx solid var(--line);border-radius:0;box-shadow:none}.profile-dashboard .order-types{margin-top:25rpx}.profile-dashboard .order-icon{width:45rpx;height:45rpx}
.profile-dashboard .tools{display:flex;flex-wrap:wrap;padding:0;border:1rpx solid var(--line);border-radius:0;background:transparent}
.profile-dashboard .tool{width:50%;height:120rpx;padding:0 20rpx;box-sizing:border-box;border-bottom:1rpx solid var(--line);background:var(--card)}.profile-dashboard .tool:nth-child(odd){border-right:1rpx solid var(--line)}.profile-dashboard .tool:last-child{border-bottom:1rpx solid var(--line)}
.profile-dashboard .tool-icon{width:36rpx;height:36rpx;margin-right:14rpx}.profile-dashboard .promise{border-top:1rpx solid var(--line);margin-top:38rpx;padding-top:32rpx}
</style>

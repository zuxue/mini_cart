<template>
  <view class="member-page safe-bottom" :style="$themeStyle">
    <view class="hero">
      <text class="member-en">WILD MEMBER</text>
      <view class="between"><view><text class="level">银叶会员</text><text class="hello">{{ user.nickname }}，欢迎回来</text></view><view class="medal">W</view></view>
      <view class="progress"><view></view></view>
      <view class="between progress-copy"><text>当前成长值 680</text><text>距金叶会员还差 320</text></view>
    </view>
    <view class="stats card"><view><text>520</text><text>可用积分</text></view><view><text>3</text><text>可用优惠券</text></view><view><text>12</text><text>收藏好物</text></view></view>
    <view class="section"><view class="between section-head"><text class="section-title">会员权益</text><text class="muted">当前等级可享</text></view><view class="benefits card"><view v-for="item in benefits" :key="item.title" @tap="useBenefit(item)"><view>{{item.icon}}</view><text>{{item.title}}</text><text>{{item.desc}}</text></view></view></view>
    <view class="section"><text class="section-title">成长任务</text><view class="tasks card"><view v-for="item in tasks" :key="item.title"><view><text>{{item.title}}</text><text>{{item.desc}}</text></view><button :class="{done:item.done}" @tap="finish(item)">{{item.done?'已完成':'去完成'}}</button></view></view></view>
    <view class="rule"><text>等级说明</text><text>成长值达到 1000 可升级为金叶会员，享受更多专属权益。成长值自获得之日起长期有效。</text></view>
  </view>
</template>
<script setup>
import { reactive } from 'vue'
const user = uni.getStorageSync('demo_user') || { nickname: '会员' }
const benefits=[{icon:'券',title:'每月好券',desc:'会员专属优惠'},{icon:'倍',title:'双倍积分',desc:'每月会员日'},{icon:'礼',title:'生日礼遇',desc:'生日月可领取'},{icon:'运',title:'全场包邮',desc:'不限金额包邮'}]
const tasks=reactive([{title:'完善个人资料',desc:'成长值 +20',done:false},{title:'每日签到',desc:'成长值 +5',done:false},{title:'完成一次购物',desc:'成长值 +50',done:true}])
const useBenefit=item=>uni.showToast({title:`已查看${item.title}`,icon:'none'})
const finish=item=>{if(item.done)return;item.done=true;uni.showToast({title:'任务已完成'})}
</script>
<style scoped>
.member-page{padding-bottom:50rpx}.hero{height:390rpx;background:linear-gradient(135deg,var(--accent-start),var(--accent-end));color:#fff;padding:58rpx 38rpx;box-sizing:border-box}.member-en{font-size:18rpx;letter-spacing:5rpx;opacity:.45}.level,.hello{display:block}.level{font-family:Georgia,serif;font-size:48rpx;margin-top:24rpx}.hello{font-size:22rpx;opacity:.65;margin-top:10rpx}.medal{width:100rpx;height:100rpx;line-height:100rpx;text-align:center;border:1rpx solid rgba(255,255,255,.4);border-radius:50%;font-family:Georgia,serif;font-size:45rpx;color:#d9c6a1}.progress{height:10rpx;background:rgba(255,255,255,.18);border-radius:10rpx;margin-top:45rpx}.progress view{width:68%;height:100%;background:#d9c6a1;border-radius:10rpx}.progress-copy{font-size:20rpx;opacity:.65;margin-top:14rpx}.stats{display:flex;margin:-45rpx 28rpx 0;position:relative;padding:30rpx 10rpx}.stats>view{width:33.33%;text-align:center;border-right:1rpx solid var(--line)}.stats>view:last-child{border:0}.stats text{display:block}.stats text:first-child{font-size:36rpx;font-weight:700}.stats text:last-child{font-size:20rpx;color:var(--muted);margin-top:7rpx}.section{padding:48rpx 28rpx 0}.section-head{align-items:flex-end;margin-bottom:22rpx}.benefits{display:flex;flex-wrap:wrap;padding:18rpx 10rpx}.benefits>view{width:50%;text-align:center;padding:25rpx 0}.benefits>view>view{width:72rpx;height:72rpx;line-height:72rpx;margin:auto;border-radius:50%;background:#ece5d9;color:#8d6d42;font-weight:700}.benefits text{display:block}.benefits>view>text:nth-child(2){font-weight:700;margin-top:13rpx}.benefits>view>text:last-child{font-size:19rpx;color:var(--muted);margin-top:5rpx}.tasks{padding:4rpx 28rpx;margin-top:22rpx}.tasks>view{display:flex;align-items:center;padding:25rpx 0;border-bottom:1rpx solid var(--line)}.tasks>view:last-child{border:0}.tasks>view>view{flex:1}.tasks text{display:block}.tasks text+text{font-size:20rpx;color:var(--muted);margin-top:7rpx}.tasks button{margin:0;width:116rpx;height:64rpx;background:var(--ink);color:#fff;border-radius:32rpx;font-size:21rpx;line-height:1;padding:0;display:flex;align-items:center;justify-content:center}.tasks button.done{background:#e8e4dc;color:#999}.rule{padding:50rpx 42rpx;color:var(--muted);font-size:21rpx;line-height:1.7}.rule text{display:block}.rule text:first-child{font-size:27rpx;font-weight:700;color:var(--ink);margin-bottom:12rpx}
</style>

<template>
  <view class="page address-page" :style="$themeStyle">
    <view v-if="list.length">
      <view v-for="item in list" :key="item.id" class="address-item card" @tap="choose(item)">
        <view v-if="select" class="radio" :class="{ active: selectedId === item.id }">{{ selectedId === item.id ? '✓' : '' }}</view>
        <view class="address-main">
          <view class="between"><text class="name">{{item.name}}　{{item.phone}}</text><text class="edit" @tap.stop="edit(item)">编辑</text></view>
          <text class="detail">{{item.detail}}</text>
          <text v-if="item.isDefault" class="default">默认地址</text>
        </view>
      </view>
    </view>
    <view v-else class="empty"><view class="empty-icon">⌖</view><view>还没有收货地址</view></view>
    <button class="btn-primary add" @tap="add">＋ 新增收货地址</button>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getAddresses } from '../../utils/address'

const list = ref([])
const select = ref(false)
const selectedId = ref(null)

onLoad(options => { select.value = !!options.select })
onShow(() => {
  list.value = getAddresses()
  const selected = uni.getStorageSync('selected_address')
  selectedId.value = selected ? selected.id : (list.value.find(item => item.isDefault)?.id || null)
})

const choose = item => {
  if (!select.value) return edit(item)
  uni.setStorageSync('selected_address', item)
  uni.navigateBack()
}
const edit = item => uni.navigateTo({ url: `/pages/address-edit/address-edit?id=${item.id}` })
const add = () => uni.navigateTo({ url: '/pages/address-edit/address-edit' })
</script>
<style scoped>
.address-page{padding-top:24rpx;padding-bottom:150rpx}.address-item{padding:30rpx;margin-bottom:20rpx;display:flex;align-items:center}.address-main{flex:1;min-width:0}.radio{width:38rpx;height:38rpx;line-height:38rpx;text-align:center;border:1rpx solid #aaa;border-radius:50%;margin-right:22rpx;flex-shrink:0;font-size:21rpx}.radio.active{background:var(--ink);color:#fff;border-color:var(--ink)}.name{font-weight:700;font-size:30rpx}.edit{font-size:22rpx;color:var(--muted);padding:10rpx}.detail{display:block;color:var(--muted);font-size:24rpx;line-height:1.6;margin-top:16rpx}.default{display:inline-block;background:#ead6cf;color:var(--accent);font-size:19rpx;padding:5rpx 10rpx;border-radius:6rpx;margin-top:16rpx}.add{position:fixed;z-index:5;left:28rpx;right:28rpx;bottom:calc(30rpx + env(safe-area-inset-bottom));width:auto}
</style>

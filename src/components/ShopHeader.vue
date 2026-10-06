<template>
  <view class="header" :class="'header-' + $themeLayout.home" :style="{ paddingTop: top + 'px' }">
    <view class="between header-inner">
      <view class="brand-wrap"><text class="brand-mark">W</text><text class="brand">WILD MARKET</text></view>
      <view class="header-actions"><text @tap="$emit('search')">⌕</text><text @tap="goCart">袋</text></view>
    </view>
  </view>
</template>

<script setup>
const info = uni.getSystemInfoSync()
const top = info.statusBarHeight || 20
const goCart = () => uni.switchTab({ url: '/pages/cart/cart' })
defineEmits(['search'])
</script>

<style scoped>
.header { background: var(--paper); }
.header-inner { height: 92rpx; }
.brand-wrap{display:flex;align-items:center;gap:13rpx}.brand-mark{width:48rpx;height:48rpx;line-height:48rpx;text-align:center;background:linear-gradient(135deg,var(--accent-start),var(--accent-end));color:#fff;border-radius:14rpx;font-weight:800;font-size:27rpx}.brand { font-size: 31rpx; font-weight: 800; letter-spacing: 1rpx; }
.header-actions { display: flex; gap: 32rpx; font-size: 34rpx; }
.header-editorial .header-inner{height:118rpx}.header-editorial .brand-wrap{gap:16rpx}.header-editorial .brand-mark{border-radius:50%;background:transparent;border:2rpx solid var(--accent);color:var(--accent);font-family:Georgia,serif}.header-editorial .brand{font-family:Georgia,serif;font-size:29rpx;letter-spacing:3rpx}
.header-gallery .brand-mark{border-radius:0;background:var(--ink)}.header-gallery .brand{letter-spacing:2rpx}.header-gallery .header-inner{border-bottom:1rpx solid var(--line)}
</style>

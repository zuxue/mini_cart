<template>
  <view class="product-card" :class="'product-card-' + variant" @tap="openProduct">
    <view class="art product-art" :class="'art-' + product.tone"><image v-if="product.image" class="product-image" :src="product.image" mode="aspectFill"/><text v-else class="art-icon">{{ product.cover }}</text><text v-if="product.tag" class="tag">{{ product.tag }}</text></view>
    <view class="product-info">
      <text class="product-title">{{ product.title }}</text>
      <text class="product-sub">{{ product.subtitle }}</text>
      <view class="between product-price"><text class="price">{{ product.price }}</text><text class="add" @tap.stop="quickAdd">＋</text></view>
    </view>
  </view>
</template>

<script setup>
import { addCart } from '../utils/shop'
const props = defineProps({ product: { type: Object, required: true }, variant: { type: String, default: 'grid' } })
const openProduct = () => uni.navigateTo({ url: `/pages/product/product?id=${props.product.id}` })
const quickAdd = () => {
  addCart(props.product, props.product.specs[0])
  uni.showToast({ title: '已加入购物袋', icon: 'success' })
}
</script>

<style scoped>
.product-card { width: 100%; margin-bottom: 24rpx; background:var(--card);border-radius:var(--card-radius);overflow:hidden;box-shadow:0 4rpx 16rpx rgba(0,0,0,.035) }
.product-art { height: 330rpx; border-radius: 0; background:var(--card) }
.tag { position: absolute; z-index: 3; left: 18rpx; top: 18rpx; padding: 8rpx 14rpx; color: #fff; background: rgba(24,36,29,.78); border-radius: 99rpx; font-size: 18rpx; }
.product-info { padding: 18rpx 18rpx 20rpx; }
.product-title, .product-sub { display: block; }
.product-title { font-size: 27rpx; font-weight: 500;line-height:1.4;height:76rpx;white-space:normal;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden }
.product-sub { font-size: 22rpx; color: var(--muted); margin-top: 7rpx; }
.product-price { margin-top: 16rpx; font-size: 32rpx;color:var(--accent) }
.add { width: 48rpx; height: 48rpx; line-height: 44rpx; text-align: center; background:var(--accent);color:#fff; border-radius: 50%; font-size: 32rpx; }
.product-card-list{display:flex;min-height:230rpx;box-shadow:none;border:1rpx solid var(--line)}
.product-card-list .product-art{width:245rpx;height:245rpx;flex-shrink:0}
.product-card-list .product-info{flex:1;padding:24rpx;display:flex;min-width:0;flex-direction:column}
.product-card-list .product-title{height:auto;-webkit-line-clamp:1;font-size:29rpx;font-weight:650}
.product-card-list .product-sub{flex:1}
.product-card-list .product-price{margin-top:auto}
.product-card-poster{box-shadow:none;background:transparent;border-radius:0}
.product-card-poster .product-art{height:360rpx;border-radius:0}
.product-card-poster .product-info{padding:18rpx 0 24rpx;border-bottom:1rpx solid var(--line)}
.product-card-poster .product-title{font-weight:700}
.product-card-poster .add{border-radius:0;background:var(--ink)}
</style>

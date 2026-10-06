<template>
  <view class="page favorite-page safe-bottom" :style="$themeStyle">
    <view v-if="list.length">
      <view class="between count"><text>共收藏 {{list.length}} 件好物</text><text class="muted" @tap="editing=!editing">{{editing?'完成':'管理'}}</text></view>
      <view class="favorite-grid">
        <view v-for="item in list" :key="item.id" class="favorite-item">
          <view class="art favorite-art" :class="'art-'+item.tone" @tap="open(item.id)"><image v-if="item.image" class="product-image" :src="item.image" mode="aspectFill"/><text v-else class="art-icon">{{item.cover}}</text><text v-if="editing" class="remove" @tap.stop="remove(item.id)">×</text></view>
          <text class="title" @tap="open(item.id)">{{item.title}}</text>
          <text class="sub">{{item.subtitle}}</text>
          <view class="between price-row"><text class="price">{{item.price}}</text><text class="cart" @tap="add(item)">＋</text></view>
        </view>
      </view>
    </view>
    <view v-else class="empty"><view class="empty-icon">♡</view><view class="empty-title">还没有收藏好物</view><view>遇见喜欢的商品，就把它收藏起来吧</view><button class="btn-primary empty-btn" @tap="home">去逛逛</button></view>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getFavorites, removeFavorite } from '../../utils/favorites'
import { addCart } from '../../utils/shop'
const list=ref([]),editing=ref(false)
onShow(()=>list.value=getFavorites())
const open=id=>uni.navigateTo({url:`/pages/product/product?id=${id}`})
const remove=id=>{list.value=removeFavorite(id);uni.showToast({title:'已移除',icon:'none'})}
const add=item=>{addCart(item,item.specs?.[0]||item.subtitle);uni.showToast({title:'已加入购物袋'})}
const home=()=>uni.switchTab({url:'/pages/home/home'})
</script>
<style scoped>
.favorite-page{padding-top:20rpx}.count{padding:10rpx 2rpx 30rpx}.favorite-grid{display:flex;flex-wrap:wrap;justify-content:space-between}.favorite-item{width:48%;margin-bottom:38rpx}.favorite-art{height:320rpx;border-radius:24rpx}.favorite-art .art-icon{font-size:90rpx}.remove{position:absolute;z-index:4;right:14rpx;top:14rpx;width:48rpx;height:48rpx;line-height:44rpx;text-align:center;border-radius:50%;background:rgba(24,36,29,.82);color:#fff;font-size:36rpx}.title,.sub{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.title{font-weight:700;margin-top:17rpx}.sub{font-size:21rpx;color:var(--muted);margin-top:7rpx}.price-row{margin-top:14rpx}.price-row .price{font-size:32rpx}.cart{width:46rpx;height:46rpx;line-height:42rpx;text-align:center;border:1rpx solid var(--ink);border-radius:50%;font-size:31rpx}.empty-title{font-size:34rpx;font-weight:700;color:var(--ink);margin-bottom:14rpx}.empty-btn{width:260rpx;margin-top:40rpx}
</style>

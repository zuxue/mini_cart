<template>
  <view class="category-page" :class="'category-' + $themeLayout.category" :style="$themeStyle">
    <view class="category-search"><SearchBar placeholder="搜索全部商品" @confirm="search" /></view>
    <view class="layout">
      <scroll-view :scroll-y="$themeLayout.category === 'sidebar'" :scroll-x="$themeLayout.category !== 'sidebar'" class="side" :show-scrollbar="false" :scroll-into-view="navIntoView" scroll-with-animation>
        <view v-for="(item,index) in categories" :id="'category-' + item.id" :key="item.id" class="side-item" :class="{ active: active === index }" @tap="selectCategory(index)">{{ item.name }}</view>
      </scroll-view>
      <scroll-view scroll-y class="content" :scroll-top="contentScrollTop" scroll-with-animation>
        <view class="category-banner" :class="'banner-' + $themeLayout.banner"><text class="banner-kicker">{{ categories[active].name }} COLLECTION</text><text class="banner-title">认真生活的\n每一种方式</text><image class="banner-icon" :src="categories[active].image" mode="aspectFit"/></view>
        <view class="content-title">{{ categories[active].name }}好物 <text>{{ list.length }} 件</text></view>
        <view class="product-list" :class="'category-products-' + $themeLayout.products">
          <view v-for="item in list" :key="item.id" class="mini-product" @tap="open(item.id)">
            <view class="art mini-art" :class="'art-'+item.tone"><image v-if="item.image" class="product-image" :src="item.image" mode="aspectFill"/><text v-else class="art-icon">{{ item.cover }}</text></view>
            <text class="mini-title">{{ item.title }}</text><text class="mini-sub">{{ item.subtitle }}</text><text class="price mini-price">{{ item.price }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { products, categories } from '../../data/mock'
import SearchBar from '../../components/SearchBar.vue'
const active = ref(0)
const navIntoView = ref(`category-${categories[0].id}`)
const contentScrollTop = ref(0)
const list = computed(() => products.filter(item => item.categoryIds.includes(Number(categories[active.value].id))))
const selectCategory = index => {
  active.value = index
  navIntoView.value = `category-${categories[index].id}`
  contentScrollTop.value = 1
  nextTick(() => { contentScrollTop.value = 0 })
}
onShow(() => {
  const storedId = uni.getStorageSync('category_tab')
  if (storedId === '' || storedId === undefined || storedId === null) return
  uni.removeStorageSync('category_tab')
  const index = categories.findIndex(item => Number(item.id) === Number(storedId))
  if (index >= 0) selectCategory(index)
})
const open = id => uni.navigateTo({ url: `/pages/product/product?id=${id}` })
const search = keyword => {
  uni.navigateTo({ url: `/pages/search/search?keyword=${encodeURIComponent(keyword)}` })
}
</script>

<style scoped>
.category-page { height: 100vh; overflow: hidden; }
.category-search{margin:18rpx 28rpx 26rpx}
.layout { display: flex; height: calc(100vh - 126rpx); }
.side { width: 166rpx; height: 100%; background: var(--paper); flex-shrink: 0; border-right: 1rpx solid var(--line); box-sizing: border-box; }
.side-item { height: 108rpx; line-height: 108rpx; text-align: center; color: var(--muted); font-size: 26rpx; position: relative; }.side-item.active { background: var(--card); color: var(--accent); font-weight: 700; }.side-item.active::before { content:''; position:absolute; left:0; top:31rpx; height:46rpx; width:7rpx; background:var(--accent); border-radius:0 8rpx 8rpx 0; }
.content { height: 100%; padding: 0 24rpx; box-sizing: border-box; }
.category-banner { height: 238rpx; padding: 34rpx; box-sizing: border-box; background: linear-gradient(135deg,var(--accent-start),var(--accent-end)); color: white; border-radius: var(--card-radius); position: relative; overflow:hidden; }
.banner-kicker,.banner-title { display:block; position:relative; z-index:2 }.banner-kicker{font-size:16rpx;letter-spacing:2rpx;opacity:.6}.banner-title{font-family:Georgia,serif;font-size:38rpx;line-height:1.35;margin-top:22rpx}.banner-icon{position:absolute;right:15rpx;bottom:0;width:170rpx;height:170rpx;opacity:.55}
.content-title { font-weight: 700; font-size: 30rpx; margin: 36rpx 0 22rpx; }.content-title text { font-size: 20rpx; color: var(--muted); font-weight: 400; }
.product-list { display:flex; flex-wrap:wrap; justify-content:space-between }.mini-product{width:48%;margin-bottom:34rpx}.mini-art{height:190rpx;border-radius:var(--card-radius)}.mini-art .art-icon{font-size:65rpx}.mini-title,.mini-sub,.mini-price{display:block}.mini-title{font-size:24rpx;font-weight:600;margin-top:13rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mini-sub{font-size:19rpx;color:var(--muted);margin-top:5rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mini-price{font-size:27rpx;margin-top:9rpx}

/* 自然生活：横向胶囊分类与列表商品 */
.category-chips .layout,.category-tabs .layout{display:block;height:calc(100vh - 108rpx)}
.category-chips .side,.category-tabs .side{width:100%;height:92rpx;white-space:nowrap;border:0;padding:10rpx 22rpx;background:var(--card)}
.category-chips .side-item,.category-tabs .side-item{display:inline-block;width:auto;height:64rpx;line-height:64rpx;margin-right:12rpx;padding:0 28rpx;box-sizing:border-box}
.category-chips .side-item{border:1rpx solid var(--line);border-radius:var(--control-radius)}
.category-chips .side-item.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.category-chips .side-item.active::before,.category-tabs .side-item.active::before{display:none}
.category-chips .content,.category-tabs .content{height:calc(100% - 92rpx);padding:18rpx 28rpx 0}
.category-chips .category-banner{height:290rpx;background:var(--accent-soft);color:var(--ink);border-radius:34rpx}
.category-chips .banner-icon{width:230rpx;height:230rpx;right:8rpx;opacity:.8}.category-chips .banner-title{font-size:42rpx}
.category-products-list{display:block}.category-products-list .mini-product{width:100%;display:grid;grid-template-columns:220rpx 1fr;grid-template-rows:55rpx 42rpx 50rpx;margin-bottom:20rpx;background:var(--card);border-radius:var(--card-radius);overflow:hidden}
.category-products-list .mini-art{grid-row:1/4;width:220rpx;height:220rpx;border-radius:0;margin-right:24rpx}.category-products-list .mini-title{font-size:28rpx;margin:24rpx 20rpx 0 24rpx}.category-products-list .mini-sub{margin:4rpx 20rpx 0 24rpx}.category-products-list .mini-price{margin:8rpx 20rpx 0 24rpx;color:var(--accent)}

/* 极简黑白：文字标签与海报网格 */
.category-tabs .side{height:78rpx;padding:0 22rpx;border-bottom:1rpx solid var(--line);background:var(--paper)}
.category-tabs .side-item{height:78rpx;line-height:78rpx;padding:0 22rpx;margin:0;color:var(--muted)}.category-tabs .side-item.active{background:transparent;color:var(--ink);border-bottom:5rpx solid var(--ink)}
.category-tabs .content{height:calc(100% - 78rpx);padding:0 20rpx}.category-tabs .category-banner{height:210rpx;margin:0 -20rpx;border-radius:0;background:var(--ink)}
.category-tabs .banner-title{font-family:inherit;font-size:36rpx}.category-tabs .banner-icon{opacity:.35;filter:grayscale(1)}
.category-products-poster .mini-product{width:31.5%;margin-bottom:30rpx}.category-products-poster .mini-art{height:170rpx;border-radius:0}.category-products-poster .mini-title{font-size:21rpx}.category-products-poster .mini-sub{display:none}.category-products-poster .mini-price{font-size:24rpx}
</style>

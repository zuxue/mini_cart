<template>
  <view class="page home" :class="'home-' + $themeLayout.home" :style="$themeStyle">
    <ShopHeader @search="showSearch = true" />
    <view v-if="showSearch" class="home-search"><SearchBar v-model="homeKeyword" auto-focus placeholder="搜索好物、品牌或分类" action-text="取消" @confirm="doSearch" @action="closeSearch" /></view>

    <swiper class="hero" :class="'hero-' + $themeLayout.hero" circular autoplay :interval="4200" indicator-dots :indicator-color="$themeLayout.hero === 'gallery' ? 'rgba(0,0,0,.22)' : 'rgba(255,255,255,.55)'" :indicator-active-color="$themeAccent">
      <swiper-item v-for="(banner,index) in banners" :key="banner"><view class="hero-slide" @tap="go(index===1?'/pages/product/product?id=1098':'/pages/seckill/seckill')"><image class="hero-image" :src="banner" :mode="$themeLayout.hero === 'gallery' ? 'aspectFit' : 'aspectFill'"/><view v-if="$themeLayout.hero === 'editorial'" class="hero-copy"><text>{{index===0?'NATURAL SELECTION':'WILD MARKET'}}</text><text>{{index===0?'让日常，\n自然生长':'发现生活的\n温柔一面'}}</text><text>探索本季好物 →</text></view></view></swiper-item>
    </swiper>

    <scroll-view scroll-x class="category-scroll" :show-scrollbar="false"><view class="category-row"><view v-for="item in categories" :key="item.id" class="category-item" @tap="goCategory(item.id)"><view class="category-icon"><image :src="item.image" mode="aspectFit"/></view><text>{{ item.name }}</text></view></view></scroll-view>

    <view class="campaigns">
      <view class="campaign flash" @tap="go('/pages/seckill/seckill')"><text class="campaign-kicker">FLASH SALE</text><text class="campaign-title">限时秒杀</text><text class="campaign-sub">每日 10:00 开抢</text><image class="campaign-image" :src="homeMenus[0].image" mode="aspectFit"/></view>
      <view class="campaign group" @tap="go('/pages/group/group')"><text class="campaign-kicker">GROUP BUY</text><text class="campaign-title">一起拼团</text><text class="campaign-sub">好物低至 7 折</text><image class="campaign-image" :src="homeMenus[1].image" mode="aspectFit"/></view>
    </view>

    <view class="between section-head"><view><view class="section-title">本周新选</view><view class="section-en">Weekly selection</view></view><text class="muted" @tap="goCategory()">查看全部 →</text></view>
    <view class="product-grid" :class="'products-' + $themeLayout.products"><view v-for="item in products" :key="item.id" class="grid-item"><ProductCard :product="item" :variant="$themeLayout.products" /></view></view>

    <view class="assurance card"><view><text>✓</text><text>正品保障</text><text>品质严选</text></view><view><text>↺</text><text>7天无忧</text><text>售后无忧</text></view><view><text>⚡</text><text>极速发货</text><text>及时送达</text></view></view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import ShopHeader from '../../components/ShopHeader.vue'
import ProductCard from '../../components/ProductCard.vue'
import SearchBar from '../../components/SearchBar.vue'
import { products, categories, homeMenus } from '../../data/mock'
const showSearch = ref(false)
const homeKeyword = ref('')
const banners = [1,2,3,4].map(id => `/static/banners/${id}.jpg`)
const go = url => uni.navigateTo({ url })
const goCategory = id => {
  if (id !== undefined) uni.setStorageSync('category_tab', Number(id))
  else uni.removeStorageSync('category_tab')
  uni.switchTab({ url: '/pages/category/category' })
}
const closeSearch = () => { showSearch.value = false; homeKeyword.value = '' }
const doSearch = keyword => {
  showSearch.value = false
  uni.navigateTo({ url: `/pages/search/search?keyword=${encodeURIComponent(keyword)}` })
}
</script>

<style scoped>
.home { padding-top: 0; }
.home-search{margin-bottom:20rpx}
.hero { height: 320rpx; border-radius: 18rpx; overflow: hidden; background:#eee; }
.hero-slide,.hero-image{width:100%;height:100%;display:block}.hero-slide{position:relative}.hero-copy{position:absolute;z-index:2;left:42rpx;right:42rpx;bottom:48rpx;color:#fff;text-shadow:0 2rpx 12rpx rgba(0,0,0,.28)}.hero-copy text{display:block}.hero-copy text:first-child{font-size:16rpx;letter-spacing:5rpx}.hero-copy text:nth-child(2){font-size:42rpx;font-weight:700;margin:14rpx 0}.hero-copy text:last-child{font-size:21rpx}
.category-scroll { margin: 36rpx -28rpx 40rpx; width: calc(100% + 56rpx); white-space: nowrap; }
.category-row { display: inline-flex; padding: 0 28rpx; gap: 24rpx; }
.category-item { width: 108rpx; text-align: center; font-size: 22rpx; }
.category-icon { width: 88rpx; height: 88rpx; margin: 0 auto 12rpx; padding:10rpx;box-sizing:border-box;border:1rpx solid var(--line);border-radius: 50%; background: var(--accent-soft); overflow:hidden; }.category-icon image{display:block;width:100%;height:100%}
.campaigns { display: flex; gap: 18rpx; }
.campaign { width: 50%; height: 190rpx; padding: 25rpx; box-sizing: border-box; border-radius: 18rpx; position: relative; overflow: hidden; }
.flash { background: linear-gradient(135deg,var(--accent-soft),var(--card)); }.group { background: linear-gradient(135deg,var(--card),var(--accent-soft)); }
.campaign-kicker,.campaign-title,.campaign-sub { display: block; position: relative; z-index: 2; }
.campaign-kicker { font-size: 17rpx; letter-spacing: 2rpx; color:var(--accent);opacity:.7 }.campaign-title { font-size: 33rpx; font-weight: 700; margin-top: 14rpx; }.campaign-sub { font-size: 20rpx; margin-top: 10rpx;color:var(--muted) }
.campaign-image { position: absolute; right: 8rpx; bottom: 5rpx; width: 88rpx; height: 88rpx; }
.section-head { margin: 64rpx 0 30rpx; align-items: flex-end; }
.product-grid { display: flex; flex-wrap: wrap; justify-content: space-between; }.grid-item { width: 48%; }
.assurance{display:flex;padding:34rpx 15rpx;margin-top:20rpx}.assurance>view{width:33.33%;text-align:center;border-right:1rpx solid var(--line)}.assurance>view:last-child{border:0}.assurance text{display:block;font-size:20rpx;color:var(--muted);margin-top:5rpx}.assurance>view>text:first-child{font-size:31rpx;color:var(--accent)}.assurance>view>text:nth-child(2){font-size:24rpx;color:var(--ink);font-weight:600;margin-top:9rpx}

/* 自然生活：左右分栏的杂志型首页 */
.home-editorial .hero{height:390rpx;border-radius:32rpx;background:var(--accent-soft)}
.home-editorial .hero-slide{background:var(--accent-soft)}.home-editorial .hero-image{position:absolute;right:0;top:0;width:58%;height:100%;filter:none}
.home-editorial .hero-copy{left:36rpx;right:auto;bottom:52rpx;width:43%;color:var(--ink);text-shadow:none}.home-editorial .hero-copy text:first-child{color:var(--accent);font-size:14rpx;letter-spacing:3rpx}.home-editorial .hero-copy text:nth-child(2){white-space:pre-line;font-family:Georgia,serif;font-size:38rpx;line-height:1.35;margin:18rpx 0}.home-editorial .hero-copy text:last-child{color:var(--muted)}
.home-editorial .category-row{gap:18rpx}.home-editorial .category-item{width:112rpx}.home-editorial .category-icon{width:92rpx;height:92rpx;padding:11rpx;border-radius:20rpx;background:var(--accent-soft)}
.home-editorial .campaigns{display:grid;grid-template-columns:1.35fr .65fr;gap:16rpx}.home-editorial .campaign{width:100%;height:228rpx;margin:0;padding:30rpx}.home-editorial .campaign:first-child{background:var(--accent);color:#fff}.home-editorial .campaign:first-child .campaign-kicker,.home-editorial .campaign:first-child .campaign-sub{color:#fff}.home-editorial .campaign:last-child{background:var(--card);border:1rpx solid var(--line)}.home-editorial .campaign-image{width:116rpx;height:116rpx;right:12rpx;bottom:5rpx}.home-editorial .campaign:last-child .campaign-image{width:92rpx;height:92rpx}.home-editorial .campaign:last-child .campaign-title{font-size:29rpx}
.home-editorial .section-head{margin-top:54rpx}.products-list{display:block}.products-list .grid-item{width:100%}

/* 极简黑白：画廊型首页 */
.home-gallery{padding-left:20rpx;padding-right:20rpx}.home-gallery .hero{height:346rpx;margin:0;border-radius:0;background:var(--card)}.home-gallery .hero-slide{display:flex;align-items:center;justify-content:center;background:var(--card)}.home-gallery .hero-image{position:static;width:100%;height:100%;filter:none}
.home-gallery .category-scroll{margin:26rpx -20rpx 30rpx;width:calc(100% + 40rpx);border-bottom:1rpx solid var(--line)}.home-gallery .category-row{padding:0 20rpx;gap:0}.home-gallery .category-item{width:126rpx;padding-bottom:22rpx}.home-gallery .category-icon{width:72rpx;height:72rpx;padding:9rpx;border-radius:0;background:var(--card)}
.home-gallery .campaign{height:146rpx;border-radius:0;border:1rpx solid var(--line);background:var(--card)}.home-gallery .campaign-image{opacity:.55}.home-gallery .section-head{margin:48rpx 0 24rpx}.products-poster .grid-item{width:48.5%}
.home-gallery .assurance{border-radius:0;border-top:1rpx solid var(--line);border-bottom:1rpx solid var(--line);background:transparent}
</style>

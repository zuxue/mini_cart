<template>
  <view class="page search-page safe-bottom" :class="'search-' + $themeLayout.products" :style="$themeStyle">
    <view class="result-search"><SearchBar v-model="query" auto-focus action-text="搜索" @confirm="commitSearch" @action="commitSearch" /></view>

    <template v-if="!normalizedQuery">
      <view v-if="history.length" class="keyword-section">
        <view class="between keyword-head"><text>最近搜索</text><text class="muted" @tap="clearHistory">清空</text></view>
        <view class="keywords"><text v-for="item in history" :key="item" @tap="chooseKeyword(item)">{{item}}</text></view>
      </view>
      <view class="keyword-section">
        <view class="keyword-head"><text>热门搜索</text></view>
        <view class="keywords hot"><text v-for="item in hotKeywords" :key="item" @tap="chooseKeyword(item)">{{item}}</text></view>
      </view>
    </template>

    <template v-else>
      <view class="between result-head"><text>“{{normalizedQuery}}” 的搜索结果</text><text class="muted">{{results.length}} 件商品</text></view>
      <view v-if="results.length" class="result-grid">
        <view v-for="item in results" :key="item.id" class="result-item"><ProductCard :product="item" :variant="$themeLayout.products" /></view>
      </view>
      <view v-else class="empty">
        <view class="empty-icon">⌕</view>
        <text class="empty-title">没有找到相关商品</text>
        <text>换个关键词试试</text>
      </view>
    </template>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import ProductCard from '../../components/ProductCard.vue'
import SearchBar from '../../components/SearchBar.vue'
import { products } from '../../data/mock'

const HISTORY_KEY = 'search_history'
const query = ref('')
const history = ref(uni.getStorageSync(HISTORY_KEY) || [])
const hotKeywords = ['相机', '沙发', '护肤', '运动鞋', '电脑', '礼物']
const normalizedQuery = computed(() => query.value.trim())
const results = computed(() => {
  const keyword = normalizedQuery.value.toLocaleLowerCase()
  if (!keyword) return []
  return products.filter(item => `${item.title} ${item.subtitle}`.toLocaleLowerCase().includes(keyword))
})

function saveKeyword(keyword) {
  if (!keyword) return
  history.value = [keyword, ...history.value.filter(item => item !== keyword)].slice(0, 8)
  uni.setStorageSync(HISTORY_KEY, history.value)
}

function commitSearch() {
  const keyword = normalizedQuery.value
  if (!keyword) return uni.showToast({ title: '请输入搜索内容', icon: 'none' })
  saveKeyword(keyword)
}

function chooseKeyword(keyword) {
  query.value = keyword
  saveKeyword(keyword)
}

function clearHistory() {
  history.value = []
  uni.removeStorageSync(HISTORY_KEY)
}

onLoad(options => {
  if (!options.keyword) return
  try { query.value = decodeURIComponent(options.keyword) } catch (error) { query.value = options.keyword }
  if (query.value.trim()) saveKeyword(query.value.trim())
})
</script>

<style scoped>
.search-page{padding-top:22rpx}.result-search{margin-bottom:30rpx}.keyword-section{margin-top:30rpx}.keyword-head{font-size:29rpx;font-weight:700}.keyword-head .muted{font-size:22rpx;font-weight:400}.keywords{display:flex;flex-wrap:wrap;gap:16rpx;margin-top:24rpx}.keywords text{padding:14rpx 24rpx;background:var(--card);border:1rpx solid var(--line);border-radius:var(--control-radius);font-size:22rpx}.keywords.hot text:first-child,.keywords.hot text:nth-child(2){color:var(--accent);border-color:var(--accent)}.result-head{padding:6rpx 0 24rpx;font-size:26rpx;font-weight:700}.result-head .muted{font-size:21rpx;font-weight:400}.result-grid{display:flex;flex-wrap:wrap;justify-content:space-between}.result-item{width:48%}.search-list .result-item{width:100%}.search-poster .result-item{width:48.5%}.empty{padding-top:150rpx}.empty-title{display:block;color:var(--ink);font-size:30rpx;font-weight:700;margin-bottom:12rpx}
</style>

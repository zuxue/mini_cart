<template>
  <view class="page cart-page safe-bottom" :style="$themeStyle">
    <view v-if="cart.length" class="cart-list">
      <view class="between cart-top"><text>共 {{ totalCount }} 件好物</text><text class="muted" @tap="editing=!editing">{{ editing ? '完成' : '管理' }}</text></view>
      <view v-for="(item,index) in cart" :key="item.key" class="cart-item card">
        <text class="check" :class="{checked:item.checked}" @tap="toggle(index)">{{ item.checked ? '✓' : '' }}</text>
        <view class="art thumb" :class="'art-'+item.tone"><image v-if="item.image" class="product-image" :src="item.image" mode="aspectFill"/><text v-else class="art-icon">{{ item.cover }}</text></view>
        <view class="cart-info"><text class="cart-title">{{ item.title }}</text><text class="cart-spec">{{ item.subtitle }} ›</text><view class="between cart-bottom"><text class="price">{{ item.price }}</text><view class="stepper"><text @tap="change(index,-1)">−</text><text>{{ item.quantity }}</text><text @tap="change(index,1)">＋</text></view></view></view>
        <text v-if="editing" class="remove" @tap="remove(index)">×</text>
      </view>
      <view class="benefit card"><view class="between"><text>优惠券</text><text class="accent" @tap="go('/pages/coupons/coupons')">2 张可用 ›</text></view><view class="between"><text>运费</text><text>全场包邮</text></view></view>
      <view class="recommend-title">为你推荐</view>
      <scroll-view scroll-x class="recommend"><view class="recommend-row"><view v-for="item in products.slice(0,4)" :key="item.id" class="rec" @tap="open(item.id)"><view class="art rec-art" :class="'art-'+item.tone"><image v-if="item.image" class="product-image" :src="item.image" mode="aspectFill"/><text v-else class="art-icon">{{ item.cover }}</text></view><text>{{ item.title }}</text><text class="price">{{ item.price }}</text></view></view></scroll-view>
      <view class="cart-bar"><view class="row select-all" @tap="all"><text class="check" :class="{checked:allChecked}">{{ allChecked?'✓':'' }}</text><text>全选</text></view><view class="total"><text>合计：</text><text class="price">{{ total }}</text><text>已免运费</text></view><button class="settle" @tap="checkout">结算 ({{ checkedCount }})</button></view>
    </view>
    <view v-else class="empty"><view class="empty-icon">🛍️</view><view class="empty-title">购物袋还是空的</view><view>去逛逛，为生活添点喜欢</view><button class="btn-primary empty-btn" @tap="shop">去逛逛</button></view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { products } from '../../data/mock'
import { getCart, saveCart, requireLogin } from '../../utils/shop'
const cart=ref([]), editing=ref(false)
onShow(()=>cart.value=getCart())
const totalCount=computed(()=>cart.value.reduce((s,v)=>s+v.quantity,0)); const checkedCount=computed(()=>cart.value.filter(v=>v.checked).reduce((s,v)=>s+v.quantity,0)); const allChecked=computed(()=>cart.value.length&&cart.value.every(v=>v.checked)); const total=computed(()=>cart.value.filter(v=>v.checked).reduce((s,v)=>s+v.price*v.quantity,0).toFixed(2))
const persist=()=>saveCart(cart.value); const toggle=i=>{cart.value[i].checked=!cart.value[i].checked;persist()}; const all=()=>{const val=!allChecked.value;cart.value.forEach(v=>v.checked=val);persist()};
const change=(i,n)=>{ if(cart.value[i].quantity+n<1)return;cart.value[i].quantity+=n;persist() }; const remove=i=>{cart.value.splice(i,1);persist()};
const go=url=>uni.navigateTo({url}); const open=id=>go(`/pages/product/product?id=${id}`); const shop=()=>uni.switchTab({url:'/pages/home/home'});
const checkout=()=>{if(!checkedCount.value)return uni.showToast({title:'请选择商品',icon:'none'});if(requireLogin('/pages/checkout/checkout'))go('/pages/checkout/checkout')}
</script>

<style scoped>
.cart-page{padding-bottom:190rpx}.cart-top{padding:22rpx 4rpx}.cart-item{display:flex;align-items:center;padding:22rpx;margin-bottom:20rpx;position:relative}.check{width:38rpx;height:38rpx;line-height:38rpx;text-align:center;border:1rpx solid #aaa;border-radius:50%;font-size:22rpx;flex-shrink:0}.check.checked{background:var(--ink);color:#fff;border-color:var(--ink)}.thumb{width:154rpx;height:154rpx;border-radius:18rpx;margin:0 20rpx}.thumb .art-icon{font-size:60rpx}.cart-info{flex:1;min-width:0}.cart-title,.cart-spec{display:block}.cart-title{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cart-spec{color:var(--muted);font-size:22rpx;margin-top:13rpx}.cart-bottom{margin-top:28rpx}.stepper{display:flex;background:#f0ede7;border-radius:30rpx}.stepper text{padding:7rpx 16rpx}.remove{position:absolute;right:8rpx;top:2rpx;font-size:36rpx;color:#999}.benefit{padding:28rpx;margin-top:28rpx}.benefit>view+view{margin-top:28rpx}.recommend-title{font-size:34rpx;font-weight:700;margin:46rpx 0 24rpx}.recommend{white-space:nowrap;margin-right:-28rpx}.recommend-row{display:inline-flex;gap:18rpx;padding-right:28rpx}.rec{width:220rpx}.rec>text{display:block;font-size:23rpx;margin-top:10rpx;overflow:hidden;text-overflow:ellipsis}.rec-art{height:220rpx;border-radius:20rpx}.rec-art .art-icon{font-size:60rpx}.cart-bar{position:fixed;z-index:10;left:0;right:0;bottom:0;padding:18rpx 24rpx calc(18rpx + env(safe-area-inset-bottom));display:flex;align-items:center;background:#fffdf9;box-shadow:0 -6rpx 30rpx rgba(30,30,20,.06)}.select-all{gap:10rpx}.total{margin-left:auto;text-align:right}.total text{display:block;font-size:20rpx}.total .price{font-size:31rpx;color:var(--accent)}.settle{margin:0 0 0 20rpx;background:var(--ink);color:#fff;border-radius:50rpx;font-size:26rpx;padding:0 28rpx}.empty-title{font-size:34rpx;color:var(--ink);font-weight:700;margin-bottom:15rpx}.empty-btn{width:280rpx;margin:45rpx auto 0}
</style>

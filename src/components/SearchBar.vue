<template>
  <view class="search-shell">
    <view class="search-field">
      <view class="search-icon"></view>
      <input
        :value="modelValue"
        :focus="autoFocus"
        confirm-type="search"
        :placeholder="placeholder"
        placeholder-class="search-placeholder"
        @input="onInput"
        @confirm="onConfirm"
      />
      <text v-if="modelValue" class="search-clear" @tap="clear">×</text>
    </view>
    <text v-if="actionText" class="search-action" @tap="$emit('action')">{{actionText}}</text>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '搜索商品名称' },
  actionText: { type: String, default: '' },
  autoFocus: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'confirm', 'action'])
const onInput = event => emit('update:modelValue', event.detail.value)
const onConfirm = event => emit('confirm', (event.detail.value || '').trim())
const clear = () => emit('update:modelValue', '')
</script>

<style scoped>
.search-shell{width:100%;height:82rpx;display:flex;align-items:center;box-sizing:border-box;gap:20rpx}.search-field{height:82rpx;flex:1;display:flex;align-items:center;box-sizing:border-box;padding:0 22rpx;background:var(--card);border:1rpx solid var(--line);border-radius:var(--control-radius);overflow:hidden}.search-icon{position:relative;width:27rpx;height:27rpx;box-sizing:border-box;border:3rpx solid var(--ink);border-radius:50%;margin:0 21rpx 0 2rpx;opacity:.75;flex-shrink:0}.search-icon::after{content:'';position:absolute;width:12rpx;height:3rpx;background:var(--ink);right:-9rpx;bottom:-5rpx;transform:rotate(45deg);transform-origin:left center;border-radius:3rpx}.search-field input{height:100%;flex:1;min-width:0;font-size:25rpx;color:var(--ink);background:transparent}.search-placeholder{color:var(--muted)}.search-clear{width:42rpx;height:42rpx;line-height:38rpx;text-align:center;border-radius:50%;background:var(--accent-soft);color:var(--muted);font-size:33rpx;margin-left:12rpx}.search-action{font-size:25rpx;color:var(--ink);white-space:nowrap}
</style>

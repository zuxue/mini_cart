<template>
  <view class="page account-page safe-bottom" :style="$themeStyle">
    <view class="avatar-section">
      <view class="avatar">{{ (form.nickname || '野').slice(-1) }}</view>
      <text>更换头像</text>
    </view>
    <view class="form card">
      <view class="field"><text>昵称</text><input v-model="form.nickname" maxlength="16" placeholder="请输入昵称" /></view>
      <view class="field"><text>手机号</text><text class="value">{{ form.phone }}</text></view>
      <picker mode="selector" :range="genders" :value="genderIndex" @change="changeGender">
        <view class="field"><text>性别</text><text class="value">{{ form.gender || '未设置' }}　›</text></view>
      </picker>
      <picker mode="date" :value="form.birthday" end="2026-10-06" @change="form.birthday=$event.detail.value">
        <view class="field"><text>生日</text><text class="value">{{ form.birthday || '未设置' }}　›</text></view>
      </picker>
    </view>
    <button class="btn-primary save" @tap="save">保存</button>
  </view>
</template>
<script setup>
import { reactive, computed } from 'vue'
const stored = uni.getStorageSync('demo_user') || {}
const form = reactive({ nickname: stored.nickname || '', phone: stored.phone || '', gender: stored.gender || '', birthday: stored.birthday || '' })
const genders = ['保密', '男', '女']
const genderIndex = computed(() => Math.max(0, genders.indexOf(form.gender)))
const changeGender = event => { form.gender = genders[Number(event.detail.value)] }
const save = () => {
  if (!form.nickname.trim()) return uni.showToast({ title: '请输入昵称', icon: 'none' })
  uni.setStorageSync('demo_user', { ...stored, ...form, nickname: form.nickname.trim() })
  uni.showToast({ title: '保存成功' })
  setTimeout(() => uni.navigateBack(), 500)
}
</script>
<style scoped>
.account-page{padding-top:34rpx}.avatar-section{text-align:center;padding:30rpx 0 48rpx}.avatar{width:150rpx;height:150rpx;line-height:150rpx;margin:0 auto 18rpx;border-radius:50%;background:#d6c9b5;font-family:Georgia,serif;font-size:54rpx}.avatar-section>text{font-size:23rpx;color:var(--muted)}.form{padding:0 30rpx}.field{height:106rpx;display:flex;align-items:center;border-bottom:1rpx solid var(--line)}.field:last-child{border-bottom:0}.field>text:first-child{width:160rpx}.field input,.value{flex:1;text-align:right;font-size:26rpx;color:var(--muted)}.save{margin-top:50rpx}
</style>

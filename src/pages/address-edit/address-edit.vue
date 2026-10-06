<template>
  <view class="page edit-page safe-bottom" :style="$themeStyle">
    <view class="form card">
      <view class="field"><text>收货人</text><input v-model="form.name" maxlength="20" placeholder="请输入收货人姓名" /></view>
      <view class="field"><text>手机号码</text><input v-model="form.phone" type="number" maxlength="11" placeholder="请输入手机号码" /></view>
      <picker mode="region" :value="form.region" @change="changeRegion">
        <view class="field"><text>所在地区</text><view class="picker-value" :class="{muted:!form.region.length}">{{ form.region.length ? form.region.join(' ') : '请选择省 / 市 / 区' }} <text>›</text></view></view>
      </picker>
      <view class="field detail-field"><text>详细地址</text><textarea v-model="form.street" maxlength="80" placeholder="街道、楼牌号等详细信息" /></view>
    </view>
    <view class="default-row card between"><view><text>设为默认地址</text><text>下单时优先使用该地址</text></view><switch :color="$themeAccent" :checked="form.isDefault" @change="form.isDefault=$event.detail.value" /></view>
    <button class="btn-primary save" @tap="save">保存地址</button>
    <button v-if="isEdit" class="delete" @tap="remove">删除收货地址</button>
  </view>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAddresses, saveAddress, removeAddress } from '../../utils/address'

const isEdit = ref(false)
const form = reactive({ id: null, name: '', phone: '', region: [], street: '', isDefault: false })

onLoad(options => {
  if (!options.id) return
  const item = getAddresses().find(address => String(address.id) === String(options.id))
  if (!item) return
  isEdit.value = true
  const pieces = item.detail.split(' ')
  Object.assign(form, item, {
    region: item.region || pieces.slice(0, 3),
    street: item.street || pieces.slice(3).join(' ')
  })
})

const changeRegion = event => { form.region = event.detail.value }
const save = () => {
  if (!form.name.trim()) return uni.showToast({ title: '请填写收货人姓名', icon: 'none' })
  if (!/^1\d{10}$/.test(form.phone.replace(/\*/g, '0'))) return uni.showToast({ title: '请填写正确的手机号码', icon: 'none' })
  if (!form.region.length) return uni.showToast({ title: '请选择所在地区', icon: 'none' })
  if (!form.street.trim()) return uni.showToast({ title: '请填写详细地址', icon: 'none' })
  const address = { ...form, detail: `${form.region.join(' ')} ${form.street.trim()}` }
  saveAddress(address)
  const selected = uni.getStorageSync('selected_address')
  if (selected && String(selected.id) === String(address.id)) uni.setStorageSync('selected_address', address)
  uni.showToast({ title: '保存成功' })
  setTimeout(() => uni.navigateBack(), 500)
}
const remove = () => {
  uni.showModal({ title: '删除地址', content: '确定删除这个收货地址吗？', success: result => {
    if (!result.confirm) return
    removeAddress(form.id)
    const selected = uni.getStorageSync('selected_address')
    if (selected && String(selected.id) === String(form.id)) uni.removeStorageSync('selected_address')
    uni.showToast({ title: '已删除' })
    setTimeout(() => uni.navigateBack(), 500)
  } })
}
</script>
<style scoped>
.edit-page{padding-top:24rpx}.form{padding:0 28rpx}.field{min-height:102rpx;display:flex;align-items:center;border-bottom:1rpx solid var(--line)}.field:last-child{border-bottom:0}.field>text{width:160rpx;flex-shrink:0}.field input,.picker-value{flex:1;text-align:right;font-size:26rpx}.picker-value>text{margin-left:12rpx}.detail-field{align-items:flex-start;padding:30rpx 0}.detail-field textarea{height:140rpx;flex:1;text-align:right;font-size:26rpx}.default-row{padding:28rpx;margin-top:22rpx}.default-row view>text{display:block}.default-row view>text+text{font-size:21rpx;color:var(--muted);margin-top:8rpx}.save{margin-top:55rpx}.delete{margin-top:22rpx;background:transparent;color:var(--accent);font-size:26rpx}.delete::after{border:0}
</style>

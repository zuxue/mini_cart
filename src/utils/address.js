import { addresses as seedAddresses } from '../data/mock'

const STORAGE_KEY = 'shop_addresses'

export function getAddresses() {
  const saved = uni.getStorageSync(STORAGE_KEY)
  if (Array.isArray(saved)) return saved
  const initial = seedAddresses.map(item => ({ ...item }))
  uni.setStorageSync(STORAGE_KEY, initial)
  return initial
}

export function saveAddresses(list) {
  uni.setStorageSync(STORAGE_KEY, list)
}

export function getDefaultAddress() {
  const list = getAddresses()
  return list.find(item => item.isDefault) || list[0] || null
}

export function saveAddress(address) {
  const list = getAddresses()
  const next = { ...address }
  if (next.isDefault) list.forEach(item => { item.isDefault = false })
  const index = list.findIndex(item => String(item.id) === String(next.id))
  if (index >= 0) list.splice(index, 1, next)
  else list.push({ ...next, id: Date.now() })
  if (!list.some(item => item.isDefault) && list.length) list[0].isDefault = true
  saveAddresses(list)
  return list
}

export function removeAddress(id) {
  const list = getAddresses().filter(item => String(item.id) !== String(id))
  if (!list.some(item => item.isDefault) && list.length) list[0].isDefault = true
  saveAddresses(list)
  return list
}

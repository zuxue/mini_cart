const KEY = 'shop_favorites'

export function getFavorites() {
  const value = uni.getStorageSync(KEY)
  return Array.isArray(value) ? value : []
}

export function isFavorite(id) {
  return getFavorites().some(item => Number(item.id) === Number(id))
}

export function toggleFavorite(product) {
  const list = getFavorites()
  const index = list.findIndex(item => Number(item.id) === Number(product.id))
  if (index >= 0) list.splice(index, 1)
  else list.unshift({ ...product, favoriteAt: Date.now() })
  uni.setStorageSync(KEY, list)
  return index < 0
}

export function removeFavorite(id) {
  const list = getFavorites().filter(item => Number(item.id) !== Number(id))
  uni.setStorageSync(KEY, list)
  return list
}

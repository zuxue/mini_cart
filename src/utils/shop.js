export function getCart() { return uni.getStorageSync('demo_cart') || [] }
export function saveCart(cart) { uni.setStorageSync('demo_cart', cart) }
export function addCart(product, spec, quantity = 1) {
  const cart = getCart()
  const key = `${product.id}-${spec || 'default'}`
  const item = cart.find(v => v.key === key)
  if (item) item.quantity += quantity
  else cart.push({ key, id: product.id, title: product.title, subtitle: spec || product.subtitle, price: product.price, oldPrice: product.oldPrice, image: product.image, cover: product.cover, tone: product.tone, quantity, checked: true })
  saveCart(cart)
}
export function isLogin() { return !!uni.getStorageSync('demo_user') }
export function requireLogin(next) {
  if (isLogin()) return true
  uni.navigateTo({ url: `/pages/login/login?next=${encodeURIComponent(next || '')}` })
  return false
}
export function money(value) { return Number(value || 0).toFixed(2) }

<script>
export default {
  onLaunch() {
    const dataVersion = 'crmeb-full-20261006'
    if (uni.getStorageSync('catalog_version') !== dataVersion) {
      uni.setStorageSync('catalog_version', dataVersion)
      uni.setStorageSync('demo_cart', [])
      uni.setStorageSync('shop_favorites', [])
      uni.removeStorageSync('demo_orders')
      uni.removeStorageSync('buy_now')
      uni.removeStorageSync('pending_order')
    }
    if (!uni.getStorageSync('demo_cart')) uni.setStorageSync('demo_cart', [])
  }
}
</script>

<style>
page {
  --ink: #282828;
  --muted: #999999;
  --paper: #f5f5f5;
  --card: #ffffff;
  --accent: #e93323;
  --accent-start: #f45b3e;
  --accent-end: #e93323;
  --accent-soft: #fff0ed;
  --green: #e93323;
  --line: #eeeeee;
  --card-radius: 20rpx;
  --control-radius: 999rpx;
  background: var(--paper);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif;
  font-size: 28rpx;
}
.page { min-height: 100vh; padding: 0 28rpx 40rpx; box-sizing: border-box; }
.safe-bottom { padding-bottom: calc(32rpx + env(safe-area-inset-bottom)); }
.row { display: flex; align-items: center; }
.between { display: flex; align-items: center; justify-content: space-between; }
.muted { color: var(--muted); }
.accent { color: var(--accent); }
.price { font-weight: 700; letter-spacing: -1rpx; }
.price::before { content: '¥'; font-size: .68em; margin-right: 2rpx; }
.section-title { font-size: 38rpx; font-weight: 700; letter-spacing: -1rpx; }
.section-en { font-size: 18rpx; letter-spacing: 4rpx; color: #a7a39a; margin-top: 5rpx; text-transform: uppercase; }
.pill { display: inline-flex; align-items: center; padding: 10rpx 18rpx; border-radius: 999rpx; background: #f5f5f5; font-size: 22rpx; }
.btn-primary { background: linear-gradient(90deg,var(--accent-start),var(--accent-end)); color: #fff; border-radius: var(--control-radius); height: 92rpx; line-height: 92rpx; text-align: center; font-weight: 600; }
.btn-ghost { background: transparent; border: 1rpx solid var(--ink); border-radius: var(--control-radius); color: var(--ink); }
button { display: flex; align-items: center; justify-content: center; box-sizing: border-box; }
button::after { border: none; }
.card { background: var(--card); border-radius: var(--card-radius); overflow: hidden; }
.art { position: relative; overflow: hidden; background: #dde2d2; }
.art::before, .art::after { content: ''; position: absolute; border-radius: 50%; }
.art::before { width: 58%; height: 58%; background: rgba(255,255,255,.45); right: -8%; top: -12%; }
.art::after { width: 34%; height: 34%; background: rgba(24,36,29,.10); left: 10%; bottom: 8%; }
.art-icon { position: absolute; z-index: 2; left: 50%; top: 50%; transform: translate(-50%,-50%); font-size: 96rpx; }
.product-image { position: relative; z-index: 2; display: block; width: 100%; height: 100%; }
.art-orange { background: #eac9a2; }.art-pink { background: #e8c8c0; }.art-blue { background: #c9d9dc; }
.art-green { background: #c9d4bd; }.art-purple { background: #d7cedd; }.art-yellow { background: #eadcae; }
.empty { text-align: center; padding: 120rpx 40rpx; color: var(--muted); }
.empty-icon { font-size: 100rpx; margin-bottom: 28rpx; }
.empty .btn-primary { margin-left: auto; margin-right: auto; }
</style>

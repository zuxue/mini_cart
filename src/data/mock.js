import { addresses, coupons } from '../../data/mock.js'
import productSnapshot from './crmeb-products.json'
import categorySnapshot from './crmeb-categories.json'

const tones = ['orange', 'blue', 'green', 'purple', 'pink', 'yellow']
const tags = ['品质精选', '品牌好物', '热销推荐', '新品上架']

const categoryRules = [
  [53, /跑步鞋|运动鞋|板鞋|网球|健身|阿迪达斯|adidas|361度|百倫/i],
  [3, /沙发|椅|斗柜|储物柜|梳妆台|化妆桌|摆件|永生花|干花|花瓶|家具|家居装饰/i],
  [6, /唇蜜|唇釉|腮红|眼影|气垫|粉底|香氛|精华液|护肤|水乳|保湿|祛痘|美妆/i],
  [4, /保温杯|电热杯|茶杯|水杯|水壶|餐厨|锅具|床品/i],
  [1, /风扇|吹风机|吹风筒|家电|电器/i],
  [2, /电视|投影|音箱|耳机|麦克风|影音/i],
  [8, /相机|拍立得|电脑|MateBook|笔记本电脑|手表|腕表|数码/i],
  [7, /收纳|置物|衣柜|居家|生活家居/i]
]

function classifyProduct(name) {
  const matched = categoryRules.find(([, pattern]) => pattern.test(name))
  return [matched ? matched[0] : 9]
}

export const products = productSnapshot.data.map((item, index) => ({
  id: item.id,
  title: item.store_name,
  subtitle: `${item.star || '5.0'} 分 · 已售 ${item.sales}${item.unit_name || '件'}`,
  price: Number(item.price),
  oldPrice: Number(item.ot_price) || Number(item.price),
  image: `/static/products/${item.id}.jpg`,
  cover: '',
  tone: tones[index % tones.length],
  tag: tags[index % tags.length],
  sold: item.sales,
  stock: item.stock,
  categoryIds: classifyProduct(item.store_name),
  desc: `${item.store_name}。商品评分 ${item.star || '5.0'}，当前库存 ${item.stock} ${item.unit_name || '件'}。`,
  specs: ['默认规格', '品质礼盒装'],
  unit: item.unit_name || '件',
  vipPrice: Number(item.vip_price) || null
}))

export const categories = categorySnapshot.data.map(item => ({
  id: item.id,
  name: item.cate_name,
  image: `/static/categories/${item.id}.png`
}))

export const homeMenus = ['限时秒杀', '拼团活动', '商品分类', '我的积分', '浏览记录', '砍价中心', '领优惠券', '积分商城', '订单列表', '抽奖活动'].map((name, index) => ({
  id: index + 1,
  name,
  image: `/static/menu/${index + 1}.png`
}))

export { addresses, coupons }

export const services = [
  { icon: '✓', title: '正品保障', desc: '品质严选' },
  { icon: '↺', title: '无忧退换', desc: '7天售后' },
  { icon: '⚡', title: '极速发货', desc: '48小时内' }
]

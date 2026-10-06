const products = [
  { id: 108, title: 'FOMIX 蛋壳椅 进口头层牛皮橙色单人沙发椅 Egg chair 设计师蛋椅', subtitle: '意大利头层牛皮 · 单椅', price: 7580, oldPrice: 7999, image: '/static/products/108.jpg', cover: '', tone: 'orange', tag: '品质家具', sold: 311, stock: 16493, desc: '进口头层牛皮包覆，经典蛋壳造型兼顾包裹感与支撑性，适合客厅、书房及休闲空间。', specs: ['橙色头层牛皮', '经典黑头层牛皮', '定制色'] },
  { id: 911, title: '真力时 ZENITH DEFY 系列 CLASSIC 经典镂空机械腕表', subtitle: 'DEFY 系列 · 经典钢带', price: 61000, oldPrice: 61000, image: '/static/products/911.jpg', cover: '', tone: 'blue', tag: '品牌精选', sold: 1147, stock: 33111, desc: '经典镂空机械结构与现代腕表设计相结合，金属表链呈现利落质感。', specs: ['经典镂空钢带', '原装礼盒'] },
  { id: 934, title: '劳伦斯意式极简设计师款直排真皮沙发', subtitle: '简约客厅 · 大小户型', price: 1430, oldPrice: 1680, image: '/static/products/934.jpg', cover: '', tone: 'green', tag: '家居热卖', sold: 71, stock: 412, desc: '意式极简轮廓搭配柔软坐感，适合现代客厅与多种空间布局。', specs: ['双人位', '三人位', '四人位'] },
  { id: 1005, title: '松典 5K 微单复古数码相机', subtitle: '高清旅游 Vlog 摄影', price: 959, oldPrice: 1099, image: '/static/products/1005.jpg', cover: '', tone: 'purple', tag: '数码新品', sold: 143, stock: 1242, desc: '轻巧复古机身，支持高清照片与视频记录，满足旅行、日常与 Vlog 拍摄需求。', specs: ['复古黑', '奶油白', '相机礼盒套装'] },
  { id: 948, title: 'Kaleidos 万花镜欲场系列彩妆套组', subtitle: '唇蜜 · 腮红 · 眼影盘', price: 306, oldPrice: 399, image: '/static/products/948.jpg', cover: '', tone: 'pink', tag: '人气彩妆', sold: 947, stock: 2560, desc: '集合唇蜜、腮红与眼影盘的完整彩妆组合，轻松打造协调妆容。', specs: ['005 名利场套组', '103P09 套组'] },
  { id: 945, title: 'TONYMOLY 托尼魅力胶原光感气垫', subtitle: '保湿遮瑕 · 自然光感', price: 179, oldPrice: 219, image: '/static/products/945.jpg', cover: '', tone: 'yellow', tag: '热销单品', sold: 4570, stock: 9, desc: '兼顾保湿、遮瑕与光泽感的便携气垫，妆效自然服帖。', specs: ['自然色 01', '暖肤色 02'] },
  { id: 966, title: 'GUCCI 古驰倾色云雾唇釉 203', subtitle: '枫叶红棕 · 哑光质感', price: 395, oldPrice: 450, image: '/static/products/966.jpg', cover: '', tone: 'pink', tag: '礼赠推荐', sold: 1090, stock: 65, desc: '轻盈云雾质地与枫叶红棕色调，适合日常通勤及节日礼赠。', specs: ['203 枫叶红棕', '礼盒包装'] },
  { id: 906, title: 'RALPH LAUREN 拉夫劳伦地球系列淡香氛', subtitle: '地球系列 · 100ml 套组', price: 990, oldPrice: 1090, image: '/static/products/906.png', cover: '', tone: 'blue', tag: '香氛精选', sold: 195, stock: 16767, desc: '清新自然的香气层次，适合日常使用，套组包装亦适合作为礼物。', specs: ['100ml 单瓶', '100ml 礼盒套组'] }
]

const categories = [
  { id: 'recommend', name: '精选', icon: '✦' },
  { id: 'food', name: '食饮', icon: '☕' },
  { id: 'home', name: '居家', icon: '⌂' },
  { id: 'care', name: '洗护', icon: '◌' },
  { id: 'outdoor', name: '户外', icon: '△' },
  { id: 'gift', name: '礼赠', icon: '◇' }
]

const addresses = [
  { id: 1, name: '林小野', phone: '13800132026', region: ['上海市', '上海市', '徐汇区'], street: '安福路 288 号 3 楼', detail: '上海市 上海市 徐汇区 安福路 288 号 3 楼', isDefault: true },
  { id: 2, name: '林小野', phone: '13800132026', region: ['浙江省', '杭州市', '西湖区'], street: '文三路 66 号', detail: '浙江省 杭州市 西湖区 文三路 66 号', isDefault: false }
]

const coupons = [
  { id: 1, value: 30, limit: '满 199 可用', title: '新客专享券', date: '2026.12.31', usable: true },
  { id: 2, value: 15, limit: '满 99 可用', title: '秋日生活券', date: '2026.11.30', usable: true },
  { id: 3, value: 50, limit: '满 399 可用', title: '会员回馈券', date: '2026.10.31', usable: false }
]

export { products, categories, addresses, coupons }

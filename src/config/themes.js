export const themes = {
  commerce: {
    name: '活力商城',
    description: '适合综合电商与促销活动',
    colors: {
      ink: '#282828', muted: '#999999', paper: '#f5f5f5', card: '#ffffff',
      accent: '#e93323', accentStart: '#f45b3e', accentEnd: '#e93323',
      accentSoft: '#fff0ed', line: '#eeeeee'
    },
    layout: { home: 'retail', hero: 'retail', category: 'sidebar', products: 'grid', banner: 'full', profile: 'classic' },
    radius: { card: '20rpx', control: '999rpx' },
    navigation: { backgroundColor: '#ffffff', frontColor: '#000000' },
    tabBar: { backgroundColor: '#ffffff', color: '#8e8b84', selectedColor: '#e93323', borderStyle: 'white' }
  },
  forest: {
    name: '自然生活',
    description: '适合家居、生活方式品牌',
    colors: {
      ink: '#1f3026', muted: '#7d857f', paper: '#f4f5f1', card: '#ffffff',
      accent: '#397052', accentStart: '#5a8a69', accentEnd: '#315f47',
      accentSoft: '#e8f1eb', line: '#e5e9e5'
    },
    layout: { home: 'editorial', hero: 'editorial', category: 'chips', products: 'list', banner: 'inset', profile: 'cover' },
    radius: { card: '28rpx', control: '18rpx' },
    navigation: { backgroundColor: '#f4f5f1', frontColor: '#000000' },
    tabBar: { backgroundColor: '#ffffff', color: '#8a918c', selectedColor: '#397052', borderStyle: 'white' }
  },
  minimal: {
    name: '极简黑白',
    description: '适合数码与设计师商品',
    colors: {
      ink: '#111111', muted: '#777777', paper: '#f3f3f3', card: '#ffffff',
      accent: '#111111', accentStart: '#333333', accentEnd: '#111111',
      accentSoft: '#ededed', line: '#e5e5e5'
    },
    layout: { home: 'gallery', hero: 'gallery', category: 'tabs', products: 'poster', banner: 'split', profile: 'dashboard' },
    radius: { card: '8rpx', control: '8rpx' },
    navigation: { backgroundColor: '#ffffff', frontColor: '#000000' },
    tabBar: { backgroundColor: '#ffffff', color: '#999999', selectedColor: '#111111', borderStyle: 'black' }
  }
}

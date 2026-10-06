import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve('src/static')
const productSnapshot = JSON.parse(await fs.readFile('src/data/crmeb-products.json', 'utf8'))
const categorySnapshot = JSON.parse(await fs.readFile('src/data/crmeb-categories.json', 'utf8'))
const homeSnapshot = JSON.parse(await fs.readFile('src/data/crmeb-home-theme.json', 'utf8'))

await fs.mkdir(path.join(root, 'products'), { recursive: true })
await fs.mkdir(path.join(root, 'categories'), { recursive: true })
await fs.mkdir(path.join(root, 'menu'), { recursive: true })
await fs.mkdir(path.join(root, 'banners'), { recursive: true })

function normalized(url) {
  if (url.startsWith('//')) return `https:${url}`
  return url.replace(/^http:\/\//, 'https://')
}

async function download(url) {
  const response = await fetch(normalized(url))
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  return Buffer.from(await response.arrayBuffer())
}

async function renderProduct(item) {
  const buffer = await download(item.image)
  await sharp(buffer)
    .resize(640, 640, { fit: 'contain', background: '#ffffff', withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(path.join(root, 'products', `${item.id}.jpg`))
}

async function renderCategory(item) {
  const buffer = await download(item.pic || item.big_pic)
  await sharp(buffer)
    .trim({ threshold: 10 })
    .resize(104, 104, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 12, bottom: 12, left: 12, right: 12, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, 'categories', `${item.id}.png`))
}

const components = Object.values(homeSnapshot.data.value)
const menu = components.find(item => item.name === 'menus' && !item.isHide && item.menuConfig?.list?.length)
const menuItems = menu?.menuConfig?.list || []
async function renderMenu(item, index) {
  if (!item.img) return
  const buffer = await download(item.img)
  await sharp(buffer)
    .resize(160, 160, { fit: 'contain' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, 'menu', `${index + 1}.png`))
}

const homeComb = components.find(item => item.name === 'homeComb' && !item.isHide)
const banners = homeComb?.swiperConfig?.list || []
async function renderBanner(item, index) {
  const buffer = await download(item.img)
  await sharp(buffer)
    .resize(750, 360, { fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(root, 'banners', `${index + 1}.jpg`))
}

async function batch(items, task, size = 6) {
  const failures = []
  for (let i = 0; i < items.length; i += size) {
    const group = items.slice(i, i + size)
    const results = await Promise.allSettled(group.map((item, index) => task(item, i + index)))
    results.forEach((result, index) => {
      if (result.status === 'rejected') failures.push(`${group[index].id || i + index + 1}: ${result.reason.message}`)
    })
  }
  return failures
}

const failures = [
  ...await batch(productSnapshot.data, renderProduct),
  ...await batch(categorySnapshot.data, renderCategory),
  ...await batch(menuItems, renderMenu),
  ...await batch(banners, renderBanner)
]

console.log(`Synced ${productSnapshot.data.length} products, ${categorySnapshot.data.length} categories, ${menuItems.length} menu icons and ${banners.length} banners.`)
if (failures.length) console.warn(`Skipped ${failures.length}:\n${failures.join('\n')}`)

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve('src/static/products')
const files = (await fs.readdir(dir)).filter(file => /\.jpe?g$/i.test(file))

for (const file of files) {
  const source = path.join(dir, file)
  const target = `${source}.optimized`
  await sharp(source)
    .resize(640, 640, { fit: 'contain', background: '#ffffff', withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(target)
  await fs.rename(target, source)
}

console.log(`Optimized ${files.length} product images.`)

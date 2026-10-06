import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

for (const folder of ['categories', 'menu']) {
  const dir = path.resolve('src/static', folder)
  const files = (await fs.readdir(dir)).filter(file => file.endsWith('.png'))
  for (const file of files) {
    const source = path.join(dir, file)
    const target = `${source}.optimized`
    const pipeline = sharp(source)
    if (folder === 'categories') {
      pipeline
        .trim({ threshold: 10 })
        .resize(104, 104, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .extend({ top: 12, bottom: 12, left: 12, right: 12, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    } else {
      pipeline.resize(112, 112, { fit: 'contain' })
    }
    await pipeline
      .png({ palette: true, colours: 64, compressionLevel: 9 })
      .toFile(target)
    await fs.rename(target, source)
  }
}

console.log('Optimized category and menu icons.')

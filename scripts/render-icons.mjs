import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDir = path.resolve('src/static/icons/profile')
const files = (await fs.readdir(sourceDir)).filter(file => file.endsWith('.svg'))

await Promise.all(files.map(async file => {
  const source = path.join(sourceDir, file)
  const target = path.join(sourceDir, file.replace(/\.svg$/, '.png'))
  await sharp(source, { density: 144 })
    .resize(96, 96, { fit: 'fill' })
    .png()
    .toFile(target)
}))

console.log(`Rendered ${files.length} profile icons.`)

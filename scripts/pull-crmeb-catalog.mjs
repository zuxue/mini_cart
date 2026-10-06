import fs from 'node:fs/promises'

const source = 'https://v6.crmeb.net/api'

async function getJson(path) {
  const response = await fetch(`${source}/${path}`)
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${path}`)
  const result = await response.json()
  if (result.status !== 200 || !Array.isArray(result.data)) throw new Error(`Invalid response: ${path}`)
  return result
}

const [categoryResponse, products] = await Promise.all([
  getJson('category'),
  getJson('products?page=1&limit=100&type=1&cid=0&sid=0')
])
const categories = {
  ...categoryResponse,
  data: categoryResponse.data.map(({ children, ...category }) => category)
}

await Promise.all([
  fs.writeFile('src/data/crmeb-categories.json', JSON.stringify(categories)),
  fs.writeFile('src/data/crmeb-products.json', JSON.stringify(products))
])

console.log(`Pulled ${categories.data.length} main categories and ${products.data.length} products.`)

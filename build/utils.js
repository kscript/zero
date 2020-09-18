const fs = require('fs')
const path = require('path')
const resolve = (...dir) => {
  return path.join(process.cwd(), ...dir)
}
const getComponentEntries = (dir, cb) => {
  const components = []
  const filelists = fs.readdirSync(resolve(dir))
  const root = resolve(dir)
  filelists.map((name) => {
    const stats = fs.statSync(path.join(root, name))
    try {
      fs.statSync(path.join(root, name, 'index.ts'))
      components.push(name)
    } catch(e) {}
  })
  return components
}
module.exports = {
  resolve,
  getComponentEntries
}
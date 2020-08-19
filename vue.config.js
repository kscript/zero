const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const loadScss = () => {
  // if (process.env.npm_lifecycle_event === 'build:umd') {
  //   return '@import "common/scss/variables.scss";'
  // }
  return '@import "common/scss/variables.scss";'
}
const publicPath = () => {
  if (process.env.npm_lifecycle_event === 'build:umd') {
    return ''
  }
  return process.env.NODE_ENV === 'development' ? '' : '/zero/'
}
module.exports = {
  publicPath: publicPath(),
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        additionalData: loadScss()
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@@', resolve('examples'))
      .set('zero-ui', resolve('packages'))
      .set('common', resolve('common'))
      .set('theme', resolve('packages/theme-chalk/src'))
      .set('@src', resolve('src'))
    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }
}

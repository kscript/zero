const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const entrys = {
  'build:demand': './build/demand.config.js'
}
const mode = process.env.npm_lifecycle_event === 'build:umd' ? 'build:umd' : process.env.NODE_ENV

const loadScss = () => {
  return '@import "common/scss/variables.scss";'
}
const publicPath = () => {
  if (mode === 'build:umd') {
    return ''
  }
  return mode === 'development' ? '/' : '/zero/'
}
const loadConfig = (baseConfig) => {
  const entry = entrys[process.env.npm_lifecycle_event]
  const output = entry ? require(entry) : null
  return typeof output === 'function' ? output(baseConfig) : output || baseConfig
}

module.exports = loadConfig({
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
      .set('@zero-ui/vue', resolve('packages'))
      .set('packages', resolve('packages'))
      .set('common', resolve('common'))
      .set('theme', resolve('packages/theme-chalk/src'))
      .set('@src', resolve('src'))

    if (mode !== 'build:umd') {
      config.module
        .rule('md')
        .test(/\.md$/)
        .use('vue-loader')
        .loader('vue-loader-v16')
        .end()
        .use(path.join(process.cwd() + '/examples/markdownLoader.js'))
        .loader(path.join(process.cwd() + '/examples/markdownLoader.js'))
        .end()
    }

    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
    
  }
})

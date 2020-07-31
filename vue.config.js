const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
    productionSourceMap: false,
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    css: {
        extract: false
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@@', resolve('examples'))
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
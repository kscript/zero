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
        extract: true,
        sourceMap: false,
        loaderOptions: {
            sass: {
                additionalData: `@import "@@/assets/scss/variables.scss";`
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@@', resolve('examples'))
            .set('zero-ui', resolve('packages'))
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
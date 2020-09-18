const { resolve, getComponentEntries } = require("./utils")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
module.exports = (baseConfig = {}) => {
  const { configureWebpack, chainWebpack, css } = baseConfig
  const packages = 'packages'
  const entry = {
    index: resolve(packages, 'index.ts')
  }
  const chunks = getComponentEntries(packages)
  chunks.map(name => {
    entry[name] = resolve(packages, name, 'index.ts')
  })
  return {
    productionSourceMap: false,
    outputDir: resolve("lib"),
    configureWebpack: {
      entry,
      output: {
        filename: "[name].js",
        libraryTarget: "umd",
        libraryExport: "default",
        library: "@zero-ui/vue"
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            common: {
              name: "common",
              minChunks: 5,
              chunks: "initial",
              filename: '[name].bundle.js',
              priority: 5
            }
          }
        }
      },
      plugins:[
        new BundleAnalyzerPlugin()
      ]
    },
    css: Object.assign({}, css, {
      sourceMap: true,
      extract: {
        filename: "theme-chunk/[name].css"
      }
    }),
    chainWebpack: config => {
      chainWebpack(config)
      config.optimization.delete("splitChunks")
      config.plugins.delete("copy")
      config.plugins.delete("preload")
      config.plugins.delete("prefetch")
      config.plugins.delete("html")
      config.plugins.delete("hmr")
      config.entryPoints.delete("app")
    }
  }
}
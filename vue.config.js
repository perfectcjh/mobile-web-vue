const path = require('path')
const webpack = require('webpack')
// const ipConfig = require('./config/ip.config')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    uni: 'uni'
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    // axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    // 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    // 'https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    // 'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    // 'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
    // 'https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.0.1.52.js'
  ]
}

// vue.config.js
const vueConfig = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',

  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : assetsCDN.externals
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      // sass: {
      //   prependData: `@import "~@/styles/global.scss";`
      // },
      stylus: {
        import: '~@/styles/global.styl'
      }
    }
  },

  devServer: {
    port: 10000
    // proxy: {
    //   [ipConfig.api_common]: {
    //     target: 'http://10.2.11.183:10144/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + ipConfig.api_common]: ''
    //     }
    //   },
    //   [ipConfig.api_puds]: {
    //     target: 'http://10.2.11.183:10133/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + ipConfig.api_puds]: ''
    //     }
    //   }
    // }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
}

module.exports = vueConfig

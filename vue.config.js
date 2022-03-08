'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/

module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */

    publicPath: '/aplus_test/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    productionSourceMap: false,
    // resolve:{
    //     alias: {
    //       'vue$': 'vue/dist/vue.esm.js',
    //     }
    // },
    // 配置vant 全局 css
    css: {
      loaderOptions: {
        less: {
          lessOptions: {
            modifyVars: {
              'van-nav-bar__text': '#1e1d1f',
            }
          }
        },
      },
      },
      devServer: {
        port: port,
        open: true,
        inline: true,
        hot: true,
        overlay: {
          warnings: false,
          errors: true
        },
        // 配置多个代理
        proxy: {
          '/ColdCall_Demo/api/Wechat': {
            target: 'http://hq.centaline.com.cn/HqProcessApi',
            changeOrigin: true
          },
          '/api/': {
            //target: 'http://10.1.31.83:22061',
            target:'http://10.68.2.9:8021',
            // 替換
            changeOrigin: true
          },
          '/moaplusapi': {
            target: 'http://10.68.2.9:8324/',
            changeOrigin: true
          },
          '/upload': {
            target: 'https://hqstatictest.centaline.com.cn:442/image/upload2',
            changeOrigin: true
          },
        },
        after: require('./mock/mock-server.js')
      },
      configureWebpack: {
        plugins: [
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery'
          })
        ],
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
          alias: {
            '@': resolve('src')
          }
        }
      },
      chainWebpack(config) {
        // 設置 vue 運行時

        config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
        // 去除項目打包上線後，代碼中所有的 console.log()
        config.optimization.minimizer('terser').tap((args) => {
          args[0].terserOptions.compress.drop_console = true
          return args
        })
        // it can improve the speed of the first screen, it is recommended to turn on preload
        // config.plugins.delete('preload')

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')

        // set svg-sprite-loader
        config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()

        // set preserveWhitespace
        config.module
          .rule('vue')
          .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
            options.compilerOptions.preserveWhitespace = true
            return options
          })
          .end()

        config
          .when(process.env.NODE_ENV !== 'development',
            config => {
              config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [{
                  // `runtime` must same as runtimeChunk name. default is `runtime`
                  inline: /runtime\..*\.js$/
                }])
                .end()
              config
                .optimization.splitChunks({
                  chunks: 'all',
                  cacheGroups: {
                    libs: {
                      name: 'chunk-libs',
                      test: /[\\/]node_modules[\\/]/,
                      priority: 10,
                      chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                      name: 'chunk-elementUI', // split elementUI into a single package
                      priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                      test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                      name: 'chunk-commons',
                      test: resolve('src/components'), // can customize your rules
                      minChunks: 3, //  minimum common number
                      priority: 5,
                      reuseExistingChunk: true
                    }
                  }
                })
              config.optimization.runtimeChunk('single')
            }
          )
      }
    }

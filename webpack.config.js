const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { VuetifyProgressiveModule } = require('vuetify-loader')
const ManifestPlugin = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const publicPath = isProd ? '/assets' : 'http://example.com:3035/public/assets' 
const cssLoaders = [
  // MiniCssExtractPlugin.loader,
  { loader: 'css-loader', options: { sourceMap: !isProd } },
  { loader: 'stylus-loader', options: { sourceMap: !isProd } }
]

module.exports = (env, argv) => {

  return {
    entry: path.resolve(__dirname,'frontend/main.js'),
    output: {
      filename: 'javascripts/[name]-[hash].bundle.js',
      path: path.resolve(__dirname, 'public/assets/')
    },
    plugins: [
      new VueLoaderPlugin(),
      new ManifestPlugin({
        writeToFileEmit: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: 11
                  },
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              modules: [VuetifyProgressiveModule]
            }
          }
        },
        {
          test: /\.styl(us)?$/,
          use: cssLoaders
        }, 
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'url-loader',
          options: {
            name: '[name]-bundle.[ext]',
            outputPath: 'images/',
            publicPath: function(path) {
              return 'images/' + path
            }
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: publicPath 
              }
          }]
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: [
        '.js',
        '.scss',
        '.css',
        '.styl',
        '.stylus',
        '.vue',
        '.jpg',
        '.png',
        '.gif',
        '.woff',
        '.woff2',
        '.svg',
        '.ttf',
        '.eot',
        ' '
      ]
    },
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /.(c|sa)ss/,
    //         name: 'style',
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   },
    //   minimize: true
    // },
    devServer: {
      host: '0.0.0.0',
      port: 3035,
      public: 'example.com:3035',
      publicPath: '/public/assets/',
      contentBase: path.resolve(__dirname, 'public/assets/'),
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
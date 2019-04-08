const path = require('path')

function resolve(url) {
  return path.resolve(__dirname, url)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', resolve('./src/components'))
      .set('styles', resolve('./src/assets/styles'))
      .set('pages', resolve('./src/pages'))
      .set('utils', resolve('./src/utils'))
  },
  devServer: {
    proxy: {
      '/restapi': {
        target: 'https://h5.ele.me',
        changeOrigin: true
      },
      "/pizza": {
        target: 'https://h5.ele.me',
        changeOrigin: true
      },
      "/api": {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
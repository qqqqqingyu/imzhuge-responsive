const serverUrl = require('./src/config').serverUrl
module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    chainWebpack: config => {
        // 解决.mjs加载问题
        config.module
          .rule('mjs')
          .test(/\.mjs$/)
          .include.add(/node_modules/)
          .end()
          .type('javascript/auto');
      },
    devServer: {
        proxy: {
            '/api': {
                target: serverUrl, 
                changeOrigin: true,
                ws: true,
                pathRewrite:{
                    "^/api":"/"
                }
            }
        }
    },

    publicPath: '/',
};

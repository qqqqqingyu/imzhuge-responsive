module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',

    devServer: {
        proxy: {
            '/api': {
                // 正式服
                // target: 'https://m.imzhuge.com', //对应自己的接口
                // 测试服
                target: 'http://47.108.189.227:8080', //对应自己的接口
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

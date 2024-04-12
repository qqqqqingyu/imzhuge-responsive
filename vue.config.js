const serverUrl = require('./src/config').serverUrl
module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',

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

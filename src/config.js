const configJson = require('./config.json')
let config;
if (configJson.ISTESTSERVER == true) {
    //测试服
    config = {
        serverUrl: 'http://47.108.189.227:8080',
        APIURL:'http://47.108.189.227:8080'
    }
}
else{
    //正式服
    config = {
        serverUrl: 'https://m.imzhuge.com',
        APIURL:"https://m.imzhuge.com"
    }
}


module.exports = config;
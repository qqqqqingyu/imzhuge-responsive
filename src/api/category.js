import request from '@/utils/request'
// 正式服
const config = require('../config.js')

/**
 * 获取分类列表
 */
export const getCategory = () => {
    return request({
        url:config.APIURL+'/api/activity/cda'
    })
}
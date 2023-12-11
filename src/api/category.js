import request from '@/utils/request'
// 正式服
import {serverUrl} from "../config";

/**
 * 获取分类列表
 */
export const getCategory = () => {
    return request({
        // 测试服
        // url: '/api/activity/cda'
        // 正式服
        url:serverUrl+'/api/activity/cda'
    })
}
import request from '@/utils/request'
// import {serverUrl} from "../config";

/**
 * 获取分类列表
 */
export const getCategory = () => {
    return request({
        url: '/api/activity/cda'
    })
}
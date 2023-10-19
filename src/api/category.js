import request from '@/utils/request'
import {serverUrl} from "../config";

/**
 * 获取分类列表
 */
export const getCategory = () => {
    return request({
        url: serverUrl+'/api/activity/cda'
    })
}
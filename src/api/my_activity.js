import request from '@/utils/request'
// 正式服
// import {serverUrl} from "../config";

/**
 * 3.3 我的
 **/
export function getMyActivity() {
    return request({
        method:'get',
        // 测试服
        url: '/api/selfcenter/my_activity'
        // 正式服
        // url:serverUrl+'/api/selfcenter/my_activity'

    })
}
/**
 * 3.4 查看个人资料
 **/
export function getMyInfoDetails() {
    return request({
        method:'get',
        // 测试服
        url: '/api/selfcenter/my_activity/details'
        // 正式服
        // url:serverUrl+'/api/selfcenter/my_activity/details'
    })
}
/**
 * 3.4 编辑个人资料
 **/
export function editMyInfo(data) {
    return request({
        // 测试服
        url: '/api/selfcenter/my_activity/details',
        // 正式服
        // url:serverUrl+'/api/selfcenter/my_activity/details',
        method:'post',
        data:data
    })
}
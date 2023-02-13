import request from '@/utils/request'

/**
 * 3.3 我的
 **/
export function getMyActivity() {
    return request({
        method:'get',
        url:'/api/selfcenter/my_activity'

    })
}
/**
 * 3.3 编辑个人资料
 **/
export function getMyActivityDetails() {
    return request({
        method:'get',
        url:'/api/selfcenter/my_activity/details'

    })
}

/**
 * @description 登录接口
 * @author GongDiXin
 * @since 2022.12.02
 * **/
import request from '@/utils/request'
// 正式服
const config = require('../config.js')

/**
 * login
 **/
export function login() {
    return request({
        url:config.APIURL+'/api/login',
        method:'get'
    })
}

export function getLoginStatus() {
    return request({
        url:config.APIURL+'/api/get_login_status',
        method:'get'
    })
}
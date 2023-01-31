/**
 * @description 登录接口
 * @author GongDiXin
 * @since 2022.12.02
 * **/
import request from '@/utils/request'

/**
 * login
 **/
export function login() {
    return request({
        url:'/api/login',
        method:'get'
    })
}

export function loginStatus() {
    return request({
        url:'/api/get_login_status',
        method:'get'
    })
}
/**
 * @description 登录接口
 * @author GongDiXin
 * @since 2022.12.02
 * **/
import request from '@/utils/request'
// import {serverUrl} from "../config";

/**
 * login
 **/
export function login() {
    return request({
        url:'/api/login',
        method:'get'
    })
}

export function getLoginStatus() {
    return request({
        url:'/api/get_login_status',
        method:'get'
    })
}
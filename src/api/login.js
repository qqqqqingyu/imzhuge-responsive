/**
 * @description 登录接口
 * @author GongDiXin
 * @since 2022.12.02
 * **/
import request from '@/utils/request'
import {serverUrl} from "../config";

/**
 * login
 **/
export function login() {
    return request({
        url:serverUrl+'/api/login',
        method:'get'
    })
}

export function loginStatus() {
    return request({
        url:serverUrl+'/api/get_login_status',
        method:'get'
    })
}
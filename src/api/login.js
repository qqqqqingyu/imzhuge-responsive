/**
 * @description 登录接口
 * @author GongDiXin
 * @since 2022.12.02
 * **/
import request from '@/utils/request'
// 正式服
import {serverUrl} from "../config";

/**
 * login
 **/
export function login() {
    return request({
        // 测试服
        // url: '/api/login',
        // 正式服
        url:serverUrl+'/api/login',
        method:'get'
    })
}

export function getLoginStatus() {
    return request({
        // 测试服
        // url: '/api/get_login_status',
        // 正式服
        url:serverUrl+'/api/get_login_status',
        method:'get'
    })
}
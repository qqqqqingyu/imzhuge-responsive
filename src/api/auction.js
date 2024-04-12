/**
 * @description 双向交易接口定义
 * @author GongDiXin
 * @since 2022.07.13
 * **/
import request from '@/utils/request'
// 正式服
const config = require('../config.js')

/**
 * 4.1 发起活动
 **/
export function startActivity(data) {
    return request({
        url:config.APIURL+'/api/startactivity/cda',
        method:'post',
        data:data
    })
}

/**
 * 4.2 cda活动广场
 **/
export function getCdaActivitySquare() {
    return request({
        url:config.APIURL+'/api/activity/cda',
        method:'get'
    })
}

/**
 * 4.3 去交易
 **/
export function startTransaction(activityId, data) {
    return request({
        url:config.APIURL+'/api/activity/cda/' + activityId,
        method:'post',
        data:data
    })
}

/**
 * 4.3 获取活动交易信息
 **/
export function getCdaActivityTransactionInfo(activityId) {
    return request({
        url:config.APIURL+'/api/activity/cda/' + activityId,
        method: 'get'
    })
}

/**
 * 4.4 参与活动
 **/
export function participateActivity(activityId) {
    return request({
        url:config.APIURL+'/api/activity/cda/' + activityId + '/join',
        method:'post',
    })
}

/**
 * 4.5 查看报告
 **/
export function getCdaReportInfo(activityId) {
    return request({
        url:config.APIURL+'/api/activity/cda/' + activityId +'/report',
        method: 'get'
    })
}

/**
 * 4.6 查看我发起的活动
 **/
export function getCdaMyActivity () {
    return request({
        url:config.APIURL+'/api/selfcenter/cda/myactivity',
        method: 'get'
    })
}

/**
 * 4.7 查看活动清算信息
 **/
export function getLiquidationInfo (activityId) {
    return request({
        url:config.APIURL+'/api/selfcenter/cda/' + activityId +'/details',
        method: 'get'
    })
}
/**
 * 4.7 活动清算
 **/
export function liquidationActivity(activityId, data) {
    return request({
        url:config.APIURL+'/api/selfcenter/cda/' + activityId + '/details',
        method:'post',
        data:data
    })
}









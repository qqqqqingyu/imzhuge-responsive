import request from '@/utils/request'
// import {serverUrl} from "../config";

/**
 * 赛事中心
 **/
export function getEventList() {
    return request({
        // 测试服
        url:'/api/event_center/event_list',
        // 正式服
        // url:serverUrl+'/api/event_center/event_list',
        method:'get'
    })
}

/**
 * 赛事中心-->活动中心
 **/
export function getEvent(eventId) {
    return request({
        method:'get',
        // 测试服
        url:'/api/event_center/' + eventId
        // 正式服
        // url:serverUrl+'/api/event_center/' + eventId
    })
}

/**
 * 赛事中心-->活动中心-->参与交易，获取某个行业的信息
 **/
export function getCompetitionDetail(eventId,activityId) {
    return request({
        method:'get',
        // 测试服
        url:'/api/event_center/event_detail/' + eventId +'/' + activityId
        // 正式服
        // url:serverUrl+'/api/event_center/event_detail/' + eventId +'/' + activityId
    })
}

/**
 * 赛事中心-->活动中心-->参与交易，提交交易申请
 **/
export function postCompetitionTransaction(eventId,activityId,data) {
    return request({
        method:'post',
        // 测试服
        url:'/api/event_center/event_detail/' + eventId +'/' + activityId,
        // 正式服
        // url:serverUrl+'/api/event_center/event_detail/' + eventId +'/' + activityId,
        data:data
    })
}

/**
 * 我的-我参与的赛事
 **/
export function getMyEvent() {
    return request({
        method:'get',
        // 测试服
        url:'/api/selfcenter/my_event'
        // 正式服
        // url:serverUrl+'/api/selfcenter/my_event'
    })
}

/**
 * 个人中心-->特邀比赛 
 **/
export function getInvitedEvent() {
    return request({
        method:'get',
        // 测试服
        url:'/api/selfcenter/my_invited_event'
        // 正式服
        // url:serverUrl+'/api/selfcenter/my_invited_event'
    })
}
import request from '@/utils/request'
// import {serverUrl} from "../config";

/**
 * 赛事中心
 **/
export function getEventList() {
    return request({
        url:'/api/event_center/event_list',
        method:'get'
    })
}

/**
 * 赛事中心-->活动中心
 **/
export function getEvent(eventId) {
    return request({
        method:'get',
        url:'/api/event_center/' + eventId
    })
}

/**
 * 赛事中心-->活动中心-->参与交易，获取某个行业的信息
 **/
export function getCompetitionDetail(eventId,activityId) {
    return request({
        method:'get',
        url:'/api/event_center/event_detail/' + eventId +'/' + activityId
    })
}

/**
 * 赛事中心-->活动中心-->参与交易，提交交易申请
 **/
export function postCompetitionTransaction(eventId,activityId,data) {
    return request({
        method:'post',
        url:'/api/event_center/event_detail/' + eventId +'/' + activityId,
        data:data
    })
}
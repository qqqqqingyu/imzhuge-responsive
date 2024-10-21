/**
 * @description 月度收益率接口定义
 * @author GongDiXin
 * @since 2022.09.11
 * **/
import request from '@/utils/request'
// 正式服
const config = require('../config.js')

/**
 * 3.1 获取行业列表
 **/
export function getIndustryList() {
    return request({
        method:'get',
        url:config.APIURL+'/api/month_predict/industry_list'
    })
}

/**
 * 3.2 获取某个行业信息
 **/
export function getIndustryDetail(industryId) {
    return request({
        method:'get',
        url:config.APIURL+'/api/month_predict/industry_detail/' + industryId
    })
}

/**
 * 3.2 提交交易申请
 **/
export function submitTransactionApply(industryId, data) {
    return request({
        url:config.APIURL+'/api/month_predict/industry_detail/' + industryId,
        method:'post',
        data:data
    })
}
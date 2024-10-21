import {getIndustryDetail, submitTransactionApply } from "../../api/month_predict";

/**
 * 处理行业详情数据
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            //相当于数据唯一的公共数据源，共享的数据存放在这
            industryDetail:[]
        }
    },
    mutations:{
        /**
         * 为数据赋值，参数state是必须的
         */
        setIndustryDetail(state,detailData) {
            state.industryDetail = detailData
        }
    },
    actions:{
        /**
         * 获取数据，并自动保存在vuex中
         */
        async useIndustryDetailsData(context,industryId){
            // 调用接口取数据
            const industryDetail = await getIndustryDetail(industryId).then((res) =>{
                return res.data
            }).catch((res) => {
                console.log(res);
            });
            // 为state中的industryDetail赋值
            context.commit('setIndustryDetail',industryDetail)
        },

        // 提交
        async transactionApply(context,payload) {
            return await submitTransactionApply(payload.industryId,...payload)
        },

    }
}
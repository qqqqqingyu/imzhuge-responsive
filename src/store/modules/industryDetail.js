import {getIndustryDetail} from "../../api/month_redict";

/**
 * 处理行业详情数据
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            //相当于数据唯一的公共数据源，共享的数据存放在这
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
        async useIndustryDetailsData(context){
            const industryDetailData = await getIndustryDetail(1).then((res) =>{
                return res.data
            });
            context.commit('setIndustryDetail',industryDetailData)
        }
    }
}
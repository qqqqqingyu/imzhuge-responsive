import {getIndustryList} from '@/api/month_predict'

/**
 * 处理行业列表中的数据industryList
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            //相当于数据,唯一的公共数据源，共享的数据存放在这
            industryList:[]
        }
    },
    mutations: {
        /**
         * 为 industryList赋值
         */
        setIndustryList(state, newData) {
            state.industryList =newData
        }
    },
    actions: {
        /**
         * 获取 industryList 数据，并自动保存到 vuex 中
         */
        async useIndustryListData(context) {
            const IndustryList = await getIndustryList().then((res) => {
                return res
            });
            context.commit('setIndustryList', IndustryList)
        },
    }
}
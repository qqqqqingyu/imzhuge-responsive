import {getIndustryList} from '@/api/month_redict'

/**
 * 处理navigationBar中的数据categorys
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
         * 为 categorys 赋值
         */
        setIndustryList(state, newData) {
            state.industryList =newData
        }
    },
    actions: {
        /**
         * 获取 category 数据，并自动保存到 vuex 中
         */
        async useIndustryListData(context) {
            const IndustryList = await getIndustryList().then((res) => {
                return res.data
            });
            context.commit('setIndustryList', IndustryList)
        }
    }
}
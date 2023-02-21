import {getMyInfoDetails} from '@/api/my_activity'
/**
 * 处理用户详细信息
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            myInfoDetails:[],
        }
    },
    mutations: {
        /**
         * 为 myInfoDetails用户详细信息赋值
         */
        setMyInfoDetails(state, newData) {
            state.myInfoDetails =newData
        },
    },
    actions: {
        /**
         * 获取 myInfoDetails用户详细信息 数据，并自动保存到 vuex 中
         */
        async useMyInfoDetailsData(context) {
            const myInfoDetails = await getMyInfoDetails().then((res) => {
                return res.data
            });
            context.commit('setMyInfoDetails', myInfoDetails)
        },

    }
}
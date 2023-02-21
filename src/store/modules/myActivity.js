import {getMyActivity} from '@/api/my_activity'
/**
 * 处理个人中心的用户名以及我参与的活动
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            myActivity:''
        }
    },
    mutations: {

        /**
         * 为 myActivity我参与的活动赋值
         */
        setMyActivity(state, newData) {
            state.myActivity =newData
        }

    },
    actions: {

        /**
         * 获取myActivity我参与的活动 数据，并自动保存到 vuex 中
         */
        async useMyActivityData(context) {
            const myActivity = await getMyActivity().then((res) => {
                return res.data
            });
            context.commit('setMyActivity', myActivity)
        }
    }
}
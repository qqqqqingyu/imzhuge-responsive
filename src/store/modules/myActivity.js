import {getMyActivity,getMyInfoDetails} from '@/api/my_activity'
// import {getMyActivity} from '@/api/my_activity'
/**
 * 处理个人中心的用户名以及我参与的活动
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            //相当于数据,唯一的公共数据源，共享的数据存放在这
            userName:'用户1',
            myActivity:'暂无'
        }
    },
    mutations: {
        /**
         * 为 userName用户名赋值
         */
        setUserName(state, newData) {
            state.userName =newData
        },
        /**
         * 为 myActivity我参与的活动赋值
         */
        setMyActivity(state, newData) {
            state.myActivity =newData
        }

    },
    actions: {
        /**
         * 获取 userName用户名 数据，并自动保存到 vuex 中
         */
        async useUserNameData(context) {
            const userName = await getMyInfoDetails().then((res) => {
                return res.data.username
            });
            context.commit('setUserName', userName)
        },
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
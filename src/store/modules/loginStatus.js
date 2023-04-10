import {getLoginStatus} from '@/api/login'
/**
 * 处理登录状态
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            loginStatus:''
        }
    },
    mutations: {

        /**
         * 为 loginStatus登录状态赋值
         */
        setLoginStatus(state, newData) {
            state.loginStatus =newData
        }

    },
    actions: {

        /**
         * 获取loginStatus数据，并自动保存到 vuex 中
         */
        async useLoginStatusData(context) {
            const loginStatus = await getLoginStatus().then((res) => {
                return res.login_status
            });
            context.commit('setLoginStatus', loginStatus)
        }
    }
}
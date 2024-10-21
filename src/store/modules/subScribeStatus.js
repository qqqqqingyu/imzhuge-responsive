import { getSubscribeStatus, changeSubscribeStatus } from '../../api/competition'
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            subScribeStatus:null,
        }
    },
    mutations: {
        setSubScribeStatus(state,data){
                state.subScribeStatus = data
        }
    },
    actions: {
        async useMySubScribeStatus(context) {
            const response = await getSubscribeStatus();
            if (response.code === '200' && response.msg === '您已订阅当前页面。') {
                context.commit('setSubScribeStatus', true);
            } else if (response.code === '201' || response.msg === '您已取消订阅当前页面。') {
                context.commit('setSubScribeStatus', false);
            }
        },
        async changeMySubScribeStatus(context) {
            const res = await changeSubscribeStatus();
            context.dispatch('useMySubScribeStatus');

        },
    }
    
}
import { getSubscribeStatus, changeSubscribeStatus } from '../../api/competition'
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            subScribeStatus:false,
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
            if (response.data == true) {
                context.commit('setSubScribeStatus', true);
            } else if (response.data == false ) {
                context.commit('setSubScribeStatus', false);
            }else{
                context.commit('setSubScribeStatus', false);
            }
        },
        async changeMySubScribeStatus(context) {
            const res = await changeSubscribeStatus();
            context.dispatch('useMySubScribeStatus');

        },
    }
    
}
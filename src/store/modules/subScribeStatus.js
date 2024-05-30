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
        async useMyInfoDetailsData(context) {
            const mySubScribeStatus = await getMyInfoDetails().then((res) => {
                return res.data
            });
            context.commit('setMyInfoDetails', myInfoDetails)
        },

    }
}
export default  {
    //简单访问
    /**
     *  数据源
     */
    // 如industryList，第一个industryList是modules，第二个是modules中的state
    industryList:(state)=>state.industryList.industryList,
    industryDetail:(state)=>state.industryDetail.industryDetail,
    myActivity:(state)=>state.myActivity.myActivity,
    myInfoDetails:(state)=>state.myInfoDetails.myInfoDetails,
    loginStatus:(state)=>state.loginStatus.loginStatus,
    eventList:(state)=>state.eventList.eventList,
    event:(state)=>state.eventList.event,
    competitionDetail:(state)=>state.eventList.competitionDetail,
    //获取token方法
    //判断是否有token,如果没有重新赋值，返回给state的token
    getToken(state) {
        if (!state.token) {
            state.token = localStorage.getItem('token')
        }
        return state.token
    }
}
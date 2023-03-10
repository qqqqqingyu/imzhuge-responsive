export default  {
    //简单访问
    /**
     *  数据源
     */
    industryList:(state)=>state.industryList.industryList,
    industryDetail:(state)=>state.industryDetail.industryDetail,
    myActivity:(state)=>state.myActivity.myActivity,
    myInfoDetails:(state)=>state.myInfoDetails.myInfoDetails,
    //获取token方法
    //判断是否有token,如果没有重新赋值，返回给state的token
    getToken(state) {
        if (!state.token) {
            state.token = localStorage.getItem('token')
        }
        return state.token
    }
}
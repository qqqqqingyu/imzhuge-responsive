export default  {
    //简单访问
    /**
     *  数据源
     */
    categorys:(state)=>state.category.categorys,
    industryList:(state)=>state.industryList.industryList,
    industryDetail:(state)=>state.industryDetail.industryDetail,
    //获取token方法
    //判断是否有token,如果没有重新赋值，返回给state的token
    getToken(state) {
        if (!state.token) {
            state.token = localStorage.getItem('token')
        }
        return state.token
    }
}
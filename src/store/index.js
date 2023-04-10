import {createStore} from 'vuex'
import getters from './getters'
import industryList from "./modules/industryList";
import industryDetail from "./modules/industryDetail";
import myActivity from "./modules/myActivity"
import myInfoDetails from "./modules/myInfoDetails"
import loginStatus from "./modules/loginStatus";

import createPersistedState from 'vuex-persistedstate'

const store =createStore({
    state:{
        token:'',
    },
    mutations: {
        //存储token方法
        //设置token等于外部传递进来的值
        setToken(state, token) {
            state.token = token
            localStorage.token = token //同步存储token至localStorage
        },
    },
    getters,
    modules:{
        industryList,
        industryDetail,
        myInfoDetails,
        myActivity,
        loginStatus
    },
    actions: {},
    //如果数据修改之后，没有及时更新，可能是这里的原因
    plugins: [
        createPersistedState({
            // 保存到 localStorage 中的 key
            key: 'imzhuge-2',
            // 需要保存的模块
            paths: ['industryList','industryDetail','myActivity','myInfoDetails','loginStatus']
        })
    ]

})
export default store


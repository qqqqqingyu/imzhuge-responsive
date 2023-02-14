import {createStore} from 'vuex'
import getters from './getters'
import category from "./modules/category";
import industryList from "./modules/industryList";
import industryDetail from "./modules/industryDetail";
import userName from "./modules/myActivity"
import myActivity from "./modules/myActivity"
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
        category,
        industryList,
        industryDetail,
        userName,
        myActivity,
    },
    actions: {},
    plugins: [
        createPersistedState({
            // 保存到 localStorage 中的 key
            key: 'imzhuge',
            // 需要保存的模块
            paths: ['industryList','industryDetail','myActivity','userName']
        })
    ]

})
export default store


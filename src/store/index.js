import {createStore} from 'vuex'
import getters from './getters'
import category from "./modules/category";
import industryList from "./modules/industryList";
import industryDetail from "./modules/industryDetail";
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
    },
    actions: {},
    plugins: [
        createPersistedState({
            // 保存到 localStorage 中的 key
            key: 'imooc-front',
            // 需要保存的模块
            paths: ['industryList','industryDetail']
        })
    ]

})
export default store


// import {getCategory} from '@/api/category'
// import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants/index'

/**
 * 处理navigationBar中的数据categorys
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            //相当于数据,唯一的公共数据源，共享的数据存放在这
            categorys:''
        }
    },
    mutations: {
        /**
         * 为 categorys 赋值
         */
        setCategorys(state, categorys) {
            state.categorys = categorys
        }
    },
    actions: {
        /**
         * 获取 category 数据，并自动保存到 vuex 中
         */
        async useCategoryData(context) {
            // const { categorys } = await getCategory()
            context.commit('setCategorys', [0,9,8,7,6])
        }
    }
}
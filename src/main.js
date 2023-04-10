import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';
// 移动端自定义样式
import './assets/CSS/responsive_style.css'

// import axios from "axios";

// axios.defaults.headers.common['Authorization'] = store.state.token
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

router.beforeEach((to, from, next) => {
    //路由发生改变时,触发
    window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
    //设置跳转时置顶，但是会和wow.js冲突，还未解决
    // // chrome
    // document.body.scrollTop = 0
    // // firefox
    // document.documentElement.scrollTop = 0
    // // safari
    // window.pageYOffset = 0
    next();
})


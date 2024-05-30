import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';
// 自定义全局样式
import './assets/CSS/responsive_style.css'
import { createPinia } from 'pinia';
// import axios from "axios";
// axios.defaults.headers.common['Authorization'] = store.state.token
const pinia = createPinia()
createApp(App).use(store).use(router).use(pinia).use(ElementPlus).mount('#app')

router.beforeEach((to, from, next) => {
    //路由发生改变时,触发
    window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
    next();
})


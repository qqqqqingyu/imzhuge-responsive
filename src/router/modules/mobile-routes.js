export default [
    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/main/main.vue'),
        meta: {
            title: '测试',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/personal_center',
        name: 'personal_center',
        component: () => import('@/views/personal_center/personal_center.vue'),
        meta: {
            title: '个人中心',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/personal_info',
        name: 'personal_info',
        component: () => import('@/views/personal_info/personal_info.vue'),
        meta: {
            title: '个人信息',
            keepAlive: true, // 需要被缓存
        }
    },

    {
        path: '/',
        name: 'weekly_forecast',
        component: () => import('@/views/weekly_forecast/weekly_forecast.vue'),
        meta: {
            title: '行业个股收益率预测',
            keepAlive: true, // 需要被缓存
        }
    },/*周度收益率预测任务设计，行业个股收益率预测1*/
    {
        path: '/weekly_forecast_details',
        name: 'weekly_forecast_details',
        component: () => import('@/views/weekly_forecast_details/weekly_forecast_details.vue'),
        meta: {
            title: '行业个股收益率预测详情',
            keepAlive: true, // 需要被缓存
        }
    },



]

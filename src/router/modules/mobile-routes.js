export default [
    {
        path: '/',
        name: 'home_page',
        component: () => import('@/views/home_page/home_page'),
        meta: {
            title: '首页',
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
        path: '/weekly_forecast',
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
    {
        path: '/process',
        name: 'process',
        component: () => import('@/views/process/process.vue'),
        meta: {
            title: '交易流程',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/industry_relationship',
        name: 'industry_relationship',
        component: () => import('@/views/industry_relationship/industry_relationship.vue'),
        meta: {
            title: '全球经济不确定性预警',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/competition_center',
        name: 'competition_center',
        component: () => import('@/views/competition_center/competition_center.vue'),
        meta: {
            title: '赛事中心',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/competition_translation',
        name: 'competition_translation',
        component: () => import('@/views/competition_translation/competition_translation.vue'),
        meta: {
            title: '参与交易',
            keepAlive: true, // 需要被缓存
        }
    },



]

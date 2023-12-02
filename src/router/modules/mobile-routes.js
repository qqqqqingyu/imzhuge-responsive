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
        // redirect:'/mobile_competition',
        meta: {
            title: '个人中心',
            keepAlive: true, // 需要被缓存
        },
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
        path: '/competition_details',
        name: 'competition_details',
        component: () => import('@/views/competition_details/competition_details.vue'),
        meta: {
            title: '比赛详情',
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
    {
        path: '/mobile_competition',
        name: 'mobile_competition',
        component: () => import('@/views/personal_center/mobile/mobile_competition.vue'),
        meta: {
            title: '比赛列表',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/mobile_participate',
        name: 'mobile_participate',
        component: () => import('@/views/personal_center/mobile/mobile_participate.vue'),
        meta: {
            title: '比赛活动',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/mobile_task_list',
        name: 'mobile_task_list',
        component: () => import('@/views/personal_center/mobile/mobile_task_list.vue'),
        meta: {
            title: '任务列表',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/mobile_industry_list',
        name: 'mobile_industry_list',
        component: () => import('@/views/personal_center/mobile/mobile_industry_list.vue'),
        meta: {
            title: '行业预测列表',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/mobile_my_activities',
        name: 'mobile_my_activities',
        component: () => import('@/views/personal_center/mobile/mobile_my_activities.vue'),
        meta: {
            title: '活动列表',
            keepAlive: true, // 需要被缓存
        }
    },
    // 特邀比赛
    {
        path:'/mobile_invited_event',
        name:'mobile_invited_event',
        component: () => import('@/views/personal_center/mobile/mobile_invited_event.vue'),
        meta: {
            title: '特邀比赛',
            keepAlive: true, // 需要被缓存
        }
    },
    // 特邀比赛参与活动
    {
        path:'/mobile_invited_participate',
        name:'mobile_invited_participate',
        component: () => import('@/views/personal_center/mobile/mobile_invited_participate.vue'),
        meta: {
            title: '特邀比赛参与活动',
            keepAlive: true, // 需要被缓存
        }
    },
    // 特邀比赛任务列表
    {
        path:'/mobile_invited_task_list',
        name:'mobile_invited_task_list',
        component: () => import('@/views/personal_center/mobile/mobile_invited_task_list.vue'),
        meta: {
            title: '特邀比赛任务列表',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path:'/stock_predict',
        name:'stock_predict',
        component: () => import('@/views/stock_predict/stock_predict.vue'),
        meta: {
            title: '股价涨跌预测',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/stock_participate',
        name: 'stock_participate',
        component: () => import('@/views/stock_participate/stock_participate.vue'),
        meta: {
            title: '股价涨跌预测-参与交易',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/help_center',
        name: 'help_center',
        component: () => import('@/views/help_center/help_center.vue'),
        meta: {
            title: '帮助中心',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/activity2045',
        name: 'activity2045',
        component: () => import('@/views/activity2045/activity2045.vue'),
        meta: {
            title: '模拟交易',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/transaction',
        name: 'transaction',
        component: () => import('@/views/transaction/transaction.vue'),
        meta: {
            title: '模拟交易',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/transaction_success',
        name: 'transaction_success',
        component: () => import('@/views/transaction/transaction_success.vue'),
        meta: {
            title: '模拟交易',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/result',
        name: 'result',
        component: () => import('@/views/result/result.vue'),
        meta: {
            title: '模拟交易结果',
            keepAlive: true, // 需要被缓存
        }
    },
]

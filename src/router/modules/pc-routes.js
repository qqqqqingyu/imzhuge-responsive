export default [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/layout/main.vue'),
        children: [
            {
                path: '',
                name: 'home_page',
                component: () => import('@/views/home_page/home_page.vue'),
                meta: {
                    title: '首页',
                    keepAlive: true, // 需要被缓存
                }
            },
            {
                path: '/personal_center',
                name: 'personal_center',
                component: () => import('@/views/personal_center/personal_center.vue'),
                redirect:'/pc_competition', //初始加载的子组件
                meta: {
                    title: '个人中心',
                    keepAlive: true, // 需要被缓存
                },
                children:[
                    {
                        path:'/pc_my_activities',
                        name:'pc_my_activities',
                        component: () => import('@/views/personal_center/pc/pc_my_activities'),
                    },
                    {
                        path:'/pc_personal_info',
                        name:'pc_personal_info',
                        component: () => import('@/views/personal_center/pc/pc_personal_info'),
                    },
                    {
                        path:'/pc_industry_list',
                        name:'pc_industry_list',
                        component: () => import('@/views/personal_center/pc/pc_industry_list'),
                    },
                    {
                        path:'/pc_competition',
                        name:'pc_competition',
                        component: () => import('@/views/personal_center/pc/pc_competition'),
                    },
                    {
                        path:'/pc_participate',
                        name:'pc_participate',
                        component: () => import('@/views/personal_center/pc/pc_participate'),
                    },
                    {
                        path:'/pc_task_list',
                        name:'pc_task_list',
                        component: () => import('@/views/personal_center/pc/pc_task_list'),
                    },
                    // 特邀比赛
                    {
                        path:'/pc_invited_event',
                        name:'pc_invited_event',
                        component: () => import('@/views/personal_center/pc/pc_invited_event'),
                    },
                    // 特邀比赛参与
                    {
                        path:'/pc_invited_participate',
                        name:'pc_invited_participate',
                        component: () => import('@/views/personal_center/pc/pc_invited_participate'),
                    },
                    // 特邀比赛任务列表
                    {
                        path:'/pc_invited_task_list',
                        name:'pc_invited_task_list',
                        component: () => import('@/views/personal_center/pc/pc_invited_task_list'),
                    },
                ]
            },
            {
                path: '/weekly_forecast',
                name: 'weekly_forecast',
                component: () => import('@/views/weekly_forecast/weekly_forecast.vue'),
                meta: {
                    title: '行业个股收益率预测',
                    keepAlive: true, // 需要被缓存
                }
            },
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
                path: '/stock_predict',
                name: 'stock_predict',
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
        ]
    }
]

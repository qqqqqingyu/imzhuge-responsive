
// import CDA_home from "@/views/CDA_home";
// import CDA_PublishActivity from "@/views/CDA_PublishActivity";
// import CDA_EventSquare from "@/views/CDA_EventSquare";
// import CDA_EventDetails from "@/views/CDA_EventDetails";
// import CDA_MyEvent from "@/views/CDA_MyEvent";
// import CDA_MyEventDetails from "@/views/CDA_MyEventDetails";
// import pc_all from "@/views/pc_all";
// import LMSR from "@/views/LMSR";
// /*import MonthlyForecast_details1 from "@/views/MonthlyForecast_details1";*/
// import MonthlyForecast_details2 from "@/views/MonthlyForecast_details2";
// /*import MonthlyForecast_industrialchain from "@/views/MonthlyForecast_industrialchain";*/
// import MonthlyForecast_introduce from "@/views/MonthlyForecast_introduce";
// import MonthlyForecast_share from "@/views/MonthlyForecast_share";
// import LMSR_PublishActivity from "@/views/LMSR_PublishActivity";
// import LMSR_EventSquare from "@/views/LMSR_EventSquare";
// import LMSR_MyEvent from "@/views/LMSR_MyEvent";
// import home from "@/views/home";
// // import navigation from "../views/main/components/navigation/navigation";
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
                redirect:'/pc_my_activities', //初始加载的子组件
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
                    }
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

        ]
    },
    // {
    //     path: '/',
    //     name: 'main',
    //     component: () => import('@/views/layout/index.vue'),
    //     children: [
    //         {
    //             path: '/',
    //             name: 'weekly_forecast',
    //             component: () => import('@/views/weekly_forecast/weekly_forecast.vue'),
    //             meta: {
    //                 title: '周度收益率',
    //                 keepAlive: true, // 需要被缓存
    //             }
    //         },
    //
    //
    //     ]
    // },

    // {
    //     path: '/home',
    //     name: 'home',
    //     component:home,
    //     meta: {
    //         title: '嗨皮诸葛 - 爱诸葛，向未来',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/pc_all',
    //     name: 'pc_all',
    //     component:pc_all,
    //     meta: {
    //         title: '首页',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/LMSR',
    //     name: 'LMSR',
    //     component:LMSR,
    //     meta: {
    //         title: 'LMSR简介',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/LMSR_PublishActivity',
    //     name: 'LMSR_PublishActivity',
    //     component:LMSR_PublishActivity,
    //     meta: {
    //         title: 'LMSR发布活动',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/LMSR_EventSquare',
    //     name: 'LMSR_EventSquare',
    //     component:LMSR_EventSquare,
    //     meta: {
    //         title: 'LMSR活动广场',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/LMSR_MyEvent',
    //     name: 'LMSR_MyEvent',
    //     component:LMSR_MyEvent,
    //     meta: {
    //         title: 'LMSR我发布的活动',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/CDA_home',
    //     name: 'CDA_home',
    //     component: CDA_home,
    //     meta: {
    //         title: 'CDA简介',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/CDA_PublishActivity',
    //     name: 'CDA_PublishActivity',
    //     component: CDA_PublishActivity,
    //     meta: {
    //         title: 'CDA发布活动',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/CDA_EventSquare',
    //     name: 'CDA_EventSquare',
    //     component: CDA_EventSquare,
    //     meta: {
    //         title: 'CDA活动广场',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },//ok
    // {
    //     path: '/CDA_MyEventDetails',
    //     name: 'CDA_MyEventDetails',
    //     component: CDA_MyEventDetails,
    //     meta: {
    //         title: 'CDA我发布的活动详情',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    // {
    //     path: '/CDA_EventDetails',
    //     name: 'CDA_EventDetails',
    //     component: CDA_EventDetails,
    //     meta: {
    //         title: 'CDA活动详情',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    //
    // {
    //     path: '/CDA_MyEvent',
    //     name: 'CDA_MyEvent',
    //     component: CDA_MyEvent,
    //     meta: {
    //         title: 'CDA我发布的活动',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },
    //
    //
    // //周度收益率预测
    // /*{
    //   path: '/MonthlyForecast_details1',
    //   name: 'MonthlyForecast_details1',
    //   component: MonthlyForecast_details1,
    // },/!*产业链，查看详情···*!/*/
    // {
    //     path: '/MonthlyForecast_details2',
    //     name: 'MonthlyForecast_details2',
    //     component: MonthlyForecast_details2,
    //     meta: {
    //         title: '行业个股收益率预测详情',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },/*行业个股收益率预测，查看详情*/
    // /*{
    //   path: '/MonthlyForecast_industrialchain',
    //   name: 'MonthlyForecast_industrialchain',
    //   component: MonthlyForecast_industrialchain,
    // },/!*产业链分析*!/*/
    // {
    //     path: '/MonthlyForecast_introduce',
    //     name: 'MonthlyForecast_introduce',
    //     component: MonthlyForecast_introduce,
    //     meta: {
    //         title: '周度收益率预测',
    //         keepAlive: true, // 需要被缓存
    //     }
    // },/*周度收益率预测任务设计*/
    // {
    //     path: '/MonthlyForecast_share',
    //     name: 'MonthlyForecast_share',
    //     component:MonthlyForecast_share,
    //     meta: {
    //         title: '行业个股收益率预测',
    //         keepAlive: true, // 需要被缓存
    //     }
    // }/*周度收益率预测任务设计，行业个股收益率预测1*/

]

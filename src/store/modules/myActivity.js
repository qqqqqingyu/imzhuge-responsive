import {getMyActivity} from '@/api/my_activity'
import {getMyEvent} from "../../api/competition";
/**
 * 处理个人中心的用户名以及我参与的活动
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            myActivity:'',
            myEvent:[]
        }
    },
    mutations: {
        /**
         * 为 myActivity我参与的活动赋值
         */
        setMyActivity(state, newData) {
            state.myActivity =newData
        },
        setMyEvent(state,myEventData){
            state.myEvent = myEventData
        }

    },
    actions: {

        /**
         * 获取myActivity我参与的活动 数据，并自动保存到 vuex 中
         */
        async useMyActivityData(context) {
            const myActivity = await getMyActivity().then((res) => {
                return res.data
            }).catch((res) => {
                console.log(res);
            });

            // 测试假数据
            // const myActivity = {
            //     "coin": "372.96984604",
            //     "trade_times": 148,
            //     "act_project_list": [
            //         {
            //             "act_name": "月度收益率预测-金融",
            //             "act_money": "201.31230066",
            //             "project_list": [
            //                 {
            //                     "title": "金融行业20230324-20230331周度收益率排名预测",
            //                     "status": true,
            //                     "project_earning": "30.00000000",
            //                     "true_contract": "结果未公布"
            //                 },
            //                 {
            //                     "title": "金融行业20230224-20230303周度收益率排名预测",
            //                     "status": true,
            //                     "project_earning": "28.55205011",
            //                     "true_contract": "结果未公布"
            //                 },
            //                 {
            //                     "title": "金融行业20230106-20230113周度收益率排名预测",
            //                     "status": true,
            //                     "project_earning": "28.55205011",
            //                     "true_contract": "结果未公布"
            //                 },
            //                 {
            //                     "title": "金融行业20221230-20230106周度收益率排名预测",
            //                     "status": true,
            //                     "project_earning": "28.55205011",
            //                     "true_contract": "结果未公布"
            //                 },
            //                 {
            //                     "title": "金融行业2022年12月30日-2023年01月06日周度收益率排名预测",
            //                     "status": true,
            //                     "project_earning": "28.55205011",
            //                     "true_contract": "结果未公布"
            //                 },
            //                 {
            //                     "title": "金融行业2022年12月30日-2023年01月06日周度收益率排名预测",
            //                     "status": false,
            //                     "project_earning": "28.55205011",
            //                     "true_contract": "结果待揭晓"
            //                 },
            //                 {
            //                     "title": "月度收益率预测-金融",
            //                     "status": true,
            //                     "project_earning": "28.55205011",
            //                     "true_contract": "东方财富"
            //                 }
            //             ]
            //         },
            //     ]
            //}

            context.commit('setMyActivity', myActivity)
        },
        async useMyEventData(context){
            // 调用接口取数据
            const myEvent = await getMyEvent().then((res) =>{
                return res.data
            }).catch((res) => {
                console.log(res);
            });

            // 测试假数据
            // const myEvent = [
            //     {
            //         "event_name": "测试比赛2",
            //         "event_start_time": "2023-08-05T17:00:00",
            //         "event_end_time": "2023-08-31T20:00:00",
            //         "earning_coin": "-0.50062500",
            //         "act_list": [
            //             {
            //                 "act_name": "测试比赛2的活动2",
            //                 "act_money": "-0.50062500",
            //                 "project_list": [
            //                     {
            //                         "title": "测试比赛2场景2活动1",
            //                         "status": false,
            //                         "project_earning": "-0.50062500",
            //                         "true_contract": "结果待揭晓"
            //                     },
            //                     {
            //                         "title": "测试比赛2场景2活动1",
            //                         "status": false,
            //                         "project_earning": "-0.50062500",
            //                         "true_contract": "结果待揭晓"
            //                     },
            //                     {
            //                         "title": "测试比赛2场景2活动1",
            //                         "status": false,
            //                         "project_earning": "-0.50062500",
            //                         "true_contract": "结果待揭晓"
            //                     },
            //                     {
            //                         "title": "测试比赛2场景2活动1",
            //                         "status": false,
            //                         "project_earning": "-0.50062500",
            //                         "true_contract": "结果待揭晓"
            //                     }
            //                 ]
            //             }
            //         ],
            //         "event_earning_cash": "奖金还未分配",
            //         "event_status": "赛事进行中"
            //     },
            //     {
            //         "event_name": "测试比赛2",
            //         "event_start_time": "2023-08-05T17:00:00",
            //         "event_end_time": "2023-08-31T20:00:00",
            //         "earning_coin": "-0.50062500",
            //         "act_list": [
            //             {
            //                 "act_name": "测试比赛2的活动2",
            //                 "act_money": "-0.50062500",
            //                 "project_list": [
            //                     {
            //                         "title": "测试比赛2场景2活动1",
            //                         "status": false,
            //                         "project_earning": "-0.50062500",
            //                         "true_contract": "结果待揭晓"
            //                     }
            //                 ]
            //             }
            //         ],
            //         "event_earning_cash": "奖金还未分配",
            //         "event_status": "赛事进行中"
            //     },
            //     {
            //         "event_name": "测试比赛2",
            //         "event_start_time": "2023-08-05T17:00:00",
            //         "event_end_time": "2023-08-31T20:00:00",
            //         "earning_coin": "-0.50062500",
            //         "act_list": [
            //             {
            //                 "act_name": "测试比赛2的活动2",
            //                 "act_money": "-0.50062500",
            //                 "project_list": [
            //                     {
            //                         "title": "测试比赛2场景2活动1",
            //                         "status": false,
            //                         "project_earning": "-0.50062500",
            //                         "true_contract": "结果待揭晓"
            //                     }
            //                 ]
            //             }
            //         ],
            //         "event_earning_cash": "奖金还未分配",
            //         "event_status": "赛事进行中"
            //     },
            // ]

            // 为state中的competitionDetail赋值
            context.commit('setMyEvent',myEvent)
        },
    }
}
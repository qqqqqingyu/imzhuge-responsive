import {getEventList, getEvent, getCompetitionDetail} from "../../api/competition";

/**
 * 处理赛事中心数据
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            //相当于数据唯一的公共数据源，共享的数据存放在这
            eventList:[],
            eventData:[],
            competitionDetail:[]
        }
    },
    mutations:{
        /**
         * 为数据赋值，参数state是必须的
         */
        setEventList(state,eventListData) {
            state.eventList = eventListData
        },
        setEvent(state,eventData){
            state.eventData = eventData
        },
        setCompetitionDetail(state,competitionDetailData) {
            state.competitionDetail = competitionDetailData
        }
    },
    actions:{
        /**
         * 获取数据，并自动保存在vuex中
         */
        async useEventListData(context){
            // 调用接口取数据
            const eventList = await getEventList().then((res) =>{
                return res.data
            }).catch((res) => {
                console.log(res);
            });

            // 测试假数据
            // const eventList = [
            //         {
            //
            //             "event_name": "测试比赛中心的活动",
            //             "start_time": "2023-07-28T03:33:32",
            //             "end_time": "2023-07-28T04:33:35",
            //             "award": 100,
            //             "status": "活动未开始或已结束",
            //             "is_special": true,
            //         },{
            //
            //             "event_name": "测试比赛中心的活动",
            //             "start_time": "2023-07-28T03:33:32",
            //             "end_time": "2023-10-28T04:33:35",
            //             "award": 300,
            //             "status": "活动进行中",
            //             "is_special": false,
            //         },
            //     ]

            // 为state中的eventList赋值
            context.commit('setEventList',eventList)
        },
        async useEventData(context,eventId){
            // 调用接口取数据
            // const eventData = await getEvent(eventId).then((res) =>{
            //     return res.data
            // }).catch((res) => {
            //     console.log(res);
            // });

            // 测试假数据
            const eventData = {
                "group_id": 2,
                "event_desc": "\u80a1\u5e02\u6307\u6570\uff08\u4f8b ",
                "performance": {
                    "ranking": 10,
                    "net_zhuge": 20,
                    "cash": 10,
                    "activity_rank": [{
                        "id": 1,
                        "name": "活动1",
                        "status": "已结束",
                        "sub_net_zhuge": 20
                    },
                        {
                            "id": 2,
                            "name": "活动2",
                            "status": "进行中",
                            "sub_net_zhuge": "-"
                        }
                    ]
                },
                "activity_data": [{
                    "id": 1,
                    "name": "活动1",
                    "start_time": "2023-11-25T14:00:00",
                    "end_time": "2023-12-28T00:00:00",
                    "status": "已结束"
                },
                    {
                        "id": 2,
                        "name": "活动2",
                        "start_time": "2023-11-25T14:00:00",
                        "end_time": "2023-12-28T00:00:00",
                        "status": "进行中"
                    },
                    {
                        "id": 3,
                        "name": "活动3",
                        "start_time": "2023-11-25T14:00:00",
                        "end_time": "2023-12-28T00:00:00",
                        "status": "进行中"
                    }
                ]
            }

            // 测试假数据
            // 付费型信息共享实验
            // const eventData = {
            //     "event_type": "information",
            //     "group_id": 16,
            //     "event_desc": null,
            //     "activity_data": [
            //         {
            //             "id": 134,
            //             "name": "12-1\u6d4b\u8bd5\u6d3b\u52a81",
            //             "start_time": "2023-12-01T21:15:52",
            //             "end_time": "2023-12-09T21:15:54",
            //             "status": "\u6d3b\u52a8\u8fdb\u884c\u4e2d"
            //         },
            //         {
            //             "id": 135,
            //             "name": "12-1\u6d4b\u8bd5\u6d3b\u52a82",
            //             "start_time": "2023-12-01T21:16:56",
            //             "end_time": "2023-12-09T21:16:57",
            //             "status": "\u6d3b\u52a8\u8fdb\u884c\u4e2d"
            //         },
            //         {
            //             "id": 136,
            //             "name": "12-1\u6d4b\u8bd5\u6d3b\u52a83",
            //             "start_time": "2023-12-01T21:17:30",
            //             "end_time": "2023-12-09T21:17:32",
            //             "status": "\u6d3b\u52a8\u8fdb\u884c\u4e2d"
            //         }
            //     ],
            //     "group_info": "control4",
            //     "information": 10,
            //     "first_click": 0
            // }

            // 为state中的event赋值
            context.commit('setEvent',eventData)
        },
        async useCompetitionDetailData(context,eventId,activityId){
            // 调用接口取数据
            const competitionDetail = await getCompetitionDetail(eventId,activityId).then((res) =>{
                return res.data
            }).catch((res) => {
                console.log(res);
            });

            // 为state中的competitionDetail赋值
            context.commit('setCompetitionDetail',competitionDetail)
        },

    }
}
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
            // const eventList = {
            //     "group_id": 1,
            //     "activity_data": [
            //         {
                        
            //             "event_name": "测试比赛中心的活动",
            //             "start_time": "2023-07-28T03:33:32",
            //             "end_time": "2023-07-28T04:33:35",
            //             "award": 100,
            //             "status": "活动未开始或已结束",
            //             "is_special": true,
            //         },{
                        
            //             "event_name": "测试比赛中心的活动",
            //             "start_time": "2023-07-28T03:33:32",
            //             "end_time": "2023-10-28T04:33:35",
            //             "award": 300,
            //             "status": "活动进行中",
            //             "is_special": false,
            //         },
            //     ]
            // }

            // 为state中的eventList赋值
            context.commit('setEventList',eventList)
        },
        async useEventData(context,eventId){
            调用接口取数据
            const eventData = await getEvent(eventId).then((res) =>{
                return res.data
            }).catch((res) => {
                console.log(res);
            });

            // 测试假数据
            // const eventData = {
            //     "group_id": 1,
            //     "activity_data": [
            //         {
            //             "id": 114,
            //             "name": "测试比赛中心特邀",
            //             "start_time": "2023-07-28T03:33:32",
            //             "end_time": "2023-07-28T04:33:35",
            //             "status": "活动未开始或已结束",
            //             "is_special": true,
            //         },{
            //             "id": 114,
            //             "name": "测试比赛中心的活动",
            //             "start_time": "2023-07-28T03:33:32",
            //             "end_time": "2023-10-28T04:33:35",
            //             "status": "活动进行中",
            //             "is_special": true,
            //         },{
            //             "id": 114,
            //             "name": "测试比赛中心1",
            //             "start_time": "2023-07-28T03:33:32",
            //             "end_time": "2023-09-28T04:33:35",
            //             "status": "活动未开始或已结束",
            //             "is_special": false,
            //         },{
            //             "id": 114,
            //             "name": "测试比赛2",
            //             "start_time": "2023-06-28T03:33:32",
            //             "end_time": "2023-07-28T04:33:35",
            //             "status": "活动进行中",
            //             "is_special": false,
            //         },{
            //             "id": 114,
            //             "name": "测试3",
            //             "start_time": "2023-07-15T03:33:32",
            //             "end_time": "2023-07-28T04:33:35",
            //             "status": "活动未开始或已结束",
            //             "is_special": false,
            //         },{
            //             "id": 114,
            //             "name": "测试4",
            //             "start_time": "2023-07-28T03:33:32",
            //             "end_time": "2023-08-28T04:33:35",
            //             "status": "活动未开始或已结束",
            //             "is_special": true,
            //         }
            //     ]
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
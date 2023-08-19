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

            // 为state中的eventList赋值
            context.commit('setEventList',eventList)
        },
        async useEventData(context,eventId){
            // 调用接口取数据
            const eventData = await getEvent(eventId).then((res) =>{
                return res.data
            }).catch((res) => {
                console.log(res);
            });

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
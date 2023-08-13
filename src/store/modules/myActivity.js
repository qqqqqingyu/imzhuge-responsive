import {getMyActivity} from '@/api/my_activity'
/**
 * 处理个人中心的用户名以及我参与的活动
 */
export default {
    //独立作用域
    namespaced:true,
    state:() => {
        return {
            myActivity:''
        }
    },
    mutations: {
        /**
         * 为 myActivity我参与的活动赋值
         */
        setMyActivity(state, newData) {
            state.myActivity =newData
        }

    },
    actions: {

        /**
         * 获取myActivity我参与的活动 数据，并自动保存到 vuex 中
         */
        async useMyActivityData(context) {
            const myActivity = await getMyActivity().then((res) => {
                return res.data
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
            // }

            context.commit('setMyActivity', myActivity)
        }
    }
}
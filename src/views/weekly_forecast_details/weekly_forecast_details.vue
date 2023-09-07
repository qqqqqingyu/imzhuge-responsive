<template>
  <mobile_weekly_forecast_details v-if="isMobile" ></mobile_weekly_forecast_details>
  <pc_weekly_forecast_details_new v-else></pc_weekly_forecast_details_new>
</template>

<script>
import {isMobileTerminal} from '@/utils/flexible'
import mobile_weekly_forecast_details from "./mobile/mobile_weekly_forecast_details";
import pc_weekly_forecast_details_new from "./pc/pc_weekly_forecast_details_new";
// import {useStore} from "vuex";


export default {
  name: "weekly_forecast_details",
  components:{ mobile_weekly_forecast_details,pc_weekly_forecast_details_new },
  data() {
    return {
      isMobile: isMobileTerminal.value
    }
  },

  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    isMobileTerminal() {
      isMobileTerminal();
    },
  },
  mounted() {
    // 获取的数据要进行很多转化，故这里先不使用vuex
    // const store = useStore()
    // // 触发数据获取动作，获取行业详情数据
    // store.dispatch('industryDetail/useIndustryDetailsData',this.$route.query.id)
  },
}
</script>

<style scoped>

</style>
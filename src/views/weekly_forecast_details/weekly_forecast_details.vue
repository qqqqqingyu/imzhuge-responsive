<template>
  <mobile_weekly_forecast_details v-if="isMobile"></mobile_weekly_forecast_details>
  <pc_weekly_forecast_details v-else></pc_weekly_forecast_details>
</template>

<script>
import {isMobileTerminal} from '@/utils/flexible'
import mobile_weekly_forecast_details from "./mobile/mobile_weekly_forecast_details";
import pc_weekly_forecast_details from "./pc/pc_weekly_forecast_details";
import {useStore} from "vuex";
import {getIndustryDetail} from "../../api/month_redict";
export default {
  name: "weekly_forecast_details",
  components:{ mobile_weekly_forecast_details,pc_weekly_forecast_details },
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
    const store = useStore()

    // 触发数据获取动作
    store.dispatch('industryDetail/useIndustryDetailsData')
  },
}
</script>

<style scoped>

</style>
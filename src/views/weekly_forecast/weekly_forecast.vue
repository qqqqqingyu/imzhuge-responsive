<template>
  <mobile_weekly_forecast v-if="isMobile"></mobile_weekly_forecast>
  <pc_weekly_forecast v-else></pc_weekly_forecast>

</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_weekly_forecast from "./mobile/mobile_weekly_forecast";
import pc_weekly_forecast from "./pc/pc_weekly_forecast";
import {useStore} from "vuex";

export default {
  name: "weekly_forecast",
  components:{ mobile_weekly_forecast,pc_weekly_forecast },
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
  mounted() {
    const store = useStore()
    // 触发数据获取动作
    store.dispatch('loginStatus/useLoginStatusData')
    store.dispatch('industryList/useIndustryListData')
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    isMobileTerminal() {
      isMobileTerminal();
    },
  },

}
</script>

<style scoped>

</style>
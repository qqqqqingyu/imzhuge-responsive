<template>
  <mobile_stock_predict v-if="isMobile"></mobile_stock_predict>
  <pc_stock_predict v-else></pc_stock_predict>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_stock_predict from "./mobile/mobile_stock_predict";
import pc_stock_predict from "./pc/pc_stock_predict";
import {useStore} from "vuex";

export default {
  name: "stock_predict",
  components: {pc_stock_predict, mobile_stock_predict},
  data(){
    return{
      isMobile:isMobileTerminal.value,
      eventId:this.$route.query.eventId
    }
  },
  methods: {
    isMobileTerminal() {
      isMobileTerminal();
    },
  },
  mounted() {
    const store = useStore()
    // 触发数据获取动作
    store.dispatch('eventList/useEventData',this.eventId)
  }
}
</script>

<style scoped>

</style>
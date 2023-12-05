
<template>
  <mobile_competition_details :eventIdProp="eventId" v-if="isMobile"></mobile_competition_details>
  <pc_competition_details :eventIdProp="eventId" v-else></pc_competition_details>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import {useStore} from "vuex";
import pc_competition_details from "./pc/pc_competition_details";
import mobile_competition_details from "./mobile/mobile_competition_details";

export default {
  name: "competition_details",
  components: {mobile_competition_details, pc_competition_details},
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
  // mounted() {
  //   const store = useStore()
  //   // 触发数据获取动作
  //   store.dispatch('eventList/useEventData',this.eventId)
  // },
}
</script>

<style scoped>

</style>
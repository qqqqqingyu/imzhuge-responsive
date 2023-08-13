<template>
  <mobile_competiotion_center v-if="isMobile"></mobile_competiotion_center>
  <pc_competition_center></pc_competition_center>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_competiotion_center from "./mobile/mobile_competiotion_center";
import pc_competition_center from "./pc/pc_competition_center";
import {useStore} from "vuex";

export default {
  name: "competition_center",
  components: {pc_competition_center, mobile_competiotion_center},
  data(){
    return{
      isMobile:isMobileTerminal.value
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
    store.dispatch('eventList/useEventListData')
    // store.dispatch('eventList/useEventData')
  },
}
</script>

<style scoped>

</style>
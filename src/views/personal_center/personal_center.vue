<template>
  <mobile_personal_center v-if="isMobile"></mobile_personal_center>
  <pc_personal_center v-else></pc_personal_center>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_personal_center from "./mobile/mobile_personal_center";
import pc_personal_center from "./pc/pc_personal_center";
import {useStore} from "vuex";

export default {
  name: "personal_center",
  components:{mobile_personal_center,pc_personal_center},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
  mounted() {
    const store = useStore()
    // 触发myActivity以及myInfoDetails 数据获取动作
    store.dispatch('myActivity/useMyActivityData')
    store.dispatch('myActivity/useMyEventData')
    store.dispatch('myActivity/useMyInvitedEventData')
    store.dispatch('myInfoDetails/useMyInfoDetailsData')
  },
}
</script>

<style scoped>

</style>
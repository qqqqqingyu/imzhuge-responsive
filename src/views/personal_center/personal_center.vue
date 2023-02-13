<template>
  <mobile_personal_center v-if="isMobile"></mobile_personal_center>
  <pc_personal_center v-else></pc_personal_center>

</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'

import mobile_personal_center from "./mobile/mobile_personal_center";
import pc_personal_center from "./pc/pc_personal_center";
export default {
  name: "personal_center",
  components:{mobile_personal_center,pc_personal_center},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
}
</script>

<style scoped>

</style>
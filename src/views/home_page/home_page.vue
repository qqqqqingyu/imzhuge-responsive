<template>
  <mobile_home_page v-if="isMobile"></mobile_home_page>
  <pc_home_page v-else></pc_home_page>

</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_home_page from "./mobile/mobile_home_page";
import pc_home_page from "./pc/pc_home_page";
export default {
  name: "home_page",
  components:{mobile_home_page,pc_home_page},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
  mounted() {

  },
}
</script>

<style scoped>

</style>
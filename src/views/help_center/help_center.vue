<template>
  <mobile_help_center v-if="isMobile"></mobile_help_center>
  <pc_help_center v-else></pc_help_center>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import pc_help_center from "./pc/pc_help_center";
import mobile_help_center from "./mobile/mobile_help_center";

export default {
  name: "help_center",
  components:{pc_help_center,mobile_help_center},
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
}
</script>

<style scoped>

</style>
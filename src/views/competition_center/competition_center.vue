<template>
  <mobile_competiotion_center v-if="isMobile"></mobile_competiotion_center>
  <pc_competition_center></pc_competition_center>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_competiotion_center from "./mobile/mobile_competiotion_center";
import pc_competition_center from "./pc/pc_competition_center";

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
}
</script>

<style scoped>

</style>
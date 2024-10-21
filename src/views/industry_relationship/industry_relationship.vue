<template>
  <mobile_industry_relationship v-if="isMobile"></mobile_industry_relationship>
  <pc_industry_relationship v-else></pc_industry_relationship>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import pc_industry_relationship from "./pc/pc_industry_relationship";
import mobile_industry_relationship from "./mobile/mobile_industry_relationship";

export default {
  name: "industry_relationship",
  components: {mobile_industry_relationship, pc_industry_relationship},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },

}
</script>

<style scoped>

</style>
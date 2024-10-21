<template>
  <mobile_activity2045 v-if="isMobile"></mobile_activity2045>
  <pc_activity2045 v-else></pc_activity2045>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import pc_activity2045 from "./pc/pc_activity2045";
import mobile_activity2045 from "./mobile/mobile_activity2045";

export default {
  name: "activity2045",
  components:{pc_activity2045,mobile_activity2045},
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
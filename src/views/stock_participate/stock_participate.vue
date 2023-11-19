<template>
  <mobile_stock_participate v-if="isMobile"></mobile_stock_participate>
  <pc_stock_participate v-else></pc_stock_participate>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import pc_stock_participate from "./pc/pc_stock_participate";
import mobile_stock_participate from "./mobile/mobile_stock_participate";
// import {useStore} from "vuex";

export default {
  name: "stock_participate",
  components:{pc_stock_participate,mobile_stock_participate},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
}
</script>

<style scoped>

</style>
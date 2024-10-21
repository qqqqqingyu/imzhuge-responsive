<template>
  <mobile_stock_transaction v-if="isMobile"></mobile_stock_transaction>
  <pc_stock_transaction v-else></pc_stock_transaction>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import pc_stock_transaction from "./pc/pc_stock_transaction";
import mobile_stock_transaction from "./mobile/mobile_stock_transaction";

export default {
  name: "stock_transaction",
  components:{pc_stock_transaction,mobile_stock_transaction},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
}
</script>

<style scoped>

</style>
<template>
  <mobile_transaction v-if="isMobile"></mobile_transaction>
  <pc_transaction v-else></pc_transaction>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_transaction from "./mobile/mobile_transaction";
import pc_transaction from "./pc/pc_transaction";
export default {
  name: "transaction",
  components: {pc_transaction, mobile_transaction},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
}
</script>

<style scoped>

</style>
<template>
  <mobile_competition_transaction v-if="isMobile"></mobile_competition_transaction>
  <pc_competition_transaction v-else></pc_competition_transaction>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_competition_transaction from "./mobile/mobile_competition_transaction";
import pc_competition_transaction from "./pc/pc_competition_transaction";
// import {useStore} from "vuex";

export default {
  name: "competition_transaction",
  components: {pc_competition_transaction, mobile_competition_transaction},
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
  mounted() {
    // 获取的数据要进行很多转化，故这里先不使用vuex
    // const store = useStore()
    // 触发数据获取动作
    // store.dispatch('eventList/useCompetitionDetailData')
  },
}
</script>

<style scoped>

</style>
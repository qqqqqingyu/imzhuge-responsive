<template>
  <mobile_competition_translation v-if="isMobile"></mobile_competition_translation>
  <pc_competition_translation></pc_competition_translation>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_competition_translation from "./mobile/mobile_competition_translation";
import pc_competition_translation from "./pc/pc_competition_translation";
import {useStore} from "vuex";

export default {
  name: "competition_translation",
  components: {pc_competition_translation, mobile_competition_translation},
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
    const store = useStore()
    // 触发数据获取动作
    store.dispatch('eventList/useCompetitionDetailData')
  },
}
</script>

<style scoped>

</style>
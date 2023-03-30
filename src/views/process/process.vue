<template>
  <mobile_process v-if="isMobile"></mobile_process>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_process from "./mobile/mobile_process";
export default {
  name: "process",
  components: {mobile_process},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
  methods: {
    isMobileTerminal() {
      isMobileTerminal();
    },
  }
}
</script>

<style scoped>

</style>
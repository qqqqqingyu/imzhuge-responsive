<template>
  <mobile_personal_info v-if="isMobile"></mobile_personal_info>
  <pc_personal_info v-else></pc_personal_info>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_personal_info from "./mobile/mobile_personal_info";
import pc_personal_info from "./pc/pc_personal_info";
export default {
  name: "personal_info",
  components: {pc_personal_info, mobile_personal_info},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    isMobileTerminal() {
      isMobileTerminal();
    },
  }
}
</script>

<style scoped>

</style>
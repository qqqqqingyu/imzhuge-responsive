<template>
  <mobileNavigation v-if="isMobile"></mobileNavigation>
  <pcNavigation v-else></pcNavigation>
</template>

<script>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigation from './mobile/mobileNavigation.vue'
import pcNavigation from './pc/pcNavigation.vue'


export default {
  name: "navigation",
  components: {mobileNavigation, pcNavigation},
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

  },
}



</script>

<style scoped></style>

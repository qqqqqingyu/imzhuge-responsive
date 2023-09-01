<template>
  <mobile_personal_info v-if="isMobile"></mobile_personal_info>
  <pc_personal_info v-else></pc_personal_info>
</template>

<script>
import { isMobileTerminal }  from '@/utils/flexible'
import mobile_personal_info from "./mobile/mobile_personal_info";
import pc_personal_info from "./pc/pc_personal_info";
import {useStore} from "vuex";
export default {
  name: "personal_info",
  components: {pc_personal_info, mobile_personal_info},
  data(){
    return{
      isMobile:isMobileTerminal.value
    }
  },
  mounted() {
    const store = useStore()
    //触发 category 数据获取动作
    store.dispatch('myInfoDetails/useMyInfoDetailsData')
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
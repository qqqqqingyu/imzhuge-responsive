<!--没写全，按照其他的补充完整-->
<template>
  <pc_competition_details></pc_competition_details>
</template>

<script>
import {useStore} from "vuex";
import pc_competition_details from "./pc/pc_competition_details";

export default {
  name: "competition_details",
  components: {pc_competition_details},
  data(){
    return{
      id:this.$route.query.eventId
    }
  },
  mounted() {
    const store = useStore()
    // 触发数据获取动作
    store.dispatch('eventList/useEventData',this.eventId)
  },
}
</script>

<style scoped>

</style>
<template>
  <el-row>
<!--    导航栏-->
    <TheNav :current-page="'competition'"></TheNav>
<!--    赛事中心页面已写好路由，可以在页面中显示。-->
<!--    背景、面包屑导航栏、各模块的白色背景看着笔记试一下-->
<!--    项目已引入element-plus，可以直接用-->
<!--    {{event_list}}-->
  </el-row>
</template>

<script>
import {getCSRFToken} from '@/api/token'
import TheNav from "../../../components/TheNav";
import {getEventList} from "../../../api/competition";

export default {
  name: "pc_competition_center",
  components: {TheNav},
  computed: {
    event_list() {
      return this.$store.getters.eventList
    },
    competition_event() {
      return this.$store.getters.event
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
    getEventList().then((res)=>{
      console.log('res'+res)
    })
    .catch((res) => {
      console.log('错误'+res);
    });
  },
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
  }
}
</script>

<style scoped>

</style>
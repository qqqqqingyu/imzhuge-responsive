<template>
  <el-row>
<!--    导航栏-->
    <TheNav :current-page="'competition'"></TheNav>
<!--    赛事中心页面已写好路由，可以在页面中显示。-->
<!--    背景、面包屑导航栏、各模块的白色背景看着笔记试一下-->
<!--    项目已引入element-plus，可以直接用-->

<!--    进入比赛详情的测试超链接-->
    <router-link :to="{path:'/competition_details',query:{eventId:3}}" style="margin-top: 100px">
      查看详情
    </router-link>

  </el-row>
</template>

<script>
import {getCSRFToken} from '@/api/token'
import TheNav from "../../../components/TheNav";

export default {
  name: "pc_competition_center",
  components: {TheNav},
  computed: {
    event_list() {
      return this.$store.getters.eventList
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
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
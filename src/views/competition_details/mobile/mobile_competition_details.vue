<!-- 比赛详情 -->
<template>
  <div class="container">
    <el-row style="margin-top: 20px">
      <el-col :span="1" :offset="1">
        <router-link to="/">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
          比赛详情
        </el-row>
      </el-col>
    </el-row>

  </div>
  <bottom-nav></bottom-nav>
</template>

<script>
import bottomNav from "../../../components/bottomNav";

export default {
  name: "mobile_competition_details",
  components:{bottomNav},

  methods:{
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#F5F8FA')
    });
  }
}
</script>

<style scoped>

</style>
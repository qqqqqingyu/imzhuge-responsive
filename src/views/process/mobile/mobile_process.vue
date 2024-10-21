<template>
  <el-row>
    <el-col>
      <img src="../../../assets/images/process.jpg" class="my-img" alt="流程">
    </el-col>
    <el-col style="margin-bottom: 20px;text-align: center">
      <el-button type="danger" plain round @click="toHome">返回首页</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "mobile_process",
  methods:{
    toHome(){
      this.$router.push({
        path:'/',
      })
    }
  }
}
</script>

<style scoped>
.my-img{
  width: 100%;
  margin-bottom: 20px;
}
</style>
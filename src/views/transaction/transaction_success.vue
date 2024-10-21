<template>
  <mobile_transaction v-if="isMobile"></mobile_transaction>
  <pc_transaction v-else>
    <!--    导航栏-->
    <TheNav :current-page="'help'"></TheNav>
    <el-row style="padding-top: 80px">
      <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
        您当前的位置：
        <router-link to="/help_center">帮助中心</router-link>
        <img src="@/assets/images/right.svg" alt="下级" height="25">
        <span class="cur-de">模拟交易</span>
      </el-col>
    </el-row>
  </pc_transaction>
  

  
  <el-row class="center">
    <el-col style="margin-top: 120px;margin-bottom: 15px">
      <img src="@/assets/images/transaction_success.svg" height="170" alt="成功">
    </el-col>
    <el-col style="font-size: 15px;color: #606266">
      交易成功
    </el-col>
    <el-col>
      <button class="btn-gradient red btn-gradient hand"
      @click="$router.push({path:'/result',query:{user_choice:choice}})">点击查看结果</button>
    </el-col>
  </el-row>
</template>

<script>
import TheNav from "../../components/TheNav";
import { isMobileTerminal }  from '@/utils/flexible';

export default {
  name: "transaction_success",
  components: {TheNav},
  data(){
    return{
      choice:this.$route.query.user_choice,
      isMobile:isMobileTerminal.value
    }
  }
}
</script>

<style scoped>
.btn-gradient {
  margin-top: 40px;
  text-decoration: none;
  color: white;
  padding: 10px 30px;
  display: inline-block;
  position: relative;
  border: 1px solid rgba(0,0,0,0.21);
  border-bottom: 4px solid rgba(0,0,0,0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
}
.btn-gradient.red{
  background: #ffaa25;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#ef9c19), to(#ffaa25));
  background: -webkit-linear-gradient(#ef9c19, #f39f1c, #f7a31f, #fba622, #ffaa25 100%);
  background: -moz-linear-gradient(#ef9c19, #f39f1c, #f7a31f, #fba622, #ffaa25 100%);
  background: -o-linear-gradient(#ef9c19, #f39f1c, #f7a31f, #fba622, #ffaa25 100%);
  background-image: linear-gradient(to right top, #ef9c19, #f39f1c, #f7a31f, #fba622, #ffaa25);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fa5a5a', endColorstr='#e85151', GradientType=0 );
}
</style>
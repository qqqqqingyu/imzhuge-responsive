<template>
  <el-container class="container">

    <!--header开始-->
    <el-header class="header" height="120px">
      <myheader></myheader>
    </el-header>
    <!--header结束-->

    <el-container>
      <!--aside开始-->
      <el-aside class="aside">
        <myaside></myaside>
      </el-aside>
      <!--aside结束-->

      <el-main class="main">
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 15px">
              <el-breadcrumb-item>您当前的位置：</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/MonthlyForecast_introduce' }">行业收益率周度预测</el-breadcrumb-item>
              <el-breadcrumb-item>xxx产业链</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="box1" :span="6">标题：xx产业链收益率分析</el-col>
        </el-row>
        <el-row>
          <el-col class="box1" :span="2" :offset="1" style="background-color: yellow;margin-top: 20px">整体情况</el-col>
        </el-row>
        <el-row>
          <el-col>

          </el-col>
        </el-row>

        <div class="box1" style="top: 200px; background-color: yellow">
          产业链图
        </div>
        <div class="box1" style="top: 850px; background-color: yellow">
          产业链收益率区间预测热力图
        </div>
        <div class="box1" style="top: 1500px; background-color: yellow">
          产业链收益率区间历史走势对比图
        </div>
        <div class="box2">
          产业链图
        </div>
        <div class="box3">
          产业链收益率区间预测热力图
        </div>
        <div class="box4">
          产业链收益率历史走势对比图<br>筛选：
          <el-radio v-model="radio" label="1">按行业平均</el-radio>
          <el-radio v-model="radio" label="2">按行业龙头</el-radio>
        </div>
        <div class="box5">
          <router-link to="/MonthlyForecast_share">去行业个股收益率预测查看更多内容>></router-link>
          <br>
          <router-link to="/MonthlyForecast_industrialchain">回到产业链列表>></router-link>
        </div>


      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import Myheader from "../components/myheader";
import myaside from "../components/myaside";

export default {
  name: "MonthlyForecast_details1",
  components: {Myheader, myaside},
}
</script>

<style scoped>

.container {
  height: 100%;
  width: 100%;
}

.header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.aside {
  text-align: left;
  line-height: 200px;
  height: 100%;
}

.main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 50px;
  position: relative;
}

.box1 {
  height: 35px;
  margin-top: 40px;
  background-color: #2F8FE0;
  text-align: left;
}

.box2 {
  top: 550px;
  width: 70%;
  height: 500px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
}

.box3 {
  top: 1200px;
  width: 70%;
  height: 500px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
}

.box4 {
  top: 1850px;
  width: 70%;
  height: 500px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
}

.box5 {
  width: 300px;
  height: 100px;
  position: absolute;
  top: 2200px;
  right: 50px;
  text-align: left;
  /*border: 2px solid black;*/
}


body > .el-container {
  /*margin-bottom: 40px;*/
  margin-bottom: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
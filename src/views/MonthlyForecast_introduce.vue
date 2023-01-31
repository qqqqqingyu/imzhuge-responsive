<template>
  <el-container class="container">

    <!--header开始-->
    <el-header class="header" height="120px">
      <myheader></myheader>
    </el-header>
    <!--header结束-->
    <el-container>
      <el-aside class="aside">
        <myaside></myaside>
      </el-aside>

      <el-main class="main">
        <el-row class="box2">
          <el-col :span="24">
            <div class="box1">
              <h1 style="color: #F56C6C;text-align: center;font-size: 40px" >周度收益率预测介绍</h1>
              <p style="margin-top: 20px">
              <h3 style="color: #E6A23C">市场规则：LMSR</h3>
              <p>预测任务：预测每个细分行业个股收盘价周度收益率（环比增长百分比）是否位于本行业第一名。</p>

              <p>预测周期：每周第一个交易日开始，到该周最后一个交易日，预测该周的收益率：即该周最后一个交易日收盘价相对上周最后一个交易日的增长率。</p>
              </p>

            </div>

          </el-col>
        </el-row>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import Myheader from "../components/myheader";
import myaside from "../components/myaside";
export default {
  name: "MonthlyForecast_introduce",
  components: {Myheader, myaside},
}
</script>

<style scoped>

.container{
  height: 100%;
  width: 100%;
}

.header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/*超链接样式，取消下划线，改颜色*/
a {
  text-decoration: none;
  color: #3E4756;
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
  line-height: 40px;
  height:100%
}
.box1{
  border: 1px solid #9EA9B1;
  height:100%;
  padding: 10px;
}


.box1 p{
  text-align: left;
  text-indent:2em;
  line-height:30px;
  margin-bottom:10px;
  font-size: 18px;
  color: #606266;
}
.box2{
  height:100%;
}
h3{
  margin-bottom: 10px;
}
h4{
  margin-bottom: 10px;
}
h5{
  margin-bottom: 10px;
}
body > .el-container {
  margin-bottom: 100%;
  height: 100%;
}


.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
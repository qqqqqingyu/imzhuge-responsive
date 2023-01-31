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
        <iframe id="lmsr" name="iframeContain" width="100%" height="100%" seamless scrolling="yes" :src="lmsrUrl"
                style=" border: 1px solid #9EA9B1;">

        </iframe>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import config from '@/config'
import Myheader from "../components/myheader";
import myaside from "../components/myaside";
export default {
  components: {Myheader, myaside},
  data() {
    return {
      lmsrUrl : config.serverUrl + "/startactivity/"
      /*lmsrUrl : "http://127.0.0.1:8080/#/CDA_PublishActivity"*/
    }
  },
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
  line-height: 50px;
  position: relative;
}
.box1{
  margin-top: 50px;
  text-align: left;
  padding: 2%;
  border: #DCDCDC 1px solid;
}

.submit{
  margin-top: 10%;
  margin-left: 45%;
  text-align: center;
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
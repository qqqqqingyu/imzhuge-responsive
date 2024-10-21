<template>
  <a href="/" class="logobox" title="嗨皮诸葛"><img src="../assets/images/logo.png" alt="嗨皮诸葛"/></a>
  <div>
    <el-row>
      <el-col :span="18">
        <el-row class="headnav" >
          <el-col :span="23" :offset="1" class="hnav"><router-link to="/">首页</router-link></el-col >
          <el-col :span="23" :offset="1">
            <input class="user-input" type="text" name="search" placeholder="请输入内容">
            <input class="user-btn" type="button" value="搜索">
          </el-col>
        </el-row>
      </el-col>
      <div class="top_right">
        <el-button v-on:click="toMy">我的</el-button>
        <el-button>财富</el-button>
        <el-button>提现</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import {
  getCSRFToken
} from '@/api/token'
export default {
  name: "myheader",
  mounted() {
    this.getCSRFTokenMethod()
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    toMy(){
      this.$router.push({
        path:'/personal_center',
      })
    }
  }
}
</script>

<style scoped>
.logobox{
  background: #ff867e;
  position: absolute;
  left: 0px;
  width: 260px;
  padding: 20px;
}

/*header样式开始*/
.headnav {
  padding-left: 280px;
  top: 0;
}
.hnav{
  text-align: left;
}
.headnav a {
  padding-bottom: 4px;
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none; /*去下划线*/
}
/*设置点击后的样式 */
.router-link-active {
  text-decoration: none;
  color: dodgerblue;
}
.user-input {
  width: 80%;
  margin-right: 3%;
  height: 40px;
  border: 1px solid #909399;;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  text-indent: 10px;
}
.user-btn {
  width: 17%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background:  #ff867e;
  vertical-align: middle;
  outline: none;
  color: white;
  font-size: 20px;
}
.top_right{
  position: absolute;
  right: 0px;
  top: 18px;
  width: 260px;
  z-index: 1;
}
/*header样式结束*/

</style>
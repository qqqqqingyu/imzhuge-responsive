<template>
  <div class="bottom-nav">
    <el-row style="justify-content: center">
      <el-col :span="3">
        <router-link to="/">
          <el-row style="justify-content: center;font-size: 25px">
            <i class="el-icon-s-home"></i>
          </el-row>
          <el-row style="justify-content: center;">
            <span>首页</span>
          </el-row>
        </router-link>
      </el-col>
      <el-col :span="3" :offset="8">
        <router-link to="/personal_center">
          <el-row style="justify-content: center;font-size: 25px">
            <i class="el-icon-user-solid"></i>
          </el-row>
          <el-row style="justify-content: center;">
            <span>我的</span>
          </el-row>
        </router-link>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import {
  getCSRFToken
} from '@/api/token'
export default {
  name: "bottomNav",
  mounted() {
    this.getCSRFTokenMethod()
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    }
  }

}
</script>

<style scoped>
.bottom-nav{
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
/*超链接样式，取消下划线，改颜色*/
.bottom-nav a {
  text-decoration: none;
  color: #7f7f7f;
}
.bottom-nav span{
  font-weight: bold;
  font-size: 14px;
}
/*设置点击后的样式 */
.router-link-exact-active.router-link-active {
  text-decoration: none;
  color: #ff867e;
}
</style>
<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="row-bg">
        <el-space :size="20" class="full">
          <img src="../assets/logo.svg" id="logo" alt="logo"/>
          {{ msg }}
        </el-space>
        <div class="nav">
          <el-space :size="50">
            <router-link to="/MainPage">
            {{ mainPage }}
            </router-link>
          </el-space>

          <el-space>
            {{ settings }}
<!--            <router-link to="/Classify">-->
<!--              {{ settings }}-->
<!--            </router-link>-->
          </el-space>
        </div>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
import {
  getCSRFToken
} from '@/api/token'
export default {
  name: 'Header',

  props: {
    msg: String,
    mainPage: String,
    settings: String
  },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #e3f2fd;
  color: #007bff;;
  line-height: 60px;
  height: 100px!important;
  font-size: xx-large;
  font-weight: bold;
  width: 100%;
}

.nav {
  color: #007bff;;
  line-height: 100px;
  font-size: large;
  font-weight: bold;
  text-align: center;
}

#logo {
  height: 100px;
}

body > .el-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  height: 100%;
}

.full {
  flex: 1;
}

</style>

<template>
<!--导航栏子组件-->
  <el-row class="my-nav-bar nav-pos nav-bg">
    <el-col :span="4" :offset="2">
      <a href="https://www.imzhuge.com/" title="嗨皮诸葛" style="margin-left: 2.5%">
        <img src="@/assets/images/logo.png" alt="嗨皮诸葛" height="40"/>
      </a>
    </el-col>
    <el-col :span="16" style="position: relative">
      <ul class="my-nav">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/weekly_forecast" :class="{'navcurr': currentPage === 'typical'}">典型应用</router-link>
        </li>
        <li>
          <router-link to="/competition_center" :class="{'navcurr': currentPage === 'competition'}">赛事中心</router-link>
        </li>

        <li v-if="!loginStatus"><a v-on:click="homelogin" class="navregbtn"
                                   style=" visibility: visible;">登录</a>
        </li>
        <li v-else>
          <router-link to="/personal_center" :class="{'navcurr': currentPage === 'personal'}">个人中心</router-link>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
import config from '@/config'

export default {
  name: "TheNav",
  props: ['currentPage'],
  computed:{
    // 登录状态
    loginStatus() {
      return this.$store.getters.loginStatus
    }
  },
  methods:{
    //登录
    homelogin() {
      window.location.href = config.serverUrl+'/login?from_server=new'
    },
  }
}
</script>

<style scoped>
a.navregbtn {
  color: rgb(239, 156, 25);
  padding: 0;
  background: #fff;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: block;
  border-radius: 20px;
  animation-name: pulse;
  font-weight: bold;
}

a.navregbtn:hover {
  color: rgb(234, 176, 85);
  border-bottom: none;
}
</style>
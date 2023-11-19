<template>
  <!--    导航栏开始-->
  <el-row class="my-nav-bar nav-pos" :style="headStyle">
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
          <el-popover
              placement="top-start"
              trigger="hover"
          >
            <template #reference>
              <router-link to="" style="cursor: default">典型应用</router-link>
            </template>
            <router-link class="popover-link" to="/weekly_forecast">企业收益率排序预测</router-link>
            <div class="expect">敬请期待</div>
          </el-popover>
        </li>
        <li>
          <router-link to="/competition_center">赛事中心</router-link>
        </li>
        <li>
          <router-link to="/help_center" class="navcurr">帮助中心</router-link>
        </li>
        <li v-if="!loginStatus"><a v-on:click="homelogin" class="navregbtn"
                                   style=" visibility: visible;">登录</a>
        </li>
        <li v-else>
          <el-popover
              placement="top-start"
              trigger="hover"
          >
            <template #reference>
              <a style="cursor: default">
                <span>个人中心</span>
              </a>
            </template>
            <div class="my-line">
              <div class="center-vertically">
                <img src="@/assets/images/user-yellow.svg" height="23" class="my-icon">
                {{userName}}
              </div>
              <el-divider></el-divider>
            </div>
            <router-link class="popover-link" to="/personal_center">我参与的</router-link>
            <router-link class="popover-link" to="/pc_personal_info">个人信息</router-link>
          </el-popover>
        </li>
      </ul>
    </el-col>
  </el-row>
  <!--    导航栏结束-->

  <!--    banner开始-->
  <el-row>
    <el-col class="my-banner">
      <h1>嗨皮诸葛帮助中心</h1>
    </el-col>
  </el-row>
  <!--    banner结束-->
</template>

<script>
import {useStore} from "vuex";
import config from '@/config'

export default {
  name: "pc_help_center",
  data(){
    return{
      userName:''
    }
  },
  computed:{
    // 登录状态
    loginStatus() {
      return this.$store.getters.loginStatus
    }
  },
  mounted() {
    this.getName()
  },
  methods:{
    //登录
    homelogin() {
      window.location.href = config.serverUrl+'/login?from_server=new'
    },
    getName(){
      if(this.loginStatus == true){
        const store = useStore()
        //触发数据获取动作，调用相应接口会自动跳转登录
        store.dispatch('myInfoDetails/useMyInfoDetailsData')
        this.userName = this.$store.getters.myInfoDetails.username
      }
    }
  }
}
</script>

<style scoped>
.my-banner {
  height: 200px;
  padding-top: 90px;
  text-align: center;
  background-image: url('../../../assets/images/yellow_banner.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 100%;
}

.my-banner h1{
  font-size: 35px;
  color: #FFFFFF;
  font-weight: 400;
  font-style: normal;
}

/*导航栏登录按钮*/
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
  cursor: pointer;
}

a.navregbtn:hover {
  color: rgb(234, 176, 85);
  border-bottom: none;
}
</style>
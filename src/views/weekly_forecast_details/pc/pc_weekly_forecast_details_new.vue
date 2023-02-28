<template>
  <div>
    <!--    导航栏开始-->
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
            <router-link to="/">典型应用</router-link>
          </li>
          <li>
            <router-link to="/personal_center" class="navcurr">个人中心</router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!--    导航栏结束-->

    <el-row style="margin-top: 54px">
      <el-col :span="20" :offset="2" >
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 15px">
          <el-breadcrumb-item>您当前的位置：</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/weekly_forecast' }">行业个股收益率预测</el-breadcrumb-item>
          <el-breadcrumb-item>
<!--            {{industryDetailData.industry}}-->
            行业个股收益率预测</el-breadcrumb-item>
        </el-breadcrumb>
        哈哈哈哈
      </el-col>

      <el-col :span="24" class="pc-card">
        <el-row>

        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "pc_weekly_forecast_details",
  data() {
    return {
      // 导航栏样式
      headStyle: {
        background: "rgba(255, 255, 255, 0)",
        color: "rgba(255, 255, 255, 1)",
      },
    }
  },
  methods:{

  }

}
</script>

<style scoped>
/*部分导航栏样式在responsive_style.css中*/
.container{
  height: 100%;
  width: 100%;
}

.nav-bg{
  background-image: linear-gradient(to right, #f59a23, #fe8d46, #ff8461, #f98079, #ec808d);
}
</style>
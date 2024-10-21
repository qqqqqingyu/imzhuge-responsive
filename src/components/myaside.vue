<template>
  <el-menu>
    <el-menu  :default-openeds="menuIndex" @open="handleOpen" @close="handleClose" unique-opened>

      <router-link to="/">
        <el-menu-item index="0">
          <template  v-slot:title="title"><span><i class="el-icon-s-home"></i>首页</span></template>
        </el-menu-item>
      </router-link>


      <!--      <el-submenu index="1">-->
      <!--        <template  v-slot:title="title"><router-link to="/LMSR"><i class="el-icon-message"></i><span>LMSR</span></router-link></template>-->
      <!--        <el-menu-item-group>-->
      <!--          <router-link to="/LMSR_PublishActivity" ><el-menu-item index="1-1"><span>发布活动</span></el-menu-item></router-link>-->
      <!--          <router-link to="/LMSR_EventSquare" ><el-menu-item index="1-2"><span>活动广场</span></el-menu-item></router-link>-->
      <!--          <router-link to="/LMSR_MyEvent"><el-menu-item index="1-3"><span>我发起的活动</span></el-menu-item></router-link>-->
      <!--        </el-menu-item-group>-->
      <!--      </el-submenu>-->

      <!--      <el-submenu index="2">-->
      <!--        <template  v-slot:title="title"><router-link to="/CDA_home" ><span><i class="el-icon-menu"></i>CDA</span></router-link></template>-->
      <!--        <el-menu-item-group >-->
      <!--          <router-link to="/CDA_PublishActivity"><el-menu-item index="2-1" ><span>发布活动</span></el-menu-item></router-link>-->
      <!--          <router-link to="/CDA_EventSquare"><el-menu-item index="2-2"><span>活动广场</span></el-menu-item></router-link>-->
      <!--          <router-link to="/CDA_MyEvent"><el-menu-item index="2-3"><span>我发起的活动</span></el-menu-item></router-link>-->
      <!--        </el-menu-item-group>-->
      <!--      </el-submenu>-->
      <el-submenu index="3">
        <template  v-slot:title="title"><router-link to="/weekly_forecast" ><span><i class="el-icon-setting"></i>行业收益率周度预测</span></router-link></template>
        <el-menu-item-group >
          <router-link to="/weekly_forecast_transaction"><el-menu-item index="3-1"><span>行业个股收益率预测</span></el-menu-item></router-link>
          <!--          <router-link to="/MonthlyForecast_industrialchain"><el-menu-item index="3-2"><span>产业链分析</span></el-menu-item></router-link>-->
        </el-menu-item-group>
      </el-submenu>
      <!--      <el-submenu index="3">
              <template  v-slot:title="title"><i class="el-icon-setting"></i><router-link to="/MonthlyForecast_introduce">周度收益率预测</router-link></template>
              <el-submenu index="3-1">
                <template v-slot:title="title"><router-link to="/MonthlyForecast_share">行业个股收益率预测</router-link></template>
                <el-menu-item index="3-1-1"><router-link to="/MonthlyForecast_details2">查看详情</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="3-2">
                <template v-slot:title="title"><router-link to="/MonthlyForecast_industrialchain">产业链分析</router-link></template>
                <el-menu-item index="3-2-1"><router-link to="/MonthlyForecast_details1">查看详情</router-link></el-menu-item>
              </el-submenu>
            </el-submenu>-->
    </el-menu>
  </el-menu>
</template>

<script>

export default {
  name: "myaside",
  data() {
    return {
      menuIndex: []
    }
  },
  beforeMount () {
    this.getMenuIndex()
  },
  methods: {
    getMenuIndex () {
      let vm = this;
      let tempMenuIndex = localStorage.getItem('menuIndex');
      if (tempMenuIndex === null  || tempMenuIndex === undefined || tempMenuIndex === '') {
        localStorage.setItem('menuIndex', ",1");
        vm.menuIndex = ['1']

      } else {
        tempMenuIndex = tempMenuIndex.substring(tempMenuIndex.length-1, tempMenuIndex.length);
        vm.menuIndex = tempMenuIndex.split(",");

      }
    },
    handleOpen(key) {
      let tempMenuIndex = localStorage.getItem('menuIndex');
      if (tempMenuIndex === null  || tempMenuIndex === undefined || tempMenuIndex === '') {
        localStorage.setItem('menuIndex', "," + key);
      } else {
        localStorage.setItem('menuIndex', tempMenuIndex + "," + key);
      }

    },
    handleClose(key) {
      let tempMenuIndex = localStorage.getItem('menuIndex');
      if (tempMenuIndex !== null  && tempMenuIndex !== undefined && tempMenuIndex !== '') {
        localStorage.setItem('menuIndex', tempMenuIndex.replace("," + key, ""));
      }
    }
  }
}


</script>

<style scoped>
/*超链接样式，取消下划线，改颜色*/
a {
  text-decoration: none;
  color: #3E4756;
}
/*设置点击后的样式 */
.router-link-exact-active.router-link-active span{
  text-decoration: none;
  color: #F56C6C;
  font-size: larger;
}
.el-submenu :hover{
  text-decoration: none;
  color: #CE4A4E;
}

</style>
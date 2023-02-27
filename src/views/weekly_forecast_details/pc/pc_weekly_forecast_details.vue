<template>
  <el-container class="container">
    <!--    导航栏开始-->
    <el-row class="pgw my-bar nav-pos" :style="headStyle">
      <el-col :span="4" :offset="2">
        <a href="https://www.imzhuge.com/" title="嗨皮诸葛" style="margin-left: 2.5%">
          <img src="@/assets/images/logo.png" alt="嗨皮诸葛" height="40"/>
        </a>
      </el-col>
      <el-col :span="16" style="position: relative">
        <ul class="my-nav clear">
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


  </el-container>
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
    // 滚动页面时触发导航变色
    handleScroll() {
      let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      //设置背景颜色的透明度
      if (scrollTop <= 200 && scrollTop > 0) {
        this.headStyle.background = `rgba(196,196,196,${
            scrollTop / (scrollTop + 80)
        })`;
        this.headStyle.color = `rgba(0, 0, 0,${scrollTop / (scrollTop + 80)})`;
      } else if (scrollTop > 200) {
        this.headStyle.background = `rgba(255, 134, 126,${
            scrollTop / (scrollTop + 80)
        })`;
        this.headStyle.color = `rgba(0, 0, 0,${scrollTop / (scrollTop + 80)})`;
      } else if (scrollTop == 0) {
        this.headStyle.background = "rgba(0, 0, 0, 0)";
        this.headStyle.color = "#FFFFFF";
      }
    },
  }

}
</script>

<style scoped>

.container{
  height: 100%;
  width: 100%;
}
.pgw {
  width: 100%;
  margin: 0 auto;
}

.my-bar {
  padding-top: 10px;
  position: relative;
  z-index: 1;
}

.my-nav {
  position: absolute;
  right: 0;
  z-index: 1;
}

.my-nav li {
  float: left;
  width: 140px;
  height: 40px;
  line-height: 40px;
  list-style-type: none;
  cursor: pointer
}

.my-nav li a {
  text-decoration: none;
  padding-bottom: 4px;
  color: #fff;
  font-size: 16px;
}

.my-navleft-option li a:hover {
  border-bottom: solid 2px #fff;
}


.my-nav li a.navcurr {
  border-bottom: solid 2px #fff;
}

.clear:after {
  clear: both
}

.clear:before, .clear:after {
  display: table;
  content: "";
  line-height: 0
}

.clear {
  text-align: center;
  margin: 0 auto;
  *zoom: 1
}

/*导航栏悬浮*/
.nav-pos {
  position: fixed;
  top: 0;
  z-index: 20;
}
#link-activity {
  color: #FF697B;
}
</style>
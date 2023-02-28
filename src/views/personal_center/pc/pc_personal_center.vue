<template>
  <div class="bg">
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
            <router-link to="/">典型应用</router-link>
          </li>
          <li>
            <router-link to="/personal_center" class="navcurr">个人中心</router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!--    导航栏结束-->

    <!--    banner开始-->
    <el-row class="banner">
      <el-col :span="1" :offset="3">
        <img src="@/assets/images/user.svg" height="50" alt="用户" style="display: inline-block">
      </el-col>
      <el-col :span="4">
        <h2 class="user-name">{{ userName }}</h2>
      </el-col>
      <el-col :span="1" :offset="6">
        <img src="@/assets/images/wealth.svg" height="40" alt="财富">
      </el-col>
      <el-col :span="2" class="info-box">
        <p>个人财富</p>
        <p><span class="value">{{ numFilter(myActivity.coin, 2) }}</span> <span class="unit">诸葛贝</span></p>
      </el-col>

      <el-col :span="1">
        <div class="right-line"></div>
      </el-col>

      <el-col :span="1">
        <img src="@/assets/images/transactions.svg" height="40" alt="交易次数">
      </el-col>
      <el-col :span="3" class="info-box">
        <p>交易次数</p>
        <p><span class="value">{{ myActivity.trade_times }}</span></p>
      </el-col>
    </el-row>
    <!--    banner结束-->

    <el-row>
      <!--    左部导航栏开始-->
      <el-col :span="4" :offset="2" class="pc-card left-box">
        <el-row>
          <router-link to="/pc_my_activities">
            <el-col :span="16" :offset="4" class="center-vertically left-option">
              <img id="link-activity-img" :src="activityImg" alt="活动" height="22">
              <span id="link-activity" class="left-content">我参与的活动</span>
            </el-col>
          </router-link>

          <el-col :span="24" class="bottom-line"></el-col>

          <router-link to="/pc_personal_info">
            <el-col :span="16" :offset="4" class="center-vertically left-option">
              <img :src="infoImg" alt="个人信息" height="22">
              <span id="link-info" class="left-content">个人信息</span>
            </el-col>
          </router-link>
        </el-row>
      </el-col>
      <!--      左部导航栏结束-->

      <!--      右侧内容开始-->
      <el-col :span="13" :offset="1" class="pc-card right-box">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "pc_personal_center",
  computed: {
    userName() {
      return this.$store.getters.myInfoDetails.username
    },
    myActivity() {
      return this.$store.getters.myActivity
    }
  },
  data() {
    return {
      topBannerNavBg: {
        backgroundColor: ''
      },
      activityImg: require('@/assets/images/my_activity_red.svg'),
      infoImg: require('@/assets/images/info_grey.svg'),
      // 导航栏样式
      headStyle: {
        background: "rgba(255, 255, 255, 0)",
        color: "rgba(255, 255, 255, 1)",
      },
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动

    // 初始加载时判断左侧按钮选择的样式
    let activity = document.querySelector('#link-activity');
    let info = document.querySelector('#link-info');
    if (this.$route.path === '/pc_my_activities') {
      this.activityImg = require('@/assets/images/my_activity_red.svg')
      this.infoImg = require('@/assets/images/info_grey.svg')
      activity.style.color = '#FF697B';
      info.style.color = '#555555';
    } else if (this.$route.path === '/pc_personal_info') {
      this.activityImg = require('@/assets/images/my_activity_grey.svg')
      this.infoImg = require('@/assets/images/info_red.svg')
      activity.style.color = '#555555';
      info.style.color = '#FF697B';
    }

  },
  watch: {
    // 监听左侧按钮选择的样式变化
    '$route'(to) {
      let activity = document.querySelector('#link-activity');
      let info = document.querySelector('#link-info');
      if (to.path === '/pc_my_activities') {
        this.activityImg = require('@/assets/images/my_activity_red.svg')
        this.infoImg = require('@/assets/images/info_grey.svg')
        activity.style.color = '#FF697B';
        info.style.color = '#555555';
      } else if (to.path === '/pc_personal_info') {
        this.activityImg = require('@/assets/images/my_activity_grey.svg')
        this.infoImg = require('@/assets/images/info_red.svg')
        activity.style.color = '#555555';
        info.style.color = '#FF697B';
      }
    }
  },

  methods: {
    // 保留n位小数
    numFilter(value, n) {
      return parseFloat(value).toFixed(n)
    },
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
        this.headStyle.background = `rgba(255, 134, 126,1)`;
        this.headStyle.color = `rgba(0, 0, 0,${scrollTop / (scrollTop + 80)})`;
      } else if (scrollTop == 0) {
        this.headStyle.background = "rgba(0, 0, 0, 0)";
        this.headStyle.color = "#FFFFFF";
      }
    },
  },
  // 滚动之前重置
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
/*部分导航栏样式在responsive_style.css中*/

.bg {
  background: rgb(251, 251, 251);
}

.banner {
  height: 200px;
  background-image: url("../../../assets/images/personal_center_banner.jpg");
  background-size: cover;
  padding-top: 90px;
}

.user-name {
  color: #FFFFFF;
  line-height: 50px;
  margin-left: 10%;
  font-size: 28px;
}

.info-box {
  padding-left: 1%;
  color: #FFFFFF;
  line-height: 25px;
  transform: translateY(-5%);
}

.info-box p {
  font-size: 16px;
}

.value {
  font-weight: bolder;
  font-size: 20px;
}

.unit {
  font-size: 12px;
  margin-left: 3%;
}

.right-line {
  border-right: solid 1px #fff;
  height: 50px;
  width: 50%;
}

.left-content {
  font-size: 16px;
  font-weight: bolder;
  margin-left: 10px;
  color: #555555;
}

.center-vertically {
  display: flex;
  align-items: center;
  vertical-align: middle;
}

.left-option {
  padding: 15px 0;
}

.bottom-line {
  height: 1px;
  background: rgb(252, 252, 252);
}

.left-box {
  height: 104px;
}

.left-box a {
  width: 100%;
  border-radius: 10px;
}

.left-box a:hover {
  background: rgba(242, 242, 242, 0.5);
}

.right-box {
  padding-top: 15px;
  padding-bottom: 30px;
  padding-right: 2%;
}

#link-activity {
  color: #FF697B;
}
</style>
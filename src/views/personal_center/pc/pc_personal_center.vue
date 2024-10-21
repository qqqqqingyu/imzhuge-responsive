<template>
  <div class="bg" :style="{ minHeight: screenHeight + 'px' }">
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
                <router-link to="" style="cursor: default">实验场景</router-link>
              </template>
              <router-link class="popover-link" to="/weekly_forecast">企业收益率排序预测</router-link>
              <div class="expect">敬请期待</div>
            </el-popover>
          </li>
          <li>
            <router-link to="/competition_center">赛事中心</router-link>
          </li>
          <li>
            <router-link to="/help_center" >帮助中心</router-link>
          </li>
          <li>
            <el-popover
                placement="top-start"
                trigger="hover"
            >
              <template #reference>
                <a class="navcurr cur-de">个人中心</a>
              </template>
              <div class="my-line">
                <div class="center-vertically">
                  <img src="@/assets/images/user-yellow.svg" height="23" class="my-icon">
                  {{ userName }}
                </div>
                <el-divider></el-divider>
              </div>
              <router-link class="popover-link" to="/personal_center">我参与的</router-link>
              <router-link class="popover-link" to="/pc_personal_info">个人信息</router-link>
              <router-link class="popover-link" to="/pc_competition_subscribe">比赛订阅</router-link>
            </el-popover>
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
      <el-col :span="3" class="info-box right-line">
        <p class="center-vertically">
          <span>个人积分</span>
          <!-- <button class="cash-withdrawal-btn" v-on:click="toWithdraw">提现</button> -->
        </p>
        <p><span class="value">{{ numFilter(myActivity.coin, 2) }}</span> <span class="unit">诸葛贝</span></p>
      </el-col>

      <el-col :span="1" style="padding-left: 3%">
        <img src="@/assets/images/transactions.svg" height="40" alt="交易次数">
      </el-col>
      <el-col :span="3" class="info-box" style="padding-left: 4%;">
        <p>参与次数</p>
        <p><span class="value">{{ myActivity.trade_times }}</span></p>
      </el-col>
    </el-row>
    <!--    banner结束-->

    <el-row>
      <!--    左部导航栏开始-->
      <el-col :span="4" :offset="2" class="pc-card left-box">
        <el-row>
            <el-col :span="17" :offset="3" class="center-vertically left-option">
              <img id="link-my-img" :src="activityImg" alt="活动" width="21">
              <span id="link-my" class="left-content">我参与的</span>
            </el-col>
<!--            <el-col :span="1" style="margin-top: 16px" @click="setLeftOpen" v-if="leftOpen">-->
<!--              <img class="hand" :src="require('@/assets/images/arrdn.svg')" alt="down-arrow" height="9">-->
<!--            </el-col>-->
<!--            <el-col :span="1" style="margin-top: 16px" @click="setLeftOpen" v-else>-->
<!--              <img class="hand" :src="require('@/assets/images/arrdn.svg')" alt="down-arrow" height="9"-->
<!--                   style="transform: rotate(180deg)">-->
<!--            </el-col>-->

          <router-link to="/pc_competition" v-if="leftOpen">
            <el-col :span="16" :offset="3" class="center-vertically left-option">
              <span id="link-competition" class="child-title">公开比赛</span>
            </el-col>
          </router-link>

          <router-link to="/pc_industry_list" v-if="leftOpen">
            <el-col :span="21" :offset="3" class="center-vertically left-option">
              <span id="link-stock" class="child-title">行业个股收益率预测</span>
            </el-col>
          </router-link>

          <!-- 特邀比赛 -->
          <router-link to="/pc_invited_event" v-if="leftOpen">
            <el-col :span="16" :offset="3" class="center-vertically left-option">
              <span id="link-invited" class="child-title">特邀比赛</span>
            </el-col>
          </router-link>

          <el-col :span="24" class="bottom-line"></el-col>

          <router-link to="/pc_personal_info">
            <el-col :span="16" :offset="3" class="center-vertically left-option">
              <img :src="infoImg" alt="个人信息" width="21">
              <span id="link-info" class="left-content">个人信息</span>
            </el-col>
          </router-link>

          <router-link to="/pc_competition_subscribe">
            <el-col :span="16" :offset="3" class="center-vertically left-option">
              <img :src="subImg" alt="比赛订阅" width="21">
              <span id="link-sub" class="left-content">比赛订阅</span>
            </el-col>
          </router-link>
          
        </el-row>
      </el-col>
      <!--      左部导航栏结束-->

      <!--      右侧内容开始-->
      <el-col :span="15" :offset="1" class="pc-card right-box"  :style="{ minHeight: screenHeight-260 + 'px' }">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getCSRFToken} from '../../../api/token'
import config from '@/config'
import { mapActions } from 'vuex'
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
      isSubscribe: null,
      topBannerNavBg: {
        backgroundColor: ''
      },
      activityImg: require('@/assets/images/my_activity_yellow.svg'),
      infoImg: require('@/assets/images/info_grey.svg'),
      subImg:require('@/assets/images/subscribe_grey.svg'),
      // 导航栏样式
      headStyle: {
        background: "rgba(255, 255, 255, 0)",
        color: "rgba(255, 255, 255, 1)",
      },
      screenHeight:window.innerHeight,
      leftOpen:true
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
    this.useMySubScribeStatus();
    // 初始加载时判断左侧按钮选择的样式
    let activity = document.querySelector('#link-my');
    let competition = document.querySelector('#link-competition');
    let stock = document.querySelector('#link-stock');
    // 特邀比赛
    let invited = document.querySelector('#link-invited');
    let info = document.querySelector('#link-info');

    // 个股收益率
    if ((this.$route.path === '/pc_my_activities')||(this.$route.path === '/pc_stock')) {
      this.activityImg = require('@/assets/images/my_activity_yellow.svg')
      this.infoImg = require('@/assets/images/info_grey.svg')
      activity.style.color = '#F0C278';
      stock.style.color = '#F0C278';
      competition.style.color = '#555555';
      invited.style.color = '#555555';
      info.style.color = '#555555';
    }
    // 个人信息
    else if (this.$route.path === '/pc_personal_info') {
      this.activityImg = require('@/assets/images/my_activity_grey.svg')
      this.infoImg = require('@/assets/images/info_yellow.svg')
      activity.style.color = '#555555';
      info.style.color = '#F0C278';
    }
    // 比赛
    else if((this.$route.path === '/pc_competition')||(this.$route.path === '/pc_participate')||(this.$route.path === '/pc_task_list')){
      activity.style.color = '#F0C278';
      stock.style.color = '#555555';
      competition.style.color = '#F0C278';
      invited.style.color = '#555555';
      info.style.color = '#555555';
    }
    // 特邀比赛
    else if((this.$route.path === '/pc_invited_event')){
      activity.style.color = '#F0C278';
      stock.style.color = '#555555';
      competition.style.color = '#555555';
      invited.style.color = '#F0C278';
      info.style.color = '#555555';
    }
  },
  watch: {
    // 监听左侧按钮选择的样式变化
    '$route'(to) {
      let activity = document.querySelector('#link-my');
      let info = document.querySelector('#link-info');
      let competition = document.querySelector('#link-competition');
      // 特邀比赛
      let invited = document.querySelector('#link-invited');
      let stock = document.querySelector('#link-stock');
      let sub = document.querySelector('#link-sub');
      
      if (to.path === '/pc_my_activities') {
        this.activityImg = require('@/assets/images/my_activity_yellow.svg')
        this.infoImg = require('@/assets/images/info_grey.svg')
        this.subImg = require('@/assets/images/subscribe_grey.svg')
        activity.style.color = '#F0C278';
        info.style.color = '#555555';
        sub.style.color = '#555555';
      } else if (to.path === '/pc_personal_info') {
        this.activityImg = require('@/assets/images/my_activity_grey.svg')
        this.infoImg = require('@/assets/images/info_yellow.svg')
        this.subImg = require('@/assets/images/subscribe_grey.svg')
        activity.style.color = '#555555';
        stock.style.color = '#555555';
        competition.style.color = '#555555';
        invited.style.color = '#555555';
        info.style.color = '#F0C278';
        sub.style.color = '#555555';
      } else if (to.path === '/pc_industry_list') {
        this.activityImg = require('@/assets/images/my_activity_yellow.svg')
        this.infoImg = require('@/assets/images/info_grey.svg')
        this.subImg = require('@/assets/images/subscribe_grey.svg')
        activity.style.color = '#F0C278';
        stock.style.color = '#F0C278';
        competition.style.color = '#555555';
        invited.style.color = '#555555';
        info.style.color = '#555555';
        sub.style.color = '#555555';
      } else if (to.path === '/pc_competition') {
        this.activityImg = require('@/assets/images/my_activity_yellow.svg')
        this.infoImg = require('@/assets/images/info_grey.svg')
        this.subImg = require('@/assets/images/subscribe_grey.svg')
        activity.style.color = '#F0C278';
        competition.style.color = '#F0C278';
        stock.style.color = '#555555';
        invited.style.color = '#555555';
        info.style.color = '#555555';
        sub.style.color = '#555555';
      } else if (to.path === '/pc_invited_event') {
        this.activityImg = require('@/assets/images/my_activity_yellow.svg')
        this.infoImg = require('@/assets/images/info_grey.svg')
        this.subImg = require('@/assets/images/subscribe_grey.svg')
        activity.style.color = '#F0C278';
        stock.style.color = '#555555';
        competition.style.color = '#555555';
        invited.style.color = '#F0C278';
        info.style.color = '#555555';
        sub.style.color = '#555555';
      }
      else if (to.path === '/pc_competition_subscribe') {
        this.activityImg = require('@/assets/images/my_activity_grey.svg')
        this.infoImg = require('@/assets/images/info_grey.svg')
        this.subImg = require('@/assets/images/subscribe.svg')
        activity.style.color = '#555555';
        stock.style.color = '#555555';
        competition.style.color = '#555555';
        invited.style.color = '#555555';
        info.style.color = '#555555';
        sub.style.color = '#F0C278';
      }
    }
  },

  methods: {
    ...mapActions('subScribeStatus',['useMySubScribeStatus']), 
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
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
        this.headStyle.background = `linear-gradient(90deg, rgba(222, 176, 108, 1) 0%, rgba(247, 197, 120, 1) 92%)`;
        this.headStyle.color = `rgba(0, 0, 0,${scrollTop / (scrollTop + 80)})`;
      } else if (scrollTop == 0) {
        this.headStyle.background = "rgba(0, 0, 0, 0)";
        this.headStyle.color = "#FFFFFF";
      }
    },
    handleResize() {
      this.screenHeight = window.innerHeight
    },
    //去提现
    toWithdraw(){
      window.location.href = config.serverUrl+'/selfcenter/tocash/'
    },
    setLeftOpen(){
      if(this.leftOpen === true){
        this.leftOpen = false
      }else{
        this.leftOpen = true
      }
    }
  },
  // 滚动之前重置
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
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
}

.left-content {
  font-size: 14px;
  margin-left: 10px;
  color: #555555;
}

.child-title{
  font-size: 14px;
  margin-left: 31px;
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
  height: fit-content;
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

#link-my {
  color: #F0C278;
}

.cash-withdrawal-btn{
  display: inline-block;
  line-height: 1;
  min-height: 27px;
  white-space: nowrap;
  cursor: pointer;
  background: rgba(255,255,255,0.9);
  color: #FFBF5D;
  -webkit-appearance: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin-left: 10px;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  padding: 0 4px;
  font-size: 12px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #DCDFE6;
}

.cash-withdrawal-btn:hover{
  background-color: rgba(255,246,245,0.9);
  border: 1px solid #FFBF5D;
}

.cash-withdrawal-btn:active{
  color: #ff9b00;
}
</style>
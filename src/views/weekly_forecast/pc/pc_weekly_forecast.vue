<!--行业个股收益率预测-->
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
            <router-link to="/weekly_forecast"  class="navcurr">典型应用</router-link>
          </li>

          <li v-if="loginState===false"><a v-on:click="homelogin" class="navregbtn"
                                          style=" visibility: visible;">登录</a>
          </li>
          <li v-else>
            <router-link to="/personal_center">个人中心</router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!--    导航栏结束-->

    <el-row style="padding-top: 80px">
      <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
        <span>您当前的位置：</span>
        <span style="font-size: 20px;margin-left: 5px;color:#555555">行业个股收益率预测</span>
      </el-col>
    </el-row>
    <div class="activity_introduction">
      <el-row style="margin-top: 20px">
        <el-col :offset="2" :span="9">
          <p class="box-title">活动简介</p>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px;margin-bottom: 10px;">
        <el-col :span="20" :offset="2">
          <div class="introduction">
            <el-row>
              <p>该应用中AI算法和您共同完成对每个行业中的7家上市公司个股收盘价周度百分比变动从大到小进行排序。请您预测收盘价周度变动百分比哪一家上市公司会排第一？</p>
            </el-row>
            <el-row style="margin-top: 10px">
              <p>个股收盘价周度百分比计算公式</p>
            </el-row>
            <el-row  class="my-formula center-vertically">
              <el-col :span="10" class="right" >个股收盘价周度百分比&nbsp;=&nbsp;</el-col>
              <el-col :span="10" class="center">
                <el-row>
                  <el-col>
                    {{startDay}}收盘价&nbsp;-&nbsp;{{endDay}}收盘价
                  </el-col>
                  <el-divider></el-divider>
                  <el-col>{{endDay}}收盘价</el-col>
                </el-row>
              </el-col>
            </el-row>
<!--            <img :src="require('@/assets/images/formula-weekly.png')" style="width: 70%;margin: auto">-->
          </div>
        </el-col>

      </el-row>
    </div>
    <div class="industry_list">
      <el-row style="margin-top: 20px">
        <el-col :span="9" :offset="2">
          <span class="box-title">行业列表</span>
        </el-col>
      </el-row>
      <el-row class="industry">
        <el-col :span="20" :offset="2">
          <div  v-for="(item,index) in industryList"
                :key="index">
            <div class="head-part" v-on:click="isOpen(index)" >
              <el-row>
                <el-col :span="1" :offset="1" class="arrow" >
                  <img :src="require('@/assets/images/arrdn.svg')" alt="right-arrow" width="16"
                       v-if="openOrClose[index]==true" >
                  <img :src="require('@/assets/images/arrdn.svg')" alt="down-arrow" width="16"
                       style="transform: rotate(270deg);" v-else>
                </el-col>
                <el-col :span="1" >
                  <img class="image-size" :src="require('@/assets/images/industry1.png')" alt="industry-icon" v-if="index==0">
                  <img class="image-size" :src="require('@/assets/images/industry2.jpg')" alt="industry-icon" v-else>
                </el-col>
                <el-col :span="4" :offset="1">
                  <span style="font-size: 19px;color:#333333;font-weight: 700;">{{item.name}}</span>
                </el-col>
                <el-col  :span="1">
                  <span style="color:#AAAAAA;font-size: 18px">热度</span>
                </el-col>
                <el-col :span="6" >
                  <el-rate
                      v-model=item.hot
                      disabled
                      text-color="#ff9900">
                  </el-rate>
                </el-col>
                <!--              <el-col :span="5" >-->
                <!--                <span style="color: #AAAAAA;margin-right: 5px;font-size: 18px">NO.1</span>-->
                <!--                <span class="no1-company">{{item.no1}}</span>-->
                <!--              </el-col>-->
                <el-col :span="2" :offset="6">
                  <router-link :to="{path:'/weekly_forecast_details',query:{id:item.id,name:item.name}}">
                    <span style="color: #ff697b;font-weight: bold;padding: 0px;font-size: 15px">查看 ></span>
                  </router-link>
                </el-col>
              </el-row>
            </div>

            <div class="buttom-part" v-if="openOrClose[index]==true">
              <el-row>
                <el-table
                    class="el-table"
                    :data=item.list
                    :show-header=false

                    :cell-style="cellStyle">

                  <el-table-column
                      prop="company"
                      label="公司">
                  </el-table-column>
                  <el-table-column
                      prop="stock_id"
                      label="股票代码"
                  >
                  </el-table-column>

                </el-table>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
import { loginStatus} from "../../../api/login";
import config from '@/config'
import {getCSRFToken} from '@/api/token'

export default {
  name: "pc_weekly_forecast",
  data() {
    return{
      openOrClose:[false],
      loginState: '', //登录状态，初始时设为未登录
    }
  },
  computed:{
    industryList(){
      return this.$store.getters.industryList.data
    },
    startDay(){
      return this.$store.getters.industryList.start_day
    },
    endDay(){
      return this.$store.getters.industryList.end_day
    }
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:rgb(253,243,239)')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
  },
  mounted() {
    this.getCSRFTokenMethod();
    this.getLoginState();
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    isOpen : function(index) {
      this.openOrClose[index]=!this.openOrClose[index]
      console.log(index,this.openOrClose[index])
    },

    // 表格单列颜色
    cellStyle ({columnIndex }) {
      // 状态列字体颜色
      if(columnIndex === 1){
        return 'color: #7F7F7F;text-align: center;width:50%'
      }
      if(columnIndex === 0){
        return 'color:  #333333;text-align: center;width:50%'
      }
      else{
        return 'color:  #333333'
      }
    },
    //登录
    homelogin() {
      window.location.href = config.serverUrl+'/login?from_server=new'
    },
    // 判断登录状态
    getLoginState() {
      // 获取登录状态
      loginStatus().then(res => {
        this.loginState = res.login_status;
      });
    },
  }
}
</script>

<style scoped>
@import '../../../assets/CSS/responsive_style.css';
.nav-bg{
  background-image: linear-gradient(to right, #f59a23, #fe8d46, #ff8461, #f98079, #ec808d);
}

.my-breadcrumb{
  color: #7F7F7F;
  font-size: 18px;
}

.my-breadcrumb a{
  color: #555555;
  text-decoration: none;
}

.my-breadcrumb a:hover{
  color: #f98079;
  text-decoration: none;
}

.my-breadcrumb a:active{
  color: #fe8d46;
  text-decoration: none;
}

.center-vertically{
  display: flex;
  align-items: center;
  vertical-align: middle;
}
.box-title {
  margin-top: 20px;
  font-size: 30px;
  font-weight: bolder;
}
/*行业列表部分*/
.industry{
  margin-top: 20px;
  margin-bottom: 10px;
}
.head-part{
  background-color: #FFFFFF;
  border-radius: 18px;
  margin-bottom: 10px;
  line-height: 40px;

  /*padding-bottom: px;*/
  padding-top: 10px;
}
.arrow{
  text-align: center;
  /*line-height: 60px;*/
  padding-left: 5px;
  margin-right: 5px;
}
.image-size{
  width: 85%;
}
/deep/ .el-rate__icon{
  font-size: 25px;
  margin-top: 8px;
}
.no1-company{
  color: #FFFFFF;
  font-size:15px;
  padding: 5px 10px;
  background-color: #F75C4F;
  border-radius: 8px;
}

.el-table{
  border-radius: 18px;
  background-color: #FFFFFF;
  font-size: 15px;
}

.buttom-part{
  border-radius: 18px;
  margin-bottom: 10px;
}
a {
  text-decoration: none;
}

a.navregbtn {
  color: #f94446;
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
  color: #fb6770;
  border-bottom: none;
}
.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  padding: 20px 15px 10px;
  /*line-height: 25px !important;*/
  color:#555555;
  font-size: 17px;
  margin-bottom: 0px;
}


.my-formula{
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 0;
  color: #7F7F7F;
}

.my-formula >>> .el-divider--horizontal{
  margin-top: 1px;
  margin-bottom: 1px;
  font-weight: 300;
}

.my-formula >>> .el-divider{
  background: #7F7F7F;
}
</style>
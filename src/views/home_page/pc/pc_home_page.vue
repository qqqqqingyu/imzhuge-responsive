<template>
  <div class="homepage_header">
    <el-row class="pgw hdbar" :style="topBannerNavBg">
      <el-col :span="2" :offset="2">
        <a href="https://www.imzhuge.com/" class="logobox" title="嗨皮诸葛" style="margin-left: 2.5%">
          <img src="@/assets/images/logo.png" alt="嗨皮诸葛" height="40"/>
        </a>
      </el-col>
      <el-col :span="19" style="position: relative">
        <ul class="hdnav clear">
          <li>
            <router-link to="/" id="nav_top" onclick="showUnderline(this.id,'hp')" class="navhome navcurr hand">首页
            </router-link>
          </li>
          <li><a id="nav_typical" onclick="showUnderline(this.id,'typical_use')" class="hand">典型应用</a></li>
          <li><router-link to="/competition_center">赛事中心</router-link></li>
          <li><a id="nav_about_us" onclick="showUnderline(this.id,'about_us')" class="hand">关于我们</a></li>
          <li><a id="nav_coop" onclick="showUnderline(this.id,'coop')" class="hand">合作交流</a></li>
          <!--        活动广场不在本页，需跳转-->
          <li><a v-on:click="toActivitySquare" id="nav_square"  class="hand">活动广场</a></li>
          <li v-if="!loginStatus"><a v-on:click="homelogin" class="navregbtn wow pulse animated hand"
                                          style=" visibility: visible;">登录</a>
          </li>
          <li v-else>
            <el-popover
                placement="top-start"
                trigger="hover"
            >
              <template #reference>
                <router-link to="" style="cursor: default">
                  <span>个人中心</span>
                </router-link>
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
  </div>
  <!--  用于定位，没有内容的div-->
  <div id="hp"></div>
  <el-row>
<!--    banner开始-->
    <el-col :span="24" class="my-banner">
      <h1>做财经领域高水平的人机融合预测平台</h1>
    </el-col>
<!--    banner结束-->

    <el-col :span="24">
<!--      渐变色背景开始-->
      <div class="gradient_bg">
<!--    三个模块开始-->
        <div class="sys_info_item pgw_1 three_block" style="transform:translateY(-15%);">
          <ul class="clear">
            <li class=" sys_img wow bounceInLeft animated" data-wow-duration="0.7s"
                style="visibility: visible; animation-name: bounceInLeft;">
              <img :src="require('@/assets/images/banner-box1.svg')" height="60">
              <span>基于预测市场</span>
              <p>聚合集体预测概率，提供精准预测服务<br>实时追踪大众预测</p>
            </li>
            <li class=" sys_img wow bounceInUp animated" data-wow-duration="0.7s"
                style="visibility: visible; animation-name: bounceInUp;">
              <img :src="require('@/assets/images/banner-box2.svg')" height="60">
              <span>分享预测经验</span>
              <p>分享个人经验，提升预测效率<br>助力形成集体智慧</p>
            </li>
            <li class=" sys_img wow slideInRight animated" data-wow-duration="0.5s"
                style="visibility: visible; animation-name: slideInRight;">
              <img :src="require('@/assets/images/banner-box3.svg')" height="60">
              <span>聚集大众智慧</span>
              <p>公开预测平台，聚集大众智慧<br>合理分析事件结果</p>
            </li>
          </ul>
        </div>
<!--    三个模块结束-->

<!--      典型应用开始-->
        <div id="typical_use"></div>
        <el-row>
          <el-col :span="24" class="part_title">典型应用</el-col>
          <el-col :span="24" style="text-align: center">
            <el-radio-group v-model="typical_filter" class="my-radio-group">
              <el-radio-button class="filter-radio" label=0>企业收益率排序预测</el-radio-button>
              <el-radio-button class="filter-radio" label=1>股价波动预测</el-radio-button>
              <el-radio-button class="filter-radio" label=2>全球经济不确定性预警</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="22" :offset="1" class="typical-filter">
            <el-row v-if="typical_filter==0">
              <el-col :span="10" :offset="1" class="typical_content wow bounceInLeft animated">
                <p>基于人机融合</p>
                <p>做细分行业收益率排序</p>
                <el-button type="warning" class="more" v-on:click="more">立即使用</el-button>
              </el-col>
              <el-col :span="11" class="wow bounceInRight animated" style="position: relative">
                <img src="@/assets/images/yield.png" alt="收益率排序预测" width="600">
              </el-col>
            </el-row>
            <el-row v-if="typical_filter==1">
              <el-col :span="9" :offset="1" class="typical_content wow bounceInLeft animated">
                <p>基于人机融合</p>
                <p>做股价波动预测</p>
                <el-button type="info" class="disabled-btn" disabled>敬请期待</el-button>
              </el-col>
              <el-col :span="12" class="wow bounceInRight animated" style="position: relative">
                <img src="@/assets/images/expect.png" alt="收益率排序预测" width="700"
                     style="margin-top: 30px">
              </el-col>
            </el-row>
            <el-row v-if="typical_filter==2">
              <el-col :span="10" :offset="1" class="typical_content wow bounceInLeft animated">
                <p>融合领域专家与机器智慧</p>
                <p>做全球经济与政策不确定性评估和预警</p>
                <el-button type="info" class="disabled-btn" disabled>敬请期待</el-button>
              </el-col>
              <el-col :span="11" class="wow bounceInRight animated" style="z-index: 2;position: relative">
                <img src="@/assets/images/map.png" alt="全球经济不确定性预警" width="600"
                     style="margin-top: 80px">
              </el-col>
            </el-row>
          </el-col>
        </el-row>
<!--      典型应用结束-->
      </div>
<!--      渐变色背景结束-->
    </el-col>
  </el-row>

<!--      使命+四个图片开始-->
  <el-row style="margin-top: 100px;margin-bottom:90px;visibility: visible; animation-name: lightSpeedIn;"
          class="clear lightSpeedIn wow  animated" data-wow-duration="0.7s" data-wow-delay="0.2s">
    <!--        使命-->
    <el-col :span="11" :offset="2" style="padding-top: 100px">
      <el-row>
        <strong class="part_title">做财经领域高水平的<br>人机融合预测平台</strong>
      </el-row>
      <el-row class="left" style="margin-top: 50px;color:#606266; font-size: 18px">
        采用市场机制融合人机智慧，提供精准、快速、高效的财经预测服务。
      </el-row>
      <el-row>
        <el-col :span="6" style="margin-top: 50px;">
          <el-button v-on:click="homelogin" class="login more" v-if="!loginStatus">前往登录</el-button>
        </el-col>
      </el-row>
    </el-col>
    <!--        四个图片-->
    <el-col :span="4" :offset="1" style="padding-top: 50px;">
      <div class="equality">
        <el-row style="justify-content: center;padding-top: 40px">
          <img src="@/assets/images/equality.svg" alt="equality" height="50">
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px">
          <strong style="color:#fff;font-size: 18px;">融合</strong>
        </el-row>
        <el-row class="mlar" style="justify-content: center;margin-top: 15px;color:#fff">
          融合人机智慧，高效预测财经问题
        </el-row>
      </div>

      <div class="share">
        <el-row style="justify-content: center;padding-top: 40px">
          <img src="@/assets/images/share-y.svg" alt="share" height="40">
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px">
          <strong style="font-size: 18px">共享</strong>
        </el-row>
        <el-row class="mlar" style="justify-content: center;margin-top: 15px;color:#909399">
          开放数据、共享预知、辅助决策
        </el-row>
      </div>
    </el-col>
    <el-col :span="4" style="margin-left: 15px;">
      <div class="together">
        <el-row style="justify-content: center;padding-top: 40px">
          <img src="@/assets/images/together.svg" alt="together" height="40">
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px">
          <strong style="font-size: 18px">共创</strong>
        </el-row>
        <el-row class="mlar" style="justify-content: center;margin-top: 15px;color:#909399">
          携手大众共预未来
        </el-row>
      </div>

      <div class="promote">
        <el-row style="justify-content: center;padding-top: 40px">
          <img src="@/assets/images/promote.svg" alt="promote" height="40">
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px">
          <strong style="font-size: 18px">提升</strong>
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px;color:#909399">
          精确、快速、高效预知未来
        </el-row>
      </div>
    </el-col>
  </el-row>
<!--      使命+四个图片结束-->

  <!--  研究团队开始-->
  <div id="about_us"></div>
  <el-row>
    <el-col class="team center wow bounceInUp animated" data-wow-iteration="1" data-wow-duration="2s"
    style=" visibility: visible; animation-name: bounceInUp;">
        <strong class="part_title">研究团队</strong>
        <el-row style="margin-top: 35px;">
          <el-col :span="20" :offset="2" class="teaminfo">
            <p>“嗨皮诸葛”的使命是：做财经领域高水平的人机融合预测平台。致力于利用人工智能与人类集体智慧，提升预测的准确性和可靠性。平台目前的典型应用包括金融市场预测和国际经济不确定性预测。</p>
            <p>为了实现该使命，我们组建了具备丰富的学术背景和实践经验的研究团队，主要成员来自西南财经大学、太原理工大学、复旦大学、苏州大学、南开大学、重庆大学等。在群体智慧与人机融合预测系统方向，我们开展多项科研项目与实验研究。在信息系统与决策科学高水平期刊MIS Quarterly、Information Systems Journal、Decision Support Systems等发表了多篇论文。我们目前与多家研究机构和企业建立了合作关系，共同开展相关研究项目，开发财经领域高水平的人机融合预测平台。</p>
            <p>我们坚信“嗨皮诸葛”将在预测领域中发挥更加重要的作用，为财经领域的决策者提供有力支持。</p>
          </el-col>
        </el-row>
    </el-col>
  </el-row>
  <!--  研究团队结束-->

  <!--合作交流开始-->
  <div id="coop"></div>
  <div class="sys_info_item pgw_1 three_block center wow bounceIn animated">
    <h1 class="part_title">合作交流</h1>
<!--    横线图片高度较高，上移一点-->
    <img src="@/assets/images/title-line.svg" width="100" style="transform:translateY(-20px);">
    <ul class="clear" style="transform:translateY(-20px);">
      <li class="grey-box sys_img wow bounceInLeft animated" data-wow-duration="0.7s"
          style="visibility: visible; animation-name: bounceInLeft;">
        <img :src="require('@/assets/images/coop-box1.svg')" height="63">
        <span><b>科研教学</b></span>
        <div class="grey-part">
          <b>实验平台</b><br>为学者提供实验研究和教学实训平台<br><br>
          <b>适合学科</b><br>经济学、行为金融、预测科学、<br>人工智能、人机交互
        </div>
      </li>
      <li class="grey-box sys_img wow bounceInUp animated" data-wow-duration="0.7s"
          style="visibility: visible; animation-name: bounceInUp;">
        <img :src="require('@/assets/images/coop-box2-up.svg')" height="11" style="margin-bottom: 3px;margin-top: 6px">
        <img :src="require('@/assets/images/coop-box2.svg')" height="43">
        <span><b>资产管理</b></span>
        <div class="grey-part">
          <b>辅助决策</b><br>使用嗨皮诸葛提供的数据API下载数据，辅助<br>其写作投研报告或者做投资决策<br><br>
          <b>优化模型</b><br>将嗨皮诸葛的数据作为其模型训练的一部分<br>来提升其自身模型的性能
        </div>
      </li>
      <li class="grey-box sys_img wow slideInRight animated" data-wow-duration="0.5s"
          style="visibility: visible; animation-name: slideInRight;">
        <img :src="require('@/assets/images/coop-box3-up.svg')" height="25" style="margin-bottom: 1px;margin-top: 2px">
        <img :src="require('@/assets/images/coop-box3-c.svg')" height="13" >
        <img :src="require('@/assets/images/coop-box3-b.svg')" height="24">
        <span><b>公共治理</b></span>
        <div class="grey-part">
          <b>社会调研</b><br>根据政府财政部门的需求定制发布经济政策<br>相关的预测任务<br><br>
          <b>数据支持</b><br>使用嗨皮诸葛的数据API下载数据辅助其写作<br>研究报告，制定财经政策
        </div>
      </li>
    </ul>
  </div>
  <!--合作交流结束-->

<!--  foot开始-->
  <el-row class="foot wow bounceIn animated" >
    <el-col :offset="2" :span="6">
      <h3 class="foot-title">嗨皮诸葛</h3>
      <p>做财经领域高水平的人机融合预测平台</p>
    </el-col>
    <el-col :span="5">
      <h3 class="foot-title">合作伙伴</h3>
      <img src="@/assets/images/winvk.png" v-on:click="winvk" class="hand" height="50">
    </el-col>
    <el-col :span="6">
      <h3 class="foot-title">联系我们</h3>
      <el-row class="center-vertically">
        <img src="@/assets/images/email.svg" height="14" class="my-icon">
        <span>haichao_zheng@163.com</span>
      </el-row>
      <el-row style="margin-top: 20px">
        <img src="@/assets/images/wechat.svg" height="14" class="my-icon">
        <img src="@/assets/images/contactus.png" height="85">
      </el-row>
    </el-col>
    <el-col :span="3">
      <h3 class="foot-title">关注我们</h3>
      <img src="@/assets/images/gzh.png" height="85">
      <p class="gzh">微信公众号</p>
    </el-col>
    <el-col class="center" style="margin-top: 40px">
      <p> 爱诸葛，知未来 |
        <span class="res_deceleration" @click="toBeiAn()">蜀ICP备2020026052号</span> |
        <span class="res_deceleration" onclick="res_deceleration()">免责声明</span></p>
    </el-col>
  </el-row>

  <div class="detail__board" id="detail-board-front">
    <div class="detail__inner">
      <div onclick="res_close()"><a class="detail__close"><img style="width: 30px;height: 30px"
                                                               :src="require('@/assets/images/close.svg')" alt="close"></a>
      </div>
      <div class="detail__article">
        <h3 class="detail__header">免责声明</h3>
        <div class="detail__content">
          <p>“嗨皮诸葛”是预测领域的研究平台，不收取任何服务佣金，目前该平台重点关注预测市场（prediction
            market），基于市场机制汇集大众的集体智慧，预测未来的事件。预测信息不对任何投资人及/或任何交易提供任何担保，无论是明示、默示或法定的。“嗨皮诸葛”提供的各种信息及资料（包括但不限于文字、数据、图表及超链接）仅供参考（例如：对未来趋势的预测不代表实际会发发生），不作为任何法律文件，亦不构成任何邀约、投资建议或承诺，投资人应依其独立判断做出决策。投资人据此进行投资交易而产生的风险等后果请自行承担，“嗨皮诸葛”不承担任何责任。</p>
        </div>
      </div>
    </div>
  </div>
<!--  foot结束-->
</template>


<script>
import {WOW} from 'wowjs'
import {getCSRFToken} from '@/api/token'
import config from '@/config'
import {useStore} from "vuex";

export default {
  name: "pc_home_page",

  data() {
    return {
      topBannerNavBg: {
        backgroundColor: ''
      },
      typical_filter: 0,
      userName:''
    }
  },
  computed:{
    loginStatus(){
      return this.$store.getters.loginStatus
    },
  },
  created() {
    window.showUnderline = this.showUnderline;
    window.res_deceleration = this.res_deceleration;
    window.res_close = this.res_close;
    // this.$nextTick(() => {
    //   this.toLocal()
    // })
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 滚动页面时触发导航变色
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let pos = window.scrollY;
      // 设置背景颜色的透明度
      if (scrollTop && pos > 300) {
        this.topBannerNavBg.backgroundColor = '#F0C27B'
      } else if (scrollTop === 0 || pos < 300) {
        this.topBannerNavBg.backgroundColor = 'transparent' // 设置回到顶部时，背景颜色为透明
      }
    },
    // 滚动之前重置
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
    },

    //登录
    homelogin() {
      window.location.href = config.serverUrl+'/login?from_server=new'
    },
    //跳转活动广场
    toActivitySquare(){
      window.location.href = config.serverUrl+'/activity/'
    },
    //查看周度收益率界面
    more() {
      this.$router.push({
        path: '/weekly_forecast',
      })
    },
    // 导航栏的下划线展示
    showUnderline: function (id, jumpId) {
      // id是导航栏li的参数，用于加下划线；jumpId是需要跳转的本页div的id
      const idBox = ["nav_top", "nav_typical", "nav_about_us", "nav_coop"];
      for (let i = 0; i < idBox.length; i++) {
        document.getElementById(idBox[i]).classList.remove("navcurr")
      }
      // navcurr控制导航栏下划线的样式
      document.getElementById(id).classList.add("navcurr")

      // 跳转
      let toElement = document.getElementById(jumpId); //获取
      //锚点存在跳转
      if (id) {
        // scrollIntoView让当前的元素滚动到浏览器窗口的可视区域内
        toElement.scrollIntoView({behavior: "smooth"})
      }
    },
    res_deceleration() {
      document.getElementById("detail-board-front").style.display = "block"
    },
    res_close() {
      document.getElementById("detail-board-front").style.display = "none"
    },
    winvk() {
      window.open("https://www.winvk.com/", "_blank");
    },
    toBeiAn(){
      window.open("https://beian.miit.gov.cn", "_blank");
    },
    getName(){
      if(this.loginStatus == true){
        const store = useStore()
        //触发数据获取动作，调用相应接口会自动跳转登录
        store.dispatch('myInfoDetails/useMyInfoDetailsData')
        this.userName = this.$store.getters.myInfoDetails.username
      }
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
    this.getName();
    // 监听页面滚动
    window.addEventListener('scroll', this.handleScroll)

    new WOW().init();
    //声明一个对象来配置动画效果参数
    var wow = new WOW(
        {
          boxClass: 'wow',      // default
          animateClass: 'animated', // default
          offset: 150,          // default
          mobile: false,       // default
          live: false        // default
        }
    )
    wow.init();
  }
}
</script>

<style scoped>
@import '../../../assets/CSS/homepage_style.css';
@import '../../../assets/CSS/homepage_common.css';
@import 'https://cdn.dowebok.com/98/css/animate.min.css';

.carousel {
  margin-top: 78px;
  z-index: 0;
}

.gradient_bg {
  background-image: linear-gradient(to bottom, #FFFFFF 0%, rgb(249,247,242) 100%);
}

.typical_title {
  font-size: 36px;
  letter-spacing: 0.1em;
  line-height: 2;
  margin-bottom: 2%;
}

.part_title {
  margin-top: 50px;
  font-family: "microsoft yahei";
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 5px;
}

.typical_content {
  font-family: "microsoft yahei";
  text-align: left;
  padding-top: 120px;
}

.typical_content p {
  font-size: 26px;
}

.typical_content button {
  margin-top: 20px;
}

.typical_content h3 {
  font-size: 32px;
  font-weight: 700;
}

.more {
  margin-top: 2%;
  background: rgba(247, 197, 120, 1);
  border-color: #FFFFFF;
  font-size: 17px;
  padding: 15px 23px;
  border-radius: 5px;
}

.disabled-btn {
  margin-top: 2%;
  border-color: #FFFFFF;
  font-size: 17px;
  padding: 15px 23px;
  border-radius: 5px;
}

.disabled-btn:hover {
  border-color: #FFFFFF;
  font-size: 17px;
  padding: 15px 23px;
  border-radius: 5px;
}

/*使命*/

.login {
  font-size: 15px;
  color: #fff;
  line-height: 15px;
}

/*四个图片*/
.equality {
  background-color: rgb(240, 194, 123);
  /*aspect-ratio: 1 / 1;*/
  height: 210px;
  padding-left: 10px;
  padding-right: 10px;
}

.share {
  background-color: #fafafa;
  height: 210px;
  margin-top: 20px;
  /*padding-right: 5px;*/
  /*padding-left: 5px;*/
}

.together {
  background-color: #fafafa;
  /*aspect-ratio: 1 / 1;*/
  height: 210px;
}

.promote {
  background-color: #fafafa;
  /*aspect-ratio: 1 / 1;*/
  height: 210px;
  margin-top: 20px;
}

/*研究团队*/
.team {
  background-color: rgb(249, 251, 255);
  border-radius: 40px;
  border: 4px #ff8f86;
  padding-top: 70px;
  padding-bottom: 60px;
}

.team strong{
  justify-content: center;
  letter-spacing:5px;
  font-size: 36px;
}

.teaminfo p {
  text-align: left;
  text-indent: 2em;
  line-height: 40px;
  font-size: 20px;
  color: #666;
  letter-spacing: 0.5px;
}

.hand {
  cursor: pointer
}

.three_block ul li p {
  margin-right: 6.5%;
  margin-left: 6.5%;
  height: 80px;
}

.mlar {
  margin-left: 5%;
  margin-right: 5%;
}

/*被选后的单选框颜色*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #FFFFFF;
  background: #F0C27B;
}

/*单选框样式*/
.filter-radio >>> .el-radio-button__inner {
  margin-right: 20px;
  margin-left: 20px;
  background: #F5F8FA;
  color: #7F7F7F;
  border: 0;
  border-radius: 25px;
  padding: 15px 30px;
}

/*单选框覆盖原有阴影*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}

.my-radio-group {
  margin-bottom: 5px;
  margin-top: 40px;
}

.typical-filter {
  height: 453px;
}

.my-banner{
  text-align: center;
  background-image: url('../../../assets/images/yellow_banner.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 100%;
  height: 348px; /*图片的高度*/
}

.my-banner h1{
  padding-top: 130px;
  font-size: 48px;
  color: #FFFFFF;
  font-weight: 400;
  font-style: normal;
}

.my-banner .el-button{
  background-color: rgba(255, 255, 255, 0.9);
  border:none;
  color: #F0C27B;
  font-size: 17px;
  padding-left: 28px;
  padding-right: 28px;
  margin-top: 35px;
}

.foot-title{
  height: 22px;
  font-size: 18px;
  line-height: 22px;
  color: #111;
  margin-bottom: 15px;
}

.gzh{
  font-size: 12px;
  margin-left: 14px
}

.my-line >>>.el-divider--horizontal{
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
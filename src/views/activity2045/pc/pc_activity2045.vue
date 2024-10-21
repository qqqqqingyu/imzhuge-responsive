<template>
  <!--    导航栏-->
  <TheNav :current-page="'help'"></TheNav>

  <el-row style="padding-top: 80px">
    <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
      您当前的位置：
      <router-link to="/help_center">帮助中心</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <span class="cur-de">模拟交易</span>
    </el-col>
  </el-row>

  <el-row>
    <el-col :offset="2" :span="20" style="margin-top: 10px;margin-bottom: 20px">
      <div id="error_bg" class="verify_bg" style="display:none" @click="show_error_msg('');"></div>
      <div id="error" class="verify" style="display:none">
        <div class="verify_box">
          <div class="verify_t" id="error_msg">错误问题见</div>
          <div class="verify_act clear">
            <a href="javascript:void(0);" class="verify_back_btn clear" @click="show_error_msg('');">返回修改</a>
          </div>
        </div>
      </div>

      <div class="info_part_new">
        <strong class="info_t">2045年12月31日前，人类是否能开发出像人一样有自我知觉和自我意识，具有学习、推理和解决问题的人工智能？</strong>
        <div class="info_hits">活动奖金总额：<span>100</span></div>

        <div class="detail_des">
          活动描述：一场Google
          AlphaGo与围棋世界冠军李世石的对弈吸引了全世界的目光，也让人工智能再度成为业界讨论的热点话题。人工智能自1943年诞生以来，在几十年的发展历程中经历了多次潮起潮落，人们却从未停止过对人工智能的研究与探索。当下，摩尔定律驱动计算力不断增长，云计算、大数据、移动互联网这些趋势在影响着人类社会的生活与生产方式，也成为人工智能的催化剂，促使着人工智能不断的演进。
          <br>相关新闻链接一：
          <a href="https://www.sohu.com/a/79839436_118766" class="url-a">
            <span class="url-icon">
                <img src="@/assets/images/url_img.png" style="height:12px">
            </span>
            <span class="url-text">网页链接</span>
            <!--        </a>；相关新闻链接二：-->
            <!--        <a href="https://new.qq.com/rain/a/20210513A03I4O00" class="url-a">-->
            <!--    <span class="url-icon">-->
            <!--        <img src="static/images/url_img.png" style="height:12px">-->
            <!--        </span>-->
            <!--            <span class="url-text">网页链接</span>-->
          </a>。
        </div>

        <div class="detail_des">
          验证资料：<a href='https://news.qq.com/' target='_blank'>腾讯新闻
        </a>：
          <a href="https://news.qq.com/" class="url-a">
            <span class="url-icon">
                <img src="@/assets/images/url_img.png" style="height:12px">
            </span>
            <span class="url-text">网页链接</span>
          </a> ；<a href='https://news.163.com/' target='_blank'>网易新闻
        </a>：
          <a href="https://news.163.com/" class="url-a">
            <span class="url-icon">
                <img src="@/assets/images/url_img.png" style="height:12px">
            </span>
            <span class="url-text">网页链接</span>
          </a>；<a href='http://news.baidu.com/' target='_blank'>百度新闻
        </a>：
          <a href="https://news.baidu.com/" class="url-a">
            <span class="url-icon">
                <img src="@/assets/images/url_img.png" style="height:12px">
            </span>
            <span class="url-text">网页链接</span>
          </a>。
        </div>
      </div>
      <div id="guide_bg" class="guide_bg" style="display:block" @click="act_trade_win_func()"></div>
      <div id="guide_win" class="guide_win" style="display:block">
        <div class="guide_win_box">
          <img src="@/assets/images/fanhui.svg" class="hand" style="float: left;padding-left: 10px;height: 30px;margin-top: -7px"
               @click="guide_text_return()">
          <div class="guide_win_t">交易引导</div>
          <div class="center-vertically" style="flex-wrap: nowrap;">
            <div style="padding-top: 20px;float: left">
              <img src="@/assets/images/web_logo.png" height="100" alt="zhuge" style="padding-top: 5px;margin-left: 10px">
            </div>
            <div style="padding-top: 20px;">
              <p id="guide_text" style="font-size:1rem;line-height: normal;margin:0 20px 0;font-weight: bold">
                您好呀，欢迎来到"嗨皮诸葛"预测平台，我是小诸葛，下面将由我来为您介绍如何进行合约交易</p></div>
          </div>
        </div>

        <div>
          <a style="margin: 20px auto;background: #f5bf6e;!important;color: white!important;" class="win_act_edit_btn"
             @click="guide_text_func();">下一条</a>
        </div>
      </div>
      <div class="info_part_new">
        <strong class="pro_info_t">
          2045年12月31日前，人类是否能开发出像人一样有自我知觉和自我意识，具有学习、推理和解决问题的人工智能？
        </strong>
        <div class="info_date">
          开始时间：{{ currentYear }}-01-01 00:00
          <br>结束时间：{{ currentYear }}-12-31 23:59
        </div>
        <div class="info_hits">
          <!--<span>75660</span>-->
        </div>
        <div class="info_lvbox">
          <div class="info_range">
            <span>能</span>
            <p>0.50</p>
            <div class="rangeval" style="width:100%"></div>
          </div>
          <div class="info_range">
            <span>不能</span>
            <p>0.50</p>
            <div class="rangeval" style="width:100%"></div>
          </div>
        </div>
        <div class="info_act" style="margin:0 auto">
          <!--        <a onclick="window.alert('当前报告只对参与活动交易的用户开放')" class="gobtn fl">查看报告</a>-->
          <router-link to="/transaction" class="gobtn">去交易</router-link>
        </div>
      </div>
    </el-col>
  </el-row>
  <!--这里写了一个错误的框框-->

</template>

<script>
import TheNav from "../../../components/TheNav";

export default {
  name: "pc_activity2045",
  components: {TheNav},
  data(){
    return{
      currentDate:'',
      currentYear:'',
      button_index:0,
      new_text:[
        "您好呀，欢迎来到'嗨皮诸葛'预测平台，我是小诸葛，下面将由我来为您介绍如何进行合约交易",
        "这是一个模拟的合约交易场景，模拟场景所发生的账户变动将与您的正式账户无关",
        "熟悉完背景资料后，就点击去交易进入愉快的合约交易吧"]
    }
  },
  mounted() {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    //进入页面后自动加载的新手引导
    //下一条
    this.button_index=0
  },
  methods:{
    guide_text_func() {
      if (this.button_index === 2) {
        document.getElementById("guide_bg").style.display = "none";
        document.getElementById("guide_win").style.display = "none";

      } else {
        document.getElementById("guide_bg").style.display = "block";
        document.getElementById("guide_win").style.display = "block";
        this.button_index += 1
        document.getElementById("guide_text").innerText = this.new_text[this.button_index];
      }
    },
    //上一条
    guide_text_return() {
      if (this.button_index === 0) {
        this.$router.push('/help_center')
        document.getElementById("guide_bg").style.display = "block";
        document.getElementById("guide_win").style.display = "block";
      } else {
        document.getElementById("guide_bg").style.display = "block";
        document.getElementById("guide_win").style.display = "block";
        this.button_index -= 1
        document.getElementById("guide_text").innerText = this.new_text[this.button_index];
      }
    },
    show_error_msg() {
      if (document.getElementById("error").style.display == "none") {
        document.getElementById("error").style.display = "block";
        document.getElementById("error_bg").style.display = "block";
      } else {
        document.getElementById("error").style.display = "none";
        document.getElementById("error_bg").style.display = "none";
      }
    }
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:rgba(242, 242, 242, 0.35)');
    });
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
    this.button_index=0;
  },
};

</script>

<style scoped>
@import '../../../assets/CSS/common.css';
@import '../../../assets/CSS/index.css';
@import '../../../assets/CSS/user.css';
@import '../../../assets/CSS/activity.css';
@import '../../../assets/CSS/activity_info.css';

/*复写css文件里已有的类*/
.guide_win_box{
  height: 200px;
}

.info_part_new {
  background: #fff;
  padding: 20px 13px;
  border-radius: 18px;
  margin: 10px 0 10px;
}

.info_part_new .info_t {
  font-size: 18px;
}

.info_part_new .pro_info_t {
  font-size: 15px;
}

ol, ul {
  list-style: none
}
</style>
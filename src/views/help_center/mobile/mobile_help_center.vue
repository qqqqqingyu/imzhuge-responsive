<template>
  <div style="margin-bottom: 50px">
    <el-row style="margin-top: 20px">
      <el-col :span="1" :offset="1">
        <router-link to="/">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
          帮助中心
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" class="mb-card my-tab" :style="{ minHeight: screenHeight-120 + 'px' }">
        <el-tabs v-model="helpTabs" class="details">
          <el-tab-pane label="新手攻略" name="Introduction">
            <el-row>
              <el-col class="mb-2">
                <h1>新手攻略</h1>
              </el-col>
              <el-col class="mb-10">
                <h3 class="gray">入门操作轻松掌握</h3>
              </el-col>
              <el-col class="center-vertically mb-10">
                <img src="@/assets/images/y_point.svg" class="hot-point" height="8">
                <h3>模拟交易</h3>
              </el-col>
              <el-col style="margin-bottom: 10px;">
                <router-link to="/activity2045" class="moni center-vertically">
                  进入模拟交易
                  <img src="@/assets/images/enter.svg" height="8" alt="进入" style="margin-left: 5px">
                </router-link>
              </el-col>
              <el-col class="center-vertically mb-10">
                <img src="@/assets/images/y_point.svg" class="hot-point" height="8" alt="point">
                <h3>使用指南</h3>
              </el-col>
              <el-col style="padding-left: 30px;">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item name="1">
                    <template #title>
                      <span class="title_detail">GET嗨皮预测市场</span>
                    </template>
                    <el-row style="font-size: 13px">
                      <el-col class="center-vertically ques-title">
                        <img src="@/assets/images/1.svg" class="my-icon" height="25" alt="point">
                        什么是诸葛贝
                      </el-col>
                      <el-col :offset="1" :span="22">
                        <p class="p-red">初始诸葛贝：</p>
                        <p class="p-blue mb-5">点击导航栏处“个人中心”，可以查看初始诸葛贝数</p>
                        <img src="@/assets/images/ques1-1.png" height="110" alt="初始诸葛贝">
                      </el-col>
                      <el-col :offset="1" :span="22" >
                        <p class="p-red">诸葛贝用来做什么：</p>
                        <p class="p-blue">诸葛贝是嗨皮诸葛平台独有的一种虚拟货币，主要是用来购买合约以及在有奖金的预测比赛中，用户根据净收益的诸葛贝数量来分配奖金。</p>
                      </el-col>

                      <el-col class="center-vertically ques-title">
                        <img src="@/assets/images/2.svg" class="my-icon" height="25" alt="point">
                        什么是嗨皮诸葛市场
                      </el-col>
                      <el-col :offset="1" :span="22" >
                        <p class="p-red">嗨皮诸葛预测市场是什么：</p>
                        <p class="p-blue mb-5">嗨皮诸葛预测市场”（简称为“诸葛市场”）中，参与人中交易与未来事件相关的合约。合约的收益与对应事件联系在一起：事件结果公布时，参与人持有的合约将清算兑现为虚拟币（诸葛贝）。</p>
                        <img src="@/assets/images/ques1-2.png" height="140"  alt="初始诸葛贝">
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                  <template #title>
                    <span class="title_detail">GET赚取诸葛贝与奖金分配</span>
                  </template>
                  <el-row style="font-size: 13px">
                    <el-col class="center-vertically ques-title">
                      <img src="@/assets/images/1.svg" class="my-icon" height="25" alt="point">
                      如何赚取诸葛贝
                    </el-col>
                    <el-col :offset="1" :span="22" >
                      <p class="p-red">买卖合约盈利方式有三种：</p>
                      <p class="p-blue">一：是买入自己认为会发生的结果所对应的合约；</p>
                      <p class="p-blue">二：是及时卖出自己不看好的结果所对应的合约；</p>
                      <p class="p-blue">三：是通过低价买入然后再高价卖 出赚取价格差。</p>
                      <p class="p-red">举个例子：</p>
                      <p class="p-blue">
                        在交易阶段，您购买了<span class="p-y"> 10 份</span>看涨合约，假设“看涨合约”发生了，这十份看涨合约会给您带来<span class="p-y"> 10 个诸葛贝</span>收益
                      </p>
                      <p class="p-blue">假设您购买合约花费了<span class="p-y"> 5 诸葛贝</span></p>
                      <p class="p-blue">任务收益：10-5=<span class="p-y">5</span></p>
                    </el-col>

                    <el-col class="center-vertically ques-title mb-5">
                      <img src="@/assets/images/2.svg" class="my-icon" height="25" alt="point">
                      奖金分配规则
                    </el-col>
                    <el-col :offset="1" :span="22" >
                      <img src="@/assets/images/ques2-1.png" width="300" alt="奖金分配">
                      <p class="p-blue">活动结束后，会按照每个人在该活动中获得的诸葛贝数量进行奖金分配</p>
                      <p class="p-blue">
                        <span class="p-red">第一：</span>
                        如果您在该活动中的净收益诸葛贝<span class="p-y">{{fh}}</span>（即交易亏损），则不参与分配
                      </p>
                      <p class="p-blue">
                        <span class="p-red">第二：</span>
                        计算现金奖金<span class="p-y">（活动现金奖励*您在该活动中获得的诸葛贝数量/所有参与者获得的诸葛贝总量）</span>。
                        例如：一个预测活动现金奖励为100元人民币，如果您净收益 50 个诸葛贝，参与分配的人净收益总额是 250 个诸葛贝，因此您获得奖金：100*(50/250)=20。
                      </p>
                      <p class="p-red">tips:</p>
                      <p class="p-blue">如果您要提现奖金，在对于页面上传微信收款码，发起提现申请，管理员会及时支付</p>
                    </el-col>

                  </el-row>
                </el-collapse-item>
                  <el-collapse-item name="3">
                    <template #title>
                      <span class="title_detail">GET合约交易</span>
                    </template>
                    <el-row style="font-size: 13px">
                      <el-col class="center-vertically ques-title">
                        <img src="@/assets/images/1.svg" class="my-icon" height="25" alt="point">
                        合约交易
                      </el-col>
                      <el-col :offset="1" :span="22" >
                        <p class="p-red">什么是合约：</p>
                        <p class="p-blue">合约指：预测事件可能发生的结果</p>
                        <p class="p-blue">合约区别于期货合约：</p>
                        <p class="p-blue">合约到期后按照“被预测事件”的发生与否进行结算。</p>
                        <p class="p-red mb-5">合约交易：</p>
                        <img src="@/assets/images/ques3-1.jpeg" width="300" alt="合约交易">
                        <p class="p-blue">
                          参与者预测明日的大盘指数会涨，今天就可以买入“上涨”合约。如果明日结果真是上涨，你到期持有的每份“上涨”合约价值兑现为一个诸葛贝
                        </p>
                        <p class="p-red">tips：</p>
                        <p class="p-blue">
                          您可以在交易时间内进行多次交易<br>
                          您的账户余额要大于购买合约的成本才能完成交易哦~</p>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="常见问题" name="questions">
<!--          常见问题一级页面开始-->
            <el-row v-if="isDetail">
              <el-col class="mb-2">
                <h1>常见问题</h1>
              </el-col>
              <el-col class="mb-10">
                <h3 class="gray" >解答常见的操作问题</h3>
              </el-col>
              <el-col class="mb-10">
                <h2>热门问题</h2>
              </el-col>
              <el-col v-for="(item,index) in hotQuestions" v-bind:key="item.q">
                <el-row>
                  <el-col class="hot_ques center-vertically hand" v-on:click="isOpen(index)">
                    <div class="center" style="width: 5%">
                      <img src="@/assets/images/y_point.svg" height="8">
                    </div>
                    <div style="width: 88%">
                      {{ item.q }}
                    </div>
                    <div class="center" style="width: 7%">
                      <img class="hand" :src="require('@/assets/images/arrow.svg')" alt="right-arrow" width="14"
                           v-if="openOrClose[index]==true">
                      <img class="hand" :src="require('@/assets/images/arrow.svg')" alt="down-arrow" width="14"
                           style="transform: rotate(270deg);" v-else>
                    </div>
                  </el-col>
                  <el-col v-if="openOrClose[index]==true" class="ques_answer">
                    {{ item.a }}
                  </el-col>
                </el-row>
              </el-col>

              <el-col class="mb-10 mt-20">
                <h2>问题分类</h2>
              </el-col>
              <el-col v-for="cat in classification" v-bind:key="cat.c_id">
                <div class="frequent_ques center-vertically hand" @click="toDetail(cat.c_id,cat.c_name)">
                  <img src="@/assets/images/frequent.svg" height="20" style="margin-left: 2.5%;margin-right: 2.5%">
                  <div style="width: 88%"><p style="font-size: 13px;">{{ cat.c_name }}</p></div>
                  <div class="center" style="width: 5%">
                    <img class="hand" :src="require('@/assets/images/arrow.svg')" alt="right-arrow" width="14"
                         style="transform: rotate(270deg);" >
                  </div>
                </div>
              </el-col>
            </el-row>
<!--            常见问题一级页面结束-->
<!--            常见问题二级页面开始-->
            <el-row v-else>
              <el-col class="center-vertically mb-10">
                <span class="hand" @click="returnHelp()" style="font-size: 14px;">常见问题</span>
                <img src="@/assets/images/right.svg" alt="下级" height="14">
                <span class="cur-de" style="font-size: 14px;">{{detailTitle}}</span>
              </el-col>
              <el-col class="mb-20" style="margin-top: 5px;">
                <h1>{{ detailTitle }}</h1>
              </el-col>
              <el-col v-for="(item,index) in frequentQuestions[detailId-1]" v-bind:key="item.q">
                <el-row>
                  <el-col class="hot_ques center-vertically hand" v-on:click="frequentIsOpen(index)">
                    <div class="center" style="width: 5%">
                      <img src="@/assets/images/y_point.svg" height="8">
                    </div>
                    <div style="width: 88%">
                      {{ item.q }}
                    </div>
                    <div class="center" style="width: 7%">
                      <img class="hand" :src="require('@/assets/images/arrow.svg')" alt="right-arrow" width="14"
                           v-if="frequentOpenOrClose[index]==true">
                      <img class="hand" :src="require('@/assets/images/arrow.svg')" alt="down-arrow" width="14"
                           style="transform: rotate(270deg);" v-else>
                    </div>
                  </el-col>
                  <el-col v-if="frequentOpenOrClose[index]==true" class="ques_answer">
                    {{ item.a }}
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
<!--          常见问题二级页面结束-->
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row style="margin-top: 50px;"></el-row>
  </div>
  <bottom-nav></bottom-nav>
</template>

<script>
import bottomNav from "../../../components/bottomNav";
import {useStore} from "vuex";
import config from '@/config'

export default {
  name: "mobile_help_center",
  components: {
    bottomNav,
  },
  data(){
    return{
      fh:'<=0',
      userName:'',
      helpTabs:'Introduction',
      openOrClose:[], // 判断是否打开问题下拉部分
      frequentOpenOrClose:[],
      isDetail:true, // 判断是否打开常见问题二级页面
      detailTitle:'',
      detailId:'',
      // 导航栏样式
      headStyle: {
        background: "rgba(255, 255, 255, 0)",
        color: "rgba(255, 255, 255, 1)",
      },
      screenHeight:window.innerHeight,
      // 问题
      hotQuestions:[{
          q:'什么是“嗨皮诸葛预测市场”？',
          a:'答：“嗨皮诸葛预测市场”（以下称为“诸葛市场”）中，参与人中交易与未来事件相关的合约。合约的收益与对应事件联系在一起，例如在政治选举的预测市场中，如果最终结果为某一候选人赢得选举，购买 1 份“该候选人赢得选举”合约的人就会得到 1 个虚拟币（诸葛贝），否则得到 0 个。获取的净诸葛贝数量（具体见奖金分配规则）体现参与人的预测能力。'
        },{
          q:'诸葛贝是什么？',
          a:'答：诸葛贝只能在嗨皮诸葛平台进行交易，不可用于其它平台。系统给每个用户赠送 100 个诸葛贝。在有奖金的预测比赛中，用户根据净收益的诸葛贝数量来分配奖金。'
        },{
          q:'我如何交易才能盈利？',
          a:'答：活动的盈利方式有三种，一是买入自己认为会发生的结果所对应的合约；二是卖出自己不看好的结果所对应的合约，使自己在活动中累积更多的诸葛贝；三是通过低价买入然后再高价卖出赚取价格差的方式。当参与者买入看好的合约后，等到事件结果公布时，参与者获得的收益（正确结果所对应的合约份数乘以 1）减去参与者购买这些合约所支付的成本就是该参与者从该预测活动中获得的奖励。比赛结束后，您净收益的诸葛贝将会决定奖金的分配。 下面举个例子进行说明：假设参与者开始拥有 30 个诸葛贝，他认为明天的大盘指数会涨，假如他今天花费了 5 个诸葛贝购买了 8 份看涨合约，如果明天的大盘指数上涨了，明天参与者将获得 8 单位的诸葛贝（每份看涨合约将获得一个诸葛贝的收益），参与者最终的收益为 8-5 = 3个诸葛贝。如果明天的大盘指数下跌了，参与者最终会损失 5 个诸葛贝。'
        }
      ],
      frequentQuestions:[
          [{
            q:'什么是合约交易？',
            a:'答：诸葛市场中的“合约”不同于“期货合约”，合约到期后买卖双方不按特定价格交割某种资产，而是按照“被预测事件”的发生与否进行结算。“合约交易”指市场中的参与者根据自己对事件发生与否的判断进行合约买卖。例如，参与者预测明日的大盘指数会涨，今天就可以买入大盘指数的看涨合约，或者出售持有的大盘看跌合约。'
          },{
            q:'账户上的诸葛贝在所有预测市场是通用的吗？',
            a:'答：通用。用户可以选择自己感兴趣的所有预测活动，使用诸葛贝参与交易。'
          },{
            q:'账户何时会被清零？',
            a:'答：诸葛贝不清零，您的诸葛贝财富会不断累积。'
          },{
            q:'帐户中的诸葛贝可以直接兑换现金吗？',
            a:'答：不可以直接用诸葛贝兑换奖金。在一个有现金奖励的比赛中，系统根据参与者在该比赛中净收益的诸葛贝来分配奖金，分配奖金不会消耗减少您的诸葛贝数量。'
          },{
            q:'如何提取奖金？',
            a:'答：用户上传微信收款码，发起提现申请，系统管理员及时支付。'
          }],[{
          q:'合约价格如何进行更新？',
          a:'答：在对数市场评分规则中，合约价格随着参与者购买该合约数量的增加而不断增加，随着参与者卖出该合约数量的增加而减少。'
        },{
          q:'奖金分配规则是什么？',
          a:'答：参与者在一个预测比赛中净收益的的诸葛贝占净收益诸葛贝总额的比例决定了该参与者从该活动获得的奖金。净收益的含义是：收入-成本。如果一个参与者在该比赛中净收益诸葛贝 <=0（交易亏损了），则不参与计算和分配。因此不参与交易的用户净收益为 0，也不参与奖金分配。例如，一个预测活动现金奖励为 100 元人民币，如果您净收益 50 个诸葛贝，参与分配的人净收益总额是 250 个诸葛贝，因此您获得奖金：100*(50/250)=20`。'
        },{
          q:'预测比赛有交易次数限制吗？',
          a:'答：不限制交易次数。但是参与者的账户余额（诸葛贝）必须大于买入合约所需成本，或者参与者帐户中有合约才能执行卖出操作，并且所有交易时间点必须发生在活动期间。'
        },{
          q:'为什么支付成本不等于份额乘以当前价格？',
          a:'答：诸葛市场采用“对数市场评分规则(LMSR)”对合约进行定价，LMSR是由罗宾.汉森(Robin Hanson)所提出来的，成本函数不是直接使用价格*交易量。'
        }],[{
          q:'“预测比赛”是什么？',
          a:'答：我们可以在赛事中心查看并参与预测比赛，一个预测比赛有开始和结束日期，可以有现金奖励，也可以作为训练比赛没有设置奖金。一个预测比赛可以由多个预测活动组成，每个预测活动可以单周期举办（举办一期就结束），也可以在比赛期间的多个周期举办多次。'
        },{
          q:'什么是特邀预测比赛？',
          a:'答：如果您不希望比赛活动公开，可以发起“特邀预测比赛”。发布活动后，您需要提供一个参与比赛的人员名单（手机号），只有这些人能够参与您发起的比赛，其他人看不到您发起的比赛。'
        },{
          q:'哪些参与者可以发布预测比赛？',
          a:'答：如果您要发布预测比赛，欢迎联系haichao@swufe.edu.cn '
        },{
          q:'发布比赛需要发起人提供奖金吗？',
          a:'答：发布特邀预测比赛可以不提供奖金。发布公开比赛，我们鼓励比赛发起人为每个发布的比赛提供至少50元人名币的金额作为奖金分配，奖金可以由活动发起人自己提供，也可以将通过参加平台活动赚取得的奖金用于发布任务。'
        },{
          q:'对用户发起的活动有什么要求？',
          a:'答：平台不接受违法、违规以及政治敏感性的活动，我们鼓励比赛发起人发布与财经领域相关的预测比赛。'
        }]
      ],
      // 常见问题分类需传到二级页面的参数
      classification:[{
        c_id:1,
        c_name:'平台简介'
      },{
        c_id:2,
        c_name:'交易规则'
      },{
        c_id:3,
        c_name:'赛事中心'
      }],
      activeNames: []
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
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  created() {
    window.res_deceleration = this.res_deceleration;
    window.res_close = this.res_close;
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
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
    },
    // 对下拉进行操作
    isOpen : function(index) {
      this.openOrClose[index] = !this.openOrClose[index]
    },
    frequentIsOpen: function(index) {
      this.frequentOpenOrClose[index] = !this.frequentOpenOrClose[index]
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
    toDetail(category_id,category_name){
      this.isDetail = false
      this.detailTitle = category_name
      this.detailId = category_id
    },
    // 返回一级页面
    returnHelp(){
      this.isDetail = true
      this.openOrClose = []
      this.frequentOpenOrClose = []
    },
    // 滚动页面时触发导航变色
    handleScroll() {
      let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      //设置背景颜色的透明度
      if (scrollTop <= 200 && scrollTop > 0) {
        this.headStyle.background = `rgba(240,196,123,${
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
  },
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#F5F8FA')
    });
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style');
  },
}
</script>

<style scoped>
.my-tab{
  margin-top: 20px;
}

.my-tab h1{
  font-size: 16px;
}

.my-tab h2{
  font-size: 15px;
}

.my-tab h3{
  font-size: 14px;
}

.hot-point{
  margin-right: 20px;
}

.gray{
  color: #7F7F7F;
}

/*覆盖element原有tab样式开始*/
/*切换活动项的字体颜色*/
.my-tab /deep/ .el-tabs__item.is-active {
  color: #EF9C19 !important;
}

/*切换活动项的字体颜色*/
.my-tab /deep/ .el-tabs__item:hover {
  color: #EF9C19 !important;
}

/*切换活动项的长条颜色*/
.my-tab /deep/ .el-tabs__active-bar {
  background-color: #F0C27B !important;
}

.my-tab >>> .el-tabs__item{
  font-size: 16px;
  font-weight: bold;
}
/*覆盖element原有tab样式结束*/

.hot_ques{
  border-radius: 5px;
  background: rgba(240, 194, 123, 0.09);
  height: 40px;
  font-size: 13px;
}

.frequent_ques{
  border-radius: 5px;
  background: rgba(240, 194, 123, 0.09);
  height: 50px;
  color: #2c3e50;
}

.ques_answer{
  padding: 10px 5%;
  line-height: 20px;
  font-size: 13px;
}

.moni{
  color: #EF9C19;
  margin-left: 30px;
  line-height: 20px;
  font-size: 13px;
}

.p-red{
  /*color: rgb(255,87,87);*/
  color: #282828;
}

.p-blue{
  /*color: rgb(77, 170, 236);*/
  color: #777777;
}

.p-y{
  color: #f8a61f;
}

.ques-title{
  font-size: 13px;
  color: #EF9C19;
}

.title_detail {
  margin-left: 5px;
  font-size: 14px;
}

.details {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
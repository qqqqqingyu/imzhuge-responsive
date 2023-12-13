<template>
  <div class="container">
    <el-row class="title-box">
      <el-col :span="1" :offset="1">
        <router-link to="/competition_center">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
          股价涨跌预测
        </el-row>
      </el-col>
    </el-row>

    <!--    面包屑导航栏开始-->
    <el-row>
      <el-col :span="22" :offset="1" class="m-breadcrumb center-vertically mb-5">
        您当前的位置：
        <router-link to="/competition_center">赛事中心</router-link>
        <img src="@/assets/images/right.svg" alt="下级" height="25">
        <span>股价涨跌预测</span>
      </el-col>
    </el-row>
    <!--    面包屑导航栏结束-->

    <el-row style="margin-top: 5px">
      <el-col :offset="1" :span="17">
        <span class="part-title" :class="{'box-gray-title': currentPart === 2}">比赛简介</span>
<!--      class="hand"  @click="changePart(1)"-->
<!--        <span class="part-title hand" :class="{'box-gray-title': currentPart === 1}" style="margin-left: 20px"-->
<!--              @click="changePart(2)">个人成绩</span>-->
      </el-col>

      <el-col :offset="1" :span="4" class="dialog-box center">
        <el-dialog v-model="popupVisible">
          <!-- 弹窗内容 -->
          <div class="intro-ul-dialog" v-html="introText"></div>
          <el-button class="alert-btn" @click="popupVisible = false">确定</el-button>
        </el-dialog>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px;margin-bottom: 10px;">
      <el-col :span="22" :offset="1" >
        <div class="introduction">
          <el-row v-if="currentPart===1">
            <el-col>
              <p>预测2023年x月x日至2023年x月x日之间每个交易日下列股票的收盘价较上一个交易日的涨跌情况。
                例如，已知贵州茅台（600519.SH）2023年11月6日收盘价为1811.24，预测2023年11月7日收盘价涨还是跌。每个预测任务交易的起止时间为下午17:00到第二日9:00。</p>
              <p>验证资料：新浪财经：
                <span class="url-icon">
                <img src="@/assets/images/link.svg" height="12" style="height:12px">
              </span>
                <a href="#" @click="openURL('https://finance.sina.com.cn/realstock/company/sh600519/nc.shtml')">贵州茅台、</a>
                <span class="url-icon">
                <img src="@/assets/images/link.svg" height="12" style="height:12px">
              </span>
                <a href="#" @click="openURL('https://finance.sina.com.cn/realstock/company/sh601398/nc.shtml')">工商银行、</a>
                <span class="url-icon">
                <img src="@/assets/images/link.svg" height="12" style="height:12px">
              </span>
                <a href="#" @click="openURL('https://finance.sina.com.cn/realstock/company/sz300059/nc.shtml')">东方财富、</a>
                <span class="url-icon">
                <img src="@/assets/images/link.svg" height="12" style="height:12px">
              </span>
                <a href="#" @click="openURL('https://finance.sina.com.cn/realstock/company/sz300750/nc.shtml')">宁德时代、</a>
                <span class="url-icon">
                <img src="@/assets/images/link.svg" height="12" style="height:12px">
              </span>
                <a href="#" @click="openURL('https://finance.sina.com.cn/realstock/company/sz000002/nc.shtml')">万科A</a>
              </p>
            </el-col>
            <el-col>
              <ul class="intro-ul alert-text left" v-if="group === 'experiment'">
              <li>关注者数量：平台上有<span>5个人</span>关注你。</li>
              <li>关注者权利：关注者<span>可以查看</span>你的交易信息和预测结果。</li>
              <li>关注者付费：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，每个关注者将向你支付<span>1个诸葛贝</span>。否则，不支付诸葛贝。</li>
              <li>
                <div class="center-vertically">
                  你目前从关注者获得收益
                  <el-popover
                      placement="top-start"
                      :width="200"
                      trigger="hover"
                  >
                    <div>
                      1.显示的是累计收益 <br> 2.每个预测任务结束时发放本次任务的收益
                    </div>
                    <template #reference>
                      <img src="@/assets/images/question.png" style="margin: 0 2px 0" height="14" alt="提示">
                    </template>
                  </el-popover>
                  ：{{informationInt}}个诸葛贝
                  <img style="margin-left: 2px;" :src=coinUrl height="18" alt="诸葛贝">
                </div>
              </li>
            </ul>
              <ul class="intro-ul alert-text left" v-else-if="group === 'control1'">
                <li>系统奖励依据：系统将根据你的交易信息和预测结果决定是否奖励你诸葛贝。</li>
                <li>系统奖励规则：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，系统将奖励你<span>5个诸葛贝</span>。否则，不奖励诸葛贝。</li>
                <li>
                  <div class="center-vertically">
                    你目前从系统获得奖励
                    <el-popover
                        placement="top-start"
                        :width="200"
                        trigger="hover"
                    >
                      <div>
                        1.显示的是累计奖励 <br> 2.每个预测任务结束时发放本次任务的奖励
                      </div>
                      <template #reference>
                        <img src="@/assets/images/question.png" style="margin: 0 2px 0" height="14" alt="提示">
                      </template>
                    </el-popover>
                    ：{{informationInt}}个诸葛贝
                    <img style="margin-left: 2px;" :src=coinUrl height="18" alt="诸葛贝">
                  </div>
                </li>
              </ul>
              <ul class="intro-ul alert-text left" v-else-if="group === 'control2'">
                <li>关注者数量：平台上有<span>5个人</span>关注你。</li>
                <li>关注者权利：关注者<span>可以查看</span>你的交易信息和预测结果。</li>
                <li>点赞规则：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，每个关注者最多点赞<span>1次</span>。否则，不会点赞。</li>
                <li>
                  <div class="center-vertically">
                    你目前获得的点赞数：{{informationInt}}次
                    <img style="margin-left: 2px;" :src=goodUrl height="18" alt="点赞">
                  </div>
                </li>
              </ul>
              <ul class="intro-ul alert-text left" v-else-if="group === 'control3'">
                <li>系统奖励依据：系统对<span>交易活跃</span>的用户奖励诸葛贝。</li>
                <li>系统奖励规则：如果你在目前这个为期5天的比赛中参与了<span>至少3天</span>的预测，且每天交易次数<span>不低于2次</span>，你会得到<span>10个诸葛贝</span>。</li>
                <li>奖励发放时间：比赛结束时发放诸葛贝奖励</li>
                <li>你累计参与的天数{{informationInt}}天</li>
              </ul>
              <ul class="intro-ul alert-text left" v-else-if="group === 'control4'">
                <li>诸葛贝：诸葛贝是嗨皮诸葛平台独有的一种虚拟货币，主要用来购买合约，并且在有奖金的比赛中，参与者的净收益诸葛贝作为奖金分配依据。</li>
                <li>诸葛贝兑换现金规则：不可以直接用诸葛贝兑换现金。在有奖金的比赛中，系统根据参与者在该比赛中净收益的诸葛贝来分配奖金，分配奖金不会消耗诸葛贝数量。</li>
                <li>合约交易：指参与者根据自己对事件发生与否的判断进行合约买卖。</li>
              </ul>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col class="show-grade">
              <el-row class="center">
                <el-col :span="10" :offset="2">
                  <h2>{{ competition_performance.cash }}</h2>
                  <span>比赛净收益</span>
                </el-col>
                <el-col :span="10">
                  <h2>{{ competition_performance.net_zhuge }}</h2>
                  <span>奖金</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-table :data="competition_performance.activity_rank" class="my-grade-table" :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}">
                <el-table-column prop="activity" label="活动"></el-table-column>
                <el-table-column prop="task" label="任务"></el-table-column>
                <el-table-column label="任务状态">
                  <template v-slot="scope" >
                    <span v-if="scope.row.status" class="over_state">已结束</span>
                    <span v-else class="ing_state">进行中</span>
                  </template>
                </el-table-column>
                <el-table-column prop="profit" label="净收益"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="8" :offset="1" style="margin-top: 5px">
        <span class="part-title">活动列表</span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="22" :offset="1" class="my-card mb-20 ">
        <el-table stripe :data="stock_event.activity_data" class="my-table" :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column prop="name" label="活动名称"></el-table-column>
          <el-table-column label="活动时间">
            <template  v-slot="scope">
              {{ formatDate(scope.row.start_time) }} ~ {{ formatDate(scope.row.end_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="活动状态"></el-table-column>
          <el-table-column>
            <template v-slot="scope" >
              <router-link :to="{path:'/stock_transaction',query:{eventId:eventIdProp,activityId:scope.row.id,groupName:group,infoInt:informationInt}}"
                           class="details center-vertically">
                <span class="my-icon">去预测</span>
                <img src="@/assets/images/enter.svg" height="12" alt="进入">
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row style="margin-top: 50px;"></el-row>
  </div>

  <bottom-nav></bottom-nav>
</template>

<script>
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token';
import { ElDialog, ElButton } from 'element-plus';

export default {
  name: "mobile_stock_predict",
  components: {
    bottomNav,
    ElDialog,
    ElButton,
  },
  props: {
    eventIdProp: {
      required: true
    }
  },
  data() {
    return {
      currentPart:1, // 切换比赛简介或个人成绩
      coinUrl:require('@/assets/images/stock_predict.png'),
      goodUrl:require('@/assets/images/good.svg'),
      introText:'', //分组介绍的文字
      informationInt:0, // 对应接口的information，是对应介绍文字中需要变换的数字
      popupVisible: false, // 控制弹窗显示与隐藏的变量
      firstClick:1, // =1需要弹窗，=0不需要
    };
  },
  watch: {
    group: {
      immediate: true, // 立即执行一次
      handler(newGroup, oldGroup) {
        console.log('old'+oldGroup)
        console.log('new'+newGroup)
        if (newGroup !== oldGroup && newGroup !== undefined) {
          // 在 group 不为空且更新后打开弹窗
          this.open();
        }
      },
    },
  },
  computed:{
    competition_performance(){
      if(typeof this.$store.getters.eventData.performance !== 'undefined'){
        return this.$store.getters.eventData.performance}
      return {
        ranking: '',
        net_zhuge: '',
        cash: '',
        activity_rank: [{
          id: '',
          name: '',
          status: '',
          sub_net_zhuge: ''
        }]
      }
    },
    stock_event() {
      if((typeof this.$store.getters.eventData !== 'undefined') && (typeof this.$store.getters.eventData.activity_data !== 'undefined')){
        return this.$store.getters.eventData;
      }
      return []
    },
    group(){
      if(typeof this.$store.getters.eventData !== 'undefined'){
        return this.$store.getters.eventData.group_info
      }
      return []
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 切换简介和个人成绩
    changePart(page){
      this.currentPart = page
    },
    openURL(url){
      window.open(url);
    },
    // 转换数据为时间格式
    formatDate(dateString) {
      const dateObj = new Date(dateString);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); //月份从0开始，需要+1
      const day = ('0' + dateObj.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },
    // 打开弹窗
    open() {
      // 获取数据后，赋值获取的组别
      if (this.stock_event.length !== 0) {
        this.informationInt = this.stock_event.information
        this.firstClick = this.stock_event.first_click
      }
      else {
        console.log('未获取对应组别。获取内容：', JSON.stringify(this.stock_event))
      }

      // 判断是否开弹窗
      if (this.firstClick == 1) {
        // 实验组
        if (this.group === 'experiment') {
          this.introText = `
          <ul class="alert-text left">
              <li>关注者数量：平台上有<span>5个人</span>关注你。</li>
              <li>关注者权利：关注者<span>可以查看</span>你的交易信息和预测结果。</li>
              <li>关注者付费：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，每个关注者将向你支付<span>1个诸葛贝</span>。否则，不支付诸葛贝。</li>
              <li>
                <div class="center-vertically">
                  你目前从关注者获得收益：` + this.informationInt + `个诸葛贝
                  <img style="margin-left: 2px;" src=` + this.coinUrl + ` height="18" alt="诸葛贝">
                </div>
              </li>
          </ul>
        `
        }
        // 控制组1
        else if (this.group === 'control1') {
          this.introText = `
            <ul class="alert-text left">
                <li>系统奖励依据：系统将根据你的交易信息和预测结果决定是否奖励你诸葛贝。</li>
                <li>系统奖励规则：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，系统将奖励你<span>5个诸葛贝</span>。否则，不奖励诸葛贝。</li>
                <li>
                  <div class="center-vertically">
                    你目前从系统获得奖励：` + this.informationInt + `个诸葛贝
                    <img style="margin-left: 2px;" src=` + this.coinUrl + ` height="18" alt="诸葛贝">
                  </div>
                </li>
            </ul>
          `
        }
        // 控制组2
        else if (this.group === 'control2') {
          this.introText = `
            <ul class="alert-text left">
                <li>关注者数量：平台上有<span>5个人</span>关注你。</li>
                <li>关注者权利：关注者<span>可以查看</span>你的交易信息和预测结果。</li>
                <li>点赞规则：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，每个关注者最多点赞<span>1次</span>。否则，不会点赞。</li>
                <li>
                  <div class="center-vertically">
                    你目前获得的点赞数：` + this.informationInt + `次
                    <img style="margin-left: 2px;" src=` + this.goodUrl + ` height="18" alt="点赞">
                  </div>
                </li>
            </ul>
          `
        }
        // 控制组3
        else if (this.group === 'control3') {
          this.introText = `
            <ul class="alert-text left">
                <li>系统奖励依据：系统对<span>交易活跃</span>的用户奖励诸葛贝。</li>
                <li>系统奖励规则：如果你在目前这个为期5天的比赛中参与了<span>至少3天</span>的预测，且每天交易次数<span>不低于2次</span>，你会得到<span>10个诸葛贝</span>。</li>
                <li>奖励发放时间：比赛结束时发放诸葛贝奖励</li>
                <li>你累计参与的天数` + this.informationInt + `天</li>
            </ul>
          `
        }
        // 控制组4
        else if (this.group === 'control4') {
          this.introText = `
            <ul class="alert-text left">
                <li>诸葛贝：诸葛贝是嗨皮诸葛平台独有的一种虚拟货币，主要用来购买合约，并且在有奖金的比赛中，参与者的净收益诸葛贝作为奖金分配依据。</li>
                <li>诸葛贝兑换现金规则：不可以直接用诸葛贝兑换现金。在有奖金的比赛中，系统根据参与者在该比赛中净收益的诸葛贝来分配奖金，分配奖金不会消耗诸葛贝数量。</li>
                <li>合约交易：指参与者根据自己对事件发生与否的判断进行合约买卖。</li>
            </ul>
          `
        } else {
          this.introText = ''
          console.log('当前组名为' + this.group + '，无匹配介绍文字')
          return // 组别无法判断时，跳出if，不显示弹窗
        }
        // 显示弹窗
        this.popupVisible = true;
      }
    },
  },

  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#F5F8FA')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style');
  }
}
</script>

<style scoped>
@import '../../../assets/CSS/responsive_style.css';

.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  padding: 15px 3% 5px;
  color:#555555;
  font-size: 15px;
  margin-bottom: 0px;
}

.introduction a{
  color: #F59A23;
  cursor: pointer;
}

.introduction a:hover{
  color: rgb(234, 176, 85);
}

.my-table{
  width: 94%;
  margin: 15px 3% 15px;
  font-size: 15px;
}

/*修改element表格样式开始*/
/*表头颜色*/
::v-deep .my-table th{
  background: rgba(245, 154, 36, 0.3);
  padding: 6px 0 5px;
  color: rgba(51, 51, 51, 0.93);
}

/*表头颜色*/
::v-deep .my-grade-table th{
  background: rgba(215, 215, 215, 0.2);
  padding: 6px 0 5px;
  color: rgba(51, 51, 51, 0.93);
}

/*边框圆角*/
::v-deep .el-table th:first-child{
  border-top-left-radius:5px;
  border-bottom-left-radius:5px;
}

::v-deep .el-table th:last-child{
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
}

/*表格内容*/
::v-deep .el-table td, .el-table th{
  padding: 6px 0;
}

/*表格内容*/
::v-deep .my-table td, .my-table th{
  border: none;
}

/*调整斑马纹颜色*/
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td{
  background-color: rgb(248,248,248);
}
/*修改element表格样式结束*/

.details{
  color: #EF9C19;
}

.custom-alert {
  background-color: #fff;
  color: #333;
}

.my-dialog {
  border: 2px solid #f59a23;
  border-radius: 30px;
}

.badge-text {
  font-size: small;
  margin-left: 15px;
  margin-right: 15px;
}

/* 弹窗样式 */
::v-deep .el-dialog {
  border-radius: 10px;
}

.dialog-footer {
  font-size: small;
  text-align: center;
}

.intro-ul{
  margin:15px 0 15px 15px;
}

.intro-ul-dialog{
  margin:15px 5px 15px 15px;
}

/*改dialog宽度*/
.dialog-box >>> .el-dialog{
  width: 80% !important;
}

.dialog-box >>> .el-dialog__body{
  padding: 0 20px 10px;
}

/*提示框的按钮*/
.alert-btn{
  color: #FFFFFF;
  min-height: 30px;
  width: 90px;
  padding: 5px;
  margin-bottom: 5px;
}

.part-title{
  font-size: 21px;
  font-weight: bold;
  color: #333333
}

.box-gray-title{
  color: #AAAAAACD;
}

.url-icon{
  display: inline-block;
  vertical-align: center;
}

.show-grade{
  background-color: rgba(255, 195, 105, 0.07);
  padding: 10px 0 10px;
}

.show-grade span{
  color: #AAAAAA;
  font-size: 12px;
  margin-top: 5px;
}

.my-grade-table{
  margin:15px 0 15px;
}

/*复写全局类*/
.title-box{
  margin-bottom: 10px;
}
</style>
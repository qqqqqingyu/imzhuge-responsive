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
          股价涨跌预测
        </el-row>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :offset="1" :span="17">
        <span class="part-title hand" :class="{'box-gray-title': currentPart === 2}" @click="changePart(1)">比赛简介</span>
        <span class="part-title hand" :class="{'box-gray-title': currentPart === 1}" style="margin-left: 20px"
              @click="changePart(2)">个人成绩</span>
      </el-col>

      <el-col :offset="1" :span="4" class="dialog-box center">
        <el-dialog v-model="popupVisible">
          <!-- 弹窗内容 -->
          <div class="intro-ul" v-html="introText"></div>
          <el-button class="alert-btn" @click="popupVisible = false">确定</el-button>
        </el-dialog>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px;margin-bottom: 10px;">
      <el-col :span="22" :offset="1" >
        <div class="introduction">
          <el-row class="introduction-content" v-if="currentPart===1">
            <p>预测2023年x月x日至2023年x月x日之间每个交易日下列股票的收盘价较上一个交易日的涨跌情况。
              例如，已知贵州茅台（600519.SH）2023年11月6日收盘价为1811.24，预测2023年11月7日收盘价涨还是跌。</p>
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
            <div class="intro-ul" v-html="introText"></div>
          </el-row>
          <el-row v-else>
            <el-col class="show-grade">
              <el-row class="center">
                <el-col :span="10" :offset="2">
                  <h2>50</h2>
                  <span>比赛净收益</span>
                </el-col>
                <el-col :span="10">
                  <h2>100</h2>
                  <span>奖金</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-table :data="grade_list" class="my-grade-table" :header-cell-style="{'text-align':'center'}"
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
        <span class="part-title">股票列表</span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="22" :offset="1" class="my-card mb-20 ">
        <el-table stripe :data="stock_list" class="my-table" :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column prop="code" label="股票代码"></el-table-column>
          <el-table-column prop="stock" label="股票名称"></el-table-column>
          <el-table-column>
            <template v-slot="scope" >
              <router-link :to="{path:'/stock_transaction',query:{eventId:scope.row.b}}" class="details center-vertically">
                <span class="my-icon">去预测</span>
                <img src="@/assets/images/enter.svg" height="6" alt="进入">
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
  data() {
    return {
      currentPart:1, // 切换比赛简介或个人成绩
      coinUrl:require('@/assets/images/stock_predict.png'),
      goodUrl:require('@/assets/images/good.svg'),
      group:'experiment',
      introText:'', //分组介绍的文字
      informationInt:0, // 对应接口的information，是对应介绍文字中需要变换的数字
      popupVisible: false, // 控制弹窗显示与隐藏的变量
    };
  },
  computed:{
    stock_list(){
      return [{
        "code": "600519",
        "stock": "贵州茅台"
      },{
        "code": "601398",
        "stock": "工商银行"
      },{
        "code": "300059",
        "stock": "东方财富"
      },{
        "code": "300750",
        "stock": "宁德时代"
      },{
        "code": "000002",
        "stock": "万科A"
      }]
    },
    grade_list(){
      return[{
        "activity":"活动1",
        "task":"任务1",
        "status":false,
        "profit":20
      },{
        "activity":"活动2",
        "task":"任务2",
        "status":true,
        "profit":10
      }]
    },
    stock_event() {
      if((typeof this.$store.getters.eventData !== 'undefined') && (typeof this.$store.getters.eventData.activity_data !== 'undefined')){
        return this.$store.getters.eventData;
      }
      return []
    },
  },
  mounted() {
    this.getCSRFTokenMethod();
    // 获取数据后，赋值获取的组别。没获取到接口数据就显示默认的。
    if(this.stock_event.length !== 0){
      this.experiment = this.stock_event.group_info
      this.informationInt = this.stock_event.information
    }
    else {
      console.log('未获取对应组别。获取内容：',JSON.stringify(this.stock_event))
    }
    // 弹窗
    this.open();
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
    // 打开弹窗
    open() {
      // 实验组
      if(this.group === 'experiment'){
        this.introText = `
        <ul class="alert-text left">
            <li>关注者数量：平台上有<span>5个人</span>关注你。</li>
            <li>关注者权利：关注者<span>可以查看</span>你的交易信息和预测结果。</li>
            <li>关注者付费：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，每个关注者将向你支付<span>1个诸葛贝</span>。否则，不支付诸葛贝。</li>
            <li>
              <div class="center-vertically">
                你目前从关注者获得收益：`+this.informationInt+`个诸葛贝
                <img style="margin-left: 2px;" src=`+this.coinUrl+` height="18" alt="诸葛贝">
              </div>
            </li>
        </ul>
      `
      }
      // 控制组1
      else if(this.group === 'control1')
        this.introText = `
          <ul class="alert-text left">
              <li>系统奖励依据：系统将根据你的交易信息和预测结果决定是否奖励你诸葛贝。</li>
              <li>系统奖励规则：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，系统将奖励你<span>5个诸葛贝</span>。否则，不奖励诸葛贝。</li>
              <li>
                <div class="center-vertically">
                  你目前从系统获得奖励：`+this.informationInt+`个诸葛贝
                  <img style="margin-left: 2px;" src=`+this.coinUrl+` height="18" alt="诸葛贝">
                </div>
              </li>
          </ul>
        `
      // 控制组2
      else if(this.group === 'control2')
        this.introText = `
          <ul class="alert-text left">
              <li>关注者数量：平台上有<span>5个人</span>关注你。</li>
              <li>关注者权利：关注者<span>可以查看</span>你的交易信息和预测结果。</li>
              <li>点赞规则：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，每个关注者最多点赞<span>1次</span>。否则，不会点赞。</li>
              <li>
                <div class="center-vertically">
                  你目前获得的点赞数：`+this.informationInt+`次
                  <img style="margin-left: 2px;" src=`+this.goodUrl+` height="18" alt="诸葛贝">
                </div>
              </li>
          </ul>
        `
      // 控制组3
      else if(this.group === 'control3')
        this.introText = `
          <ul class="alert-text left">
              <li>系统奖励依据：系统对<span>交易活跃</span>的用户奖励诸葛贝。</li>
              <li>系统奖励规则：如果你在比赛中参与了<span>至少5天</span>的预测，且每天交易次数<span>不低于2次</span>，你会得到<span>50个诸葛贝</span>。</li>
              <li>奖励发放时间：比赛结束时发放诸葛贝奖励</li>
              <li>你累计参与的天数`+this.informationInt+`天</li>
          </ul>
        `
      // 控制组4
      else if(this.group === 'control4')
        this.introText = `
          <ul class="alert-text left">
              <li>合约数量：你可以交易2个合约。<span>合约“涨”</span>代表股票收盘价上涨，<span>合约“跌”</span>代表股票收盘价下跌。</li>
              <li>结算时间：股价涨跌的真实结果会在交易结束当天的下午17点揭晓，同时结算合约收益。</li>
              <li>结算规则：对于真实发生的合约，每个合约有<span>1个诸葛贝</span>收益；反之，没有收益。</li>
          </ul>
        `
      else {
        this.introText = ''
        console.log('当前组名为'+this.group+'，无匹配介绍文字')
      }
      this.popupVisible = true;
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
  padding: 20px 25px 10px;
  color:#555555;
  font-size: small;
  margin-bottom: 0px;
}

.introduction-content {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}

.introduction a{
  color: #F59A23;
  cursor: pointer;
}

.introduction a:hover{
  color: rgb(234, 176, 85);
}

.introduction ul{
  margin-left: 5px;
}

.my-table{
  width: 96%;
  margin: 15px 2% 15px;
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
  padding-left: 40%;
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

</style>
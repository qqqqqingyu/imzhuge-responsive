<template>
  <!--    导航栏-->
  <TheNav :current-page="'competition'"></TheNav>

  <!--    面包屑导航栏开始-->
  <el-row style="margin-top: 80px">
    <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
      您当前的位置：
      <router-link to="/stock_predict">股价涨跌预测</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <span class="cur-de">个股股价涨跌预测</span>
    </el-col>
  </el-row>
  <!--    面包屑导航栏结束-->

  <el-row class="industry-box">
    <el-col :span="20" :offset="2" class="box-title">
        <span>{{company}}</span>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="20" :offset="2">
      <el-row class="chart-and-table pc-card">
<!--                图标切换圆形按钮-->
            <el-col :span="23" v-if="chartOrTable=='table'" class="right">
              <el-button type="warning" icon="el-icon-s-data" circle @click="toChart"
                         class="changed-btn"></el-button>
            </el-col>
            <el-col :span="23" v-else style="text-align: right">
              <el-button type="warning" icon="el-icon-document" circle @click="toTable"
                         class="changed-btn"></el-button>
            </el-col>

<!--                表格-->
            <el-col :span="22" :offset="1" v-if="chartOrTable=='table'" class="price-contact-table">
              <el-table :data="companyRankData"
                        :default-sort="{prop:'price',order:'descending'}"
                        style="width: 100%"
                        size="medium"
                        :header-cell-style="tdstyle"
                        :row-style="{height:'35px'}"
                        :cell-style="{padding: '0'}"
                        class="my-table"
              >
                <el-table-column
                    prop="company_name"
                    label="股票名称"
                    min-width="70%">
                </el-table-column>
                <el-table-column
                    sortable
                    predict_share="price"
                    prop="price"
                    label="价格"
                    min-width="70%">
                  <template v-slot="scope">
                    {{ parseFloat(scope.row.price).toFixed(4) }}
                  </template>
                </el-table-column>
                <el-table-column
                    sortable
                    column-key="predict_share"
                    prop="predict_share"
                    label="我拥有的合约数"
                    min-width="100%">
                </el-table-column>
              </el-table>
            </el-col>
<!--                图-->
            <el-col :span="22" :offset="1" v-else style="margin-top: 15px">
              <el-row>
                <el-col :span="12" id="priceBar"></el-col>
                <el-col :span="12" id="contractBar"></el-col>
              </el-row>
            </el-col>
          </el-row>
    </el-col>
  </el-row>

<!--  介绍文字-->
  <el-row>
    <el-col :span="20" :offset="2" style="background: #FFFFFF;border-radius: 10px;padding: 20px 5% ">
      <div v-html="introText"></div>
    </el-col>
  </el-row>

<!--  参与交易-->
  <el-row>
    <el-col :span="20" :offset="2" class="box-title">
      <span >参与交易</span>
    </el-col>
  </el-row>

  <el-row class="predict-form">
    <el-col :span="20" :offset="2" class="pc-card my-card-pd">
      <el-row>
        <el-col :span="24" class="predict-card ">
            <span>
              活动可用诸葛贝：{{ parseFloat(userCurrentMoney).toFixed(2) }}
            </span>
        </el-col>

        <el-col :span="24">
          <el-row>
            <el-col :span="9">
              <span>【{{ company }}】2023年x月x日收盘价的涨跌预测：</span>
            </el-col>
            <el-col :span="8">
              <el-radio-group v-model="tradeType">
                <el-radio class="predict-radio" label="up">涨</el-radio>
                <el-radio class="predict-radio" label="down">跌</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>

        </el-col>

        <el-col :span="8">
            <span>
              预测的概率：
            </span>
        </el-col>
        <el-col :span="8" :offset="1" style="width: 100%">
          <el-slider v-model.number="tradeProb" class="predict-slider"></el-slider>
        </el-col>

        <el-col :span="8">
          <span>交易份额：</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-input type="text" v-model.number="tradeCount"
                    placeholder="请输入正数"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    class="input-bar"></el-input>
        </el-col>

        <el-col :span="8">
          <span>交易类型：</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-radio-group v-model="tradeType">
            <el-radio class="predict-radio" label="buy">买入</el-radio>
            <el-radio class="predict-radio" label="sell">卖出</el-radio>
          </el-radio-group>
        </el-col>

        <el-col :span="24">
          <span>请问您对上述判断的信心如何？</span>
        </el-col>
        <el-col :offset="9" :span="16">
          <el-radio-group v-model="tradeConfidence">
            <el-row>
              <el-radio class="predict-radio" label="完全瞎猜"></el-radio>
              <el-radio class="predict-radio" label="有点瞎猜"></el-radio>
            </el-row>
            <el-row>
              <el-radio class="predict-radio" label="有点信心"></el-radio>
              <el-radio class="predict-radio" label="很有信心"></el-radio>
            </el-row>
          </el-radio-group>
        </el-col>

        <el-col :span="24">
          <span>交易理由：</span>
        </el-col>
        <el-col :span="24">
          <el-input :rows="3" type="textarea" v-model="note" placeholder="可以说说您为什么要这么交易吗"/>
        </el-col>

        <el-col :span="24" class="submit-btn">
          <el-button type="warning" @click="submitTransactionApplyMethod">
            提交
          </el-button>
        </el-col>
      </el-row>

    </el-col>
  </el-row>
</template>

<script>
import TheNav from "../../../components/TheNav";
import {getCSRFToken} from '@/api/token'

export default {
  name: "pc_stock_participate",
  components: {TheNav},
  data(){
    return{
      echarts:'',
      group:'experiment',
      introText:'', //分组介绍的文字
      informationInt:0, // 对应接口的information，是对应介绍文字中需要变换的数字
      coinUrl:require('@/assets/images/stock_predict.png'),
      goodUrl:require('@/assets/images/good.svg'),
      company:'',
      chartOrTable: 'chart', //用于切换图和表的图标
      getId: '', //获取从前一界面传来的id
      companyRankData: '', //整体情况表的数据
      userCurrentMoney: '', //活动可用诸葛贝
      inputNo1: '', //预测排名第一的公司的id
      tradeProb: 50, //预测的概率
      tradeCount: '', //交易的数量
      tradeType: '', //交易类型
      tradeConfidence: '', //交易信心
      note: '', //交易的笔记
      graphX: [], //x轴数据，时间
      graphY: [], //y轴数据
      historyLegend: [], //图例，公司名
      barCompanyArr: [],//直方图公司名数据
      barPriceArr: [],//直方图价格数据
      barContractArr: [],//直方图合约数据
    }
  },
  computed:{
    stock_event() {
      if((typeof this.$store.getters.eventData !== 'undefined') && (typeof this.$store.getters.eventData.activity_data !== 'undefined')){
        return this.$store.getters.eventData;
      }
      return []
    },
  },
  mounted() {
    this.echarts = require('echarts')
    this.company = this.$route.query.eventId
    this.changeIntroText()
  },
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 更改介绍文字
    changeIntroText(){
      // 获取数据后，赋值获取的组别。没获取到接口数据就显示默认的。
      if(this.stock_event.length !== 0){
        this.experiment = this.stock_event.group_info
        this.informationInt = this.stock_event.information
      }
      else {
        console.log('未获取对应组别。获取内容：',JSON.stringify(this.stock_event))
      }
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
    },
    //切换图表
    toChart() {
      this.chartOrTable = 'chart'
      this.myEcharts1()//价格作图
      this.myEcharts2()//合约作图
    },
    toTable() {
      this.chartOrTable = 'table'
    },

    // 提交数据
    submitTransactionApplyMethod() {
      let industry = {};

      industry.contract_id = this.inputNo1
      industry.trade_prob = this.tradeProb / 100
      industry.count = this.tradeCount
      industry.trade_type = this.tradeType
      industry.trade_confidence = this.tradeConfidence
      industry.note = this.note

      // 数据校验，若不符合条件则终止
      if(industry.contract_id.length==0){
        this.$message({
          type: 'warning',
          message: '请选择公司'
        });
        return;
      }
      if(industry.count.length==0){
        this.$message({
          type: 'warning',
          message: '请输入交易份额'
        });
        return;
      }
      if(industry.trade_type.length==0){
        this.$message({
          type: 'warning',
          message: '请选择交易类型'
        });
        return;
      }
      if(industry.trade_confidence.length == 0){
        this.$message({
          type: 'warning',
          message: '请选择四种自信程度其中的一种'
        });
        return;
      }
      if(industry.note.length < 5){
        this.$message({
          type: 'warning',
          message: '请至少输入5个字的描述内容！'
        });
        return;
      }
      this.getId = this.$route.query.id;
      // 本页面调用接口，提交数据
      // submitTransactionApply(this.getId, industry).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '提交成功！'
      //   });
      //   //刷新
      //   location.reload();
      // }).catch(() => {
      //   console.log('提交失败')
      // })
    },
    //获取数据
    getIndustryDetailMethod() {
      // this.getId=this.$route.query.id;
      // getIndustryDetail(this.getId).then((res) => {
      //   this.industryDetailData = res.data
      //   //获取整体情况表的数据
      //   this.companyRankData = this.industryDetailData.company_rank
      //   //活动可用诸葛贝
      //   this.userCurrentMoney =  this.industryDetailData.user_current_money
      //   //价格直方图数据转换
      //   this.barPriceChange();
      //   //价格，合约作图
      //   this.myEcharts1()//价格作图
      //   this.myEcharts2()//合约作图
      // })
      // .catch((res) => {
      //   console.log(res);
      // });
    },
    //价格数据作图方法
    myEcharts1() {
      this.$nextTick(() => {

        //柱状图
        let barBox = document.getElementById('priceBar');
        // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。更改了原来的写法，暂时不知道能不能行
        barBox.removeAttribute('_echarts_instance_');

        // 基于准备好的dom，初始化echarts实例
        var myChart1 = this.echarts.init(document.getElementById('priceBar'));
        var option1 = {
          xAxis: {
            type: 'value',
            position: 'top'
          },
          yAxis: {
            type: 'category',
            data: this.barCompanyArr
          },
          // 图表移动位置
          grid: {
            left: '1%',
            right: '4%',
            bottom: '13%',
            top: '1%',
            containLabel: true //true表示这些比例包括了坐标轴标签在内所形成的矩形的位置。false则不包括坐标轴
          },
          legend: {
            show:true,
            left:'center',
            bottom:'0'
          },
          series: [{
            name:'价格（按降序排列）',
            data: this.barPriceArr,
            type: 'bar',
            color: '#F0C27B',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            label: {
              show: true,
              color: '#FAF8FF'
            }
          },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
      })
    },
    //合约数量作图方法
    myEcharts2() {
      this.$nextTick(() => {
        //柱状图
        let contractBarBox = document.getElementById('contractBar');
        // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。

        contractBarBox.removeAttribute('_echarts_instance_');
        // 基于准备好的dom，初始化echarts实例
        var myChart2 = this.echarts.init(document.getElementById('contractBar'));
        var option2 = {
          legend: {
            show:true,
            left:'center',
            bottom:'0'
          },
          xAxis: {
            type: 'value',
            position: 'top'
          },
          yAxis: {
            type: 'category',
            data: this.barCompanyArr
          },
          // 图表移动位置
          grid: {
            left: '1%',
            right: '4%',
            bottom: '13%',
            top: '1%',
            containLabel: true //true表示这些比例包括了坐标轴标签在内所形成的矩形的位置。false则不包括坐标轴
          },
          series: [
            {
              name:'我拥有的合约数（按降序排列）',
              data: this.barContractArr,
              type: 'bar',
              color: '#F0C27B',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              },
              label: {
                show: true,
                color: '#FAF8FF'
              }
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
      })
    },
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:rgba(242, 242, 242, 0.35)')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
  },
}
</script>

<style scoped>
.chart-and-table{
  height: 380px;
  padding-top: 20px;
  padding-bottom: 20px;
}

#priceBar {
  width: 98%;
  height: 280px;
  padding-right: 2%;
}

#contractBar {
  width: 98%;
  height: 280px;
  padding-left: 2%;
}

.predict-form .el-col {
  line-height: 40px;
}

.predict-form span {
  line-height: 40px;
}

/*用于覆盖element原有按钮高度的自定义类*/
.changed-btn {
  min-height: 40px;
  min-width: 40px;
}

.company-select {
  width: 100%;
}

.submit-btn {
  text-align: center;
  margin-top: 10px;
}

.submit-btn .el-button--warning{
  background-color: #F7C578;
  border-color: #F7C578;
}

/*修改element滑动条样式*/
.my-scroll >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

.info-part{
  font-size: 13px;
  line-height: 20px;
  margin-top: 10px;
}

.info-part >>> .el-scrollbar__wrap{
  overflow-x: hidden;
}

/*修改element分隔线样式*/
.choose >>>.el-divider--horizontal{
  margin-top: 10px;
  margin-bottom: 10px;
}

.el-select-dropdown__item.selected{
  color: #EF9C19;
}

/*element按钮*/
.el-button.is-circle {
  padding: 5px;
}

/*选择器*/
.company-select >>> .el-input__inner {
  /*height: 30px;*/
  padding-left: 10px;
  padding-right: 10px;
}

/*覆盖element原有长条样式开始*/
.predict-slider >>> .el-slider__bar {
  background: #F0C27B;
}

.predict-slider >>> .el-slider__button {
  border: 2px solid #F0C27B
}
/*覆盖element原有长条样式结束*/

/*覆盖element原有单选框样式开始*/
/*改变单选框颜色*/
.predict-radio >>> .el-radio__input.is-checked .el-radio__inner {
  background: #F0C27B !important;
  border-color: #F0C27B !important;
}

.predict-radio >>> .el-radio__input.is-checked + .el-radio__label {
  color: #F0C27B !important;
}
/*覆盖element原有单选框样式结束*/
</style>
<template>
  <!--    导航栏-->
  <TheNav :current-page="'competition'"></TheNav>

  <!--    面包屑导航栏开始-->
  <el-row style="margin-top: 80px">
    <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
      您当前的位置：
      <router-link to="/competition_center">赛事中心</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <router-link :to="{path:'/stock_predict',query:{eventId:eventId}}">股价涨跌预测</router-link>
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
    <el-col :span="20" :offset="2" class="my-tab">
      <el-tabs @tab-click="handleClick" v-model="activeName1">
        <el-tab-pane label="整体情况" name="first">
          <el-row class="chart-and-table pc-card">
            <!--              图标切换圆形按钮-->
            <el-col :span="23" v-if="chartOrTable=='table'" style="text-align: right">
              <el-button type="warning" icon="el-icon-s-data" circle @click="toChart"
                         class="changed-btn"></el-button>
            </el-col>
            <el-col :span="23" v-else style="text-align: right">
              <el-button type="warning" icon="el-icon-document" circle @click="toTable"
                         class="changed-btn"></el-button>
            </el-col>

            <!--              表格-->
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
        </el-tab-pane>

        <el-tab-pane label="历史走势" name="second">
          <el-row class="chart-and-table pc-card">
            <div id="history"></div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

<!--  介绍文字-->
  <el-row v-if="group !== undefined">
    <el-col :span="20" :offset="2" style="background: #FFFFFF;border-radius: 10px;padding: 20px 5% ">
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
            <el-col :span="11">
              <span>{{ company }}：</span>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-radio-group v-model="inputUpOrDown">
                <el-radio class="predict-radio"
                          v-for="item in companyRankData"
                          :key="item.company_contract_id"
                          :label="item.company_contract_id">
                  {{item.company_name}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>

        </el-col>

        <el-col :span="11">
            <span>
              预测的概率：
            </span>
        </el-col>
        <el-col :span="8" :offset="1" style="width: 100%">
          <el-slider v-model.number="tradeProb" class="predict-slider"></el-slider>
        </el-col>

        <el-col :span="11">
          <span>交易份额：</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-input type="text" v-model.number="tradeCount"
                    placeholder="请输入正数"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    class="input-bar"></el-input>
        </el-col>

        <el-col :span="11">
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
        <el-col :offset="12" :span="12">
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
          <el-button :disabled="isDisabled"  type="warning" @click="postCompTransactionMethod">
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
import {postCompetitionTransaction, getCompetitionDetail} from "../../../api/competition";

export default {
  name: "pc_stock_transaction",
  components: {TheNav},
  data(){
    return{
      eventId:this.$route.query.eventId,
      activityId:this.$route.query.activityId,
      isDisabled: false,
      echarts:'',
      activeName1: 'first', //用于切换行业el-tabs
      activeName2: 'first', //用于切换行业信息el-tabs
      barRadio: '价格', //用于切换价格和合约图的图标
      priceOrContract: 'price',
      group:'',
      informationInt:'', // 对应接口的information，是对应介绍文字中需要变换的数字
      coinUrl:require('@/assets/images/stock_predict.png'),
      goodUrl:require('@/assets/images/good.svg'),
      company:'',
      chartOrTable: 'chart', //用于切换图和表的图标
      getId: '', //获取从前一界面传来的id
      companyRankData: '', //整体情况表的数据
      userCurrentMoney: '', //活动可用诸葛贝
      inputUpOrDown: '', //预测上涨或下跌
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
    this.group = this.$route.query.groupName
    this.informationInt = this.$route.query.infoInt
    // 获取数据的方法。数据转化及作图的方法在该方法中
    this.getCompetitionDetailMethod();
  },
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
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

    //点击切换行业tab时调用该方法
    handleClick(tab) {
      if (tab.index == '0'){
        this.myEcharts1()//价格作图
        this.myEcharts2()//合约作图
      }
      else if(tab.index == '1'){
        this.myEcharts3();
      }
    },
    //点击切换行业信息tab时调用该方法
    infoClick(tab) {
      if (tab.index == '2'){
        this.myCandleStick();
      }
      else if(tab.index == '1'){
        this.myHeatMap();
      }
    },
    tdstyle({row, column, rowIndex}) {
      if (rowIndex === 0) {
        return "background-color:RGB(245,248,250);height:40px;padding:1px;color:#555555";
      }
    },
    // 提交数据
    postCompTransactionMethod() {
      let industry = {};

      industry.contract_id = this.inputUpOrDown
      industry.trade_prob = this.tradeProb / 100
      industry.count = this.tradeCount
      industry.trade_type = this.tradeType
      industry.trade_confidence = this.tradeConfidence
      industry.note = this.note
      industry.contract_price = this.companyRankData.find(rank => rank.company_contract_id === this.inputNo1).price

      // 数据校验，若不符合条件则终止
      if(industry.contract_id.length==0){
        this.$alert('请选择预测结果', '交易失败', {
          confirmButtonText: '确定',
          customClass: 'AlertBox',
        });
        return;
      }
      if(industry.count.length==0){
        this.$alert('请输入交易份额', '交易失败', {
          confirmButtonText: '确定',
          customClass: 'AlertBox',
        });
        return;
      }
      if(industry.trade_type.length==0){
        this.$alert('请选择交易类型', '交易失败', {
          confirmButtonText: '确定',
          customClass: 'AlertBox',
        });
        return;
      }
      if(industry.trade_confidence.length == 0){
        this.$alert('请选择四种自信程度其中的一种', '交易失败', {
          confirmButtonText: '确定',
          customClass: 'AlertBox',
        });
        return;
      }
      if(industry.note.length < 5){
        this.$alert('请至少输入5个字的描述内容！', '交易失败', {
          confirmButtonText: '确定',
          customClass: 'AlertBox',
        });
        return;
      }
      // 设置按钮不可用
      this.isDisabled = true
      // 本页面调用接口，提交数据
      postCompetitionTransaction(this.eventId,this.activityId, industry).then((res) => {
        const statusMsg = res.msg;
        if(statusMsg === '交易成功！'){
          this.$alert('恭喜您，交易成功！', '交易成功', {
            confirmButtonText: '确定',
            customClass: 'AlertBox',
            callback: action => {
              if (action === 'confirm') {
                // 在点击确认按钮后刷新页面
                location.reload();
                this.isDisabled = false;
              }
            }
          });
        } else {
          this.$alert(res.msg, '交易失败', {
            confirmButtonText: '确定',
            customClass: 'AlertBox',
            callback: action => {
              if (action === 'confirm') {
                // 在点击确认按钮后刷新页面
                location.reload();
                this.isDisabled = false;
              }
            }
          });
        }
      }).catch((error) => {
        this.isDisabled = false;
      });
    },
    //获取数据
    getCompetitionDetailMethod() {
      getCompetitionDetail(this.eventId, this.activityId).then((res) => {
        this.compDetailData = res.data
        //获取整体情况表的数据
        this.companyRankData = this.compDetailData.company_rank
        //标题
        this.company =  this.compDetailData.title
        //活动可用诸葛贝
        this.userCurrentMoney =  this.compDetailData.user_current_money
        //获取历史数据表x轴数据
        this.graphX = this.compDetailData.graph_x
        //历史数据表，把取到的数据放入自定义方法graphYChange中，转换成所需格式的y轴数据graphY和图例数据historyLegend
        this.graphYChange(this.compDetailData.graph_y)
        //价格直方图数据转换
        this.barPriceChange();
        //价格，合约作图
        this.myEcharts1()//价格作图
        this.myEcharts2()//合约作图
      })
          .catch((res) => {
            console.log(res);
          });
    },

    // 数据转换方法
    // 历史数据图y轴数据对应的对象数组样式转换
    graphYChange(YData) {
      let legendstr = '';

      for (const item of YData) {
        // y轴数据的转化
        this.graphY.push({
          type: 'line',
          name: item.contract_text,
          data: item.contract_price,
          areaStyle: {}
        })
        // 图例的转化
        legendstr += item.contract_text + "|";
      }

      legendstr = legendstr.substring(0, legendstr.length - 1);
      this.historyLegend = legendstr.split("|");
    },
    // 直方图及表格的价格数据转换
    barPriceChange() {
      //公司名数据
      let company = [];
      //价格数据
      let barPrice = [];
      //合约数量数据
      let contract = [];

      //数组排序
      this.companyRankData.sort(function(a, b) {
        return a.price - b.price;
      });

      //数据放入数组
      this.companyRankData.forEach(function (e) {
        company.push(e.company_name) //公司名
        barPrice.push(parseFloat(e.price).toFixed(4)) //价格
        contract.push(parseFloat(e.predict_share)) //拥有的合约数
      });

      this.barCompanyArr = company
      this.barPriceArr = barPrice
      this.barContractArr = contract
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
    //历史数据图作图方法
    myEcharts3() {
      let historyBox = document.getElementById('history');
      // 保证宽度正常显示的方法。
      historyBox.style.width = window.innerWidth * 0.8 + 'px'

      // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。
      historyBox.removeAttribute('_echarts_instance_');

      // 基于准备好的dom，初始化echarts实例
      var myChart3 = this.echarts.init(document.getElementById('history'));
      var option3 = {
        // 鼠标对应的交叉线
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          // 将提示框限制在图表的区域内
          confine: true,
        },
        // 图例
        legend: {
          data: this.historyLegend
        },
        // 图表移动位置
        grid: {
          left: '3%',
          right: '3%',
          bottom: '1%',
          top:'20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: this.graphX,
        },
        yAxis: {
          type: 'value',
          splitLine: { //修改背景线条样式
            show: true,//是否展示
            lineStyle: {
              color: "#BFC2C7",//线条颜色
              // type:"dashed"//线条样式，默认实线，dashed虚线
            }
          },
        },
        series: this.graphY,
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart3.setOption(option3);
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

#history {
  margin-top: 20px;
  width: 100%;
  height: 290px;
}

.predict-form .el-radio {
  line-height: 30px;
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
/*覆盖单选框颜色*/
.predict-radio >>> .el-radio__input.is-checked .el-radio__inner {
  background: #F0C27B !important;
  border-color:#F0C27B !important;
}

.predict-radio >>> .el-radio__input.is-checked + .el-radio__label {
  color: #F0C27B !important;
}
/*覆盖element原有单选框样式结束*/


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

/*覆盖element原有tab样式结束*/
</style>

<style>
@import '../../../assets/CSS/MessageBox.css';
</style>
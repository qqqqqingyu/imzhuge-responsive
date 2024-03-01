<template>
  <div>
<!--    导航栏-->
    <TheNav :current-page="'competition'"></TheNav>

<!--    面包屑导航栏开始-->
    <el-row style="margin-top: 80px">
      <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
        您当前的位置：
        <router-link to="/competition_center">赛事中心</router-link>
        <img src="@/assets/images/right.svg" alt="下级" height="25">
        <router-link :to="{path:'/competition_details',query:{eventId:eventId}}">比赛详情</router-link>
        <img src="@/assets/images/right.svg" alt="下级" height="25">
        <span class="cur-de">参与交易</span>
      </el-col>
    </el-row>
<!--    面包屑导航栏结束-->

    <el-row class="industry-box">
      <el-col :span="20" :offset="2" class="box-title">
        <span>
          {{compDetailData.title}}
        </span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px;" v-if="compDetailDesc !== ''">
      <el-col :span="20" :offset="2" class="introduction">
        <p>{{ compDetailDesc }}</p>
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

    <!--    数据可视化，先注释，不确定之后要不要-->
    <!--    <el-row class="box-title">-->
    <!--      <el-col :span="9" :offset="2">-->
    <!--        <span >-->
    <!--          行业信息-->
    <!--        </span>-->
    <!--      </el-col>-->
    <!--    </el-row>-->

    <!--    <el-row>-->
    <!--      <el-col :span="20" :offset="2" class="my-tab">-->
    <!--        <el-tabs @tab-click="infoClick" v-model="activeName2">-->

    <!--          <el-tab-pane label="技术指标" name="first">-->
    <!--            <el-row class="pc-card my-card-pd">-->
    <!--              <el-col class="grey-border" :span="24">-->
    <!--                <el-row>-->
    <!--                  <el-col :span="10">-->
    <!--                    <el-row>-->
    <!--                      <el-col class="center-vertically">-->
    <!--                        <img class="my-icon" src="@/assets/images/rectangle.svg" height="8">-->
    <!--                        <span class="part-title">指标</span>-->
    <!--                      </el-col>-->
    <!--                      <el-col class="my-tip">-->
    <!--                        选择展示的指标-->
    <!--                      </el-col>-->
    <!--                      <el-col :span='18' class="grey-border-smaller margin-bottom-5">-->
    <!--                        <span class="suggest-title">-->
    <!--                            建议<i class="el-icon-question" style="color:#ea896c "></i>-->
    <!--                          </span>-->
    <!--                        <el-scrollbar style="height:30px">-->
    <!--                          <el-checkbox-group v-model="factorSelected" class="my-checkbox predict-radio" style="margin-top: 10px!important;">-->
    <!--                            <el-checkbox-button v-for="factor in suggestFactors" :key="factor" :label="factor">-->
    <!--                              {{factor}}-->
    <!--                            </el-checkbox-button>-->
    <!--                          </el-checkbox-group>-->
    <!--                        </el-scrollbar>-->
    <!--                      </el-col>-->
    <!--                      <el-col>-->
    <!--                        <el-scrollbar style="height:100px">-->
    <!--                          <el-checkbox-group v-model="factorSelected" class="my-checkbox predict-radio" :max="2" :min="1">-->
    <!--                            <el-tooltip content="10日简单移动平均线" placement="top" v-for="factor in allFactors" :key="factor" popper-class="tip-class" effect="light">-->
    <!--                              <el-checkbox-button  :label="factor">-->
    <!--                                {{factor}}-->
    <!--                              </el-checkbox-button>-->
    <!--                            </el-tooltip>-->
    <!--                          </el-checkbox-group>-->
    <!--                        </el-scrollbar>-->

    <!--                      </el-col>-->
    <!--                      <el-col class="center-vertically margin-top-10">-->
    <!--                        <img class="my-icon" src="@/assets/images/rectangle.svg" height="8">-->
    <!--                        <span class="part-title" >公司</span>-->
    <!--                      </el-col>-->
    <!--                      <el-col class="my-tip" >-->
    <!--                        选择展示的公司-->
    <!--                      </el-col>-->
    <!--                      <el-col>-->
    <!--                        <el-checkbox-group v-model="companySelected" class="my-checkbox predict-radio" :min="1">-->
    <!--                          <el-checkbox-button v-for="industryCompany in industryCompanys" :label="industryCompany" :key="industryCompany" >-->
    <!--                            {{industryCompany}}-->
    <!--                          </el-checkbox-button>-->
    <!--                        </el-checkbox-group>-->
    <!--                      </el-col>-->


    <!--                    </el-row>-->
    <!--                  </el-col>-->
    <!--                  <el-col :span="14" >-->
    <!--                    &lt;!&ndash;                    作图位置&ndash;&gt;-->
    <!--                    <el-row>-->
    <!--                      &lt;!&ndash;                      <div id="only-one-factor"></div>&ndash;&gt;-->
    <!--                      <div id="only-one-factor" v-bind:style="{ height: chartHeight }"></div>-->
    <!--                      <div id="two-factor" v-bind:style="{ 'height': chartHeight, 'margin-top': '10px' }" v-if="factorSelected.length==2"></div>-->
    <!--                    </el-row>-->
    <!--                  </el-col>-->


    <!--                </el-row>-->
    <!--              </el-col>-->
    <!--            </el-row>-->

    <!--          </el-tab-pane>-->

    <!--          <el-tab-pane label="指标排名" name="second">-->
    <!--            <el-row class="pc-card my-card-pd">-->
    <!--              <el-col class="grey-border" :span="9">-->
    <!--                <el-row>-->
    <!--                  <el-col class="center-vertically">-->
    <!--                    <img class="my-icon" src="@/assets/images/rectangle.svg" height="8">-->
    <!--                    <span class="part-title">指标</span>-->
    <!--                  </el-col>-->
    <!--                  <el-col class="my-tip">-->
    <!--                    选择热力图展示的指标-->
    <!--                  </el-col>-->

    <!--                  <el-col class="choose">-->
    <!--                    <el-scrollbar style="height: 80px" class="my-scroll">-->
    <!--                      <el-checkbox-group v-model="heatFactors" class="my-checkbox predict-radio">-->
    <!--                        <el-checkbox-button v-for="heatShowFactors in heatShowFactors" :label="heatShowFactors" :key="heatShowFactors" >{{heatShowFactors}}</el-checkbox-button>-->
    <!--                      </el-checkbox-group>-->
    <!--                    </el-scrollbar>-->
    <!--                    <el-row>-->
    <!--                      <el-col :span="8" :offset="16" class="center-vertically analysis_button"-->
    <!--                              @click="showHeat">-->
    <!--                        <img src="@/assets/images/an.svg" height="20" class="hand my-icon">-->
    <!--                        <a herf="#" class="hand">查看排名</a>-->
    <!--                      </el-col>-->
    <!--                    </el-row>-->
    <!--                    <el-divider></el-divider>-->
    <!--                  </el-col>-->

    <!--                  <el-col :span="16" style="line-height: 25px">-->
    <!--                    <span style="font-size: 17px">{{ factorEng }}</span>-->
    <!--                    <span style="font-size: 12px;color: #606266;margin-left: 10px">{{ factorTitle }}</span>-->
    <!--                  </el-col>-->

    <!--                  <el-col :span="8" class="right">-->
    <!--                    <el-select v-model="factorEng" @change="changeFactor" placeholder="请选择" size="mini">-->

    <!--                      <el-option-->
    <!--                          v-for="(content,factor) in factorsInfo"-->
    <!--                          :key="factor"-->
    <!--                          :label="factor"-->
    <!--                          :value="factor">-->
    <!--                      </el-option>-->
    <!--                    </el-select>-->
    <!--                  </el-col>-->

    <!--                  <el-col class="info-part">-->
    <!--                    <el-scrollbar style="height: 80px" class="my-scroll">-->
    <!--                      {{ factorContent }}-->
    <!--                    </el-scrollbar>-->
    <!--                  </el-col>-->
    <!--                </el-row>-->
    <!--              </el-col>-->

    <!--              <el-col :span="15">-->
    <!--                <div class="grey-border" style="margin-left: 2%">-->
    <!--                  <div id="my-heat-map"></div>-->
    <!--                </div>-->
    <!--              </el-col>-->
    <!--            </el-row>-->
    <!--          </el-tab-pane>-->

    <!--          <el-tab-pane label="股价信息" name="third">-->
    <!--            <el-row class="pc-card my-card-pd">-->
    <!--              <el-col class="grey-border" :span="24">-->
    <!--                <el-row>-->
    <!--                  <el-col class="center-vertically">-->
    <!--                    <img class="my-icon" src="@/assets/images/rectangle.svg" height="8">-->
    <!--                    <span class="part-title">公司列表</span>-->
    <!--                  </el-col>-->

    <!--                  <el-col :span="8">-->
    <!--                    <el-row class="stock-container">-->
    <!--                      &lt;!&ndash;                概览&ndash;&gt;-->
    <!--                      <el-col :span="20">-->
    <!--                        &lt;!&ndash;                    一个行一个公司&ndash;&gt;-->
    <!--                        <el-scrollbar style="height:300px">-->
    <!--                          <el-row  class="grey-border-small margin-bottom-5" v-for="(item,index) in companyCloseList" :key="index">-->
    <!--                            <el-col :span="8">-->
    <!--                              <el-row>-->
    <!--                                <span class="stock-id">{{item.stock_id}}</span>-->
    <!--                              </el-row>-->
    <!--                              <el-row>-->
    <!--                                <span class="company-name">{{item.company}}</span>-->
    <!--                              </el-row>-->
    <!--                            </el-col>-->
    <!--                            <el-col :span="11">-->

    <!--                              &lt;!&ndash;                          这里将来可放置作图代码&ndash;&gt;-->
    <!--                              <div :id="'close-chart-' + index" style="width: 100%;height: 40px;"></div>-->

    <!--                            </el-col>-->
    <!--                            <el-col :span="5">-->
    <!--                              <el-row>-->
    <!--                                <span class="price-open">{{item.close}}</span>-->
    <!--                              </el-row>-->
    <!--                            </el-col>-->
    <!--                          </el-row>-->

    <!--                        </el-scrollbar>-->

    <!--                      </el-col>-->
    <!--                    </el-row>-->
    <!--                  </el-col>-->
    <!--                  <el-col :span="16">-->
    <!--                    <div id="my-candle-stick"></div>-->
    <!--                  </el-col>-->

    <!--                </el-row>-->
    <!--              </el-col>-->
    <!--            </el-row>-->
    <!--          </el-tab-pane>-->
    <!--        </el-tabs>-->
    <!--      </el-col>-->
    <!--    </el-row>-->

    <el-row>
      <el-col :span="20" :offset="2" class="box-title">
        <span >参与交易</span>
      </el-col>
    </el-row>

    <el-row class="predict-form">
      <el-col :span="20" :offset="2" class="pc-card my-card-pd">
        <el-row>
          <el-col :span="24">
            <span>
              活动可用诸葛贝：{{parseFloat(userCurrentMoney).toFixed(2)}}
            </span>
          </el-col>

          <el-col :span="8">
            <span>请选择您的预测结果：</span>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-select v-model="inputNo1" placeholder="请选择" class="company-select">
              <el-option
                  v-for="item in companyRankData"
                  :key="item.company_contract_id"
                  :label="item.company_name"
                  :value="item.company_contract_id"
                  style="width:inherit">
              </el-option>
            </el-select>
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
            <el-button :disabled="isDisabled" type="warning" @click="postCompTransactionMethod">
              提交
            </el-button>
          </el-col>
        </el-row>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import {postCompetitionTransaction} from "../../../api/competition";
import {getCompetitionDetail} from "../../../api/competition";
import {getCSRFToken} from '@/api/token'
import factorsJson from '@/assets/factors.json'
import axios from 'axios';
import TheNav from "../../../components/TheNav";

export default {
  name: "pc_competition_transaction",
  components: {TheNav},
  data() {
    return {
      eventId:this.$route.query.eventId,
      activityId:this.$route.query.activityId,
      echarts:'',
      isDisabled: false,
      compDetailDesc: '', // 活动描述
      activeName1: 'first', //用于切换行业el-tabs
      activeName2: 'first', //用于切换行业信息el-tabs
      barRadio: '价格', //用于切换价格和合约图的图标
      chartOrTable: 'chart', //用于切换图和表的图标
      priceOrContract: 'price',
      getId: '', //获取从前一界面传来的id
      factorsInfo: factorsJson, // 存储因子解释的json数据
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
      factorTitle:'开盘价', // 选择查看含义的指标
      factorEng:'SMA', //指标英文
      factorContent:'',
      compDetailData:'',
      heatFactors:['sma_10', 'sma_5', 'sma_20', 'macd_1','macd_2','macd_3','ema_5','ema_10'],
      heatShowFactors:['sma_10', 'sma_5', 'sma_20', 'macd_1','macd_2','macd_3','ema_5','ema_10','ema_20','K_5',
        'D_3','K_10','D_5','K_20','D_10','R_5','R_10','R_20','mom_5','mom_10','mom_20','ROC_5','ROC_10','ROC_20',
        'cci_5','cci_10','cci_20','wma_5','wma_10','wma_20'],
      heatCompanies:['中国平安', '中国人寿', '东方财富', '中信证券', '中国人保', '中国太保', '中金公司'], // 热力图公司数据
      industryCompanys:['中国平安','中国人寿','东方财富','中信证券','中国人保','中国太保','中金公司'],//该行业内的公司
      //lmm
      companySelected:['中国平安'],//选中的公司
      factorSelected:['sma_10'],//选中的因子
      allFactors:['sma_10','sma_5','sma_20','macd_1','macd_2','macd_3','ema_5','ema_10','ema_20','K_5','D_3','K_10','D_5','K_20','D_10',
        'R_5','R_10','R_20','mom_5','mom_10','mom_20','ROC_5','ROC_10','ROC_20','cci_5','cci_10','cci_20','wma_5','wma_10','wma_20',
        'rsi_5','rsi_10','rsi_20','upperbound_5','middleband_5','lowerband_5','upperbound_10','middleband_10','lowerband_10',
        'upperbound_20','middleband_20','lowerband_20','current_radio','quick_radio','ar_turn','op_income','roa','debt_to_assets'],
      suggestFactors:['sma_5','sma_20'],
      factorAndCompanyData_1:[],//在一个技术指标，对比不同公司
      factorAndCompanyData_2:[],//在两个技术指标，对比不同公司
      onlyOneFactorChart:{},//存放选择一个指标时的图表
      companyCloseList:[],//存放不同公司股票收盘价数据
      closeCharts:[],
      
    }
  },
  computed: {
    //lmm根据所选技术指标的个数改变高度
    chartHeight() {
      if (this.factorSelected.length == 1) {
        return '360px';
      }
      else {
        return '175px';
      }
    }
  },
  watch: {
    // 每当 heatFactors 改变时，这个函数就会执行
    // heatFactors() {
    //   this.myHeatMap()
    // }
    //lmm
    //每当 factorSelected 改变时，这个函数就会执行
    factorSelected(){
      this.getFactorAndCompanyData();
    },
    //每当 companySelected 改变时，这个函数就会执行
    companySelected(){
      this.getFactorAndCompanyData();
      this.getTwoFactorData();
      this.getOnlyOneFactorData();
    }

  },
  mounted() {
    this.echarts = require('echarts')
    this.getCSRFTokenMethod();
    // 展示指标含义
    // this.changeFactor()
    // 获取数据的方法。数据转化及作图的方法在该方法中
    this.getCompetitionDetailMethod();
    // k线图
    // this.myCandleStick();
    //lmm
    //获取一个指标下，不同公司的数据
    // this.getFactorAndCompanyData();
    // this.getCompanyCloseData();
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
  methods: {
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

    // 提交因子，重做热力图
    showHeat(){
      this.myHeatMap()
    },
    // 下拉列表内容改变时，改变中文解释和含义的值
    changeFactor(){
      let choosedFactor = this.factorsInfo[this.factorEng]
      this.factorTitle = choosedFactor.factorCn
      this.factorContent = choosedFactor.content
    },

    // 提交数据
    postCompTransactionMethod() {
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
          message: '请选择预测结果'
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
      // 设置按钮不可用
      this.isDisabled = true
      // 本页面调用接口，提交数据
      postCompetitionTransaction(this.eventId,this.activityId, industry).then((res) => {
        const statusCode = res.code;
        let message;
        let title;
        if(statusCode === '200' || statusCode === 20000){
          message = '';
          title = '交易成功';
          // this.$message({
          //   type: 'success',
          //   message: '交易成功'
          // });
        }
        this.$alert(message, title, {
          confirmButtonText: '确定',
          customClass: 'AlertBox'
        });
          //刷新
        location.reload();
        this.isDisabled = false;
        })
    },
    //获取数据
    getCompetitionDetailMethod() {
      getCompetitionDetail(this.eventId,this.activityId).then((res) => {
        this.compDetailData = res.data
        //获取整体情况表的数据
        this.companyRankData = this.compDetailData.company_rank
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
        console.log('compDetailData.desc:'+this.compDetailData.desc)
        // 获取活动描述
        if(this.compDetailData.desc !== null){
          this.compDetailDesc = this.compDetailData.desc
        }
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
    // 保留n位小数
    numFilter(value, n) {
      return parseFloat(value).toFixed(n)
    },

    //作图方法，还没设置数据
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
    // 热力图作图方法
    myHeatMap(){
      // 假数据

      const data = [[0, 0, 5], [0, 1, 1], [0, 2, 3], [0, 3, 7], [0, 4, 3], [0, 5, 1], [0, 6, 2], [0, 7, 5], [0, 8, 7], [0, 9, 1], [0, 10, 3], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 3], [1, 2, 2], [1, 3, 7], [1, 4, 2], [1, 5, 3], [1, 6, 5], [1, 7, 1], [1, 8, 3], [1, 9, 5], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 3], [4, 16, 4], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
          .map(function (item) {
            return [item[1], item[0], item[2] || '-'];
          });

      console.log('data:'+data)

      let heatMapBox = document.getElementById('my-heat-map');
      // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。
      heatMapBox.removeAttribute('_echarts_instance_');
      // 保证宽度正常显示的方法。
      heatMapBox.style.width = window.innerWidth * 0.5 + 'px'
      let myHeatMap = this.echarts.init(document.getElementById('my-heat-map'));
      let optionHeatMap = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '50%',
          top: '3%'
        },
        xAxis: {
          type: 'category',
          data: this.heatFactors,
          splitArea: {
            show: true
          },
          axisLabel:{
            interval:0, // x轴全部显示
            rotate:45 // x轴旋转角度
          }
        },
        dataZoom: [
          // 鼠标拉动缩放
          {
            type: "slider",
            height: 20,
            // 缩放图标
            handleIcon:
                'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '120%'  // 图标大小
          },
          // 滚动缩放
          {
            type: 'inside',
            xAxisIndex: [0, 1],
          }
        ],
        yAxis: {
          type: 'category',
          data: this.heatCompanies,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 7,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          //自定义热力图颜色
          inRange:{
            color: ['#FF8553','#FF957A','#FFA8A1','#FFF7F2',]

          }
        },
        series: [
          {
            name: '指标排名',
            type: 'heatmap',
            data: data,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myHeatMap.setOption(optionHeatMap);
    },
    // K线图数据转换
    calculateMA(dayCount, data) {
      let result = [];
      for (let i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
          sum += +data[i - j][1];
        }
        result.push((sum / dayCount).toFixed(2));
      }
      return result;
    },
    // K线图作图方法
    myCandleStick(){
      // 假数据
      const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
      const labelFont = 'bold 12px Sans-serif';

      const dates = ["2016-03-29", "2016-03-30", "2016-03-31", "2016-04-01", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", "2016-04-08", "2016-04-11", "2016-04-12", "2016-04-13", "2016-04-14", "2016-04-15", "2016-04-18", "2016-04-19", "2016-04-20", "2016-04-21", "2016-04-22", "2016-04-25", "2016-04-26", "2016-04-27", "2016-04-28", "2016-04-29", "2016-05-02", "2016-05-03", "2016-05-04", "2016-05-05", "2016-05-06", "2016-05-09", "2016-05-10", "2016-05-11", "2016-05-12", "2016-05-13", "2016-05-16", "2016-05-17", "2016-05-18", "2016-05-19", "2016-05-20", "2016-05-23", "2016-05-24", "2016-05-25", "2016-05-26", "2016-05-27", "2016-05-31", "2016-06-01", "2016-06-02", "2016-06-03", "2016-06-06", "2016-06-07", "2016-06-08", "2016-06-09", "2016-06-10", "2016-06-13", "2016-06-14", "2016-06-15", "2016-06-16", "2016-06-17", "2016-06-20", "2016-06-21", "2016-06-22"];

      const data = [[17512.58, 17633.11, 17434.27, 17642.81, 86160000], [17652.36, 17716.66, 17652.36, 17790.11, 79330000], [17716.05, 17685.09, 17669.72, 17755.7, 102600000], [17661.74, 17792.75, 17568.02, 17811.48, 104890000], [17799.39, 17737, 17710.67, 17806.38, 85230000], [17718.03, 17603.32, 17579.56, 17718.03, 115230000], [17605.45, 17716.05, 17542.54, 17723.55, 99410000], [17687.28, 17541.96, 17484.23, 17687.28, 90120000], [17555.39, 17576.96, 17528.16, 17694.51, 79990000], [17586.48, 17556.41, 17555.9, 17731.63, 107100000], [17571.34, 17721.25, 17553.57, 17744.43, 81020000], [17741.66, 17908.28, 17741.66, 17918.35, 91710000], [17912.25, 17926.43, 17885.44, 17962.14, 84510000], [17925.95, 17897.46, 17867.41, 17937.65, 118160000], [17890.2, 18004.16, 17848.22, 18009.53, 89390000], [18012.1, 18053.6, 17984.43, 18103.46, 89820000], [18059.49, 18096.27, 18031.21, 18167.63, 100210000], [18092.84, 17982.52, 17963.89, 18107.29, 102720000], [17985.05, 18003.75, 17909.89, 18026.85, 134120000], [17990.94, 17977.24, 17855.55, 17990.94, 83770000], [17987.38, 17990.32, 17934.17, 18043.77, 92570000], [17996.14, 18041.55, 17920.26, 18084.66, 109090000], [18023.88, 17830.76, 17796.55, 18035.73, 100920000], [17813.09, 17773.64, 17651.98, 17814.83, 136670000], [17783.78, 17891.16, 17773.71, 17912.35, 80100000], [17870.75, 17750.91, 17670.88, 17870.75, 97060000], [17735.02, 17651.26, 17609.01, 17738.06, 95020000], [17664.48, 17660.71, 17615.82, 17736.11, 81530000], [17650.3, 17740.63, 17580.38, 17744.54, 80020000], [17743.85, 17705.91, 17668.38, 17783.16, 85590000], [17726.66, 17928.35, 17726.66, 17934.61, 75790000], [17919.03, 17711.12, 17711.05, 17919.03, 87390000], [17711.12, 17720.5, 17625.38, 17798.19, 88560000], [17711.12, 17535.32, 17512.48, 17734.74, 86640000], [17531.76, 17710.71, 17531.76, 17755.8, 88440000], [17701.46, 17529.98, 17469.92, 17701.46, 103260000], [17501.28, 17526.62, 17418.21, 17636.22, 79120000], [17514.16, 17435.4, 17331.07, 17514.16, 95530000], [17437.32, 17500.94, 17437.32, 17571.75, 111990000], [17507.04, 17492.93, 17480.05, 17550.7, 87790000], [17525.19, 17706.05, 17525.19, 17742.59, 86480000], [17735.09, 17851.51, 17735.09, 17891.71, 79180000], [17859.52, 17828.29, 17803.82, 17888.66, 68940000], [17826.85, 17873.22, 17824.73, 17873.22, 73190000], [17891.5, 17787.2, 17724.03, 17899.24, 147390000], [17754.55, 17789.67, 17664.79, 17809.18, 78530000], [17789.05, 17838.56, 17703.55, 17838.56, 75560000], [17799.8, 17807.06, 17689.68, 17833.17, 82270000], [17825.69, 17920.33, 17822.81, 17949.68, 71870000], [17936.22, 17938.28, 17936.22, 18003.23, 78750000], [17931.91, 18005.05, 17931.91, 18016, 71260000], [17969.98, 17985.19, 17915.88, 18005.22, 69690000], [17938.82, 17865.34, 17812.34, 17938.82, 90540000], [17830.5, 17732.48, 17731.35, 17893.28, 101690000], [17710.77, 17674.82, 17595.79, 17733.92, 93740000], [17703.65, 17640.17, 17629.01, 17762.96, 94130000], [17602.23, 17733.1, 17471.29, 17754.91, 91950000], [17733.44, 17675.16, 17602.78, 17733.44, 248680000], [17736.87, 17804.87, 17736.87, 17946.36, 99380000], [17827.33, 17829.73, 17799.8, 17877.84, 85130000], [17832.67, 17780.83, 17770.36, 17920.16, 89440000]];

      const volumes = [86160000, 79330000, 102600000, 104890000, 85230000, 115230000, 99410000, 90120000, 79990000, 107100000, 81020000, 91710000, 84510000, 118160000, 89390000, 89820000, 100210000, 102720000, 134120000, 83770000, 92570000, 109090000, 100920000, 136670000, 80100000, 97060000, 95020000, 81530000, 80020000, 85590000, 75790000, 87390000, 88560000, 86640000, 88440000, 103260000, 79120000, 95530000, 111990000, 87790000, 86480000, 79180000, 68940000, 73190000, 147390000, 78530000, 75560000, 82270000, 71870000, 78750000, 71260000, 69690000, 90540000, 101690000, 93740000, 94130000, 91950000, 248680000, 99380000, 85130000, 89440000];
      const dataMA5 = this.calculateMA(5, data);
      const dataMA10 = this.calculateMA(10, data);
      const dataMA20 = this.calculateMA(20, data);

      let CandleStickBox = document.getElementById('my-candle-stick');
      // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。
      CandleStickBox.removeAttribute('_echarts_instance_');
      // 保证宽度正常显示的方法。
      CandleStickBox.style.width = window.innerWidth * 0.5 + 'px'
      let myCandleStick = this.echarts.init(document.getElementById('my-candle-stick'));
      let optionCandleStick = {
        animation: false,
        color: colorList,
        legend: {
          top: 0,
          data: ['日K', 'MA5', 'MA10', 'MA20']
        },
        // 提示框
        tooltip: {
          transitionDuration: 0,
          confine: true,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255,255,255,0.9)',
          textStyle: {
            fontSize: 12,
            color: '#333'
          },
          // 固定提示框位置在左和右
          position: function (pos, params, el, elRect, size) {
            const obj = {
              top: 30
            };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          }
        },
        axisPointer: {
          link: [
            {
              xAxisIndex: [0, 1]
            }
          ]
        },
        // 缩放条
        dataZoom: [
          // 鼠标点击拉动缩放
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            realtime: false,
            start: 20, // 缩放起始位
            end: 70, // 缩放结束位
            top:250,
            height: 20,
            // 缩放图标
            handleIcon:
                'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '120%'  // 图标大小
          },
          // 滚动缩放
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 40,
            end: 70,
            top: 0,
            height: 20
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: dates,
            boundaryGap: false,
            axisLine: { lineStyle: { color: '#777' } },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              show: true
            }
          },
          {
            type: 'category',
            gridIndex: 1,
            data: dates,
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: '#777' } },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              type: 'shadow',
              label: { show: false },
              triggerTooltip: true,
            }
          }
        ],
        yAxis: [
          {
            scale: true,
            splitNumber: 2,
            axisLine: { lineStyle: { color: '#777' } },
            splitLine: { show: true },
            axisTick: { show: false },
            axisLabel: {
              inside: true,
              formatter: '{value}\n'
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        // 图
        grid: [
          // K线图
          {
            left: 20,
            right: 20,
            top: 40,
            height: 120
          },
          // 柱形图
          {
            left: 20,
            right: 20,
            height: 40,
            top: 190
          }
        ],
        graphic: [
          {
            type: 'group',
            left: 'center',
            top: 40,
            width: 300,
            bounding: 'raw',
            children: [
              {
                id: 'MA5',
                type: 'text',
                style: { fill: colorList[1], font: labelFont },
                left: 0
              },
              {
                id: 'MA10',
                type: 'text',
                style: { fill: colorList[2], font: labelFont },
                left: 'center'
              },
              {
                id: 'MA20',
                type: 'text',
                style: { fill: colorList[3], font: labelFont },
                right: 0
              }
            ]
          }
        ],
        series: [
          {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: '#7fbe9e'
            },
            emphasis: {
              itemStyle: {
                color: '#140'
              }
            },
            data: volumes
          },
          {
            type: 'candlestick',
            name: '日K',
            data: data,
            itemStyle: {
              color: '#ef232a',
              color0: '#14b143',
              borderColor: '#ef232a',
              borderColor0: '#14b143'
            },
            emphasis: {
              itemStyle: {
                color: 'black',
                color0: '#444',
                borderColor: 'black',
                borderColor0: '#444'
              }
            }
          },
          {
            name: 'MA5',
            type: 'line',
            data: dataMA5,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: dataMA10,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: dataMA20,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myCandleStick.setOption(optionCandleStick);
    },
    //lmm
    //选择一个技术指标时
    getOnlyOneFactorData(){
      //这里以后再加上参数，即第一个指标名,还有公司列表
      axios.get("https://mock.presstime.cn/mock/646c262d2801fe040f0dd529/example/getFactorData"
          //     , {
          //   params: {
          //     factor:this.factorSelected[0],
          //     company_list:this.companySelected
          //   }
          // }
      ).then((res) =>{
        this.factorAndCompanyData_1=res.data.data;
        this.onlyOneFactor();
      })
    },
    //选择两个技术指标时
    getTwoFactorData(){
      //这里以后再加上参数，即第一个指标名
      axios.get("https://mock.presstime.cn/mock/646c262d2801fe040f0dd529/example/111"
          //     , {
          //   params: {
          //     factor:this.factorSelected[1],
          //     company_list:this.companySelected
          //   }
          // }
      ).then((res) =>{
        this.factorAndCompanyData_2=res.data.data;
        this.twoFactor();
      })
    },
    //改变选择一个技术指标是渲染出来的折线图的高度
    changeHeight(){
      const chart = this.onlyOneFactorChart;
      const height = 175; // 设置新的高度
      const dom = chart.getDom(); // 获取图表的 dom
      dom.style.height = `${height}px`; // 修改样式
      chart.resize(); // 调用 resize 方法重新计算图表大小
    },
    //通过选择指标名和公司获取数据
    getFactorAndCompanyData(){
      // 选择一个技术指标
      if(this.factorSelected.length==1){
        this.getOnlyOneFactorData()
      }
      // 选择两个技术指标
      if(this.factorSelected.length==2){
        this.changeHeight()
        this.getTwoFactorData()
      }
    },
    // 只选择一个指标时，画图
    onlyOneFactor(){
      this.$nextTick(() => {
        let onlyOneFactor = document.getElementById('only-one-factor');
        // 保证宽度正常显示的方法。
        onlyOneFactor.style.width = window.innerWidth * 0.45 + 'px'
        // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。
        onlyOneFactor.removeAttribute('_echarts_instance_');
        // 基于准备好的dom，初始化echarts实例
        let onlyOneFac = this.echarts.init(document.getElementById('only-one-factor'));
        let dates=this.factorAndCompanyData_1.dates
        let factorDataList =this.factorAndCompanyData_1.factor_list;
        // 将原始数据处理成 ECharts 折线图的数据格式
        let seriesData = factorDataList.map(item => ({
          name: item.company,
          type: 'line',
          data: item.factor_data,
          smooth: true, // 启用平滑处理
          showSymbol: false,
        }));
        let optionOneFac = {
          title: {
            text: this.factorSelected[0]+'对比分析'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            top: 25,
            data:factorDataList.map(item => item.company)
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '0%',
            containLabel: true
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel:{
              interval:0, // x轴全部显示
              rotate:20 // x轴旋转角度
            },
          },
          // 数据量较多时 可采用X Y轴进行缩放
          dataZoom: [
            {
              type: "slider", //slider表示有滑动块的，
              roam: false,
              show: true,
              xAxisIndex: [0, 1], //表示联动两个 x 轴
              realtime: false,
              start: 0, // 缩放起始位
              end: 100, // 缩放结束位
              height: 10,
              bottom:30,
              // 缩放图标
              handleIcon:
                  'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%'  // 图标大小
            },
            // 滚动缩放
            {
              type: 'inside',
              xAxisIndex: [0, 1], //表示联动两个 x 轴
              start: 0, // 缩放起始位
              end: 100, // 缩放结束位

            }
          ],
          yAxis: {
            type: 'value',
            max:'dataMax',
            min:'dataMin',
          },

          series: seriesData,
        };
        onlyOneFac.setOption(optionOneFac);
        this.onlyOneFactorChart= onlyOneFac;
      })
    },
    // 选择两个指标时，画图
    twoFactor(){
      this.$nextTick(() => {
        let twoFactor = document.getElementById('two-factor');
        // 保证宽度正常显示的方法。
        twoFactor.style.width = window.innerWidth * 0.45 + 'px'
        // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。
        twoFactor.removeAttribute('_echarts_instance_');
        // 基于准备好的dom，初始化echarts实例
        let twoFac = this.echarts.init(document.getElementById('two-factor'));
        //let dates = ["2016-03-29", "2016-03-30", "2016-03-31", "2016-04-01", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", "2016-04-08", "2016-04-11", "2016-04-12", "2016-04-13", "2016-04-14", "2016-04-15", "2016-04-18", "2016-04-19", "2016-04-20", "2016-04-21", "2016-04-22", "2016-04-25", "2016-04-26", "2016-04-27", "2016-04-28", "2016-04-29", "2016-05-02", "2016-05-03", "2016-05-04", "2016-05-05", "2016-05-06", "2016-05-09", "2016-05-10", "2016-05-11", "2016-05-12", "2016-05-13", "2016-05-16", "2016-05-17", "2016-05-18", "2016-05-19", "2016-05-20", "2016-05-23", "2016-05-24", "2016-05-25", "2016-05-26", "2016-05-27", "2016-05-31", "2016-06-01", "2016-06-02", "2016-06-03", "2016-06-06", "2016-06-07", "2016-06-08", "2016-06-09", "2016-06-10", "2016-06-13", "2016-06-14", "2016-06-15", "2016-06-16", "2016-06-17", "2016-06-20", "2016-06-21", "2016-06-22"];
        //let dates = ["2016-03-29", "2016-03-30", "2016-03-31", "2016-04-01", "2016-04-04", "2016-04-05"];
        let dates=this.factorAndCompanyData_2.dates
        let factorDataList =this.factorAndCompanyData_2.factor_list;
        // 将原始数据处理成 ECharts 折线图的数据格式
        let seriesData = factorDataList.map(item => ({
          name: item.company,
          type: 'line',
          data: item.factor_data,
          smooth: true, // 启用平滑处理
          showSymbol: false,
        }));
        //let y=[1000, 1325, 25500, 4000, 90, 230]
        let optionTwoFac = {
          title: {
            text: this.factorSelected[1]+'对比分析'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            top: 25,
            data:factorDataList.map(item => item.company)
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '0%',
            containLabel: true
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel:{
              interval:0, // x轴全部显示
              rotate:20 // x轴旋转角度
            },
          },
          // 数据量较多时 可采用X Y轴进行缩放
          dataZoom: [
            {
              type: "slider", //slider表示有滑动块的，
              roam: false,
              show: true,
              xAxisIndex: [0, 1], //表示联动两个 x 轴
              realtime: false,
              start: 0, // 缩放起始位
              end: 100, // 缩放结束位
              height: 10,
              bottom:30,
              // 缩放图标
              handleIcon:
                  'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%'  // 图标大小
            },
            // 滚动缩放
            {
              type: 'inside',
              xAxisIndex: [0, 1], //表示联动两个 x 轴
              start: 0, // 缩放起始位
              end: 100, // 缩放结束位

            }
          ],
          yAxis: {
            type: 'value',
            max:'dataMax',
            min:'dataMin',
          },

          series: seriesData,
        };
        twoFac.setOption(optionTwoFac);
      })
    },
    //获取不同公司股票收盘价数据
    getCompanyCloseData(){
      axios.get("https://mock.presstime.cn/mock/646c262d2801fe040f0dd529/example/getcloseData"
          //     , {
          //   params: {
          //     factor:this.factorSelected[1],
          //     company_list:this.companySelected
          //   }
          // }
      ).then((res) =>{
        this.companyCloseList=res.data.data.company_close_list;
        this.initCloseCharts();
      })
    },
    // 初始化 echarts 实例
    initCloseCharts() {
      this.$nextTick(() => {
        this.companyCloseList.forEach((item, index) => {
          const chart = this.echarts.init(document.getElementById(`close-chart-${index}`));
          chart.setOption({
            xAxis: {
              data: item.dates,
              show:false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
              axisTick:{
                show:false // 不显示坐标轴刻度线
              },
              axisLine: {
                show: false, // 不显示坐标轴线
              },
              axisLabel: {
                show: false, // 不显示坐标轴上的文字
              },
              splitLine:{
                show:false // 不显示网格线
              },
            },
            yAxis: {
              show: false,
              type: 'value',
              max:'dataMax',
              min:'dataMin',
              axisTick:{
                show:false // 不显示坐标轴刻度线
              },
              axisLine: {
                show: false, // 不显示坐标轴线
              },
              axisLabel: {
                show: false, // 不显示坐标轴上的文字
              },
              splitLine:{
                show:false // 不显示网格线
              },
            },
            grid: {
              show: false,
              left: 0,
              right:0,
              top: 0,
              bottom: 0,
              containLabel: true // 设置为 true 可以防止文字溢出
            },
            series: [{
              name: 'close',
              type: 'line',
              data: item.close_data,
              showSymbol: false,
              smooth: true, // 启用平滑处理
              lineStyle: {
                color: '#EE6666' // 折线的颜色
              }
            }]
          });
          // 根据页面大小自动响应图表大小
          window.addEventListener("resize", function () {
            chart.resize();
          });
          this.closeCharts.push(chart);


        });
      })
    },

  }

}
</script>

<style scoped>
/*部分导航栏样式在responsive_style.css中*/
.container{
  height: 100%;
  width: 100%;
}

.center-vertically{
  display: flex;
  align-items: center;
  vertical-align: middle;
}


.industry-box {
  display: flex;
  align-items: flex-end;
}

.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  padding: 20px 30px 20px;
  color:#555555;
  font-size: 17px;
  margin-bottom: 0px;
}

.industry-month {
  color: #AAAAAA;
  text-align: right;
  font-size: 17px;
}

.predict-card {
  margin-top: 10px;
  margin-bottom: 10px;
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

.my-tab{
  margin-top: 10px;
}


.chart-and-table{
  height: 380px;
  padding-top: 20px;
  padding-bottom: 20px;
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

/*覆盖element原有tab样式结束*/

/*按钮*/
.el-button.is-circle {
  padding: 5px;
}

/*选择器*/
.company-select >>> .el-input__inner {
  /*height: 30px;*/
  padding-left: 10px;
  padding-right: 10px;
}

/*图标*/
/*.company-select >>> .el-input__icon {*/
/*  height: 35px;*/
/*}*/

/*滑块*/
/*.predict-slider >>> .el-slider__runway {*/
/*  margin-top: 13px;*/
/*  margin-bottom: 0;*/
/*}*/

/*覆盖element原有长条样式开始*/

.predict-slider >>> .el-slider__bar {
  background: #F0C27B;
}

.predict-slider >>> .el-slider__button {
  border: 2px solid #F0C27B
}

/*覆盖element原有长条样式结束*/

/*!*输入框*!*/
/*.input-bar >>> .el-input__inner{*/
/*  height: 30px;*/
/*}*/
/*.el-input{*/
/*  line-height: 30px;*/
/*}*/

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

.price-contact-table{
  margin-top: 10px;
  padding-left: 1%;
  padding-right: 1%;
}

.grey-border{
  border: #DCDFE6 solid 1px;
  padding: 20px;
  border-radius: 10px;
}

.my-tip{
  color: #7F7F7F;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 10px;
}

.part-title{
  font-size: 18px;
}
/*公司列表小框*/
.grey-border-small{
  border: #DCDFE6 solid 1px;
  padding: 8px;
  border-radius: 10px;
  height: 60px;
}

.my-card-pd{
  padding: 30px;
}

.my-tip{
  color: #7F7F7F;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 10px;
}

.part-title{
  font-size: 18px;
}
.stock-container{
  margin-top: 10px;
}
.stock-id{
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  color: #555555;
  margin-bottom: 5px;
}
.company-name{
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  color: #555555;
}
.price-trend-chart{
  height: 40px;
  width: 100px;
}
.price-open{
  color: #555555;
  font-size: 17px;
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  transform: translate(0% , 60%);
}
.margin-bottom-5{
  margin-bottom: 5px;
}
.margin-top-10{
  margin-top: 10px;
}
.grey-border-smaller{
  border: #DCDFE6 solid 1px;
  padding:4px 8px;
  border-radius: 10px;
  height: 60px;
}
.suggest-title{
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #555555;
  margin-left: 5px;
  margin-bottom: 10px;
}

/*热力图盒子*/
#my-heat-map{
  height: 300px;
}

/*K线图盒子*/
#my-candle-stick{
  height: 300px;
}

/*修改element多选框样式开始*/

/*多选框*/
.my-checkbox >>> .el-checkbox-button .el-checkbox-button__inner{
  margin-right: 20px;
  border:#FEF0F0 solid 1px;
  border-radius: 10px;
  background: #FEF0F0;
  color: #F0C27B;
  padding: 3px 10px;
  font-size: 12px;
  margin-bottom: 7px;
  width: 90px;
}

/*被选后的多选框*/
.my-checkbox >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{
  color: #FFFFFF;
  background: #F0C27B;
  border-color: #F0C27B;
  box-shadow:none
}

/*多选框覆盖原有阴影*/
.my-checkbox >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}

/*修改element多选框样式结束*/

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

</style>

<style>
@import '../../../assets/CSS/MessageBox.css';
</style>
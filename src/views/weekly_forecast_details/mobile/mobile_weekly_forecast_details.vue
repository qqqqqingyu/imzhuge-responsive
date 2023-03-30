<template>
  <div class="container">
    <el-row class="title-box">
      <el-col :span="1" :offset="1">
        <router-link to="/weekly_forecast">
          <img src="../../../assets/images/return.svg" alt="返回" class="return-img">
        </router-link>
      </el-col>
      <el-col :span="20" class="title">
        <span>行业个股收益率预测</span>
      </el-col>
    </el-row>

    <el-row class="industry-box">
      <el-col :span="9" :offset="1">
        <span class="box-title">{{industryDetailData.industry}}行业</span>
      </el-col>
      <el-col :span="13" class="industry-month">
        {{industryDetailData.start_day}}至{{industryDetailData.end_day}}
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" class="industry-tab">
        <el-tabs @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="整体情况" name="first">
            <el-card class="chart-and-table">
              <el-row>
                <el-col :span="20">
                  <el-radio-group v-model="barRadio" class="radio-bg" v-if="chartOrTable=='chart'">
                    <el-radio-button class="industry-radio" label="价格" @click="toPrice"></el-radio-button>
                    <el-radio-button class="industry-radio" label="我拥有的合约数" @click="toContract"></el-radio-button>
                  </el-radio-group>
                </el-col>

                <!--                图标切换圆形按钮-->
                <el-col :span="4" v-if="chartOrTable=='table'" style="text-align: right">
                  <el-button type="danger" icon="el-icon-s-data" circle @click="toChart"
                             class="changed-btn"></el-button>
                </el-col>
                <el-col :span="4" v-else style="text-align: right">
                  <el-button type="danger" icon="el-icon-document" circle @click="toTable"
                             class="changed-btn"></el-button>
                </el-col>

                <!--                表格-->
                <el-col :span="24" v-if="chartOrTable=='table'" style="margin-top: 5px">
                  <el-table :data="companyRankData"
                            :default-sort="{prop:'price',order:'descending'}"
                            border
                            style="width: 100%"
                            size="mini"
                            :header-cell-style="tdstyle"
                            :row-style="{height:'20px'}"
                            :cell-style="{padding: '0'}"
                  >
                    <el-table-column
                        prop="company_name"
                        label="  "
                        min-width="70%">
                    </el-table-column>
                    <el-table-column
                        sortable
                        predict_share="price"
                        prop="price"
                        label="价格"
                        min-width="70%">
                      <template v-slot="scope">
                        {{ numFilter(scope.row.price, 4) }}
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
                <el-col :span="22" offset="1" v-else style="margin-top: 20px">
                  <div id="priceBar" v-if="priceOrContract=='price'"></div>
                  <div id="contractBar" v-else></div>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>

          <el-tab-pane label="历史走势" name="second">
            <el-card class="chart-and-table">
              <div id="history"></div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row class="participation-box">
      <el-col :span="22" :offset="1">
        <span class="box-title">参与交易</span>
      </el-col>
    </el-row>

    <el-row class="predict-form">
      <el-col :span="22" :offset="1">
        <el-card class="predict-card">
          <el-row>
            <el-col :span="24">
            <span>
              活动可用诸葛贝：{{numFilter(userCurrentMoney,2)}}
            </span>
            </el-col>

            <el-col :span="24">
              <el-row>
                <el-col :span="16">
                  <span>请选择您预测排名第一的公司：</span>
                </el-col>
                <el-col :span="8">
<!--                  这里还不太确定-->
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
              </el-row>

            </el-col>

            <el-col :span="8">
            <span>
              预测的概率：
            </span>
            </el-col>
            <el-col :span="15" :offset="1" style="width: 100%">
              <el-slider v-model.number="tradeProb" class="predict-slider"></el-slider>
            </el-col>

            <el-col :span="8">
              <span>交易份额：</span>
            </el-col>
            <el-col :span="15" :offset="1">
              <el-input type="text" v-model.number="tradeCount"
                        placeholder="请输入正数"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        class="input-bar"></el-input>
            </el-col>

            <el-col :span="8">
              <span>交易类型：</span>
            </el-col>
            <el-col :span="15" :offset="1">
              <el-radio-group v-model="tradeType">
                <el-radio class="predict-radio" label="buy">买入</el-radio>
                <el-radio class="predict-radio" label="sell">卖出</el-radio>
              </el-radio-group>
            </el-col>

            <el-col :span="24">
              <span>请问您对上述判断的信心如何？</span>
            </el-col>
            <el-col :offset="8" :span="16">
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
              <el-button type="danger" @click="submitTransactionApplyMethod">提交</el-button>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>
  </div>
  <bottom-nav></bottom-nav>
</template>

<script>
// import store from "../../../store";
import {getIndustryDetail, submitTransactionApply} from "@/api/month_redict";
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_weekly_forecast_details",
  components:{bottomNav},
  data() {
    return {
      activeName: 'first', //用于切换el-tabs
      barRadio: '价格', //用于切换价格和合约图的图标
      chartOrTable: 'chart', //用于切换图和表的图标
      priceOrContract: 'price',
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
      yMin : '', //y轴最低值
      industryDetailData:'',
    }
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#F5F8FA')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
  },
  mounted() {
    this.getCSRFTokenMethod();
    // 获取数据的方法。数据转化及作图的方法在该方法中
    this.getIndustryDetailMethod();
  },

  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    //切换图表
    toChart() {
      this.chartOrTable = 'chart'
      if(this.priceOrContract == 'price'){
        this.myEcharts1()//价格作图
      } else{
        this.myEcharts2()//合约作图
      }
    },
    toTable() {
      this.chartOrTable = 'table'
    },
    //切换价格图和合约图
    toPrice() {
      this.priceOrContract = 'price'
      this.myEcharts1()//价格作图
    },
    toContract() {
      this.priceOrContract = 'contract'
      this.myEcharts2()//合约作图
    },
    //点击切换tab时调用该方法
    handleClick(tab) {
      if (tab.index == '1')
        this.myEcharts3();
    },
    tdstyle({row, column, rowIndex}) {
      if (rowIndex === 0) {
        return "background-color:RGB(248,248,248);height:20px;padding:1px"
      }
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
      submitTransactionApply(this.getId, industry).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功！'
        });
        //刷新
        location.reload();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '提交失败，请重试'
        });
      })
    },
    //获取数据
    getIndustryDetailMethod() {
      this.getId=this.$route.query.id;
      getIndustryDetail(this.getId).then((res) => {
        this.industryDetailData = res.data
        //获取整体情况表的数据
        this.companyRankData = this.industryDetailData.company_rank
        //活动可用诸葛贝
        this.userCurrentMoney =  this.industryDetailData.user_current_money
        //获取历史数据表x轴数据
        this.graphX = this.industryDetailData.graph_x
        //历史数据表，把取到的数据放入自定义方法graphYChange中，转换成所需格式的y轴数据graphY和图例数据historyLegend
        this.graphYChange(this.industryDetailData.graph_y)
        //价格直方图数据转换
        this.barPriceChange();
        //价格作图
        this.myEcharts1()
      })
      .catch((res) => {
        console.log(res);
      });
    },

    // 数据转换方法
    // 历史数据图y轴数据对应的对象数组样式转换
    graphYChange(YData) {
      let legendstr = '';
      let yMinTemp;
      //给y的最大值设置初值值
      this.yMin = Math.max.apply(null, YData[0].contract_price)

      for (const item of YData) {
        yMinTemp =  Math.max.apply(null, item.contract_price)
        //获得y的最小值
        if( yMinTemp < this.yMin){
          this.yMin = yMinTemp
        }
        // y轴数据的转化
        this.graphY.push({
          type: 'line',
          name: item.contract_text,
          data: item.contract_price,
          areaStyle: {}
        })
        // 图例的转化
        legendstr += item.contract_text + ",";
      }
      // 为获得更好的作图效果，用y最小值的85%作为y轴最小值
      this.yMin = (this.yMin* 0.85).toFixed(2)

      legendstr = legendstr.substring(0, legendstr.length - 1);
      this.historyLegend = legendstr.split(",");
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

        let echarts = require('echarts');
        //柱状图
        let barBox = document.getElementById('priceBar');
        // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。更改了原来的写法，暂时不知道能不能行
        barBox.removeAttribute('_echarts_instance_');

        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('priceBar'));
        var option1 = {
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: this.barCompanyArr
          },
          // 图表移动位置
          grid: {
            left: '1%',
            right: '4%',
            bottom: '3%',
            top: '1%',
            containLabel: true //true表示这些比例包括了坐标轴标签在内所形成的矩形的位置。false则不包括坐标轴
          },

          legend: {
            textStyle: {
              color: '#FFF'
            }
          },
          series: [{
              data: this.barPriceArr,
              type: 'bar',
              color: '#FF8383',
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
        let echarts = require('echarts');
        //柱状图
        let contractBarBox = document.getElementById('contractBar');
        // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。

        contractBarBox.removeAttribute('_echarts_instance_');
        // 基于准备好的dom，初始化echarts实例
        var myChart2 = echarts.init(document.getElementById('contractBar'));
        var option2 = {
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            data: this.barCompanyArr
          },
          // 图表移动位置
          grid: {
            left: '1%',
            right: '4%',
            bottom: '3%',
            top: '1%',
            containLabel: true //true表示这些比例包括了坐标轴标签在内所形成的矩形的位置。false则不包括坐标轴
          },
          series: [
            {
              data: this.barContractArr,
              type: 'bar',
              color: '#FF8383',
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
      let echarts = require('echarts');
      let historyBox = document.getElementById('history');
      // 保证宽度正常显示的方法。
      historyBox.style.width = window.innerWidth * 0.8 + 'px'

      // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。
      historyBox.removeAttribute('_echarts_instance_');

      // 基于准备好的dom，初始化echarts实例
      var myChart3 = echarts.init(document.getElementById('history'));
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
          top:'37%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: this.graphX
        },
        yAxis: {
          type: 'value',
          // min:this.yMin, //设置y轴最小值
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
    }
  }
}
</script>

<style scoped>
.theme_red {
  color: #FF8383;
}

.font_red {
  color: #FA605F;
}

.industry-box {
  display: flex;
  align-items: flex-end;
}

.box-title {
  font-size: 21px;
  font-weight: bolder;
}

.industry-month {
  color: #AAAAAA;
  text-align: right;
  font-size: 15px;
}

.predict-card {
  margin-top: 10px;
  margin-bottom: 20px;
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
  min-height: 0;
}

.participation-box {
  margin-top: 15px;
}

.company-select {
  width: 100%;
}

.submit-btn {
  text-align: center;
  margin-top: 10px;
  padding-bottom: 30px;
}

#priceBar {
  width: 100%;
  height: 180px;
}

#contractBar {
  width: 100%;
  height: 180px;
}

#history {
  width: 100%;
  height: 230px;
}

/*覆盖element原有的样式开始*/

/*切换活动项的字体颜色*/
.industry-tab /deep/ .el-tabs__item.is-active {
  color: #FA605F !important;
}

.chart-and-table >>> .el-card {
  height: 260px;
}

/*切换活动项的长条颜色*/
.industry-tab /deep/ .el-tabs__active-bar {
  background-color: #FA605F !important;
}

/*单选框颜色设置*/
/*背景*/
.radio-bg {
  background: #F5F8FA;
  padding: 2px;
  border-radius: 5px;
}

/*被选后的单选框颜色*/
.industry-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #FA605F;
  background: #FFFFFF;
}

/*单选框样式*/
.industry-radio >>> .el-radio-button__inner {
  border-radius: 5px;
  background: #F5F8FA;
  color: #7F7F7F;
  border: 0;
  padding: 5px 10px;
}

/*单选框覆盖原有阴影*/
.industry-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}

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

.predict-slider >>> .el-slider__bar {
  background: #FF8383;
}

.predict-slider >>> .el-slider__button {
  border: 2px solid #FF8383
}

/*!*输入框*!*/
/*.input-bar >>> .el-input__inner{*/
/*  height: 30px;*/
/*}*/
/*.el-input{*/
/*  line-height: 30px;*/
/*}*/

/*改变单选框颜色*/
.predict-radio >>> .el-radio__input.is-checked .el-radio__inner {
  background: #f56c6c !important;
  border-color: #f56c6c !important;
}

.predict-radio >>> .el-radio__input.is-checked + .el-radio__label {
  color: #f56c6c !important;
}

/*覆盖element原有的样式结束*/
</style>
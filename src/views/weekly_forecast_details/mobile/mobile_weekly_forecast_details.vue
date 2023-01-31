<template>
  <div class="container">
    <!--    返回图标垂直居中只是设置了padding，感觉没完全解决。-->

    <el-row style="margin-top: 20px;">
      <el-col :span="1" :offset="1">
        <router-link to="/">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20" class="title">
        <span>行业个股收益率预测</span>
      </el-col>
    </el-row>

    <el-row class="industry-box">
      <el-col :span="15" :offset="1">
        <span class="box-title">{{ industry }}行业</span>
      </el-col>
      <el-col :span="7" class="industry-month">
        {{ month }}
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" class="industry-tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="整体情况" name="first">
            <el-card>
              <el-row>
                <el-col :span="20">
                  <el-radio-group v-model="barRadio" class="radio-bg">
                    <el-radio-button class="industry-radio" label="价格"></el-radio-button>
                    <el-radio-button class="industry-radio" label="合约"></el-radio-button>
                  </el-radio-group>
                </el-col>
                <el-col :span="4" v-if="chartOrTable=='table'" style="text-align: right">
                  <el-button type="danger" icon="el-icon-s-data" circle @click="toChart"
                             class="changed-btn"></el-button>
                </el-col>
                <el-col :span="4" v-else style="text-align: right">
                  <el-button type="danger" icon="el-icon-document" circle @click="toTable"
                             class="changed-btn"></el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>

          <el-tab-pane label="历史走势" name="second">
            <el-card>

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
              活动可用诸葛贝：
              <!--              {{numFilter(userCurrentMoney,2)}}-->
            </span>
            </el-col>

            <el-col :span="24">
              <span>请选择您预测排名第一的公司：</span>
              <el-select v-model="inputNo1" placeholder="请选择" class="company-select">
                <el-option
                    v-for="item in companyRankData"
                    :key="item.company_contract_id"
                    :label="item.company_name"
                    :value="item.company_contract_id">
                </el-option>
              </el-select>
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
              <el-input type="text" v-model.number="tradeCount" placeholder="请输入正数"
                        oninput="value=value.replace(/[^\d]/g,'')" class="input-bar"></el-input>
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
              <span>交易类型：</span>
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
    {{industryDetailData}}
  </div>
</template>

<script>


export default {
  name: "mobile_weekly_forecast_details",
  data() {
    return {
      industry: '金融',
      month: '2022年11月',
      activeName: 'first', //用于切换el-tabs
      barRadio: '价格', //用于切换价格和合约图的图标
      chartOrTable: 'table', //用于切换图和表的图标
      // 数据，共用
      inputNo1: '', //预测排名第一的公司的id
      tradeProb: 50, //预测的概率
      tradeCount: '', //交易的数量
      tradeType: '', //交易类型
      tradeConfidence: '', //交易信心
      note: '', //交易的笔记
      companyRankData: '', //整体情况表的数据

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


  computed:{
    details(){
      return this.$store.getters.industryDetailData;
    }
  },
  methods: {

    //切换图表
    toChart() {
      this.chartOrTable = 'chart'
      // this.myEcharts1()//价格作图
      // this.myEcharts2()//合约作图
    },
    toTable() {
      this.chartOrTable = 'table'
    },
    // 保留n位小数
    numFilter(value, n) {
      const realVal = parseFloat(value).toFixed(n)
      return realVal
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
          title: {
            text: '价格',
            top: '3%',
            left: 'center'
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: this.barCompanyArr
          },
          // 图表移动位置
          grid: {
            left: '2%',
            right: '4%',
            bottom: '3%',
            top: '12%',
            containLabel: true //true表示这些比例包括了坐标轴标签在内所形成的矩形的位置。false则不包括坐标轴
          },
          series: [
            {
              data: this.barPriceArr,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              },
              label: {
                show: true
              }
            }
          ]
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
        // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。更改了原来的写法，暂时不知道能不能行
        contractBarBox.removeAttribute('_echarts_instance_');
        // 基于准备好的dom，初始化echarts实例
        var myChart2 = echarts.init(document.getElementById('contractBar'));
        var option2 = {
          title: {
            text: '拥有的合约数',
            top: '3%',
            left: 'center'
          },
          xAxis: {
            type: 'value',
            inverse: true //反转坐标轴
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
            top: '12%',
            containLabel: true //true表示这些比例包括了坐标轴标签在内所形成的矩形的位置。false则不包括坐标轴
          },
          series: [
            {
              data: this.barContractArr,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              },
              label: {
                show: true
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
      historyBox.style.width = window.innerWidth * 0.58 + 'px'
      // 让指定id的div的_echarts_instance_属性值为空状态。新加载页面时，图也重新加载。更改了原来的写法，暂时不知道能不能行
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
          }
        },
        // 图例
        legend: {
          data: this.historyLegend
        },
        // 图表移动位置
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: this.graphX
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

.title {
  text-align: center;
  font-size: 16px;
  font-weight: bolder;
  color: #2e2e2e;
}

.industry-box {
  display: flex;
  align-items: flex-end;
  margin-top: 20px;
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
  width: 90px;
}

.submit-btn {
  text-align: center;
  margin-top: 10px;
}

/*覆盖element原有的样式开始*/
/*切换活动项的字体颜色*/
.industry-tab /deep/ .el-tabs__item.is-active {
  color: #FA605F !important;
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
/*.company-select >>> .el-input__inner {*/
/*  height: 30px;*/
/*}*/

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
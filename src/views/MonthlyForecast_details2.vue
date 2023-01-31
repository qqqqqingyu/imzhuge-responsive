<template>
  <el-container class="container">

    <!--header开始-->
    <el-header class="header" height="120px">
      <myheader></myheader>
    </el-header>
    <!--header结束-->

    <el-container>
      <!--aside开始-->
      <el-aside class="aside">
        <myaside></myaside>
      </el-aside>
      <!--aside结束-->

      <el-main class="main">
        <el-row>
          <el-col :span="24" >
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 15px">
              <el-breadcrumb-item>您当前的位置：</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/MonthlyForecast_introduce' }">周度收益率预测</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/MonthlyForecast_share' }">行业个股收益率预测</el-breadcrumb-item>
              <el-breadcrumb-item>{{industryDetailData.industry}}行业个股收益</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" class="title-left">
            <div class="title-box">
              {{industryDetailData.industry}}行业{{industryDetailData.start_day}}至{{industryDetailData.end_day}}周度收益率排名预测
            </div>
            </el-col>
        </el-row>

        <el-row>
          <el-col :span="20" :offset="2" style="margin-top: 10px" >
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">

              <el-tab-pane label="整体情况" name="first">
                <el-row>
                  <el-col :offset="21" :span="2"  v-if="chartOrTable=='table'">
                    <el-button type="primary" icon="el-icon-s-data" circle v-on:click="toChart"></el-button>
                  </el-col>
                  <el-col :offset="21" :span="2" v-else>
                    <el-button type="primary" icon="el-icon-document" circle v-on:click="toTable"></el-button>
                  </el-col>
                  <el-col :span="24" v-if="chartOrTable=='table'">
                    <div style="padding-top: 10px">
                      <el-table :data="companyRankData"
                                :default-sort ="{prop:'price',order:'descending'}"
                                border
                                style="width: 100%"
                                :header-cell-style="tdstyle">
                        <el-table-column
                            prop="company_name"
                            label="  ">
                        </el-table-column>
                        <el-table-column
                            sortable
                            predict_share="price"
                            prop="price"
                            label="价格">
                          <template v-slot="scope">
                            {{ numFilter(scope.row.price,4) }}
                          </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            column-key="predict_share"
                            prop="predict_share"
                            label="拥有的合约数">
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-col>
                  <el-col :span="24" v-else>
                    <!--              两个柱状图-->
                    <el-row id="twoBar">
                      <el-col :span="12" >
                        <div id="priceBar"> </div>
                      </el-col>
                      <el-col :span="12" >
                        <div id="contractBar"></div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="23" class="a-right">
                    <router-link to="/MonthlyForecast_industrialchain" class="link-style">去产业链分析查看更多内容>></router-link>
                    <br>
                    <router-link to="/MonthlyForecast_share" class="link-style">回到行业列表>></router-link>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="历史走势" name="second">
                <el-row>
                  <el-col :span="24" >
                    <!--            历史走势的图-->
                    <div id="history"></div>
                  </el-col>

                  <el-col :span="23" class="a-right">
                    <router-link to="/MonthlyForecast_industrialchain" class="link-style">去产业链分析查看更多内容>></router-link>
                    <br>
                    <router-link to="/MonthlyForecast_share" class="link-style">回到行业列表>></router-link>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="3" :offset="1">
            <div class="title-box2">
              参与交易
            </div>
          </el-col>
          <el-col :span="20" :offset="2">
            <div class="box-form" >
              <el-form label-position="left">
                <el-row style="text-align: left">

                  <el-col :offset="1" :span="22">
                    <el-form-item class="current-money">
<!--                      后一个数字表示保留几位小数-->
                      活动可用诸葛贝：{{numFilter(userCurrentMoney,2)}}
                    </el-form-item>
                  </el-col>

                  <el-col :offset="1" :span="22">
                    <el-form-item label="请选择您预测排名第一的公司：">
                      <el-radio-group v-model="inputNo1">
                        <el-radio  class="radio-mb" v-for="item in companyRankData" :key="item.company_contract_id"
                                  :label="item.company_contract_id" >{{item.company_name}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>

                  <el-col :offset="1" :span="22">
                    <el-form-item label="预测的概率：" label-width="20%" >
                      <el-slider label-width="80%"
                          v-model.number="tradeProb"
                          show-input>
                      </el-slider>
                    </el-form-item>
                  </el-col>

                  <el-col :offset="1" :span="22">
                    <el-form-item label="交易份额：" label-width="20%">
                      <el-input type="text" v-model.number="tradeCount" label-width="70%" placeholder="输入整数" oninput ="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :offset="1" :span="22">
                    <el-form-item label="交易类型：">
                      <el-radio-group v-model="tradeType">
                        <el-radio label="buy" >买入</el-radio>
                        <el-radio label="sell" >卖出</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>

                  <el-col :offset="1" :span="22">
                    <el-form-item label="请问您对上述判断的信心如何？">
                      <el-radio-group v-model="tradeConfidence">
                        <el-radio label="完全瞎猜" ></el-radio>
                        <el-radio label="有点瞎猜" ></el-radio>
                        <el-radio label="有点信心" ></el-radio>
                        <el-radio label="很有信心" ></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>

                  <el-col :offset="1" :span="22">
                    <el-form-item label="交易理由：" label-width="20%">
                      <el-input label-width="70%" :rows="2" type="textarea" v-model="note" placeholder="可以说说您为什么要这么交易吗"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24" class="submit-btn">
                    <el-button @click="submitTransactionApplyMethod">提交</el-button>
                  </el-col>

<!--                  <el-col :span="23" class="a-right">
                    <router-link to="/" class="link-style">前往我的交易历史>></router-link>
                  </el-col>-->
                </el-row>
              </el-form>
            </div>
          </el-col>
        </el-row>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Myheader from "../components/myheader";
import myaside from "../components/myaside";
import {getIndustryDetail, submitTransactionApply} from "../api/month_redict";

export default {
  name: "MonthlyForecast_details2",
  components: {Myheader, myaside},
  data() {
    return {
      activeName:'first',
      chartOrTable:'table',
      getId:'', //获取从前一界面传来的id
      industryDetailData:'', //获取的数据
      companyRankData:'', //整体情况表的数据
      userCurrentMoney:'', //活动可用诸葛贝
      inputNo1:'', //预测排名第一的公司的id
      tradeProb:0, //预测的概率
      tradeCount:'', //交易的数量
      tradeType:'', //交易类型
      tradeConfidence:'', //交易信心
      note:'', //交易的笔记
      graphX:[], //x轴数据，时间
      graphY:[], //y轴数据
      historyLegend:'', //图例，公司名
      barCompanyArr:'',//直方图公司名数据
      barPriceArr:'',//直方图价格数据
      barContractArr:'',//直方图合约数据
    }
  },
  mounted() {
    // 获取数据的方法。数据转化及作图的方法在该方法中
    this.getIndustryDetailMethod();
  },
  methods : {
    //点击切换tab时调用该方法
    handleClick(tab) {
      if(tab.index == '1')
        this.myEcharts3();
    },
    tdstyle({row,column,rowIndex}){
      if(rowIndex===0){
        return "background-color:RGB(248,248,248)"
      }
    },
    toChart(){
      this.chartOrTable='chart'
      this.myEcharts1()//价格作图
      this.myEcharts2()//合约作图
    },
    toTable(){
      this.chartOrTable='table'
    },
    // 提交数据
    submitTransactionApplyMethod(){
      let industry = {};
      industry.count = this.tradeCount
      industry.trade_type = this.tradeType
      industry.trade_prob = this.tradeProb/100
      industry.contract_id = this.inputNo1
      industry.trade_confidence = this.tradeConfidence
      industry.note = this.note
      this.getId=this.$route.query.id;
      submitTransactionApply(this.getId,industry).then(() => {
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
          })
          .catch((res) => {
            console.log(res);
          });
    },

  // 数据转换方法
    // 历史数据图y轴数据对应的对象数组样式转换
    graphYChange(YData){
      let legendstr = '';
      for (const item of YData) {
        // y轴数据的转化
        this.graphY.push({
          type:'line',
          name: item.contract_text,
          data: item.contract_price,
          areaStyle: {}
        })
        // 图例的转化
        legendstr += item.contract_text+ ",";
      }
      legendstr = legendstr.substring(0, legendstr.length-1);
      this.historyLegend = legendstr.split(",");
    },
    // 直方图价格数据转换
    barPriceChange(){
      //公司名数据
      let companyStr = '';
      //价格数据
      let priceStr = '';
      //合约数量数据
      let contractStr = '';
      //数据转换先为string字符串
      this.companyRankData.forEach(function(e) {
        companyStr += e.company_name + ","; //公司名
        priceStr += e.price + ","; //价格
        contractStr += e.predict_share + ","; //拥有的合约数
      });

      //公司名转换为数组
      companyStr = companyStr.substring(0,companyStr.length-1);
      this.barCompanyArr = companyStr.split(",");
      //价格转换为数组
      priceStr = priceStr.substring(0, priceStr.length-1);
      this.barPriceArr = priceStr.split(",");
      //对价格排序
      this.barPriceArr.sort(function(a,b){
        return a-b;
      })//括号里不写回调函数则默认按照字母逐位升序排列
      //合约数量转换为数组
      contractStr = contractStr.substring(0,contractStr.length-1);
      this.barContractArr = contractStr.split(",");
      //对合约数量排序
      this.barContractArr.sort(function(a,b){
        return a-b;
      })//括号里不写回调函数则默认按照字母逐位升序排列
    },
    // 保留n位小数
    numFilter(value,n) {
      const realVal = parseFloat(value).toFixed(n)
      return realVal
    },

  //作图方法
    //价格数据作图方法
    myEcharts1(){
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
          top:'3%',
          left:'center'
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
          top:'12%',
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
    myEcharts2(){
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
            top:'3%',
            left:'center'
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
            top:'12%',
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
    myEcharts3(){
      let echarts = require('echarts');
      let historyBox = document.getElementById('history');
      historyBox.style.width = window.innerWidth*0.58+'px'
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
          splitLine:{ //修改背景线条样式
            show:true,//是否展示
            lineStyle:{
              color:"#BFC2C7",//线条颜色
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

.container{
  height: 100%;
  width: 100%;
}

.header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}


.aside {
  text-align: left;
  line-height: 200px;
  height: 100%;
}

.main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 50px;
  position: relative;
}
.box2{
  top: 450px;
  width: 70%;
  height: 300px;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  /*border: 2px solid black;*/
}

body > .el-container {
  /*margin-bottom: 40px;*/
  margin-bottom: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
#history{
  margin-top: 60px;
  padding-top: 15px;
  width: 100%;
  height: 394px;
  /*border: grey 1px solid;*/
  border: #9EA9B1 1px solid;
}
.title-box{
  background-color: #CAD6FF;
  border-color: #939FC6;
  color: #4868E1;
  margin-top: 20px;
  text-align: center;
  height: 40px;
  display: inline-block;
  padding: 4px 10px;
  line-height: 30px;
  font-size: 20px;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}
.title-box2{
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #fba414;
  margin-top: 20px;
  text-align: center;
  height: 35px;
  display: inline-block;
  padding: 0px 10px;
  line-height: 30px;
  font-size: 19px;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}

.box-form{
  margin-top: 10px;
  border: 1px solid #9EA9B1;
}
.link-style{
  text-decoration:none;
  color: #1E90FF;
}
.link-style:hover{
  color: #4169E1;
}
.submit-btn{
  text-align: center;
  margin-bottom: 10px;
}
.a-right{
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: right;
  line-height: 30px;
}
.title-left{
  text-align: left;
  margin-top: 5px;
}
.current-money{
  color:#606266;
  margin-bottom: 0px;
  margin-top: 10px;
}
.radio-mb{
  margin-bottom: 10px;
}

/deep/.el-tabs .el-tabs__item{
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  margin-right: 20px;
}
/deep/.el-tabs .el-tabs__item.is-active{
  color:dodgerblue;
  font-weight: bolder;
}
.el-table{
  background-color: RGB(248,248,248);
}
#twoBar{
  margin-top: 10px;
  width: 100%;
  height: 411px;
  border: #9EA9B1 1px solid;
}
#priceBar{
  width: 100%;
  height: 411px;
}
#contractBar{
  width: 100%;
  height: 411px;
}
</style>
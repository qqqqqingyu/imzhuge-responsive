<template>
  <div style="margin-bottom: 50px">
    <el-row style="margin-top: 20px">
      <el-col :span="1" :offset="1">
        <router-link to="/stock_predict">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
          股价涨跌预测
        </el-row>
      </el-col>
    </el-row>

    <el-row class="industry-box" style="margin-top: 20px">
      <el-col :span="22" :offset="1" style="font-size: 21px;font-weight: bold;color: #333333">
          <span>{{company}}</span>
      </el-col>
    </el-row>

    <el-row style="margin-bottom: 10px;">
      <el-col :span="22" :offset="1">
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
                          size="small"
                          :header-cell-style="tdstyle"
                          :row-style="{height:'25px'}"
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
              <el-col :span="22" :offset="1" v-else style="margin-top: 10px">
                <el-row>
                  <el-col :span="12" id="priceBar"></el-col>
                  <el-col :span="12" id="contractBar"></el-col>
                </el-row>
              </el-col>
            </el-row>
      </el-col>
    </el-row>

  <!--  参与交易-->
    <el-row style="margin-top: 20px;">
      <el-col :span="22" :offset="1" style="font-size: 21px;font-weight: bold;color: #333333">
        <span >参与交易</span>
      </el-col>
    </el-row>

    <el-row class="predict-form">
      <el-col :span="22" :offset="1" class="pc-card my-card-pd">
        <el-row>
          <el-col :span="24" class="predict-card ">
              <span>
                活动可用诸葛贝：{{ parseFloat(userCurrentMoney).toFixed(2) }}
              </span>
          </el-col>

          <el-col :span="24">
            <span>【{{ company }}】2023年x月x日收盘价的涨跌预测：</span>
          </el-col>
          <el-col :span="24" class="center">
            <el-radio-group v-model="tradeType">
              <el-radio class="predict-radio" label="up">涨</el-radio>
              <el-radio class="predict-radio" label="down">跌</el-radio>
            </el-radio-group>
          </el-col>

          <el-col :span="8">
            <span>预测的概率：</span>
          </el-col>
          <el-col :span="16" style="width: 100%">
            <el-slider v-model.number="tradeProb" class="predict-slider"></el-slider>
          </el-col>


          <el-col :span="8">
            <span>交易份额：</span>
          </el-col>
          <el-col :span="16">
            <el-input type="text" v-model.number="tradeCount"
                      placeholder="请输入正数"
                      size="mini"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      class="input-bar"></el-input>
          </el-col>

          <el-col :span="24">
            <span>交易类型：</span>
            <el-radio-group v-model="tradeType" style="margin-left: 22px;">
              <el-radio class="predict-radio" label="buy">买入</el-radio>
              <el-radio class="predict-radio" label="sell">卖出</el-radio>
            </el-radio-group>
          </el-col>

          <el-col :span="24">
            <span>请问您对上述判断的信心如何？</span>
          </el-col>
          <el-col :span="18" :offset="3">
            <el-radio-group v-model="tradeConfidence">
              <el-row>
                <el-radio class="predict-radio" label="完全瞎猜"></el-radio>
                <el-radio class="predict-radio" label="有点瞎猜"></el-radio>
              </el-row>
            </el-radio-group>
          </el-col>
          <el-col :span="18" :offset="3">
            <el-radio-group v-model="tradeConfidence">
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

          <el-col :span="24" class="submit-btn yellow-btn">
            <el-button type="warning" @click="submitTransactionApplyMethod">
              提交
            </el-button>
          </el-col>
        </el-row>

      </el-col>
    </el-row>

    <el-row style="margin-top: 50px;"></el-row>
  </div>

  <bottom-nav></bottom-nav>
</template>

<script>
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_stock_participate",
  components: {
    bottomNav,
  },
  data(){
    return{
      echarts:'',
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
  mounted() {
    this.echarts = require('echarts');
    this.company = this.$route.query.eventId;
    window.scrollTo(0, 0);
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
      document.body.setAttribute('style', 'background:#F5F8FA')
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

.predict-form {
  font-size: small;
}

.predict-form .el-col {
  line-height: 35px;
}

.predict-form span {
  line-height: 35px;
}

/*用于覆盖element原有按钮高度的自定义类*/
.changed-btn {
  min-height: 10px;
  min-width: 10px;
}

.company-select {
  width: 100%;
}

.submit-btn {
  text-align: center;
  margin-top: 10px;
}

/*修改element滑动条样式*/
.my-scroll >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

.info-part{
  font-size: small;
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
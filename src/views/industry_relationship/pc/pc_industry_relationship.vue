<template>
  <el-row>
<!--    导航栏开始-->
    <el-col>
      <el-row class="my-nav-bar nav-pos nav-bg">
        <el-col :span="4" :offset="2">
          <a href="https://www.imzhuge.com/" title="嗨皮诸葛" style="margin-left: 2.5%">
            <img src="@/assets/images/logo.png" alt="嗨皮诸葛" height="40"/>
          </a>
        </el-col>
        <el-col :span="16" style="position: relative">
          <ul class="my-nav">
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/weekly_forecast" class="navcurr">典型应用</router-link>
            </li>
            <li>
              <router-link to="/personal_center">个人中心</router-link>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-col>
<!--    导航栏结束-->

<!--    当前位置开始-->
    <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically" style="margin-top: 80px">
      您当前的位置：
      <span class="cur-de">全球经济政策不确定性预警</span>
    </el-col>
<!--    当前位置结束-->

<!--    网格图模块开始-->
    <el-col :span="20" :offset="2" class="pc-card my-card-pd">
      <el-row>
        <el-col :span="2">年份</el-col>
        <el-col :span="22">
          <el-radio-group v-model="year" class="my-radio-group">
            <el-radio-button class="my-radio" v-for="year in years" :label="year" :key="year" >
              {{year}}
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>

      <el-row style="margin-top: 10px">
        <el-col :span="2">行业</el-col>
        <el-col :span="22">
          <el-radio-group v-model="industry" class="my-radio-group">
            <el-radio-button class="my-radio" v-for="industry in industrys" :label="industry" :key="industry" >
              {{industry}}
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>

      <el-row>
        <el-col id="graph"></el-col>
      </el-row>

    </el-col>
<!--    网格图作图模块结束-->
  </el-row>
</template>

<script>
import {getCSRFToken} from '@/api/token'

export default {
  name: "pc_industry_relationship",
  // 数据
  data(){
    return{
      echarts:'',
      years:['2007', '2008', '2009', '2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
      year:'',
      industrys:['金融','新能源'],
      industry:''
    }
  },
  // 在模板渲染成html后调用mounted中内容，通常是初始化页面完成后
  mounted() {
    this.echarts = require('echarts')
    this.getCSRFTokenMethod();
    // 作图方法
    this.myGraph()
  },
  // 方法
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 作图方法
    myGraph(){
      // 基于准备好的dom，初始化echarts实例
      let myGraph = this.echarts.init(document.getElementById('graph'));
      let option = {
        title: {
          text: 'Basic Graph'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: [
              {
                name: 'Node 1',
                x: 300,
                y: 300
              },
              {
                name: 'Node 2',
                x: 800,
                y: 300
              },
              {
                name: 'Node 3',
                x: 550,
                y: 100
              },
            ],
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                label: {
                  show: true
                },
                lineStyle: {
                  width: 5,
                  curveness: 0.2
                }
              },
              {
                source: 'Node 2',
                target: 'Node 1',
                label: {
                  show: true
                },
                lineStyle: {
                  curveness: 0.2
                }
              },
              {
                source: 'Node 1',
                target: 'Node 3'
              },
              {
                source: 'Node 2',
                target: 'Node 3'
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      }
      myGraph.setOption(option);
    }
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:rgb(253,243,239)')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
  },
}
</script>

<style scoped>
#graph{
  height: 350px;
}
/*修改element原有单选框样式开始*/

/*被选后的单选框*/
.my-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #FFFFFF;
  background: #FF8383;
  border-color: #FF8383;
  box-shadow:none
}

/*单选框样式*/
.my-radio >>> .el-radio-button__inner {
  margin-right: 15px;
  border:#FEF0F0 solid 1px;
  border-radius: 10px;
  background: #FEF0F0;
  color: #FA605F;
  padding: 4px 6px;
  font-size: 12px;
  margin-bottom: 7px;
  width: 65px;
}

/*单选框覆盖原有阴影*/
.my-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}

/*修改element原有单选框样式结束*/
</style>
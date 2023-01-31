<!--行业个股收益率预测-->
<template>
  <el-container class="container">

    <!--header开始-->
    <el-header class="header" height="120px">
      <myheader></myheader>
    </el-header>
    <!--header结束-->
    <el-container>
      <el-aside class="aside">
        <myaside></myaside>
      </el-aside>

      <el-main class="main">
        <el-row >
          <el-col :span="9" class="box1">
            <span>简介</span>
          </el-col>
          <el-col :span="14" :offset="1" class="box2">
            <el-row class="one">
              <el-col  :span="4" ><div>状态：</div></el-col>
              <el-col :span="4"><div>全部</div></el-col>
              <el-col :span="4"><div>进行中</div></el-col>
              <el-col :span="4"><div>已结束</div></el-col>
              <el-col :span="4"><div>结果待揭晓</div></el-col>
              <el-col :span="4"><div>已结算</div></el-col>
            </el-row>

            <el-row class="two" >
              <el-col :span="4"><div>我的：</div></el-col>
              <el-col :span="4"><div>已审核</div></el-col>
              <el-col :span="4"><div>待审核</div></el-col>
            </el-row>

            <el-row class="three">
              <el-col  :span="24"><div>搜索：</div></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" >
            <div class="title-box2">
              行业列表
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 30px">
          <el-col :offset="1">
            <el-table :data="industryList" row-key="company"
                      border
                      :tree-props="{children: 'list', hasChildren: 'hasChildren'}"
                      :header-cell-style="tdstyle"


            >
              <el-table-column
                  prop="id"
                  label=" "
                  v-if="false"
              >
              </el-table-column>
              <el-table-column
                  prop="company"
                  label="  "
              >
              </el-table-column>
              <el-table-column
                  prop="stock_id"
                  label="股票代码"
              >
              </el-table-column>
              <el-table-column
                  prop="hot"
                  label="热度"
              >
                <template v-slot="scope" >
                  <el-rate v-model="scope.row.hot" :allow-half="true"  disabled v-if="scope.row.id!=null"
                           show-score score-template="{value}" text-color="#ff9900" ></el-rate>
                </template>
              </el-table-column>
              <el-table-column
                  prop="no1"
                  label="当前第一名"
              >
              </el-table-column>
              <el-table-column
                  label=" "
              >
                <template v-slot="scope">
                  <el-button @click="todetail(scope.row.id,scope.row.company)" type="text" size="small" v-if="scope.row.id!=null">查看详情</el-button>
                </template>

              </el-table-column>

            </el-table>
          </el-col>

        </el-row>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import Myheader from "@/components/myheader";
import myaside from "@/components/myaside";
import {
  getIndustryList,/*获取我发布的活动*/
} from '@/api/month_redict'
export default {
  name: "pc_weekly_forecast",
  components: {Myheader, myaside},
  data() {
    return{
      industryList:[],
      myList:'',

    }
  },
  mounted() {
    this.getIndustryListMethod()
  },
  methods: {
    tdstyle({row,column,rowIndex}){
      if(rowIndex===0){
        return "background-color:RGB(248,248,248)"
      }
    },
    getIndustryListMethod(){
      getIndustryList().then((res) => {
        this.myList=res.data
//转换字段名
        this.industryList = JSON.parse(JSON.stringify(this.myList).replace(/name/g,"company"))
      })
    },

    todetail(id,company){
      /*传值*/
      this.$router.push({
        path:'/weekly_forecast_details',
        query:{
          id:id,
          name:company
        },
      })
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

  position: relative;
}
.box1{
  height: 100px;
  color: #606266;
}
.box2{
  height: 100px;
  /*right: 50px;*/
  text-align: left;
}
.one{
  color: #606266;
  margin-top: 1px;
}
.two{
  color: #606266;
  margin-top: 1px;
}
.three{
  color: #606266;
  margin-top: 1px;
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
.box4{
  margin-top: 20px;
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
.el-table{
  background-color: RGB(248,248,248);
}
</style>
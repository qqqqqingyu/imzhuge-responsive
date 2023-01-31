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
        <div class="box3">
          <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              lazy
              :load="load"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                prop="trade"
                label="   "
                width="180">
            </el-table-column>
            <el-table-column
                prop="popularity"
                label="人气">
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                width="180">
              <el-button type="primary" @click="skip">查看详情</el-button>
            </el-table-column>
          </el-table>
        </div>


      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import Myheader from "../components/myheader";
import myaside from "../components/myaside";
export default {
  name: "MonthlyForecast_industrialchain",
  components: {Myheader, myaside},
  data() {
    return {
      tableData: [{
        id: 1,
        trade: '产业链一',
        popularity: '',
        children: [{
          id: 11,
          trade: '公司一',
          popularity: '100',
        }, {
          id: 12,
          trade: '公司二',
          popularity: '1000',
        }]
      }, {
        id: 2,
        trade: '产业链二',
        popularity: '',
        children: [{
          id: 21,
          trade: '公司一',
          popularity: '200',
        },{
          id: 22,
          trade: '公司二',
          popularity: '2000',
        }]
      }, {
        id: 3,
        trade: '产业链三',
        popularity: '',
        children: [{
          id: 31,
          trade: '公司一',
          popularity: '300',
        }, {
          id: 32,
          trade: '公司二',
          popularity: '3000',
        }]
      }]
    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            trade: '',
            popularity: '',
          }, {
            id: 32,
            trade: '',
            popularity: '',
          }
        ])
      }, 1000)
    },
    skip(){
      this.$router.replace('/MonthlyForecast_details1')
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
  border: 1px solid gray;
}
.box2{
  height: 100px;
  /*right: 50px;*/
  text-align: left;
}
.box3{
  top: 900px;
  width: 70%;
  height: 100%;
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
</style>
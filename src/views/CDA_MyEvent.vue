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
        <el-row class="box2" >
          <el-col :span="16" :offset="4">
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
          <el-col class="box4" :span="20" :offset="2">
            <el-card  class="box-card" v-for="item in dataList" :key="item.id">
              <template #header>
                <el-row class="clearfix">
                  <el-col :span="24" style="text-align: left;">
                    <el-button style="font-family: 'Arial Black';color: #F56C6C;font-size: 20px" type="text" v-on:click="todetails(item.id,item.title)">
                      {{item.title}}
                    </el-button>
                  </el-col>
                  <el-col :span="10" :offset="15"><div>类型：[CDA]</div></el-col>
                </el-row>
              </template>
              <div class="text item">
                <el-row :span="24" style="margin-bottom: 10px;font-family: 'Hiragino Sans GB';color: #606266"><i class="el-icon-edit" style="margin-right: 6px"></i> 描述：{{item.desc}}</el-row>

                <el-row :span="24" style="margin-bottom: 10px;font-family: 'Hiragino Sans GB';color: #606266"><i class="el-icon-collection-tag" style="margin-right: 6px"></i>类别：kong</el-row>

                <el-row :span="24" style="margin-bottom: 10px;font-family: 'Hiragino Sans GB';color: #606266"><i class="el-icon-time" style="margin-right: 6px"></i>活动时间：{{item.pro_start_time}}------{{item.pro_end_time}}</el-row>

                <el-row :span="24" style="margin-bottom: 10px;font-family: 'Hiragino Sans GB';color: #606266"><i class="el-icon-coin" style="margin-right: 6px"></i>奖金：{{item.award}}</el-row>

                <el-row :span="24" style="margin-bottom: 10px;font-family: 'Hiragino Sans GB';color:#E6A23C"><i class="el-icon-s-help" style="margin-right: 6px"></i>状态：{{item.status}}</el-row>
                <el-row >
                  <el-col :span="4" :offset="20">
                    <el-button  type="text" v-on:click="todetails(item.id,item.title)">
                      活动详情
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import {
  getCdaMyActivity,/*获取我发布的活动*/
} from '@/api/auction'
import Myheader from "../components/myheader";
import myaside from "../components/myaside";
export default {
  name: "CDA_MyEvent",
  components: {Myheader, myaside},
  data() {
    return {
      dataList:'',
      alert_code: "",
      alert_message: '',
    }
  },
 /* mounted() {
    this.getCdaMyActivityMethod()
  },*/
  mounted() {
    this.getCdaMyActivityMethod()
  },
  methods :{
    /*时间形式转化*/
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    },
    //根据开始时间排序，倒序，这里是获取时间的时间戳然后比较
    sortData(a, b){
      return new Date(b.pro_start_time).getTime() - new Date(a.pro_start_time).getTime()
    },
    /*获取我发布的活动*/
    getCdaMyActivityMethod() {
      getCdaMyActivity().then(response => {
        this.dataList=response.data;
        /*按照时间排序*/
        this.dataList = this.dataList.sort(this.sortData)
        /*完成时间形式转化以及状态表示*/
        for(const i of this.dataList){
          i.pro_start_time =this.$options.methods.formatTimer(i.pro_start_time)
          i.pro_end_time =this.$options.methods.formatTimer(i.pro_end_time)
          if(i.status=='0'){
            i.status= "审核中"
          }
          else if(i.status=='1'){
            i.status= "通过"
          }
          else{
            i.status= "未通过"
          }
        }
      })
    },

    todetails:function (id,title){

      this.$router.push({
        path:'/CDA_MyEventDetails',
        query:{
          activityId:id,
          title:title
        }
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

/*超链接样式，取消下划线，改颜色*/
a {
  text-decoration: none;
  color: #3E4756;
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
/*.box1{
  width: 600px;
  height: 300px;
  position: absolute;
  top: 50px;
  left: 80px;
  border: 2px solid black;
}*/
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

.box4{
  margin-top: 5px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  text-align: left;
  font-size: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}


.box-card {
  width: 100%;
  text-align: left;
  top:500px;
  margin: 2px;
}
  /*border: 2px solid black;*/

.box-card {
  width: 100%;
  text-align: center;
  margin: 2px;

}
/deep/ .el-card {
  background-color:RGB(248,248,248);
}
.box5{
  height: 30px;
  margin-top: 20px;
  text-align: center;
  background-color: yellow
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
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
          <el-col :span="3" >
            <div class="title-box2">
              已提交信息
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="box2" :span="20" :offset="2">
            <el-row style="font-size:16px;margin-left: 5px;margin-bottom: 10px;margin-top:10px;font-family: 'Arial Black';color:#F56C6C"><i class="el-icon-info" style="margin-right: 6px"></i>标题：{{dataList.title}}</el-row>
            <el-row style="font-size:16px;color: #E6A23C;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-s-help" style="margin-right: 6px"></i>状态：{{dataList.status}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-edit" style="margin-right: 6px"></i>描述：{{dataList.desc}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-collection-tag" style="margin-right: 6px"></i>市场类型：{{dataList.market_type}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-coin" style="margin-right: 6px"></i>奖金：{{dataList.award}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-time" style="margin-right: 6px"></i>活动开始时间：{{dataList.pro_start_time}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-switch-button" style="margin-right: 6px"></i>活动结束时间：{{dataList.pro_end_time}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-document" style="margin-right: 6px"></i>验证资料：{{dataList.verify_material}}</el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="box3" :span="20" :offset="2">
            <el-row style="font-weight: bold;font-size: 20px;margin-left: 5px;margin-top: 10px;color:#F56C6C">创建市场信息</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';" ><i class="el-icon-money" style="margin-right: 6px"></i>开市价格：{{dataList.market_price}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-s-data" style="margin-right: 6px"></i>市场价格与诸葛贝结算的换算系数：{{dataList.price_conversion}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-question" style="margin-right: 6px"></i>是否为通用活动：{{dataList.is_gen}}</el-row>
            <!--          <p>###如果选择否，则出现下面两个选项###</p>-->
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';"><i class="el-icon-bank-card" style="margin-right: 6px"></i>赠送的合约数量(份)：{{dataList.contract_free}}</el-row>
            <el-row style="font-size:16px;margin-left: 5px;margin-top: 10px;font-family: 'Hiragino Sans GB';" v-if="dataList.is_gen!='1'"><i class="el-icon-coin" style="margin-right: 6px"></i>增送的诸葛贝数量：{{dataList.coin_free}}</el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3"  >
            <div class="title-box2">
              结算
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="box5" :span="20" :offset="2">
            <el-row>
              <el-col :span="7" style="margin-top: 10px;margin-left: 5px">
                请输入最终结果(诸葛贝)：
              </el-col>
              <el-col :span="8" style="margin-top: 5px">
                <el-input v-model="final_price" placeholder="请输入最终结果(诸葛贝)： " ></el-input>
              </el-col>
            </el-row>
            <el-row class="box6" >
              <el-col :span="2" :offset="18">
                <el-button type="primary" v-on:click="liquidationActivityMethod">提交结算申请</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import {
  getLiquidationInfo,
  liquidationActivity
} from '@/api/auction'
import Myheader from "../components/myheader";
import myaside from "../components/myaside";
export default {
  name: "CDA_MyEventDetails",
  components: {Myheader, myaside},
  data() {
    return {
      dataList:{
        title: '',
        status: "",
        desc: '',
        award: '',
        pro_start_time:'',
        pro_end_time:'',
        verify_material:'',
        market_price:'',
        price_conversion:'',
        is_gen:'',
        coin_free:'',
        contract_free:'',
        market_type:''
      },
      id:'',
      final_price:'',

    }
  },
  mounted() {
    this.getLiquidationInfoMethod()
  },
  methods :{
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
    //获取信息
    getLiquidationInfoMethod() {
      //获取到我发起的活动页面传递过来的id
      const getId=this.$route.query.activityId;
      /*this.id=getId;*/
      getLiquidationInfo(getId).then(response => {
        this.dataList=response.data;/*这里的表示有疑问*/
        if(this.dataList.is_gen===0){
          this.dataList.is_gen='不通用'
        }
        else{
          this.dataList.is_gen='通用'
        }

        if(this.dataList.status==1){
          this.dataList.status='通过'
        }
        else if(this.dataList.status==0){
          this.dataList.status='审核中'
        }
        else{
          this.dataList.status='未通过'
        }
        if(this.dataList.market_type=='1'){
          this.dataList.market_type='CDA'
        }
        else{
          this.dataList.market_type='未知'
        }
        this.dataList.pro_start_time=this.$options.methods.formatTimer(this.dataList.pro_start_time)
        this.dataList.pro_end_time=this.$options.methods.formatTimer(this.dataList.pro_end_time)
      })

    },
    /*post最终结果*/
    liquidationActivityMethod() {
      const getId=this.$route.query.activityId;
      let liquidation = {};
      liquidation.final_price = this.final_price
      // 弹出的提示框
      this.$confirm('您确认以'+liquidation.final_price+'个诸葛贝对活动进行清算吗？', '活动清算', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  // 选择确定时运行这段代码
        liquidationActivity(getId, liquidation).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!提交结果:'+liquidation.final_price+'个诸葛贝。界面即将跳转……'
          });
          // 延迟5s后跳转
          setTimeout(() => {
            this.$router.push('/CDA_MyEvent');
          }, 5000);
        }).catch(() => { //提交数据失败
          this.$message({
            type: 'info',
            message: '提交失败，请重试'
          });
        });
      }).catch(() => {  //选择取消时运行这段代码
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
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

.box2{
  height: 270px;
  margin-top: 20px;
  text-align: left;
  border: 1px solid #9EA9B1;
}

.box3{
  margin-top: 10px;
  height: 210px;
  text-align: left;
  border: 1px solid #9EA9B1;
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
.box5{
  margin-top: 20px;
  height: 110px;
  text-align: left;
  border: 1px solid #9EA9B1;
}

.box6{
  margin-top: 10px;
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
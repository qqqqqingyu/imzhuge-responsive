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
        <p style="font-weight: bold;font-size: 50px;">发布双向拍卖(CDA)活动</p>
        <el-row>
          <el-col :span="11" class="box1">
            <p style="font-weight: bold;font-size: 20px">基本信息</p>
            <el-form ref="form1" v-model="form1" label-width="30%" label-position="left" size="mini">
              <el-form-item label="标题：">
                <el-input v-model="form1.title" ></el-input>
              </el-form-item>
              <el-form-item label="描述：">
                <el-input type="textarea" v-model="form1.desc"></el-input>
              </el-form-item>
              <!--            <el-form-item label="类别：">
                            <el-select v-model="form1.kind" placeholder="请选择活动类别">
                              <el-option label="科技" value="science"></el-option>
                              <el-option label="财经" value="finance"></el-option>
                              <el-option label="教育" value="education"></el-option>
                              <el-option label="体育" value="sport"></el-option>
                              <el-option label="汽车" value="car"></el-option>
                              <el-option label="房产" value="property"></el-option>
                              <el-option label="娱乐" value="entertainment"></el-option>
                            </el-select>
                          </el-form-item >-->
              <el-form-item label="奖金：" placeholder="不填默认为0">
                <el-input v-model="form1.award" ></el-input>
              </el-form-item>
              <el-form-item label="活动开始时间：" style="width: 100%">
                <el-date-picker type="datetime" placeholder="请选择活动开始时间"  v-model="form1.pro_start_time"
                                format="YYYY-MM-DD HH:mm:ss" style="width: 100%"
                                value-format="YYYY-MM-DD HH:mm:ss" ></el-date-picker>
              </el-form-item>
              <el-form-item label="活动结束时间：">
                <el-date-picker type="datetime" placeholder="请选择活动结束时间"  v-model="form1.pro_end_time"
                                format="YYYY-MM-DD HH:mm:ss" style="width: 100%"
                                value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
              </el-form-item>
              <el-form-item label="验证资料：">
                <el-input type="textarea" v-model="form1.verify_material"></el-input>
              </el-form-item>
            </el-form>
          </el-col>

          <el-col :span="11" class="box1" :offset="1">
            <p style="font-weight: bold;font-size: 20px">市场信息</p>
            <el-form ref="form2" v-model="form2"  label-position="left" size="mini">
              <el-form-item label="请输入开市价格:" label-width="30%">
                <el-input v-model="form2.market_price"></el-input>
              </el-form-item>
              <el-form-item label="请输入市场价格与诸葛贝结算的换算系数：" label-width="70%">
                <el-input v-model="form2.price_conversion"></el-input>
              </el-form-item>
              <el-form-item label="是否为通用活动?" >
                <el-radio-group v-model="form2.is_gen" size="small">
                  <el-radio label="1" border v-on:click="yes" >是</el-radio>
                  <el-radio label="0" border v-on:click="no">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="请输入赠送的合约数量(份)：" label-width="48%" >
                <el-input v-model="form2.contract_free"></el-input>
              </el-form-item>
              <el-form-item label="请输入增送的诸葛贝数量：" label-width="45%" v-if="form2.is_gen!='1'">
                <el-input v-model="form2.coin_free"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit" type="primary" v-on:click="startActivityMethod" >提交</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>


    </el-container>
  </el-container>
</template>
<script>

import {
  startActivity,
} from '@/api/auction'
import Myheader from "../components/myheader";
import myaside from "../components/myaside";
export default {
  name: "CDA_PublishiActivity",
  components: {Myheader, myaside},
  data () {
    return {

      form1:{
        title:'',
        desc:'',
        /*kind:'',*/
        award:'',
        pro_start_time:'',
        pro_end_time:'',
        verify_material:'',
      },
      form2:{
        market_price:'',
        price_conversion:'',
        is_gen:'1',
        coin_free:'0',
        contract_free:'',
      }
    };
  },

  methods:{

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
      return y + "/" + MM + "/" + d + " " + h + ":" + m;
    },

    yes(){
      this.form2.is_gen='1';
      this.form2.coin_free='0'
    },
    no(){
      this.form2.is_gen='0';
      this.form2.coin_free=''
    },

    startActivityMethod() {
      if(this.form1.title.length==0){
        alert("未输入标题")
      }
      else if(this.form1.desc.length==0){
        alert("未输入描述")
      }
      else if(this.form1.award<0){
        alert("奖金小于0")
      }
      else if(this.form1.pro_start_time.length==0){
        alert("未输入活动开始时间")
      }
      else if(this.form1.pro_end_time.length==0){
        alert("未输入活动结束时间")
      }
      else if(this.form1.verify_material.length==0){
        alert("未输入验证资料")
      }
      else if(this.form2.market_price.length==0){
        alert("未输入市场价格")
      }
      else if(this.form2.market_price<0){
        alert("市场价格为负")
      }
      else if(this.form2.price_conversion.length==0){
        alert("未输入未输入换算系数")
      }
      else if(this.form2.price_conversion<0){
        alert("换算系数为负")
      }
      else {



  let active = {};
  active.id = 39
  active.title = this.form1.title;
  active.desc = this.form1.desc;

  if(this.form1.award.length==0){
    active.award = '0';
  }
  else{
    active.award =this.form1.award;
  }
  if (this.form1.pro_start_time.length != 0) {
    active.pro_start_time = this.$options.methods.formatTimer(this.form1.pro_start_time);
  }
  if (this.form1.pro_end_time.length != 0) {
    active.pro_end_time = this.$options.methods.formatTimer(this.form1.pro_end_time);
  }
  active.verify_material = this.form1.verify_material;
  active.market_price = this.form2.market_price;
  active.price_conversion = this.form2.price_conversion;
  active.is_gen = this.form2.is_gen;
  active.coin_free = this.form2.coin_free;
  active.contract_free = this.form2.contract_free;
  startActivity(active).then(() => {
    this.$message('发起活动成功，请等待审核员审核。');
    this.$router.push({ path: '/CDA_EventSquare' })
  }).catch(() => {
    this.$message('提交失败');
  })
}
    },
    },
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
  line-height: 50px;
  position: relative;
}
.box1{
  margin-top: 50px;
  text-align: left;
  padding: 2%;
  border: #DCDCDC 1px solid;
}

.submit{
  margin-top: 10%;
  margin-left: 45%;
  text-align: center;
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
<template>
  <div class="container">
    <el-row style="margin-top: 20px">
      <el-col :span="1" :offset="1">
        <router-link to="/">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
          行业个股收益率预测
        </el-row>
      </el-col>
    </el-row>
    <div class="activity_introduction">
      <el-row style="margin-top: 20px">
        <el-col :offset="1" :span="23">
          <p style="font-size: 21px;font-weight: bold;color: #333333">活动简介</p>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px;margin-bottom: 10px;">
        <el-col :span="22" :offset="1">
          <div class="introduction">
            <el-row class="introduction-content">
              <el-col>
                <p>该应用中AI算法和您共同完成对每个行业中的7家上市公司个股收盘价周度百分比变动从大到小进行排序。请您预测收盘价周度变动百分比哪一家上市公司会排第一？</p>
              </el-col>
              <el-col style="margin-top: 10px">
                <p>个股收盘价周度百分比计算公式</p>
              </el-col>
            </el-row >
            <el-row  class="my-formula center-vertically">
              <el-col :span="10" class="right" style="max-width: 40%">个股收盘价周度百分比=</el-col>
              <el-col :span="14" class="center">
                <el-row>
                  <el-col>
                    {{endDay}}收盘价-{{startDay}}收盘价
                  </el-col>
                  <el-divider></el-divider>
                  <el-col>{{startDay}}收盘价</el-col>
                </el-row>
              </el-col>
            </el-row>

          </div>
        </el-col>

      </el-row>
    </div>
<!--    行业列表部分-->
    <div class="industry_list">
      <el-row style="margin-top: 20px">
        <el-col :offset="1" :span="23">
          <p style="font-size: 21px;font-weight: bold;color: #333333">行业列表</p>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px;margin-bottom: 10px;">
        <el-col :span="22" :offset="1">
          <div class="industry" v-for="(item,index) in industryList"
               :key="index">
            <div class="head-part" v-on:click="isOpen(index)" >
              <el-row>
                <el-col :span="2" class="arrow">
                  <img  :src="require('@/assets/images/arrdn.svg')" width="16" alt="right-arrow" v-if="openOrClose[index]==true">
                  <img :src="require('@/assets/images/arrdn.svg')" width="16" style="transform: rotate(270deg);"  alt="down-arrow" v-else>
                </el-col>
                <el-col :span="21">
                  <el-row>
                    <el-col :span="3" >
                      <img class="image-size" :src="getImagePath(item.name)" alt="industry-icon">
                    </el-col>
                    <el-col :span="15" >
                      <span style="font-size: 17px;color:#333333;font-weight: bold;">{{item.name}}</span>
                      <!--                <i class="el-icon-caret-bottom" ></i>-->
                    </el-col>
                    <el-col :span="4" :offset="1">
                      <router-link :to="{path:'/weekly_forecast_transaction',query:{id:item.id,name:item.name}}">
                        <span style="color: #EF9C19;font-weight: bold;">查看 ></span>
                      </router-link>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 10px;">
                    <el-col  :span="3">
                      <span style="color:#AAAAAA;font-size: 15px">热度</span>
                    </el-col>
                    <el-col :span="11" >
                      <el-rate
                          v-model=item.hot
                          disabled
                          text-color="#ff9900">
                      </el-rate>
                    </el-col>
                    <!--                  <el-col :span="10" >-->
                    <!--                    <span style="color: #AAAAAA;margin-right: 5px;font-size: medium">NO.1</span>-->
                    <!--                    <span style="color: #FFFFFF;-->
                    <!--                    font-size:12px;padding: 8px;background-color: #F75C4F;border-radius: 8px;">{{item.no1}}</span>-->
                    <!--                  </el-col>-->
                  </el-row>
                </el-col>
              </el-row>

            </div>

            <div class="buttom-part" v-if="openOrClose[index]==true">
              <el-row>
                <el-table
                    class="el-table"
                    :data=item.list
                    style="font-size: 13px;"
                    :show-header=false

                    :cell-style="cellStyle">

                  <el-table-column
                      prop="company"
                      label="公司">
                  </el-table-column>
                  <el-table-column
                      prop="stock_id"
                      label="股票代码"
                  >
                  </el-table-column>

                </el-table>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
  <bottom-nav></bottom-nav>

</template>

<script>
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_weekly_forecast",
  components:{bottomNav},
  data() {
    return {
      //pictureList:pictures,
      pictureTree:'',
      openOrClose:[false],
      openId:0,
      industryMapping: {
        '金融': 'finance',
        '新能源': 'new-energy',
        '金融（不含银行）': 'finance2',
        '房地产': 'real-estate',
        '传媒': 'media',
        '消费': 'consumption',
        '计算机': 'computer',
      }
    }
  },

  computed:{
    industryList(){
      return this.$store.getters.industryList.data
    },
    startDay(){
      return this.$store.getters.industryList.start_day
    },
    endDay(){
      return this.$store.getters.industryList.end_day
    }
  },
  mounted() {
    this.getCSRFTokenMethod()
  },
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 表格单列颜色
    cellStyle ({columnIndex }) {
      // 状态列字体颜色
      if(columnIndex === 1){
        return 'color: #7F7F7F;text-align: center;width:50%'
      }
      if(columnIndex === 0){
        return 'color:  #333333;text-align: center;width:50%'
      }
      else{
        return 'color:  #333333'
      }
    },
    isOpen : function(index) {
      this.openOrClose[index]=!this.openOrClose[index]
      // console.log(index,this.openOrClose[index])
    },
    // 根据行业调用相应图片
    getImagePath(industry) {
      const englishIndustryName = this.industryMapping[industry];
      return require(`@/assets/images/${englishIndustryName}.png`);
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



}
</script>

<style scoped>
.container{
  margin-bottom: 40px;
}
.head-part{
  background-color: #FFFFFF;
  border-radius: 18px;
  margin-bottom: 10px;
  /*padding-top: 10px;*/
  padding-bottom: 10px;
  padding-top: 20px
}
.arrow{
  text-align: center;
  line-height: 60px;
  padding-left: 5px;
  margin-right: 5px;
}
.image-size{
  width: 60%;
}
/deep/ .el-icon-arrow-right{

}
.el-table{
  border-radius: 18px;
  background-color: #FFFFFF;
}

.buttom-part{
  border-radius: 18px;
  margin-bottom: 10px;
}
a {
  text-decoration: none;
}
.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  color:#555555;
  font-size: 15px;
  margin-bottom: 0px;
}

.introduction-content{
  padding-left: 10px;
  padding-right:  10px;
  padding-top: 10px;
}

.my-formula{
  font-size: 9px;
  text-align: center;
  margin-top: 5px;
  padding-left: 0;
  padding-right: 6px;
  padding-bottom: 10px;
  margin-left: 3px;
  color: #7F7F7F;
}

.my-formula >>> .el-divider--horizontal{
  margin-top: 1px;
  margin-bottom: 1px;
  font-weight: 300;
}

.my-formula >>> .el-divider{
  background: #7F7F7F;
}

</style>
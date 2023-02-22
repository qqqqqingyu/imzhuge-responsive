<template>
  <div class="container">
    <el-row style="margin-top: 20px">
      <el-col :span="1" :offset="1">
        <router-link to="/">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row style="justify-content: center;font-size:16px;font-weight: bolder;color: #2e2e2e">
          行业个股收益率预测
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :offset="1" :span="23">
        <p style="font-size: 21px;font-weight: bold;color: #333333">行业列表</p>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;margin-bottom: 10px;">
      <el-col :span="22" :offset="1">
        <div class="industry" v-for="item in industryList"
             :key="item">
          <div class="head-part">
            <el-row style="padding-top: 20px">
              <el-col :span="3" :offset="1">
                <img :src="require('@/assets/images/industry1.jpg')">
              </el-col>
              <el-col :span="15" >
                <span style="font-size: 17px;color:#333333;font-weight: bold">{{item.name}}</span>
              </el-col>
              <el-col :span="4" :offset="1">
                <router-link :to="{path:'/weekly_forecast_details',query:{id:item.id,name:item.name}}">
                  <span style="color: #ff697b;font-weight: bold;">查看 ></span>
                </router-link>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col  :span="3" :offset="1">
                <span style="color:#AAAAAA;font-size: 15px">热度</span>
              </el-col>
              <el-col :span="10" >
                <el-rate
                    v-model=item.hot
                    disabled
                    text-color="#ff9900">
                </el-rate>
              </el-col>
              <el-col :span="8" :offset="2">
                <span style="color: #AAAAAA;margin-right: 5px;font-size: medium">NO.1</span>
                <span style="color: #FFFFFF;
                    font-size:14px;padding: 8px;background-color: #F75C4F;border-radius: 8px;">{{item.no1}}</span>
              </el-col>


            </el-row>
          </div>

          <div class="buttom-part">
            <el-row>
              <el-table
                  class="el-table"
                  :data=item.list
                  style="font-size: 13px;"
                  :show-header=false
                  :row-class-name="rowClassName"
                  :cell-style="cellStyle">
                <el-table-column
                    prop="id"
                    label="序列"
                >
                </el-table-column>
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
  <bottom-nav></bottom-nav>





</template>

<script>
import bottomNav from "../../../components/bottomNav";
export default {
  name: "mobile_weekly_forecast",
  components:{bottomNav},
  data() {
    return {
      //pictureList:pictures,
      pictureTree:'',
    }
  },

  computed:{
    industryList(){
      return this.$store.getters.industryList
    },

  },
  methods:{
    // 为表格加上行号
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row.id
      row.id = rowIndex+1;
    },
    // 表格单列颜色
    cellStyle ({columnIndex }) {
      // 状态列字体颜色
      if(columnIndex === 2){
        return 'color: #7F7F7F'
      }
      if(columnIndex === 0){
        return 'color:  #333333;text-align: center;width:50%'
      }
      else{
        return 'color:  #333333'
      }
    },
    // 传值到详情页
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


</style>
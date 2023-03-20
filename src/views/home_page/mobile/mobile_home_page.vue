<template>
  <div class="container">
<!--    头部导航-->
    <el-row class="head-part">
      <el-col :offset="1" span="23">
        <el-row>
          <a href="https://www.imzhuge.com/" title="嗨皮诸葛" >
            <img src="@/assets/images/logo.png" alt="嗨皮诸葛" style="width:60% "/>
          </a>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="10">
            <img src="@/assets/images/left-picture.png" alt="背景图片" style="width: 100%"/>
          </el-col>
          <el-col :span="13" :offset="1">
            <el-row class="head-part-info">
              <span>
                做财经领域高水平的<br>人机融合预测平台
              </span>
            </el-row>
<!--            这里写的不太好-->
            <el-row style="margin-top: 10px;">
              <el-col :span="19">
                <el-button round class="to-activitySquare"  size="small" v-on:click="toActivitySquare">
                  <el-col :span="16" :offset="2">
                    <el-row class="to-activitySquare-contain" >体验预测市场</el-row>
                    <el-row class="to-activitySquare-contain" style="font-size: 12px;margin-top: 5px">（原活动广场）</el-row>
                  </el-col>
                  <el-col :span="4" :offset="2">
                    <img src="@/assets/images/two-right-arrow.svg" alt="前往原活动广场" style="width: 150%"/>
                  </el-col>
                </el-button>
              </el-col>

            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
<!--    典型应用-->
    <el-row>
      <el-col :span="22" :offset="1">
        <el-row class="typical-application-title">
          <span>典型应用</span>
        </el-row>
        <el-row class="weekly-forecast-part">
          <el-col>
            <el-row style="justify-content: center">
              <span style="font-size:20px;color: #333333;font-weight: bold ">企业收益率预测排序</span>
            </el-row>
            <el-row style="justify-content: center;margin-top: 10px;">
              <span style="font-size:14px;color: #555555;">基于人机融合做细分行业收益率排序</span>
            </el-row>
            <el-row style="justify-content: center;margin-top: 15px;">
              <el-button class="toMore" round size="small" v-on:click="toWeeklyForecast">
                <span style="font-size:13px;color: rgba(255,255,255,0.71);">查看更多</span>
              </el-button>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="economic-uncertainty-warning-part">
          <el-col>
            <el-row style="justify-content: center">
              <span style="font-size:20px;color: #333333;font-weight: bold ">全球经济不确定性预警</span>
            </el-row>
            <el-row style="justify-content: center;margin-top: 10px;">
              <span style="font-size:14px;color: #555555FE;">融合领域专家与机器智慧做全球经济与政</span>
            </el-row>
            <el-row style="justify-content: center;margin-top: 5px;">
              <span style="font-size:14px;color: #555555FE;">策不确定性评估和预警。</span>
            </el-row>

            <el-row style="justify-content: center;margin-top: 15px;">
              <el-button style="color: #FFFFFFE2" round size="small" >
                <span style="font-size:12px;color: #333333FC;">即将发布</span>
              </el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
<!--    免责声明-->
    <el-row>
      <el-col :span="20" :offset="2" style="text-align: center;">
        <span class="res_deceleration" onclick="res_deceleration()">
        免责声明
      </span>
        <div class="detail__board" id="detail-board-front">
          <div class="detail__inner">
            <div onclick="res_close()"><a class="detail__close"><img style="width: 30px;height: 30px"
                                                                     :src="require('@/assets/images/close.svg')" alt="close"></a>
            </div>
            <div class="detail__article">
              <h3 class="detail__header">免责声明</h3>
              <div class="detail__content">
                <p style="text-indent:2em;">“嗨皮诸葛”是预测领域的研究平台，不收取任何服务佣金，目前该平台重点关注预测市场（prediction market），基于市场机制汇集大众的集体智慧，预测未来的事件。预测信息不对任何投资人及/或任何交易提供任何担保，无论是明示、默示或法定的。
                  “嗨皮诸葛”提供的各种信息及资料（包括但不限于文字、数据、图表及超链接）仅供参考（例如：对未来趋势的预测不代表实际会发发生），不作为任何法律文件，亦不构成任何邀约、投资建议或承诺，投资人应依其独立判断做出决策。投资人据此进行投资交易而产生的风险等后果请自行承担，“嗨皮诸葛”不承担任何责任。</p>
              </div>
            </div>
          </div>

        </div>
      </el-col>

    </el-row>
  </div>
  <bottom-nav></bottom-nav>

</template>

<script>
import bottomNav from "../../../components/bottomNav";
import config from '@/config'
import {getCSRFToken} from '@/api/token'
export default {
  name: "mobile_home_page",
  components:{bottomNav},
  mounted() {
    this.getCSRFTokenMethod()
  },
  created: function () {
    window.showUnderline = this.showUnderline;
    window.res_deceleration = this.res_deceleration;
    window.res_close = this.res_close;
    this.$nextTick(() => {
      this.toLocal()
    })
  },
  methods:{
    res_deceleration() {
      document.getElementById("detail-board-front").style.display = "block"
    },
    res_close() {
      document.getElementById("detail-board-front").style.display = "none"
    },
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    toWeeklyForecast(){
      this.$router.push({
        path:'/weekly_forecast',
      })
    },
    toActivitySquare(){
      window.location.href = config.serverUrl+'/activity/'
    }
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#f5f8fa')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
  },
}
</script>

<style scoped>
@import '../../../assets/CSS/homepage_style.css';
@import '../../../assets/CSS/homepage_common.css';
/*头部部分*/
.head-part{
  padding-top: 10px;
  padding-bottom: 20px;
  background: #F4AB46;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #EC716C, #F4AB46);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #EC716C, #F4AB46); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.head-part-info{
  font-size: 16px;
  color: #FFFFFF;
}
.typical-application-title{
  font-size:22px;
  font-weight: bolder;
  color: #000000;
  margin-top: 20px;
}
.to-activitySquare{
  width: 100%;
  background-color: #FFFFFF;
  border-color: #FFFFFF;
}
.to-activitySquare-contain{
  font-size: 13px;
  color: rgb(237, 119, 105);
}
/*典型应用*/
/*收益预测*/
.weekly-forecast-part{
  border-radius: 10px;
  margin-top: 10px;
  padding-top: 40px;
  padding-bottom: 20px;
  background: rgba(221, 214, 243);  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #faaca8, rgba(221, 214, 243));  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #faaca8, rgba(221, 214, 243)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.toMore{
  border-color: #555550;
  background: rgb(132, 52, 235);  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, rgb(246, 108, 113),  rgb(132, 52, 235));  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, rgb(246, 108, 113),  rgb(132, 52, 235)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
/*不确定性预警*/
.economic-uncertainty-warning-part{
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  padding-top: 40px;
  padding-bottom: 20px;
  background: rgb(245, 248, 250);  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, rgb(245, 248, 250), rgb(222, 223, 223));  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, rgb(245, 248, 250), rgb(222, 223, 223)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
/*免责声明*/
.res_deceleration{
  /*bottom: 60px;*/
  /*position: fixed;*/
  padding-bottom: 60px;
}
.detail__inner{
  padding-top:45%;
}
</style>
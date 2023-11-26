<template>
  <TheNav :current-page="'help'"></TheNav>

  <el-row style="padding-top: 80px">
    <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
      您当前的位置：
      <router-link to="/help_center">帮助中心</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <span class="cur-de">模拟交易结果</span>
    </el-col>
  </el-row>

  <el-row>
    <el-col :offset="2" :span="20" style="margin-top: 10px;margin-bottom: 20px">
      <div class="info_part">
        <div style="margin-top: 20px;margin-bottom: 15px;" class="center">
          <img v-if="choice==='能'" style="width: 60%;" src="@/assets/images/AI_success.svg" alt="AI Fail">
          <img v-else style="width: 60%;" src="@/assets/images/AI_fail.svg" alt="AI Fail">
        </div>
        <div class="info_lvbox">
          <div class="info_range center" style="background: #F0C27B;color: #FFFFFF">
            <div class="info_range_text">{{ choice }}</div>
            <div style="width: 25%;display: inline-block">0.7</div>
          </div>

          <div class="info_range center" style="background: #F5F5F5">
            <div class="info_range_text" v-if="choice === '能'">
              不能
            </div>
            <div class="info_range_text" v-else>
              能
            </div>
            <div style="width: 25%;display: inline-block">0.3</div>
          </div>
          <div class="center">
            <a style="color: #EF9C19;line-height:2rem;">如果购买的合约对应的结果发生，1个合约的价值是1个诸葛贝,否则1个合约价值为0</a><br>
            <div class="trade_info_d">
              <div class="trd_info_i clear">
                <div class="fl trd_info_il">合约成本：</div>
                <div id="cost" class="fr trd_info_ir">14.625</div>
              </div>
              <div class="trd_info_i clear">
                <div class="fl trd_info_il">合约收入：</div>
                <div id="income" class="fr trd_info_ir">20</div>
              </div>
              <div class="trd_info_i clear">
                <div class="fl trd_info_il">合约利润：</div>
                <div id="profit" class="fr trd_info_ir">20</div>
              </div>
              <div class="trd_info_i clear">
                <div class="fl trd_info_il">活动内总诸葛贝数：</div>
                <div id="total" class="fr trd_info_ir">32.5</div>
              </div>
              <div class="trd_info_i clear">
                <div class="fl trd_info_il">合约描述：</div>
                <div class="fr trd_info_ir">{{ choice }}</div>
              </div>
              <div class="trd_info_i clear">
                <div class="fl trd_info_il">交易类型：</div>
                <div class="fr trd_info_ir">买入</div>
              </div>
              <div class="trd_info_i clear">
                <div class="fl trd_info_il">交易份额：</div>
                <div id="trade_share" class="fr trd_info_ir">30</div>
              </div>
              <div class="trd_info_i clear">
                <div class="fl trd_info_il">初始价格：</div>
                <div class="fr trd_info_ir">0.50</div>
              </div>
            </div>
          </div>

          <div class="detail_des center" style="margin-top: 20px;margin-left: 30px;">
            在本轮预测中，您预测的结果是<span style="color: #EF9C19">"{{ choice }}"</span>回答正确；您在该活动内持的总诸葛贝占全部参与人数总诸葛贝数的<span
              style="color: #EF9C19">17.5%</span>；奖池总计100元，如果在正式合约中，您可以获得<span style="color: #EF9C19">17.5</span>元人民币收益。
          </div>
          <div class="info_act center " style="margin-top: 30px;">
            <router-link to="/help_center" class="gobtn" style="width:100%;font-size: 1.1em;">完成教程，返回帮助中心</router-link>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TheNav from "../../../components/TheNav";

export default {
  name: "pc_result",
  components: {TheNav},
  data() {
    return {
      choice: this.$route.query.user_choice
    }
  },

  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:rgba(242, 242, 242, 0.35)');
    });
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style');
  },
}
</script>

<style scoped>
@import '../../../assets/CSS/responsive_style.css';

.info_part {
  background: #fff;
  padding: 20px 13px;
  border-radius: 7px;
  margin: 20px 0 20px;
}

.info_part .info_t {
  font-size: 18px;
}

.info_part .pro_info_t {
  font-size: 15px;
}

.info_range {
  /*display: flex;*/
  font-size: 20px;
  border-radius: 22px;
  margin-bottom: 20px;
  /* overflow: hidden; */
  height: 45px;
  line-height: 45px;
  /* position: relative; */
  /* z-index: 2; */
  width: 100%;
}

/* .info_range span {
    position: absolute;
    margin-top: 30px;
    margin-bottom: 30px;
    left: 150px;
    color: #ADADAD;
} */

.info_range p {
  /* position: absolute; */
  flex: 1;
  margin-top: 10px;
  /* margin-left: 20px; */
}

.info_range .info_range_text {
  margin-left: 10%;
  width: 65%;
  display: inline-block;
  text-align: left
}

.info_lvbox {
  border: solid 1px #eee;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 2px 6px -1px #eee;
}

.trade_info_d {
  padding: 40px 80px 30px;
}

.clear {
  clear: both;
}

.trd_info_i {
  display: flex;
  font-size: 20px;
  padding-bottom: 20px;
}

.trd_info_i div {
  flex: 1;
}


a.gobtn{
  /*background: #FC5B63;*/
  text-align: center;
  font-size: 17px;
  width: 48%;
  height: 25px;
  display: block;
  box-shadow: 0 7px 7px 1px #f9f9f9;
  border-radius: 51px;
  line-height: 25px;
  padding: 9px 0;
  margin: 0 auto;
  /*font-weight: 500;*/
  border: solid 1px #eee;
  color: #EF9C19;
}

a.gobtn:hover {
  border: solid 1px #EF9C19;
  color: #EF9C19;
}

</style>
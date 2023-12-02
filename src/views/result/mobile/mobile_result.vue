<template>
  <div style="margin-bottom: 50px">
    <el-row style="margin-top: 20px">
      <el-col :span="1" :offset="1">
        <router-link to="/">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
            模拟交易结果
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :offset="1" :span="22">
        <div class="info_part">
          <div>
            <img v-if="choice==='能'" src="@/assets/images/AI_success.svg" alt="AI Fail">
            <img v-else src="@/assets/images/AI_fail.svg" alt="AI Fail">
          </div>
          <div class="info_lvbox">
            <div class="info_range1 center" style="background: #F0C27B;color: #FFFFFF">
              <div class="info_range_text1">{{ choice }}</div>
              <div style="width: 25%;display: inline-block">0.7</div>
            </div>
  
            <div class="info_range1 center" style="background: #F5F5F5">
              <div class="info_range_text1" v-if="choice === '能'">
                不能
              </div>
              <div class="info_range_text1" v-else>
                能
              </div>
              <div style="width: 25%;display: inline-block">0.3</div>
            </div>
            <div class="center">
              <a style="color: #EF9C19;line-height:2rem;font-size: 13px;">如果购买的合约对应的结果发生，1个合约的价值是1个诸葛贝,否则1个合约价值为0</a><br>
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

          <div class="detail_des center" style="font-size: 13px;line-height:1.3rem;">
            在本轮预测中，您预测的结果是<span style="color: #EF9C19">"{{ choice }}"</span>回答正确；您在该活动内持的总诸葛贝占全部参与人数总诸葛贝数的<span
              style="color: #EF9C19">17.5%</span>；奖池总计100元，如果在正式合约中，您可以获得<span style="color: #EF9C19">17.5</span>元人民币收益。
          </div>
          <div class="info_act center " style="margin-top: 30px;">
            <router-link to="/help_center" class="gobtn2" style="width:100%;font-size: 1.1em;">完成教程，返回帮助中心</router-link>
          </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 50px;"></el-row>
  </div>
  <bottom-nav></bottom-nav>
</template>

<script>
import bottomNav from "../../../components/bottomNav";

export default {
  name: "mobile_result",
  components: {
    bottomNav,
  },
  data() {
    return {
      choice: this.$route.query.user_choice
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#F5F8FA')
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
  border-radius: 7px;
  margin: 20px 0 20px;
}

.info_part .info_t {
  font-size: 14px;
}

.info_part .pro_info_t {
  font-size: 14px;
}

.info_range1 {
  /*display: flex;*/
  font-size: 14px;
  border-radius: 22px;
  margin-bottom: 20px;
  /* overflow: hidden; */
  padding: 8px;
  /* position: relative; */
  /* z-index: 2; */
  /* width: 100%; */
}

/* .info_range span {
    position: absolute;
    margin-top: 30px;
    margin-bottom: 30px;
    left: 150px;
    color: #ADADAD;
} */

.info_range1 p {
  /* position: absolute; */
  flex: 1;
  margin-top: 10px;
  /* margin-left: 20px; */
}

.info_range1 .info_range_text1 {
  margin-left: 10%;
  width: 65%;
  display: inline-block;
  text-align: left
}

.info_lvbox {
  border: solid 1px #eee;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0px 2px 6px -1px #eee;
}

.trade_info_d {
  padding: 20px 40px 20px;
}

.clear {
  clear: both;
}

.trd_info_i {
  display: flex;
  font-size: 14px;
  padding-bottom: 15px;
}

.trd_info_i div {
  flex: 1;
}

a.gobtn:hover {
  border: solid 1px #EF9C19;
  color: #EF9C19;
}

.gobtn2{
  text-align: center;
  font-size: 14px;
  width: 30%;
  display: block;
  box-shadow: 0 7px 7px 1px #f9f9f9;
  border-radius: 20px;
  padding: 6px 0;
  margin: 0 auto;
  border: solid 1px #eee;
  color: #EF9C19;
}
</style>
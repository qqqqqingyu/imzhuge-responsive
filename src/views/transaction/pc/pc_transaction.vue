<template>
  <!--    导航栏-->
  <TheNav :current-page="'help'"></TheNav>

  <el-row style="padding-top: 80px">
    <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
      您当前的位置：
      <router-link to="/help_center">帮助中心</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <span class="cur-de">模拟交易</span>
    </el-col>
  </el-row>

  <el-row>
    <el-col :offset="2" :span="20">

      <div class="trade_part">
        <div class="trade_top">
          <span class="trade_pre">预测</span>
          <strong>
            2045年12月31日前，人类是否能开发出像人一样有自我知觉和自我意识，具有学习、推理和解决问题的人工智能？
          </strong>
        </div>
        <div class="trade_dash">
          <i class="trade_dotl"></i>
          <i class="trade_dotl2"></i>
          <div class="trade_h"></div>
          <i class="trade_dotr"></i>
          <i class="trade_dotr2"></i>
        </div>
        <div class="trade_form_box">
          <div class="input-line">活动可用诸葛贝：<b> 30.00 </b></div>
          <div class="input-line">当前合约持有量：<span>0</span></div>
          <div class="input-line clear">
            <div class="fl">预测结果：</div>
            <div class="fl">
              <el-radio-group v-model="choice" class="my-radio-group">
                <el-radio-button class="filter-radio" label='能' @click="predict_result(predict,predict_click_num)">能</el-radio-button>
                <el-radio-button class="filter-radio" label='不能' @click="predict_result(predict,predict_click_num)">不能</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="input-line">当前价格：<b>0.50</b></div>

          <el-row class="input-line">
            <el-col :span="4">
            <span>
              我对本次预测的信心：
            </span>
            </el-col>
            <el-col :span="9" style="width: 100%;padding-left: 20px;padding-right: 20px">
              <el-slider v-model.number="trade_p" class="predict-slider"></el-slider>
            </el-col>
            <el-col :span="4" >
              <input @click="predict_result(predict_percentage,percentage_click_num)" id="slider_prob"
                     type="number" name="amountInput" min="0" max="100" step="1"
                     v-model="trade_p">%
            </el-col>
          </el-row>

          <div class="clear input-line">
            <div class="fl">交易份额 ：</div>
            <div class="fl">
              <input @click="predict_result(transaction,transaction_click_num)" type="number"
                                              min="0" step="1" id="buynum" v-model="trade_share" maxlength="6"
                                              placeholder="输入整数"></div>
          </div>
        </div>
        <div class="trade_dash">
          <i class="trade_dotl"></i>
          <i class="trade_dotl2"></i>
          <div class="trade_h"></div>
          <i class="trade_dotr"></i>
          <i class="trade_dotr2"></i>
        </div>
        <div class="trade_act clear">
          <a href="javascript:void(0);" class="act_buy_btn fl" @click="act_trade_win_func(&#39;buy&#39;)">买入</a>
          <a href="javascript:void(0);" class="act_sale_btn fr" @click="alert('您还没有合约，不能卖出哦')">卖出</a>
        </div>
      </div>

      <div class="spanheight"></div>

      <div id="trade_win_bg" class="trade_win_bg" style="display:none" @click="act_trade_win_func(&#39;&#39;)"></div>

      <div id="trade_win" class="trade_win" style="display:none">
        <div class="trade_win_box">
          <div class="trade_win_t">交易详情</div>
          <div class="trade_win_con">
            <div class="trade_con_i clear">
              <div class="trade_con_l fl">预测结果：</div>
              <div id="trade_text" class="trade_con_r fr"></div>
            </div>
            <div class="trade_con_i clear">
              <div class="trade_con_l fl">交易份额：</div>
              <div id="trade_change" class="trade_con_r fr"></div>
            </div>
            <div class="trade_con_i clear">
              <div class="trade_con_l fl">交易行为：</div>
              <div class="trade_con_r fr" id="trade_act_msg">买入</div>
            </div>
            <div class="trade_con_i clear">
              <div class="trade_con_l fl">预测信心：</div>
              <div class="trade_con_r fr" id="trade_prob"></div>
            </div>
          </div>
          <div class="trade_win_act clear">
            <router-link :to="{path:'/transaction_success',query:{user_choice:choice}}" class="win_act_buy_btn fl">确认交易</router-link>
            <a href="javascript:void(0);" class="win_act_edit_btn fr" @click="act_trade_win_func(&#39;&#39;);">返回修改</a>
          </div>
        </div>
      </div>


      <div id="note_bg" class="note_bg" style="display:none" @click="show_note(&#39;&#39;);"></div>
      <div class="note_part" id="show_note" style="display: none">
        <div class="note_list" id="note_list"></div>
      </div>

      <!--新手引导弹窗-->
      <div id="guide_bg" class="guide_bg" style="display:block"></div>
      <div id="guide_win" class="guide_win" style="display:block">
        <div class="guide_win_box">
          <img src="@/assets/images/fanhui.svg" class="hand" style="float: left;padding-left: 10px;height: 30px;margin-top: -7px"
               @click="guide_text_return()">
          <div class="guide_win_t">交易引导</div>
          <div class="center-vertically" style="flex-wrap: nowrap;">
            <div style="padding-top: 20px;float: left;">
              <img src="@/assets/images/web_logo.png" height="100" alt="zhuge" style="padding-top: 5px;margin-left: 10px">
            </div>
            <div style="padding-top: 20px;">
              <p id="guide_text" style="font-size:1rem;line-height: normal;margin:0 20px 0;font-weight: bold">
                恭喜你来到了交易页面，在这里你可以买入以及卖出合约，合约的成本也是不一定的
              </p>
            </div>
          </div>
        </div>
        <div>
          <a style="margin: 20px auto;background: #f5bf6e;!important;color: white!important;}" class="win_act_edit_btn"
             @click="guide_text_func();">下一条</a>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TheNav from "../../../components/TheNav";
export default {
  name: "pc_transaction",
  components: {TheNav},
  data(){
    return {
      choice:"能",
      button_index: 0,
      new_text: [
        "恭喜你来到了交易页面，在这里你可以买入以及卖出合约，合约的成本是受到当前价格、购买数量等因素影响的哦",
        "例如当前合约价格是0.5，购买5份合约，总成本会稍高于2.5哦",
        "每个参与该活动的用户，系统都将赠送用户30个诸葛贝，诸葛贝是我们系统中的虚拟币，仅仅用于该系统中合约的交易",
        "下面让我们实际动手操作一下吧"
      ],
      predict:["点击这里可以选择预测结果，如果购买的合约对应的结果发生，1个合约的价值是1个诸葛贝，否则1个合约价值为0"],
      predict_percentage :["这里可以选择您对本次交易把握的信心，把握越大，信心值越高"],
      transaction:["交易份额是指您要交易的份数哦，请注意，所要交易的金额不能超过账户余额哦"],
      predict_click_num :1,
      dependence_click_num:2,
      percentage_click_num:3,
      transaction_click_num:4,
      trade_share:1,
      trade_p:0
    }
  },
  mounted() {
    //下一条
    this.button_index=0
  },
  methods:{
    guide_text_func() {
      if (this.button_index === 3) {
        document.getElementById("guide_bg").style.display = "none";
        document.getElementById("guide_win").style.display = "none";
      } else {
        document.getElementById("guide_bg").style.display = "block";
        document.getElementById("guide_win").style.display = "block";
        this.button_index += 1
        document.getElementById("guide_text").innerText = this.new_text[this.button_index];
      }
    },
    //上一条
    guide_text_return() {
      if (this.button_index === 0) {
        this.$router.push('/activity2045')
        document.getElementById("guide_bg").style.display = "block";
        document.getElementById("guide_win").style.display = "block";
      } else {
        document.getElementById("guide_bg").style.display = "block";
        document.getElementById("guide_win").style.display = "block";
        this.button_index -= 1
        document.getElementById("guide_text").innerText = this.new_text[this.button_index];
      }
    },
    show_error_msg() {
      if (document.getElementById("error").style.display == "none") {
        document.getElementById("error").style.display = "block";
        document.getElementById("error_bg").style.display = "block";
      } else {
        document.getElementById("error").style.display = "none";
        document.getElementById("error_bg").style.display = "none";
      }
    },
    // 第一次点击时，显示提示
    predict_result(text, num) {
      if (num < 100) {
        document.getElementById("guide_bg").style.display = "block";
        document.getElementById("guide_win").style.display = "block";
        document.getElementById("guide_text").innerText = text[0];
        if (num === 1) {
          this.predict_click_num += 100
        } else if (num === 2) {
          this.dependence_click_num += 100
        } else if (num === 3) {
          this.percentage_click_num += 100
        } else if (num === 4) {
          this.transaction_click_num += 100
        }
      }
    },
    act_trade_win_func(t) {
      document.getElementById("trade_act_msg").innerHTML = t == "buy" ? "买入" : "卖出";

      if (document.getElementById("trade_win").style.display == "none") {
        document.getElementById("trade_win").style.display = "block";
        document.getElementById("trade_win_bg").style.display = "block";
        document.getElementById("trade_text").innerHTML = this.choice;
        // this.trade_share = $("#buynum").val();
        document.getElementById("trade_change").innerHTML = this.trade_share;
        // var trade_note = $("#note").val();
        // document.getElementById("trade_note").innerHTML = trade_note;

        document.getElementById("trade_prob").innerHTML = this.trade_p;
        // var current_share = '0'

        if (this.trade_share == undefined || this.trade_share == ""||this.trade_share<=0||this.trade_share%1!==0) {
          alert('交易份额格式出错，请输入正整数哦')
          document.getElementById("trade_win").style.display = "none";
          document.getElementById("trade_win_bg").style.display = "none";
          // } else if (trade_note.length <= 10) {
          //     alert('笔记内容请大于10个字');
          //     document.getElementById("trade_win").style.display = "none";
          //     document.getElementById("trade_win_bg").style.display = "none";
        } else if (this.trade_share > 56) {
          alert('购买这么多份额的交易金额大于可用金额哦');
          document.getElementById("trade_win").style.display = "none";
          document.getElementById("trade_win_bg").style.display = "none";
        } else {
          // $.ajax({
          //   type: 'GET',
          //   url: '/api/payoff/22/43?action=' +
          //       t + "&share=" + this.trade_share,
          //   processData: true,
          //   dataType: 'json',
          //   success: function (data) {
          //     $("#account_change")[0].innerHTML = data.payoff;
          //     if (data.payoff == undefined || data.payoff == "") {
          //       alert(data.errmsg);
          //       document.getElementById("trade_win").style.display = "none";
          //       document.getElementById("trade_win_bg").style.display = "none";
          //     }
          //     console.log("Success");
          //   },
          //   fail: function (data) {
          //     alert(data.errmsg);
          //   }
          // });
        }
      }
      else {
        document.getElementById("trade_win").style.display = "none";
        document.getElementById("trade_win_bg").style.display = "none";
      }
    },

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
    this.button_index=0;
    document.getElementById("guide_bg").style.display = "block";
    document.getElementById("guide_win").style.display = "block";
  },
}
</script>

<style scoped>
@import '../../../assets/CSS/common.css';
@import '../../../assets/CSS/index.css';
@import '../../../assets/CSS/user.css';
@import '../../../assets/CSS/activity.css';
@import '../../../assets/CSS/activity_info.css';
@import '../../../assets/CSS/activity_top.css';
@import '../../../assets/CSS/loginreg.css';
@import '../../../assets/CSS/startactivity.css';
@import '../../../assets/CSS/study.css';
@import '../../../assets/CSS/machine_compare.css';
@import '../../../assets/CSS/upload_qrcode.css';
@import '../../../assets/CSS/notes.css';
@import '../../../assets/CSS/leaderboard.css';
@import '../../../assets/CSS/error.css';
@import '../../../assets/CSS/guide.css';

/*复写css文件里已有的类*/
.guide_win_box{
  height: 200px;
}

/*被选后的单选框颜色*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #FFFFFF;
  background: #F0C27B;
}

/*单选框样式*/
.filter-radio >>> .el-radio-button__inner {
  margin-right: 10px;
  margin-left: 10px;
  background: #F5F8FA;
  color: #7F7F7F;
  border: 0;
  border-radius: 25px;
  padding: 6px 20px;
}

/*单选框覆盖原有阴影*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}

.predict-slider >>> .el-slider__bar {
  background: #F0C27B;
  height: 10px;
}

.predict-slider >>> .el-slider__button {
  border: 2px solid #F0C27B
}

#slider_bar{
  width: 300px;
}

.input-line{
  line-height: 42px;
}

.trade_top strong{
  font-size: 18px;
}

.trade_act{
  height: 40px;
}

ol, ul {
  list-style: none
}
</style>
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
<!--        活动的标题、描述、验证资料-->
        <el-row style="line-height: 50px;">
          <el-col style="font-family: 'Arial Black';color: #F56C6C;font-size: 30px  ">
            {{activity_info.title}}
          </el-col>

        </el-row>
        <el-row style="line-height:25px;margin-top: 10px; ">
          <el-col :span="11" >
            <el-row >
              <el-col :span="5" style="font-family: 'Arial Black';font-size: 16px; color: #E6A23C;">
                <i class="el-icon-edit" ></i>
                描述：
              </el-col>
              <el-col :span="19">
                <el-input :disabled="true"  v-model="activity_info.desc" type="textarea" ></el-input>

              </el-col>
            </el-row>

          </el-col>

          <el-col :span="11" :offset="1">
            <el-row >
              <el-col :span="6" style="font-family: 'Arial Black';font-size: 16px;color: #E6A23C;">
                <i class="el-icon-document" ></i>
                验证资料：
              </el-col>
              <el-col :span="18">
                <el-input :disabled="true" v-model="activity_info.verify_material" type="textarea" ></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>



        <el-row style="line-height:10px;margin-top: 20px">
          <el-col :span="3" >
            <div class="title-box2">
              交易信息
            </div>
          </el-col>

          <el-col :span="4" :offset="20">
            <el-button class="return">
              <router-link to="/CDA_EventSquare">返回活动列表</router-link>
            </el-button>
          </el-col>
        </el-row>

        <el-row class="part1">
<!--          价格走势图-->
          <el-col class="runchart" :span="14">
            <el-row id="price"></el-row>
          </el-col>
<!--          两个队列-->
          <el-col class="queue" :span="9" :offset="1">
<!--            卖价队列-->
            <el-row class="sell-charts">
              <div class="queue-title-sell" style="line-height: 5px;margin-bottom: 5px;margin-top: 5px;color:deepskyblue;">卖价队列</div>
              <el-table :data="sellSeq.slice(0,5)" border style="width:100%;height: 130px;line-height: 20px;" size="mini"
                        :row-class-name="sellTableRowClassName" max-height="130px" :header-cell-style="tdstyle">
                <el-table-column prop="trade_count" label="询价数量" ></el-table-column>
                <el-table-column prop="trade_price" label="询价价格" ></el-table-column>
              </el-table>
            </el-row>
<!--            买价队列-->
            <el-row class="buy-charts">
              <div class="queue-title-buy" style="line-height: 5px;margin-bottom: 5px;margin-top: 5px;color:indianred;">买价队列</div>
              <el-table :data="buySeq.slice(0,5)" border style="width:100%;height: 130px;line-height: 20px" size="mini"
                        :row-class-name="buyTableRowClassName" max-height="130px" :header-cell-style="tdstyle">
                <el-table-column prop="trade_count" label="喊价数量" ></el-table-column>
                <el-table-column prop="trade_price" label="喊价价格" ></el-table-column>
              </el-table>
            </el-row>
          </el-col>
        </el-row>
<!--        买入、卖出、撤单-->
        <el-row class="part2" style="text-align: center;">
          <el-col :span="22" class="stty_il trade_button ">
            <el-form ref="form" v-model="form" label-width="20%" label-position="left">
              <el-form-item style="text-align: center;">
                <el-radio-group v-model="form.action_type" >
                  <el-radio v-on:click="buy" label="buy" >买入</el-radio>
                  <el-radio v-on:click="sell" label="sell" >卖出</el-radio>
                  <el-radio v-on:click="cancel" label="cancel" >撤单</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="form.action_type!='cancel'" label="活动可用诸葛贝：">
                <el-input v-model="form.coin"  :disabled="true"></el-input>
              </el-form-item>
              <el-form-item v-if="form.action_type!='cancel'" label="当前合约持有量：">
                <el-input v-model="form.share"  :disabled="true"></el-input>
              </el-form-item>
              <el-form-item  style="text-align: left;" label-width="0" v-if="form.action_type==='buy'">
                <el-row>
                  <el-col :span="7">
                    <el-radio-group v-model="form.auction_type" size="small" >
                      <el-radio v-on:click="bid" label="0" border >喊价交易</el-radio>
                      <el-radio v-on:click="shijia" label="2" border >市价交易</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="17">
                    <el-row v-if="form.auction_type=='0'" style="font-family: 'Hiragino Sans GB';color: #E6A23C"><i class="el-icon-info" style="margin-right: 6px;margin-top: 15px"></i>喊价：在某日之前，对当前合约出价N个虚拟诸葛贝购买，交易数量为N份。
                      <router-link to="/CDA_home" style="color: #2F8FE0">详情请见：CDA</router-link>
                    </el-row>
                    <el-row v-if="form.auction_type=='2'" style="font-family: 'Hiragino Sans GB';color: #E6A23C"><i class="el-icon-info" style="margin-right: 6px;margin-top: 15px"></i>市价：仅需要输入您想要购买的数量，按照价格优先原则系统自动购买。
                      <router-link to="/CDA_home" style="color: #2F8FE0">详情请见：CDA</router-link>
                    </el-row>
                  </el-col>
                </el-row>

              </el-form-item>
              <el-form-item  style="text-align: left;" label-width="0" v-if="form.action_type==='sell'">
                <el-row>
                  <el-col :span="7">
                    <el-radio-group v-model="form.auction_type" size="small" >
                      <el-radio v-on:click="ask" label="1" border >询价交易</el-radio>
                      <el-radio v-on:click="shijia" label="2" border>市价交易</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="17">
                    <el-row v-if="form.auction_type=='1'" style="font-family: 'Hiragino Sans GB';color: #E6A23C"><i class="el-icon-info" style="margin-right: 6px;margin-top: 15px"></i>询价：在某日之前，对当前合约出价N个虚拟诸葛贝出售，交易数量为N份。
                      <router-link to="/CDA_home" style="color: #2F8FE0">详情请见：CDA</router-link>
                    </el-row>
                    <el-row v-if="form.auction_type=='2'" style="font-family: 'Hiragino Sans GB';color: #E6A23C"><i class="el-icon-info" style="margin-right: 6px;margin-top: 15px"></i>市价：仅需要输入您想要购买的数量，按照价格优先原则系统自动购买。
                      <router-link to="/CDA_home" style="color: #2F8FE0">详情请见：CDA</router-link>
                    </el-row>
                  </el-col>
                </el-row>

              </el-form-item>
              <el-row v-if="form.action_type!='cancel'">
<!--                <el-col>
                  <el-form-item  label="请输入交易价格：" >
                    <el-input v-model="form.trade_price" placeholder="请输入交易价格"></el-input>
                  </el-form-item>
                </el-col>-->
                <el-col v-if="form.auction_type!='2'">
                  <el-form-item  label="请输入交易价格：" >
                    <el-input v-model="form.trade_price" placeholder="价格"></el-input>
                  </el-form-item>
                </el-col>
<!--                若选择市价交易，交易价格自动获取-->
                <el-col v-else>
                  <el-form-item  label="请输入交易价格："  >
                    <el-input :disabled="true" placeholder="市价"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
<!--              交易数量有最大值提示-->
              <el-form-item  label="请输入交易数量：" v-if="form.action_type!='cancel'">
                <el-input v-model="form.trade_count" placeholder="请输入交易数量"></el-input>
              </el-form-item>
              <el-row v-if="form.action_type!='cancel'">
<!--                <el-col>
                  <el-form-item  label="请输入交易截止时间：" >
                    <el-date-picker type="datetime" placeholder="请选择交易截止时间"  v-model="form.trade_end_time"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"></el-date-picker>
                  </el-form-item>
                </el-col>-->
                <el-col v-if="form.auction_type!='2'">
                  <el-form-item  label="请输入交易截止时间：" >
                    <el-date-picker type="datetime" placeholder="请选择交易截止时间"  v-model="form.trade_end_time"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"></el-date-picker>
                  </el-form-item>
                </el-col>
<!--                若选择市价交易，截止时间自动获取-->
                <el-col v-else>
                  <el-form-item  label="请输入交易截止时间：">
                    <el-input
                        placeholder="提交时间后一天"
                        :disabled="true">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item  v-if="form.action_type!='cancel'" label-width="0">
                <el-input v-model="form.note_text" :rows="2" type="textarea" placeholder="可以说说您为什么要这么交易吗"></el-input>
              </el-form-item>
              <el-form-item v-if="form.action_type!='cancel'" style="text-align: right;" label-width="0">
                <el-button class="submit" type="danger" v-on:click="startTransactionMethod" v-if="form.action_type=='buy'">确定</el-button>
                <el-button class="submit" type="primary" v-on:click="startTransactionMethod" v-else>确定</el-button>
              </el-form-item>
<!--              撤单，这里的时间表示要不要格式化-->
              <el-table  v-if="form.action_type=='cancel'"
                         :data="TradeAccountData"
                         border
                         style="width: 100%" :header-cell-style="tdstyle">
<!--                是撤单表格获取到的数据中活动的id-->
                <el-table-column
                    prop="id"
                    label="id"
                    v-if="false"
                >
                </el-table-column>
                <el-table-column
                    prop="trade_start_time"
                    label="委托时间"
                    :formatter="formatTradeStartTime"
                >
                </el-table-column>
                <el-table-column
                    prop="trade_end_time"
                    label="结束时间"
                    :formatter="formatTradeStartTime"
                >
                </el-table-column>

                <el-table-column
                    prop="auction_type"
                    label="类型"
                    :formatter="formatAuctionType"
                >
                </el-table-column>
                <el-table-column
                    prop="trade_price"
                    label="价格"
                >
                </el-table-column>
                <el-table-column
                    prop="trade_count"
                    label="交易数量"
                >
                </el-table-column>

                <el-table-column
                    prop="trade_status"
                    label="状态"
                    :formatter="formatTradeStatus"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                  <template v-slot="scope">
                    <!--        当交易状态为"交易队列中"时，才显示该按钮-->
                    <el-button @click="cancelClick(scope.row)" type="text" size="small" v-if="scope.row.trade_status=='0'">撤单</el-button>
                  </template>

                </el-table-column>
              </el-table>
            </el-form>
          </el-col>
        </el-row>
<!--        市场报告（查看报告）部分  style="margin-top: 40px"  -->
        <el-row>
          <el-col :span="3">
            <div class="title-box2">
              市场报告
            </div>
          </el-col>
        </el-row>
        <el-row class="part3">
          <el-col :span="8" class="queue1">
            <el-row class="scharts1" style="margin-bottom: 5px;">
              <el-col>
                <el-row>
                  <el-col :span="10">
                    <div style="line-height: 10px;margin-top: 10px;font-size: 20px;font-family: 'Hiragino Sans GB';">任务交易次数</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10" :offset="7" style="font-size: 50px;color: #F56C6C">{{tradeTime}}</el-col>
                </el-row>
              </el-col>

            </el-row>
            <el-row class="scharts1">
              <el-col :span="10">
                <el-row >
                  <el-col :span="24" style="line-height: 10px;margin-top: 10px;font-size: 18px;font-family: 'Hiragino Sans GB';">我的预测次数</el-col>
                  <el-col :span="24" style="color: #F56C6C;line-height: 10px;margin-top: 40px;font-size: 50px">{{getUserTimes}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-row>
                  <el-col :span="24" style="line-height: 10px;margin-top: 10px;font-size: 18px;font-family: 'Hiragino Sans GB';">当前任务净收益</el-col>
                  <el-col :span="24" style="line-height: 10px;margin-top: 40px;font-size: 50px;color: #F56C6C">{{getRev}}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
<!--          交易历史表格-->
          <el-col :span="15" :offset="1" class="history">
            <el-row style="border: 1px solid #9EA9B1;;margin-bottom: 2px;line-height: 30px;color:#E6A23C">
              我的交易历史:
            </el-row>
            <el-row>
              <el-table :data="userAccountData" border style="width: 100%;border: 1px solid #9EA9B1;height: 200px;line-height: 30px" max-height='200px'
                        :header-cell-style="tdstyle">
                <el-table-column prop="id" label="id" />
                <el-table-column prop="trade_start_time" label="时间" :formatter="formatTradeStartTime" />
                <el-table-column prop="auction_type" label="交易类型" :formatter="formatAuctionType" />
                <el-table-column prop="trade_count" label="交易数量" />
                <el-table-column prop="trade_price" label="交易价格" />
                <el-table-column prop="share" label="持有量" />
                <el-table-column
                    prop="trade_cancel_time"
                    label="撤销时间"
                    :formatter="formatTradeStartTime"
                >
                </el-table-column>
                <el-table-column prop="trade_status" label="交易状态" :formatter="formatTradeStatus" />
              </el-table>
            </el-row>
            <el-row class="count">
              <el-col class="sum">
                <span>当前合约持有量总计:<sapn style="margin-left: 10px;margin-right: 5px;font-size: 18px">{{shareSum}}</sapn>
                  , 持仓总价:<sapn style="margin-left: 5px;margin-right: 5px;font-size: 18px">{{getMarketCoin}}</sapn></span>
                <br>
                <span>可用诸葛贝数量：<sapn style="margin-left: 5px;margin-right: 5px;font-size: 18px">{{getCoin}}</sapn></span>
              </el-col>
            </el-row>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="4" :offset="20">
            <el-button class="return">
              <router-link to="/CDA_EventSquare">返回活动列表</router-link>
            </el-button>
          </el-col>
        </el-row>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>



import {
  startTransaction,//去交易post
  getCdaReportInfo,//查看报告get
  getCdaActivityTransactionInfo//*获取交易信息get
} from '@/api/auction'

import Myheader from "../components/myheader";
import myaside from "../components/myaside";
export default {
  name: "CDA_EventDetails",
  components: {Myheader, myaside},
  data(){
    return{
      activity_info:'',//活动标题、描述、验证资料

      form:{
        action_type:'buy',
        share:'',
        coin:'',
        trade_price:'',
        trade_count:'',
        trade_end_time:'',
        auction_type:'0',
        timeNow:'', //当前时间
        trade_id:'',
        note_text:''
      },//存放买入和卖出展示的数据


      TradeAccountData:'',//撤单时需要的数据
      id:'',
      alert_code: "",
      alert_message: '',

      sellSeq:'',//卖价队列
      buySeq:'',//买价队列

      priceSeq:'', //在方法中获取时间和价格用于作图
      timeArr:'', //交易发起时间，x轴
      priceArr:'', //价格,y轴

      tradeTime:'',//交易次数
      getUserTimes:'',//预测次数
      getRev:'', //利润

      userAccountData:'',//存放我的交易历史

      getCoin:'', //可用诸葛贝
      getMarketCoin:'', //持仓总价
      shareSum:'', //持有量总计
    }
  },
  mounted() {
    this.getCdaActivityTransactionInfoMethod()
    this.getCdaReportInfoMethod()

  },
  methods:{
    buy(){
      this.form.action_type='buy'
      this.form.auction_type='0'
      this.form.trade_end_time=''
      this.form.trade_price=''
      this.form.trade_count=''
      this.form.note_text=''

    },
    sell(){
      this.form.action_type='sell'
      this.form.auction_type='1'
      this.form.trade_end_time=''
      this.form.trade_price=''
      this.form.trade_count=''
      this.form.note_text=''

    },
    cancel(){
      this.form.action_type='cancel'
      this.form.trade_end_time=''
      this.form.trade_price=''
      this.form.trade_count=''
      this.form.note_text=''
    },
    bid(){
      this.form.auction_type='0'
      this.form.trade_price=''
      this.form.trade_count=''
      this.form.trade_end_time=''
      this.form.note_text=''
    },
    shijia(){
      this.form.auction_type='2'
      this.form.trade_count=''
      this.form.trade_price=''
      this.form.trade_end_time=''
      this.form.note_text=''
    },
    ask(){
      this.form.auction_type='1'
      this.form.trade_price=''
      this.form.trade_count=''
      this.form.trade_end_time=''
      this.form.note_text=''
    },
    /*获取当前时间*/
    getCurrentTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate()+1;
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      this.form.timeNow = yy+'-'+mm+'-'+dd+' '+hh+':'+mf;
    },
    /*转换时间表示形式，目前这里是提交交易信息时候的转换*/
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
      return new Date(b.trade_start_time).getTime() - new Date(a.trade_start_time).getTime()
    },
    // 保留一位小数
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(1);
      return realVal;
    },

    /*获取交易信息*/
    getCdaActivityTransactionInfoMethod() {
      /*获取活动id*/
      const getId=this.$route.query.activityId;
      getCdaActivityTransactionInfo(getId).then(response => {
        //获取price_seq用于作图
        this.priceSeq = response.data.price_seq;/*还是response.data.price_seq*/
        //x轴数据
        var str = "";
        this.priceSeq.forEach(function(e) {
          str += e.time + ",";
        });
        str = str.substring(0, str.length-1);
        this.timeArr = str.split(",");
        //y轴数据
        var str1 = "";
        this.priceSeq.forEach(function(e) {
          str1 += e.price + ",";
        });
        str1 = str1.substring(0, str1.length-1);
        this.priceArr = str1.split(",");
        //获取到数据后作图
        this.myEcharts();
        //不可更改的内容，也就是活动可用诸葛贝还有当前合约持有量

        /*this.form.coin=this.$options.methods.formatTimer(response.data.coin);*/
        this.form.coin=response.data.coin;
        this.form.share=response.data.share;
        /*//给用户进行提示
        this.getTradeCount = response.data.trade_account.data[0].trade_count*/
        /*/!*自动获取交易价格*!/
        this.getTradePrice = response.data.trade_account.trade_price*/
        //卖价和买价队列
        this.sellSeq =response.data.sell_seq;
        this.buySeq = response.data.buy_seq;

        //获取到撤单表格中的数据
        this.TradeAccountData = response.data.trade_account
        // 排序
        this.TradeAccountData = this.TradeAccountData.sort(this.sortData)
        //获取活动的标题、描述、验证资料
        this.activity_info=response.data.activity_info


      })
    },
    //将数字转化为相应交易状态显示在交易历史表格中。
    formatTradeStartTime: function (row, column, TradeStartTimeValue) {
      let date = new Date(TradeStartTimeValue);
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
    //将数字转化为相应拍卖类型显示在撤单，交易历史表格中。
    formatAuctionType: function (row, column, auctionTypeValue) {
      var statusTxt = '';
      statusTxt = auctionTypeValue == null?"无":auctionTypeValue == 0?"喊价": auctionTypeValue == 1?"询价":auctionTypeValue == 2?"市价":auctionTypeValue == 3?"未成交":"类型错误";
      return statusTxt;
    },
    //将数字转化为相应交易状态显示在撤单，交易历史表格中。
    formatTradeStatus: function (row, column, tradeStatusValue) {
      var statusTxt = '';
      statusTxt = tradeStatusValue == null?"无":tradeStatusValue == 0?"交易队列中": tradeStatusValue == 1?"交易成功":tradeStatusValue == 2?"交易失败":
          tradeStatusValue == 3?"已撤单":tradeStatusValue == 4?"已结转":tradeStatusValue == 5?"已过期":"状态未知";
      return statusTxt;
    },

    /*4.3 去交易，也就是post所填表的信息*/
    startTransactionMethod() {
      const getId=this.$route.query.activityId;
      const getTitle=this.$route.query.activityTitle;
      if(this.form.auction_type!='2'&&this.form.trade_end_time.length==0){
        alert("未输入交易截止时间")
      }
      //这里不清楚是否要传输
      /*if(this.form.action_type!='cancel'){
        this.form.trade_id=''
      }*/
      else{

        // transaction为交易信息 须组装后提交 注意字段非空判断（参考接口文档）以下代码仅做参考
        let transaction = {}
        if(this.form.auction_type==='0'){
          this.form.auction_type='0'
          this.form.trade_end_time=this.$options.methods.formatTimer(this.form.trade_end_time);
          transaction.trade_price=this.form.trade_price;
        }
        else if(this.form.auction_type==='2'){
          this.form.auction_type='2'
          this.getCurrentTime();
          this.form.trade_end_time=this.form.timeNow
        }
        else{
          this.form.auction_type='1'
          this.form.trade_end_time=this.$options.methods.formatTimer(this.form.trade_end_time);
          transaction.trade_price=this.form.trade_price;
        }
        transaction.action_type = this.form.action_type;
        transaction.auction_type = this.form.auction_type;
        transaction.note_text=this.form.note_text;
        transaction.trade_count=this.form.trade_count;
        transaction.trade_end_time=this.form.trade_end_time;

        /*transaction.trade_id=this.form.trade_id;*/

        startTransaction(getId, transaction).then(() => {

          /*提示提交成功*/
          this.$message({
            type: 'success',
            message: '提交成功！'
          });
          //刷新
          location.reload();
          /*//跳转
          this.$router.push({
            path:'/CDA_EventDetails',
            query:{
              activityId:getId,
              activityTitle:getTitle
            },
          });*/
        }).catch(() => {

          this.$message({
            type: 'info',
            message: '提交失败，请重试'
          });
        });
      }

    },
    /*4.3 去交易，如果选择撤单的话*/
    cancelClick(row) {
      const getId=this.$route.query.activityId;
      // 弹出弹窗
      this.$confirm('您是否确认撤单？', '撤单确认', {
        dangerouslyUseHTMLString:true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  // 选择确定时运行这段代码
        let transaction = {}  //交易信息
        transaction.action_type = 'cancel';
        transaction.trade_id = row.id; //需要撤销的id
        // 提交数据
        startTransaction(getId, transaction).then(() => {
          this.$message({
            type: 'success',
            message: '撤销成功!'
          });
          //刷新
          location.reload();
        }).catch(() => { //撤销失败，即数据提交失败
          this.$message({
            type: 'info',
            message: '撤销失败，请重试'
          });
        });
      }).catch(() => {  //取消提交数据
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    //卖价队列的颜色
    sellTableRowClassName({rowIndex}) {
      if (rowIndex%2 === 0) {
        return 'light-blue-row';
      }else{
        return 'blue-row';
      }
    },
    //买价队列的颜色
    buyTableRowClassName({rowIndex}) {
      if (rowIndex%2 === 0) {
        return 'light-red-row';
      }else{
        return 'red-row';
      }
    },
    //作图
    myEcharts(){
      let echarts = require('echarts');
      // 让 指定id的div的_echarts_instance_属性值为空状态
      document.getElementById('price').removeAttribute('_echarts_instance_');
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('price'));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '价格走势图',//图标标题
          x: 'center',//水平居中
          top:10
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.timeArr
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.priceArr,
            type: 'line',
            smooth: true,
            label: {//线条上的数字提示信息
              normal: {
                show: true,
                position: 'top'
              }
            },
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    /*4.5 查看报告，也就是市场报告的部分*/
    getCdaReportInfoMethod() {
      const getId=this.$route.query.activityId;
      getCdaReportInfo(getId).then(response => {
        /*任务交易次数*/
        this.tradeTime = response.data.trade_times;
        /*我的预测次数，当前任务净收益*/
        this.getUserTimes = response.data.user_times
        this.getRev = response.data.rev;
        /*最下面的小框框里的数据*/
        this.getCoin =response.data.coin
        this.getMarketCoin = response.data.market_coin
        this.shareSum=response.data.share
        /*用户交易历史列表*/
        this.userAccountData = response.data.user_account
        /*对交易历史按照时间排序*/
        this.userAccountData = this.userAccountData.sort(this.sortData)
      })
    },
    tdstyle({row,column,rowIndex}){
      if(rowIndex===0){
        return "background-color:RGB(248,248,248)"
      }

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
  line-height: 160px;
  position: relative;
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
.title-box2{
  background-color: #fdf6ec;
  border-color: #9EA9B1;
  color: #fba414;
  margin-top: 10px;
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

.return{
  background-color: rgba(22, 155, 213, 0.9);
  font-size: 15px;
  color: #222;
  font-weight: 700;
  line-height:10px;
}
.stty_il {
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  margin-left: 30px;
}

.part1{
  margin-top:10px;

}
.part2{
  margin-top:30px;
  border: 1px solid #9EA9B1;
}
.part3{
  height: 310px;
}
.runchart{
  height: 310px;
  border: 1px solid #9EA9B1;

}
#price{
  margin-top: 25px;
  height: 85%;
  width: 100%;
  border: #DCDCDC 1px solid;
}


.queue{
  width:30%;
  height: 310px;
}
.queue1{

  height:310px;
}
.scharts1{
  height: 150px;
  border: 1px solid #9EA9B1;
}

.sell-charts{
  height: 150px;
  width: 100%;
  border: 1px solid #9EA9B1;
  padding-left: 2px;
  margin-bottom: 5px;
}
.buy-charts{
  height: 150px;
  width: 100%;
  border: 1px solid #9EA9B1;
  padding-left: 2px;
}
.scharts span{
  top:0px;

  color:red;
}

.trade_button{
  padding-bottom: 10px;
  padding-top: 5px;
  /*border-bottom: #222222 1px solid;*/
}

.count{
  border: 1px solid #9EA9B1;
  margin-top:2px;
  text-align:center;
  line-height: 35px;
}
.sum{
  text-align: center;
}
.el-table{
  background-color: RGB(248,248,248);

}
.el-table>>>.light-blue-row {
  background: rgba(141, 178, 220, 0.6);
}
.el-table>>>.blue-row {
  background: rgba(236,245,255,0.1);
}
.el-table>>>.light-red-row {
  background: rgba(252, 204, 204, 0.4);
}
.el-table>>>.red-row {
  background: rgba(236,245,255,0.1);
}






</style>
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
        <el-row>
          <el-col :span="24">
            <div class="box1">
              <h1 style="color: #F56C6C;text-align: center;font-size: 40px" >平台简介</h1>
              <p style="margin-top: 20px">
                <h3>一、合约的发行</h3>
                <h4>1.合约的定义</h4>
                <p>合约内容即需要预测的事件的结果，每份合约的收益和预测的结果以及最终结果相关。</p>
                <h4>2.合约的发行、诸葛贝和合约赠予</h4>
                <p>每个预测任务赠送的诸葛贝数量可以不一样，但是确定为整数。此外，也允许给参与人免费赠送合约，这也是参与人起初的财富，方便他们进入市场就可以卖出操作。</p>

                <h3>二、市价交易（market order)</h3>

                <p>交易者可以以当前的市场价格进行交易。</p>
                <p>这一流程还要受制于当前最低询价的合约数量、购买者提交订单时间的先后、以及账户余额3个条件。具体场景如下。 </p>

                <p>（1）如果购买者下单的合约数量超过当前最低询价的合约数量，则超出部分不会放入队列再次购买，直接被取消。</p>
                <p>（2）交易按照购买者提交订单时间的先后进行，先到先得。</p>
                <p>（3）如果购买者的账户余额足以支付交易，交易者在提交购买订单后可以立即以之前询价的最低价格购买到合约，如果余额不足，则会直接取消。</p>
                <p>用户还可以卖出合约。但与购买不同的是，用户卖出的价格取决于喊价者先前提交的最高价格。用户卖出的合约数量受到喊价者在当前最高买价下喊价的合约数量的限制。如果卖出订单的合约数量超过了喊价者在当前高买价下愿意买入的合约数量，则超出部分不会放入队列再次出售，直接被取消。</p>

                <h3>三、限价交易（limit order）</h3>

              <h4>1. 喊价和询价</h4>
                <p>（1）双向拍卖和期货市场相似，无论在喊价还是询价时，都应具备时间、合约名称、价格、合约数量4个要素。与期货市场不同的是，目前没有使用保证金制度。喊价与询价的格式如下：</p>
                <p >①　喊价格式（ask）：“在9月20日之前，对铝价格预测这个合约出价45个虚拟诸葛贝，需要5份。”</p>
                <p >②　询价格式（bid）：“在9月25日之前，对铝价格预测这个合约以55个诸葛贝的价格出售，共出售8份。”</p>
                <p>（2）当提交喊价订单和询价订单时，系统会将它们分别放置在“喊价队列”和“询价队列”中。队列按照价格及发行时间排序。如果两个或多个相同价格的订单出现在队列中，则它们按时间输入排序。交易者登录市场时显示的市场价格为喊价队列中的最高喊价和询价队列中的最低询价。订单会一直保留在队列中，直到被提交订单的交易者撤回、到期、被其他交易者接受（导致交易），或者由于不可执行而被系统取消。</p>
                <p>（3）无论是喊价还是询价，都不会在提交喊价或者询价订单后就立即交易，订单会被放入队列中等待其它交易者接受。</p>
                <p>（4）在交易前，交易者可以随时查看并撤销未完成拍卖的订单，但是不能修改未完成的订单，只可以撤回订单并提交新的订单。</p>
                <p>（5）订单被其他交易者接受后不能撤回。</p>

              <h4>2. 交易约束</h4>
                <p>（1）交易者不允许卖空。</p>
                <p>（2）交易者在出售订单时，其持有的合约数量不能为负。</p>
                <p>（3）在购买合约时，交易者账户余额不能为负。</p>
                <p>（4）合约数量为整数，不能拆分。</p>

              <h4>3. 交易执行</h4>
                <p>如果合约的最高出价等于或超过最低要价，则系统会在喊价者和询价者之间执行交易；如果买入价和卖出价不相同，则使用的价格是两个出价订单中时间较早的价格。如果买卖中指定的合约数量不同，则交易的合约数量以两者中的较小者为准。最后，检查订单是否从队列中移除。如果交易的合约数量用尽了买价或卖价中指定的数量，则完成交易的（即较小合约数量）订单将从其队列中删除。否则，合约数量未交易完的订单将减少交易的合约数量，修改后此订单仍保留在队列中。需要注意的是，交易者有且只能有一个账户，不能同自己的账户进行交易。</p>

              </p>

              </div>

          </el-col>
        </el-row>


      </el-main>

    </el-container>
  </el-container>
</template>

<script>

import Myheader from "../components/myheader";
import myaside from "../components/myaside";
export default {
  name: "CDA_home",
  components: {Myheader, myaside},
  methods:{

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
  line-height: 40px;
}
.box1{
  border: 1px solid #9EA9B1;
  height:100%;
  padding: 10px;
}


.box1 p{
  text-align: left;
  text-indent:2em;
  line-height:30px;
  margin-bottom:10px;
  font-size: 18px;
  color: #606266;
}
h3{
  margin-bottom: 10px;
}
h4{
  margin-bottom: 10px;
}
h5{
  margin-bottom: 10px;
}
body > .el-container {
  margin-bottom: 100%;
  height: 100%;
}


.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
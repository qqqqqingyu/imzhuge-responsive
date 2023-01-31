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

        <el-row class="box2">
          <el-col :span="24">
            <div class="box1">
              <h1 style="color: #F56C6C;text-align: center;font-size: 40px" >平台简介</h1>
              <p style="margin-top: 20px">

              <p>“嗨皮诸葛”（www.imzhuge.com）是一个预测领域的研究平台。目前该平台重点关注预测市场（prediction market），基于市场机制汇集大众的集体智慧，预测未来的事件。</p>

              <p>气候变化、技术潮流、传染病爆发、股市波动、国际竞争与合作等事件与每个人息息相关。扔硬币和算命不是好方法，数学模型也有失效的时候。“嗨皮诸葛”聚焦挖掘人的集体智慧在预测中的价值。如何汇集大众的集体智慧呢？在线投票会出现拉票，网络评论也有虚假的。 诺贝尔经济学奖获得者阿罗于2008年在《Science》的刊出论文认为：“越来越多的证据表明，与传统的预测方法相比，预测市场有助于以更低的误差来预测将来的事件……因为信息通常广泛地散布于经济活动参与者之中， 所以需要一种机制来收集并汇总这些信息。自由市场通常能很好地管理这一过程，因为任何人都可以参与其中，市场交易带来的潜在利润或损失激励人们搜寻更多有用的信息” 。</p>
              <p>
                “嗨皮诸葛”的使命是：基于预测市场、人工智能、大数据等理论技术，持续研发高质量的集体智慧预测系统，为大众提供快速、高效的预测服务。
              </p>
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
  height:100%
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
.box2{
  height:100%;
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
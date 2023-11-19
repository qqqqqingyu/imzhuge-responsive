<template>
  <TheNav></TheNav>

  <el-row style="padding-top: 80px">
    <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
      您当前的位置：
      <span class="cur-de">股价涨跌预测</span>
    </el-col>
  </el-row>

  <el-row style="margin-top: 20px">
    <el-col :offset="2" :span="9">
      <p class="box-title">比赛简介</p>
    </el-col>
  </el-row>

  <el-row style="margin-top: 10px;margin-bottom: 10px;">
    <el-col :span="20" :offset="2" >
      <div class="introduction">
        <el-row>
          <p>预测2023年x月x日至2023年x月x日之间每个交易日下列股票的收盘价较上一个交易日的涨跌情况。
            例如，已知贵州茅台（600519.SH）2023年11月6日收盘价为1811.24，预测2023年11月7日收盘价涨还是跌。</p>
          <p>验证资料：新浪财经：
            <a href="#" @click="openURL('https://www.eastmoney.com/')">A股票网页链接、</a>
            <a>B股票网页链接、</a>
            <a>C股票网页链接</a>
          </p>
          <p class="mt-20 mb-10">
            <b>您有<span>5个关注者</span>，他们同您一样参与了此次比赛。您的<span>交易信息</span>和<span>预测结果</span>会被关注者<span>付费查看</span>。
              如果您在某次预测任务中<span>盈利</span>，每个关注者将向您支付<span>1个</span>诸葛贝。假设您在3场预测任务中盈利，关注者将向您支付5×3=15个诸葛贝
            </b>
          </p>
        </el-row>
      </div>
    </el-col>
  </el-row>

  <el-row style="margin-top: 40px">
    <el-col :span="9" :offset="2">
      <span class="box-title">股票列表</span>
    </el-col>

    <el-col :span="9" :offset="2" class="right">
      <!-- 搜索表单 -->
      <el-form :inline="true" class="search-form">
        <el-form-item>
          <el-input v-model="search" size="mini" placeholder="请输入股票名称"
                    @keyup.enter="stock_list"></el-input>
        </el-form-item>
        <el-form-item class="yellow-btn" >
          <el-button size="small" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="20" :offset="2" class="my-card mb-20 ">
      <!-- 表头和内容都改为居中 -->
      <el-table :data="stock_list" class="my-table" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column prop="a" label="股票代码"></el-table-column>
        <el-table-column prop="b" label="股票名称"></el-table-column>
        <el-table-column>
          <template v-slot="scope" >
            <router-link :to="{path:'/stock_participate',query:{eventId:scope.row.b}}" class="details center-vertically">
              <span class="my-icon">去预测</span>
              <img src="@/assets/images/enter.svg" height="13" alt="进入">
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col class="center my-pagination" style="margin-bottom: 10px">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total_page"
              layout=" prev, pager, next">
          </el-pagination>
        </el-col>
      </el-row>
    </el-col>
  </el-row>


</template>

<script>
import {getCSRFToken} from '@/api/token'
import TheNav from "../../../components/TheNav";

export default {
  name: "pc_stock_predict",
  components: {TheNav},
  data() {
    return {
      currentPage: 1,  // 当前页码
      pageNum: 1,
      pageSize: 5,  // 每页显示的条数
      search:'',
      searchKeyword: "", // 搜索关键词
    };
  },
  computed:{
    total_page() {
      return this.stock_list.filter(item => item.a.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    stock_list()
    {
      return [{
        "a": "000001",
        "b": "平安银行"
      }]
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
    this.open()
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    handleSearch(){
      this.searchKeyword = this.search
    },
    openURL(url){
      window.open(url);
    },

    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 更改每页条数时，重置当前页码为第一页
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
    },
    // 打开弹窗
    open() {
      this.$alert('您有<span style="color: #F59A23">5个关注者</span>，他们同您一样参与了此次比赛。' +
          '您的<span style="color: #F59A23">交易信息</span>和<span style="color: #F59A23">预测结果</span>会被关注者' +
          '<span style="color: #F59A23">付费查看</span>。如果您在某次预测任务中<span style="color: #F59A23">盈利</span>，' +
          '每个关注者将向您支付<span style="color: #F59A23">1个</span>诸葛贝。假设您在3场预测任务中盈利，关注者将向您支付' +
          '5×3=15个诸葛贝', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true, // html片段
        center: true, // 居中
        confirmButtonClass:'alert-btn'
      })
    }
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:rgba(242, 242, 242, 0.35)')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
  },
}
</script>

<style scoped>
.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  padding: 20px 25px 10px;
  color:#555555;
  font-size: 17px;
  margin-bottom: 0px;
}

.introduction a{
  font-size: 17px;
  color: #F59A23;
  cursor: pointer;
}

.introduction a:hover{
  font-size: 17px;
  color: rgb(234, 176, 85);
}

.introduction span{
  color: #F59A23;
}

.my-table{
  width: 96%;
  margin: 10px 2% 20px;
}

.my-table >>> .el-table__row:nth-child(odd) {
  background-color: rgb(254,250,241); /* 自定义奇数行颜色 */
}

.details{
  padding-left: 40%;
  color: #EF9C19;
}

.my-pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#F0C27B;
}

.my-pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
  color: #FFFFFF;
}

.my-pagination >>> .el-pagination.is-background .el-pager li:hover{
  color:#EF9C19;
}

/* 修改表头颜色 */
::v-deep.el-table thead {
  color: #000000;
}
</style>
<!--一般style会使用scoped，进行一个作用域的限制。这个时候alert-btn给提示框设置class是不会生效的，-->
<!--    因为跨作用域了。要用不带scope的style设置类-->
<style>
/*提示框的按钮*/
.alert-btn{
  background-color: #F0C27B !important;
  border-color: #F0C27B !important;
}
</style>
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
          股价涨跌预测
        </el-row>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :offset="1" :span="17">
        <p style="font-size: 21px;font-weight: bold;color: #333333">比赛简介</p>
      </el-col>

      <el-col :offset="1" :span="4">
        <span class="yellow-btn">
          <el-button size="small" @click="openPopup">提示</el-button>
        </span>
        <el-dialog v-model="popupVisible" title="提示内容">
          <!-- 弹窗内容 -->
          <p class="badge-text">
            <ul>
              <li>您有<span style="color: #F59A23">5个关注者</span>，他们同您一样参与了此次比赛。</li>
              <li>您的<span style="color: #F59A23">交易信息</span>和<span style="color: #F59A23">预测结果</span>会被关注者<span style="color: #F59A23">付费查看</span>。</li> 
              <li>如果您在某次预测任务中<span style="color: #F59A23">盈利</span>，每个关注者将向您支付<span style="color: #F59A23">1个</span>诸葛贝。假设您在3场预测任务中盈利，关注者将向您支付 5×3=15 个诸葛贝</li>
            </ul> 
          </p>
          <!-- <span slot="footer" class="yellow-btn">
            <el-button @click="popupVisible = false">确定</el-button>
          </span> -->
        </el-dialog>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px;margin-bottom: 10px;">
      <el-col :span="22" :offset="1" >
        <div class="introduction">
          <el-row class="introduction-content">
            <p>预测2023年x月x日至2023年x月x日之间每个交易日下列股票的收盘价较上一个交易日的涨跌情况。
              例如，已知贵州茅台（600519.SH）2023年11月6日收盘价为1811.24，预测2023年11月7日收盘价涨还是跌。</p>
            <p>验证资料：新浪财经：
              <a href="#" @click="openURL('https://www.eastmoney.com/')">A股票网页链接、</a>
              <a>B股票网页链接、</a>
              <a>C股票网页链接</a>
            </p>
            <p class="mt-20 mb-10" style="margin-left: 15px;">
                关注者数量：平台上有<span>5个人</span>关注你。<br>
                关注者权利：关注者<span>可以查看</span>你的交易信息和预测结果。<br>
                关注者付费：如果你在某个预测任务中<span>盈利（净收益大于0）</span>，每个关注者将向你支付<span>1个诸葛贝</span>。否则，不支付诸葛贝。<br>
                我目前从关注者获得收益：10个诸葛贝
                  <img src="@/assets/images/stock_predict.png" height="15">
            </p>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="8" :offset="1" style="margin-top: 5px">
        <span style="font-size: 21px;font-weight: bold;color: #333333">股票列表</span>
      </el-col>

      <el-col :span="13" :offset="1" style="margin-top: 5px">
        <!-- 搜索表单 -->
        <el-form style="display: inline-flex">
          <span>
            <el-input v-model="search" size="mini" placeholder="请输入股票名称"
                      @keyup.enter="stock_list"></el-input>
          </span>
          <span class="yellow-btn" style="margin-left: 5px;">
            <el-button size="small" @click="handleSearch">搜索</el-button>
          </span>
        </el-form>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="22" :offset="1" class="my-card mb-20 ">
        <el-table stripe :data="stock_list" class="my-table" :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column prop="a" label="股票代码"></el-table-column>
          <el-table-column prop="b" label="股票名称"></el-table-column>
          <el-table-column>
            <template v-slot="scope" >
              <router-link :to="{path:'/stock_participate',query:{eventId:scope.row.b}}" class="details center-vertically">
                <span class="my-icon">去预测</span>
                <img src="@/assets/images/enter.svg" height="6" alt="进入">
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row style="margin-top: 50px;"></el-row>
  </div>

  <bottom-nav></bottom-nav>
</template>

<script>
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token';
import { ElDialog, ElButton } from 'element-plus';

export default {
  name: "mobile_stock_predict",
  components: {
    bottomNav,
    ElDialog,
    ElButton,
  },
  data() {
    return {
      currentPage: 1,  // 当前页码
      pageNum: 1,
      pageSize: 5,  // 每页显示的条数
      search:'',
      searchKeyword: "", // 搜索关键词
      popupVisible: false, // 控制弹窗显示与隐藏的变量
    };
  },
  computed:{
    total_page() {
      return this.stock_list.filter(item => item.a.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    stock_list()
    {
      return [{
        "a": "600519",
        "b": "贵州茅台"
      },{
        "a": "601398",
        "b": "工商银行"
      },{
        "a": "601398",
        "b": "中国平安"
      },{
        "a": "601398",
        "b": "工商银行"
      },{
        "a": "601398",
        "b": "工商银行"
      },]
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
    // this.open();
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
    // open() {
    //   this.$alert('您有<span style="color: #F59A23">5个关注者</span>，他们同您一样参与了此次比赛。' +
    //       '您的<span style="color: #F59A23">交易信息</span>和<span style="color: #F59A23">预测结果</span>会被关注者' +
    //       '<span style="color: #F59A23">付费查看</span>。如果您在某次预测任务中<span style="color: #F59A23">盈利</span>，' +
    //       '每个关注者将向您支付<span style="color: #F59A23">1个</span>诸葛贝。假设您在3场预测任务中盈利，关注者将向您支付' +
    //       '5×3=15个诸葛贝', {
    //     confirmButtonText: '确定',
    //     dangerouslyUseHTMLString: true, // html片段
    //     center: true, // 居中
    //     confirmButtonClass:'alert-btn',
    //     customClass: 'custom-alert' // 添加自定义类名
    //   })
    // },
    openPopup() {
      this.popupVisible = true;
    },
  },

  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#F5F8FA')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style');
  }
}
</script>

<style scoped>
@import '../../../assets/CSS/responsive_style.css';

.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  padding: 20px 25px 10px;
  color:#555555;
  font-size: small;
  margin-bottom: 0px;
}

.introduction-content {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}

.introduction a{
  color: #F59A23;
  cursor: pointer;
}

.introduction a:hover{
  color: rgb(234, 176, 85);
}

.introduction span{
  color: #F59A23;
}

.introduction ul{
  margin-left: 5px;
}

.my-table{
  width: 96%;
  margin: 5px 2% 15px;
}

/*修改element表格样式开始*/
/* 去掉最下面的那一条线 */
.el-table::before {
	height: 0px;
}

/*表头颜色*/
::v-deep .el-table th{
  background: rgba(245, 154, 36, 0.3);
  padding: 6px 0 5px;
  color: rgba(51, 51, 51, 0.93);
}

/*边框圆角*/
::v-deep.el-table th:first-child{
  border-top-left-radius:5px;
  border-bottom-left-radius:5px;
}

::v-deep.el-table th:last-child{
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
}

/*表格内容*/
::v-deep .el-table td, .el-table th{
  padding: 6px 0;
  border: none;
}

/*调整斑马纹颜色*/
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td{
  background-color: rgb(248,248,248);
}
/*修改element表格样式结束*/

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

.custom-alert {
  background-color: #fff;
  color: #333;
}

.my-dialog {
  border: 2px solid #f59a23;
  border-radius: 30px;
}

.badge-text {
  font-size: small;
  margin-left: 15px;
  margin-right: 15px;
}

/* 弹窗样式 */
::v-deep .el-dialog {
  border-radius: 10px;
}

.dialog-footer {
  font-size: small;
  text-align: center;
}

</style>

<style>
/*提示框的按钮*/
.alert-btn{
  background-color: #F0C27B !important;
  border-color: #F0C27B !important;
}
</style>
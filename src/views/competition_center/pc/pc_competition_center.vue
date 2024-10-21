<template>
  <div>
    <!--    导航栏-->
    <TheNav :current-page="'competition'"></TheNav>

    <el-row style="padding-top: 80px">
      <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
        您当前的位置：
        <span class="cur-de">赛事中心</span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :offset="2" :span="9">
        <p class="box-title">赛事中心简介</p>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px; margin-bottom: 10px;">
      <el-col :span="20" :offset="2">
        <div class="introduction">
          <el-row>
            <p>欢迎您参加预测比赛，提升预测技能，成为预测专家。同时，我们欢迎您发起预测比赛（联系人：郑海超，邮箱：haichao@swufe.edu.cn）。期待与您一起创造并体验精彩的预测比赛！</p>
          </el-row>
          <el-row style="margin-top: 10px">
              <p></p>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 40px">
      <el-col :span="9" :offset="2">
        <span class="box-title">比赛列表</span>
      </el-col>

      <el-col :span="9" :offset="2" class="right">
        <!-- 搜索表单 -->
        <el-form :inline="true" class="search-form">
          <el-form-item>
            <el-input v-model="search" size="mini" placeholder="请输入比赛名称"
                      @keyup.enter="event_list"></el-input>
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
        <el-table :data="page_list" class="my-table" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
          <el-table-column width="80">
            <template  v-slot="scope">
              <el-image :src="getImagePath(scope.row.event_name)" alt="比赛"
                        fit="scale-down" style="width: 60px;height: 50px">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="event_name" label="比赛名称"></el-table-column>
          <!-- 特邀标签 -->
          <el-table-column v-slot="scope">
            <span v-if="scope.row.is_special" class="pc_invited">特邀</span>
          </el-table-column>

          <el-table-column label="比赛时间">
            <template  v-slot="scope">
              {{ formatDate(scope.row.start_time) }} ~ {{ formatDate(scope.row.end_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="award" label="奖金"></el-table-column>
          <el-table-column prop="status" label="比赛状态"></el-table-column>
          <el-table-column>
            <template v-slot="scope" >
<!--              活动类型不为information，为付费型信息分析实验，进入实验页面-->
              <router-link v-if="(scope.row.event_type == 'information' || scope.row.event_type == 'information-1')" :to="{path:'/stock_predict',query:{eventId:scope.row.event_id}}" class="details center-vertically">
                <span class="my-icon">查看详情</span>
                <img src="@/assets/images/enter.svg" height="13" alt="进入">
              </router-link>
<!--              反之，进入普通比赛详情页面-->
              <router-link v-else :to="{path:'/competition_details',query:{eventId:scope.row.event_id}}" class="details center-vertically">
                <span class="my-icon">查看详情</span>
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
  </div>
</template>

<script>
import {getCSRFToken} from '@/api/token'
import TheNav from "../../../components/TheNav";

export default {
  name: "pc_competition_center",
  components: {TheNav},

  data() {
    return {
      currentPage: 1,  // 当前页码
      pageNum: 1,
      pageSize: 15,  // 每页显示的条数
      search:'',
      searchKeyword: "", // 搜索关键词
      compMapping: {
        '《行为金融学》预测比赛': 'xwjrx.jpg',
        '上海原油期货月度结算参考价预测': 'comp2.svg',
        '财经指标预测':'cjzb.jpg',
        '国际经济与政策预测': 'comp1.svg',
        '2023年底全球重要股指预测':'important_stock_predict.jpg',
        '股价涨跌预测':'fufei.webp'
      }
    };
  },

  computed: {
    total_page() {
      return this.event_list.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    event_list(){
      return this.$store.getters.eventList
          .filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1)
          .slice().sort((a, b) => {
            return new Date(b.end_time) - new Date(a.end_time);
          });
    },
    page_list(){
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const isUserLoggedIn = this.$store.getters.loginStatus;
      const filteredEventList = this.event_list.filter(item => {
        const match = item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1;
        // 判断是否特邀比赛，如果用户未登录，则不展示特邀比赛
        const isSpecialEvent = item.is_special;
        // 只返回符合条件的比赛
        return match && (isUserLoggedIn || !isSpecialEvent);
      });
      return filteredEventList.slice(startIndex, endIndex);
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
  },
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    handleSearch(){
      this.searchKeyword = this.search
    },
    // 转换数据为时间格式
    formatDate(dateString) {
      const dateObj = new Date(dateString);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); //月份从0开始，需要+1
      const day = ('0' + dateObj.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },
    // 根据行业调用相应图片，图片用svg，命名与比赛命名对应
    getImagePath(img) {
      const compName = this.compMapping[img];
      try {
        return require(`@/assets/images/${compName}`);
      } catch (error) {
        return require('@/assets/images/none.svg');
      }
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 更改每页条数时，重置当前页码为第一页
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
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
    },
  };

</script>

<style scoped>
@import '../../../assets/CSS/responsive_style.css';

.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  padding: 20px 25px 10px;
  /*line-height: 25px !important;*/
  color:#555555;
  font-size: 17px;
  margin-bottom: 0px;
}

.search-form{
  padding-top: 1px;
}

.details{
  color: #EF9C19;
}

.my-table{
  width: 96%;
  margin: 10px 2% 20px;
}

.my-table >>> .el-table__row:nth-child(odd) {
  background-color: rgb(254,250,241); /* 自定义奇数行颜色 */
}

.my-card >>> .el-table td, .el-table th.is-leaf{
  /*去除表格行的底部边框 */
  border-bottom: none;
}

.my-card >>> .el-table .cell{
  line-height: unset;
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

/* 特邀标签的边框显示出来 */
/deep/ .el-table .cell{overflow: unset}

.pc_invited {
  color: #fb6770;
  padding: 4px 6px;
  font-size: 13px;
  border: 1px solid #fb6770;
  border-radius: 5px;
}

/* 修改表头颜色 */
::v-deep.el-table thead {
  color: #000000;
}

</style>

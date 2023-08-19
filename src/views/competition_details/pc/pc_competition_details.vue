<template>
  <div>
    <!--    导航栏-->
    <TheNav :current-page="'competition'"></TheNav>

    <el-row style="padding-top: 80px">
      <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
        您当前的位置：
        <router-link to="/competition_center">赛事中心</router-link>
        <img src="@/assets/images/right.svg" alt="下级" height="25">
        <span class="cur-de">比赛详情</span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :offset="2" :span="9">
        <p class="box-title">比赛简介</p>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px; margin-bottom: 10px;">
      <el-col :span="20" :offset="2">
        <div class="introduction">
          <el-row>
            <p>简介</p>
          </el-row>
          <el-row style="margin-top: 10px">
            <p></p>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 40px">
      <el-col :span="9" :offset="2">
        <span class="box-title">活动列表</span>
      </el-col>

      <el-col :span="9" :offset="2" class="right">
        <!-- 搜索表单 -->
        <el-form :inline="true" class="search-form">
          <el-form-item>
            <el-input v-model="searchKeyword" size="small" placeholder="请输入比赛名称"
                      @keyup.enter="competition_event"></el-input>
          </el-form-item>
          <!--          <el-form-item class="yellow-btn" >-->
          <!--            <el-button size="small" @click="handleSearch">搜索</el-button>-->
          <!--          </el-form-item>-->
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20" :offset="2" class="my-card mb-20">
        <el-table :data="page_list" class="my-table">
          <el-table-column prop="name" label="活动名称"></el-table-column>
          <el-table-column label="活动时间">
            <template  v-slot="scope">
              {{ formatDate(scope.row.start_time) }} ~ {{ formatDate(scope.row.end_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="活动状态"></el-table-column>
          <el-table-column>
            <template v-slot="scope">
              <router-link :to="{path:'/competition_translation',query:{eventId:eventIdProp,activityId:scope.row.id}}"
                           class="details center-vertically" v-if="scope.row.status == '活动进行中'">
                <span class="my-icon">去交易</span>
                <img src="@/assets/images/enter.svg" height="13" alt="进入">
              </router-link>
              <div class="gray-details center-vertically" v-else>
                <span class="my-icon">去交易</span>
                <img src="@/assets/images/gray-enter.svg" height="13" alt="进入">
              </div>
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
  name: "pc_competition_details",
  components: {TheNav},
  props: {
    eventIdProp: {
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,  // 当前页码
      pageNum: 1,
      pageSize: 5,  // 每页显示的条数
      searchKeyword: "", // 搜索关键词
    };
  },
  computed: {
    competition_event() {
      if((typeof this.$store.getters.eventData !== 'undefined') && (typeof this.$store.getters.eventData.activity_data !== 'undefined')){
        return this.$store.getters.eventData.activity_data.filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1);
      }
      return []
    },
    total_page() {
      return this.competition_event.filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    page_list(){
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.competition_event.filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1).slice(startIndex, endIndex)
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
    // 转换数据为时间格式
    formatDate(dateString) {
      const dateObj = new Date(dateString);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); //月份从0开始，需要+1
      const day = ('0' + dateObj.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
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
  padding: 20px 15px 10px;
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

.gray-details{
  color: #AAAAAA;
}

.my-table{
  width: 96%;
  margin: 10px 2% 20px;
}

.my-table >>> .el-table__row:nth-child(odd) {
  background-color: rgb(254,250,241); /* 自定义奇数行颜色 */
}

.my-card >>> .el-table td, .el-table th.is-leaf{
  border-bottom: none; /* 去除表格行的底部边框 */
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

a {
  text-decoration: none;
}
</style>

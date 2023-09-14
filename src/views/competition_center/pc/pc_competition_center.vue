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
            <el-input v-model="searchKeyword" size="small" placeholder="请输入比赛名称"
                      @keyup.enter="event_list"></el-input>
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
          <el-table-column width="80">
            <template  v-slot="scope">
              <el-image :src="getImagePath(scope.row.event_name)" alt="比赛"
                        fit="scale-down" style="width: 60px;height: 50px">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="event_name" label="比赛名称"></el-table-column>
          <el-table-column label="比赛时间">
            <template  v-slot="scope">
              {{ formatDate(scope.row.start_time) }} ~ {{ formatDate(scope.row.end_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="award" label="奖金"></el-table-column>
          <el-table-column prop="status" label="比赛状态"></el-table-column>
          <el-table-column>
            <template v-slot="scope" >
              <router-link :to="{path:'/competition_details',query:{eventId:scope.row.event_id}}" class="details center-vertically">
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
      pageSize: 5,  // 每页显示的条数
      searchKeyword: "", // 搜索关键词
      compMapping: {
        '测试比赛1': 'comp1',
        '测试比赛2': 'comp2'
      }
    };
  },
  
  computed: {
    total_page() {
      return this.event_list.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    event_list(){
      return this.$store.getters.eventList.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1)
    },
    page_list(){
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.event_list.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1).slice(startIndex, endIndex)
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
    // 根据行业调用相应图片，图片用svg，命名与比赛命名对应
    getImagePath(img) {
      const compName = this.compMapping[img];
      try {
        return require(`@/assets/images/${compName}.svg`);
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
</style>
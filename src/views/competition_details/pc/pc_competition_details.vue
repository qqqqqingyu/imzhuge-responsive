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
        <span class="box-title hand" @click="changePart(1)" :class="{'box-gray-title': currentPart === 2}" >比赛简介</span>

        <span class="box-title hand" :class="{'box-gray-title': currentPart === 1}" style="margin-left: 20px"
              @click="changePart(2)">个人成绩</span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px; margin-bottom: 10px;">
      <el-col :span="20" :offset="2">
        <div class="introduction">
          <el-row v-if="currentPart===1" class="alert-text" v-html="competition_desc">
          </el-row>
          <el-row v-else>
            <el-col class="show-grade">
              <el-row class="center">
                <el-col :span="8">
                  <h2>{{ competition_performance.ranking }}</h2>
                  <span>排名</span>
                </el-col>
                <el-col :span="8">
                  <h2>{{ numFilter(competition_performance.net_zhuge) }}</h2>
                  <span>比赛净收益</span>
                </el-col>
                <el-col :span="8">
                  <h2>{{ numFilter(competition_performance.cash) }}</h2>
                  <span>奖金</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="my-tab">
              <el-tabs v-model="myTabs">
                <el-tab-pane label="&emsp;收益明细&emsp;" name="detail">
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col>
              <el-table :data="competition_performance.activity_rank" class="my-grade-table" :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}">
                <el-table-column prop="act_name" label="活动"></el-table-column>
                <el-table-column prop="pro_name" label="任务" v-if="competition_performance.table_style == 4"></el-table-column>
                <el-table-column label="任务状态">
                  <template v-slot="scope" >
                    <span v-if="scope.row.status.endsWith('已结束')" class="over_state">已结束</span>
                    <span v-else class="ing_state">进行中</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sub_net_zhuge" label="净收益">
                  <template v-slot="scope">
                    {{ numFilter(scope.row.sub_net_zhuge) }}
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
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
            <el-input v-model="search" size="small" placeholder="请输入比赛名称"
                      @keyup.enter="competition_event"></el-input>
          </el-form-item>
          <el-form-item class="yellow-btn" >
            <el-button size="small" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20" :offset="2" class="my-card mb-20">
        <el-table :data="page_list" class="my-table" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
          <el-table-column prop="name" label="活动名称"></el-table-column>
          <!-- 特邀 比赛详情目前不加这个标签-->
          <!-- <el-table-column v-slot="scope">
            <span v-if="scope.row.is_special" class="pc_invited">特邀</span>
          </el-table-column> -->

          <el-table-column label="活动时间">
            <template  v-slot="scope">
              {{ formatDate(scope.row.start_time) }} ~ {{ formatDate(scope.row.end_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="活动状态"></el-table-column>
<!--          <el-table-column label="活动状态">-->
<!--            <template v-slot="scope" >-->
<!--              <span v-if="scope.row.status.endsWith('已结束')" class="over_state">已结束</span>-->
<!--              <span v-else class="ing_state">进行中</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column>
            <template v-slot="scope">
              <router-link :to="{path:'/competition_transaction',
                            query:{eventId:eventIdProp,activityId:scope.row.id,activityStatus:scope.row.status}}"
                            class="details center-vertically" v-if="scope.row.status == '活动进行中'">
                <span class="my-icon">去交易</span>
                <img src="@/assets/images/enter.svg" height="13" alt="进入">
              </router-link>
              <div class="gray-details center-vertically" v-else-if="scope.row.status == '活动未开始'">
                <span class="my-icon">去交易</span>
                <img src="@/assets/images/gray-enter.svg" height="13" alt="进入">
              </div>
              <router-link :to="{path:'/competition_transaction',
                            query:{eventId:eventIdProp,activityId:scope.row.id,activityStatus:scope.row.status}}"
                            class="details center-vertically" v-else>
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
  name: "pc_competition_details",
  components: {TheNav},
  props: {
    eventIdProp: {
      required: true
    }
  },
  data() {
    return {
      currentPart:1, // 切换比赛简介或个人成绩
      currentPage: 1,  // 当前页码
      pageNum: 1,
      pageSize: 15,  // 每页显示的条数
      search:"",
      searchKeyword: "", // 搜索关键词
      myTabs:'detail',
      linkUrl:require('@/assets/images/link.svg'),
    };
  },
  computed: {
    // 比赛简介
    competition_desc(){
      if(typeof this.$store.getters.eventData.event_desc !== 'undefined'){
        return this.$store.getters.eventData.event_desc}
      return ''
    },
    // 比赛表现
    competition_performance(){
      if(typeof this.$store.getters.eventData.performance !== 'undefined'){
        return this.$store.getters.eventData.performance}
      return {
        ranking: '',
        net_zhuge: '',
        cash: '',
        activity_rank: [{
          id: '',
          name: '',
          status: '',
          sub_net_zhuge: ''
        }]
      }
    },
    competition_event() {
      if((typeof this.$store.getters.eventData !== 'undefined') && (typeof this.$store.getters.eventData.activity_data !== 'undefined')){
        return this.$store.getters.eventData.activity_data
            .filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1)
            .slice().sort((a, b) => {
              return new Date(b.end_time) - new Date(a.end_time);
            });
      }
      return []
    },
    total_page() {
      return this.competition_event.filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    // 当前页数据
    page_list(){
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.competition_event
          .filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1)
          .slice(startIndex, endIndex)
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
    // 搜索
    handleSearch(){
      this.searchKeyword = this.search
    },
    // 转两位小数
    numFilter(str){
      let n = parseFloat(str)
      if(isNaN(n)){
        return str
      }
      else{
        return n.toFixed(2)
      }
    },
    // 切换简介和个人成绩
    changePart(page){
      this.currentPart = page
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
  padding: 15px 25px 15px;
  line-height: 25px;
  color:#555555;
  font-size: 17px;
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

/* 修改表头颜色 */
::v-deep.el-table thead {
  color: #000000;
}

.pc_invited {
  color: #fb6770;
  padding: 2px 4px;
  font-size: 13px;
  border: 1px solid #fb6770;
  border-radius: 5px;
}

.box-gray-title{
  color: #AAAAAACD;
}

.show-grade{
  background-color: rgba(255, 195, 105, 0.07);
  padding: 18px 0 8px;
  color: #000000;
}

.show-grade span{
  color: #AAAAAA;
  font-size: 12px;
  margin-top: 5px;
}

.my-grade-table{
  margin:0 0 15px;
}

/*修改element表格样式开始*/
/*表头颜色*/

/*表头颜色*/
::v-deep .my-grade-table th{
  background: rgba(215, 215, 215, 0.2);
  padding: 6px 0 5px;
  color: rgba(51, 51, 51, 0.93);
}

/*边框圆角*/
::v-deep .el-table th:first-child{
  border-top-left-radius:5px;
  border-bottom-left-radius:5px;
}

::v-deep .el-table th:last-child{
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
}

/*表格内容*/
::v-deep .el-table td, .el-table th{
  padding: 6px 0;
}

/*调整斑马纹颜色*/
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td{
  background-color: rgb(248,248,248);
}
/*修改element表格样式结束*/

/*修改element原有tab样式开始*/
/*切换活动项的字体颜色*/
.my-tab /deep/ .el-tabs__item.is-active {
  color: #E3B570 !important;
}

/*切换活动项的字体颜色*/
.my-tab /deep/ .el-tabs__item:hover {
  color: #E3B570 !important;
}

/*切换活动项的长条颜色*/
.my-tab /deep/ .el-tabs__active-bar {
  background-color: #F0C27B !important;
}

.my-tab >>> .el-tabs__item{
  font-size: 17px;
}
/*修改element原有tab样式结束*/
</style>

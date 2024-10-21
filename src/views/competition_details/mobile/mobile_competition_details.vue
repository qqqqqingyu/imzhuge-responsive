<!-- 比赛详情 -->
<template>
  <div class="container">
    <el-row class="title-box">
      <el-col :span="1" :offset="1">
        <router-link to="/competition_center">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
          比赛详情
        </el-row>
      </el-col>
    </el-row>

    <!--    面包屑导航栏开始-->
    <el-row>
      <el-col :span="22" :offset="1" class="m-breadcrumb center-vertically mb-5">
        您当前的位置：
        <router-link to="/competition_center">赛事中心</router-link>
        <img src="@/assets/images/right.svg" alt="下级" height="25">
        <span>比赛详情</span>
      </el-col>
    </el-row>
    <!--    面包屑导航栏结束-->

    <el-row style="margin-top: 5px">
      <el-col :offset="1" :span="22">
        <span class="m-box-title hand" @click="changePart(1)" :class="{'box-gray-title': currentPart === 2}">比赛简介</span>

        <span class="m-box-title hand" @click="changePart(2)" :class="{'box-gray-title': currentPart === 1}" style="margin-left: 20px">个人成绩</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px; margin-bottom: 10px;">
      <el-col :span="22" :offset="1" class="introduction">
        <el-row>
          <el-col :span="22" :offset="1" class="introduction-content alert-text" v-if="currentPart===1" v-html="competition_desc">
          </el-col>
          <el-col :span="22" :offset="1" v-else>
            <el-row>
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
          </el-col>
        </el-row>

      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;max-height: 50px;">
      <el-col :span="8" :offset="1" style="margin-top: 5px">
        <p class="m-box-title">活动列表</p>
      </el-col>

      <!-- 搜索表单 -->
      <el-col :span="14" class="right">
        <el-form :inline="true" label-position="right">
          <el-row>
            <el-col :span="18">
              <el-form-item style="margin-left: 5px">
                <el-input v-model="search" size="mini" placeholder="请输入比赛名称"
                          @keyup.enter="filter_list"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item class="yellow-btn" >
                <el-button size="small" @click="handleSearch">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" class="mb-card" style="margin-bottom: 60px">
        <el-row>
          <el-col :span="9">
            <el-form :inline="true" v-on:click="sortByDate" class="myform input-height">
              <el-form-item>
                <el-select v-model="sortOrder" placeholder="选择排序方式" size="mini">
                  <el-option label="按结束日期排序" value="end_time"></el-option>
                  <el-option label="按开始日期排序" value="start_time"></el-option>
                  <el-option label="按首字母排序" value="Capitalize"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>

          <el-col :span="15" class="center-vertically">
            <el-radio-group v-model="screen">
              <el-radio-button class="filter-radio" label=2>全部</el-radio-button>
              <el-radio-button class="filter-radio" label=0>进行中</el-radio-button>
              <el-radio-button class="filter-radio" label=1>未开始或已结束</el-radio-button>
            </el-radio-group>
          </el-col>

          <!--          不用-->
          <!--          <button @click="filterComp('all')" class="mybtn mybtn1">全部</button>-->
          <!--          <button @click="filterComp('ongoing')" class="mybtn mybtn2">进行中</button>-->
          <!--          <button @click="filterComp('ended')" class="mybtn mybtn2">已结束</button>-->

          <!--          <el-button @click="filterMatches('all')" class="mybtn1">全部</el-button>-->
          <!--          <el-button @click="filterMatches('ongoing')" class="mybtn2">进行中</el-button>-->
          <!--          <el-button @click="filterMatches('ended')" class="mybtn2">已结束</el-button>-->
        </el-row>

        <div v-for="(item, index) in page_list" :key="index" class="box-card card-content card-info">
          <div class="left-info">
            <p class="info1">{{ item.name }}</p>
            <p class="my-tag" style="margin-top:6px;margin-bottom: 8px">
              <span class="m-over_state" v-if="item.status.endsWith('未开始')">未开始</span>
              <span class="m-over_state" v-else-if="item.status.endsWith('已结束')">已结束</span>
              <span class="m-ing_state" v-else>进行中</span>
              <!-- 特邀标签 目前不加-->
              <!-- <span v-if="item.is_special" class="m_invited">特邀</span> -->
            </p>
            <p class="info2">活动时间 {{ formatDate(item.start_time) }} ~ {{ formatDate(item.end_time) }}</p>
          </div>
          <div class="right-info">
            <router-link :to="{path:'/competition_transaction',
                            query:{eventId:eventIdProp,activityId:item.id,activityStatus:item.status}}"
                            class="details center-vertically" v-if="item.status.endsWith('进行中')">
                <span class="my-icon">去交易</span>
                <img src="@/assets/images/enter.svg" height="13" alt="进入">
              </router-link>
              <div class="gray-details center-vertically" v-else-if="item.status.endsWith('未开始')">
                <span class="my-icon">去交易</span>
                <img src="@/assets/images/gray-enter.svg" height="13" alt="进入">
              </div>
              <router-link :to="{path:'/competition_transaction',
                            query:{eventId:eventIdProp,activityId:item.id,activityStatus:item.status}}"
                            class="details center-vertically" v-else>
                <span class="my-icon">查看详情</span>
                <img src="@/assets/images/enter.svg" height="13" alt="进入">
              </router-link>
          </div>

        </div>

        <el-row>
          <el-col class="center my-pagination" style="margin-top: 10px; margin-bottom: 10px">
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

    <el-row style="margin-top: 50px;"></el-row>
  </div>
  <bottom-nav></bottom-nav>
</template>

<script>
import {getCSRFToken} from '@/api/token'
import bottomNav from "../../../components/bottomNav";

export default {
  name: "mobile_competition_details",
  components: {bottomNav},
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
      searchKeyword: "", // 搜索关键词
      search:"",
      sortOrder: "end_time", // 默认排序按结束日期
      filterOption: 'all',
      FASComp: [],
      // 设置筛选为全选，未开始或已结束还是进行中，对应2，1，0
      screen: 2,
      myTabs:'detail',
    };
  },

  // 不用
  // created() {
  //   this.filterOption = 'all';
  //   this.updateComp();
  //   //console.log('123');
  // },

  computed: {
    // 比赛简介
    competition_desc(){
      return this.$store.getters.eventData.event_desc
    },
    // 获取的原始数据
    competition_event() {
      if ((typeof this.$store.getters.eventData !== 'undefined') && (typeof this.$store.getters.eventData.activity_data !== 'undefined')) {
        return this.$store.getters.eventData.activity_data.filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1);
      }
      return []
    },
    // 根据比赛状态筛选并根据条件排序后展示的数据
    filter_list() {
      const filteredList = this.competition_event.filter((comp) => {
        if (this.screen == 0) {
          return comp.status.endsWith('进行中');
        } else if (this.screen == 1) {
          return comp.status.endsWith('未开始或已结束');
        } else {
          // screen为2时，返回所有的
          return comp;
        }
      })
      // 对筛选的数据进行排序
      if (filteredList) {
        return this.sortByDate(filteredList);
      } else {
        return []
      }
    },
    // 总页数
    total_page() {
      return this.filter_list.filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    // 当前页数据
    page_list() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filter_list.filter(item => item.name.toLowerCase().indexOf(this.searchKeyword) !== -1).slice(startIndex, endIndex)
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
  },
  mounted() {
    this.getCSRFTokenMethod();
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 切换简介和个人成绩
    changePart(page){
      this.currentPart = page
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

    filterComp(filterOption) {
      //console.log('123');
      if (filterOption === 'all') {
        // 显示所有比赛
        this.FASComp = this.page_list;
      } else if (filterOption === 'ongoing') {
        // 显示进行中的比赛
        this.FASComp = this.page_list.filter(comp => {
          return new Date(comp.end_time) > new Date();
        });
      } else if (filterOption === 'ended') {
        // 显示已结束的比赛
        this.FASComp = this.page_list.filter(comp => {
          return new Date(comp.end_time) <= new Date();
        });
      }
    },
    // 排序方法，根据原版调整
    sortByDate(myList) {
      if (this.sortOrder === 'start_time') {
        return myList.slice().sort((a, b) => {
          return new Date(b.start_time) - new Date(a.start_time);
        });
      } else if (this.sortOrder === 'end_time') {
        return myList.slice().sort((a, b) => {
          return new Date(b.end_time) - new Date(a.end_time);
        });
      } else if (this.sortOrder === 'Capitalize') {
        return myList.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else {
        return myList
      }
    },
    // sortByDate() {
    //   //console.log('123');
    //   if (this.sortOrder === 'start_time') {
    //     this.FASComp.sort((a, b) => {
    //       return new Date(a.start_time) - new Date(b.start_time);
    //     });
    //   } else if (this.sortOrder === 'end_time') {
    //     this.FASComp.sort((a, b) => {
    //       return new Date(a.end_time) - new Date(b.end_time);
    //     });
    //   } else if (this.sortOrder === 'Capitalize') {
    //     this.FASComp.sort((a, b) => {
    //       return a.event_name.localeCompare(b.event_name);
    //     });
    //   }
    // },

    // 不用
    // updateComp() {
    //   //先筛选再排序
    //   this.filterComp(this.filterOption);
    //   this.sortByDate();
    // },

    //触摸样式
    handleTouchStart(event) {
      event.currentTarget.classList.add('hovered');
    },
    handleTouchEnd(event) {
      event.currentTarget.classList.remove('hovered');
    }
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#F5F8FA')
    });
  },
  beforeUnmount() {
    document.body.removeAttribute('style');
  },

};
</script>

<style scoped>

.introduction {
  background-color: #FFFFFF;
  border-radius: 12px;
  color: #555555;
  font-size: 15px;
  margin-bottom: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.introduction-content {
  padding: 10px;
}

.mybtn {
  border: none;
  max-height: 25px;
  width: 50px;
  padding: 3px 5px;
  margin: 5px 3px;
  border-radius: 5px;
}

.mybtn1 {
  color: #EF9C19;
  background-color: #ffefc9;

}

.mybtn2 {
  color: #AAAAAA;
  background-color: #F5F8FA;
}

.myform {
  margin-left: 12px;
  max-height: 20px;
  max-width: 140px;
  margin-bottom: 20px;
}

/* .input-height {
  height: 10px; 
} */

.box-card {
  padding: 10px;
  border-bottom: 1px solid #efefef;
}


.card-content {
  display: flex;
  align-items: center;
}

.card-info {
  font-size: 12px;
}

.left-info {
  flex: 1;
}

.right-info {
  margin-right: 20px;
}

.info1 {
  margin-top: 8px;
  margin-left: 18px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}

.info2 {
  color: #AAAAAA;
  margin-left: 18px;
}

.details {
  color: #EF9C19;
}

.gray-details {
  color: #AAAAAA;
}

.my-tag{
  margin: 5px 18px;
}

.mytag {
  margin: 5px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 50px;
  max-height: 20px;
  border-color: #F0C27B;
  background-color: #FFFFFF;
  color: #F0C27B;
}

.my-pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #F0C27B;
}

/*被选后的单选框颜色*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #FFAA2A;
  background: rgba(255, 195, 105, 0.2);
}

/*单选框样式*/
.filter-radio >>> .el-radio-button__inner {
  margin-left: 4px;
  background: #F5F8FA;
  color: #7F7F7F;
  border: 0;
  border-radius: 5px;
  padding: 5px 6px;
  font-size: 13px;
}

.el-select-dropdown__item.selected {
  color: #EF9C19;
}

.m-over_state {
  font-size: 12px;
}

.m-ing_state {
  font-size: 12px;
}

/*复写全局类*/
.title-box{
  margin-bottom: 10px;
}

.m_invited {
  margin-left: 4px;
  color: #fb6770;
  border: 1px solid #fb6770;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: 12px;
}

/*修改按钮样式*/
.yellow-btn .el-button{
  padding: 7px 10px;
}

.m-box-title{
  font-size: 21px;
  font-weight: bold;
  color: rgb(51, 51, 51);
}

.box-gray-title{
  color: #AAAAAACD;
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
  height: 33px;
  font-size: 14px;
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


.show-grade{
  background-color: rgba(255, 195, 105, 0.07);
  padding: 13px 0 8px;
  color: #000000;
}

.show-grade span{
  color: #AAAAAA;
  font-size: 12px;
  margin-top: 5px;
}
</style>
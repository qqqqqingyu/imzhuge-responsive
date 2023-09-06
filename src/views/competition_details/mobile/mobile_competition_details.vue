<!-- 比赛详情 -->
<template>
  <div class="container">
    <el-row style="margin-top: 20px;margin-bottom: 15px;">
      <el-col :span="1" :offset="1">
        <router-link to="/">
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
      <el-col :offset="1" :span="23">
        <p style="font-size: 21px;font-weight: bold;color: #333333">比赛简介</p>
      </el-col>
    </el-row> 
    <el-row style="margin-top: 10px; margin-bottom: 10px;" >
      <el-col :span="22" :offset="1">
        <div class="introduction">
          <el-row class="introduction-content">
            <el-col>
              <p>简介</p>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
              <p></p>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;max-height: 50px;">
      <el-col :span="11" :offset="1">
        <p style="font-size: 21px;font-weight: bold;color: #333333">活动列表</p>
      </el-col>

      <el-col :span="11" :offset="1" class="right" >
        <!-- 搜索表单 -->
        <el-form :inline="true" >
          <el-form-item >
            <el-input v-model="searchKeyword" size="small" placeholder="请输入活动名称"
                      @keyup.enter="event_list" ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="22" :offset="1" class="mb-20 mb-card">
        <el-row >
          <el-form :inline="true" @submit.native.prevent="sortByDate" class="myform input-height">
            <el-form-item >
              <el-select v-model="sortOrder" placeholder="选择排序方式">
                <el-option label="按开始日期排序" value="start_time"></el-option>
                <el-option label="按结束日期排序" value="end_time"></el-option>
                <el-option label="按首字母排序" value="Capitalize"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <button @click="filterComp('all')" class="mybtn mybtn1">全部</button>
          <button @click="filterComp('ongoing')" class="mybtn mybtn2">进行中</button>
          <button @click="filterComp('ended')" class="mybtn mybtn2">已结束</button>
          <!-- <el-button @click="filterMatches('all')" class="mybtn1">全部</el-button>
          <el-button @click="filterMatches('ongoing')" class="mybtn2">进行中</el-button>
          <el-button @click="filterMatches('ended')" class="mybtn2">已结束</el-button> -->
        </el-row>

        <div v-for="(item, index) in FASComp" :key="index" class="box-card card-content card-info">
          <div class="left-info">
            <p class="info1">活动{{ index + 1}}</p>
            <el-tag class="mytag">进行中</el-tag>
            <p class="info2">活动时间   {{ formatDate(item.start_time) }} ~ {{ formatDate(item.end_time) }}</p>
          </div>
          <div class="right-info">
            <router-link :to="{path:'/competition_translation',query:{eventId:eventIdProp,activityId:item.id}}" class="details center-vertically" v-if="item.status == '活动进行中'">
              <span class="my-icon">去交易</span>
              <img src="@/assets/images/enter.svg" height="13" alt="进入">
            </router-link>
            <div class="gray-details center-vertically" v-else>
              <span class="my-icon">去交易</span>
              <img src="@/assets/images/gray-enter.svg" height="13" alt="进入">
            </div>
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



  </div>
  <bottom-nav></bottom-nav>
</template>

<script>
import {getCSRFToken} from '@/api/token'
import bottomNav from "../../../components/bottomNav";

export default {
  name: "mobile_competition_details",
  components:{bottomNav},
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
      compMapping: {
        '测试比赛1': 'comp1',
        '测试比赛2': 'comp2'
      },
      sortOrder: '', // 默认排序方式为空
      filterOption: 'all',
      FASComp: [],
    };
  },

  created() {
    this.filterOption='all';
    this.updateComp();
    //console.log('123');
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
    },
    event_list(){
      return this.$store.getters.eventList.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1)
    },
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
    sortByDate() {
      //console.log('123');
      if (this.sortOrder === 'start_time') {
        this.FASComp.sort((a, b) => {
          return new Date(a.start_time) - new Date(b.start_time);
        });
      } else if (this.sortOrder === 'end_time') {
        this.FASComp.sort((a, b) => {
          return new Date(a.end_time) - new Date(b.end_time);
        });
      } else if (this.sortOrder === 'Capitalize') {
        this.FASComp.sort((a, b) => {
          return a.event_name.localeCompare(b.event_name);
        });
      }
    },

    updateComp() {
      //先筛选再排序
      this.filterComp(this.filterOption); 
      this.sortByDate(); 
    },
    
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
@import '../../../assets/CSS/responsive_style.css';

.container{
  margin-bottom: 40px;
}

.introduction{
  background-color: #FFFFFF;
  border-radius: 12px;
  color:#555555;
  font-size: 15px;
  margin-bottom: 0px;
}

.introduction-content{
  padding-left: 10px;
  padding-right:  10px;
  padding-top: 10px;
}

.mybtn {
  border:none;
  max-height:25px;
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

.myform{
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
  font-size: 8px;
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

.details{
  color: #EF9C19;
}
.gray-details{
  color: #AAAAAA;
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
.my-pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#F0C27B;
}
</style>
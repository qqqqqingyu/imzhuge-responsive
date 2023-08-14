<template>
  <div>
    <!--    导航栏-->
    <TheNav :current-page="'competition'"></TheNav>
    <!--    赛事中心页面已写好路由，可以在页面中显示。-->
    <!--    背景、面包屑导航栏、各模块的白色背景看着笔记试一下-->
    <!--    项目已引入element-plus，可以直接用-->
    
<!--    进入比赛详情的测试超链接-->
    <router-link :to="{path:'/competition_details',query:{eventId:3}}" style="margin-top: 100px">
      查看详情
    </router-link>


        <!--    当前位置开始-->
    <el-row style="padding-top: 80px">
      <el-col :span="20" :offset="2" class="my-breadcrumb center-vertically">
        您当前的位置：
        <span>赛事中心</span>
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
            <p>简介</p>
          </el-row>
          <el-row style="margin-top: 10px">
              <p></p>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :span="9" :offset="2">
        <span class="box-title">比赛列表</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="9" :offset="2">
        <!-- 搜索表单 -->
        <el-form :inline="true" class="search-form">
          <el-form-item>
            <el-input v-model="searchKeyword" placeholder="请输入比赛名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="yellow-btn" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :span="20" :offset="2">
        <el-table :data="competitionList" >
          <el-table-column prop="eventName" label="比赛名称"></el-table-column>
          <el-table-column prop="eventDate" label="比赛时间"></el-table-column>
          <el-table-column prop="award" label="奖金"></el-table-column>
          <el-table-column prop="eventState" label="比赛状态"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px" class="center">
      <el-col :span="20" :offset="2">
        <!-- 分页 -->
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4, 5]"
          layout="sizes, prev, pager, next, jumper"
          :total="filteredCompetitionList.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
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
      competitionList: [], // 比赛列表数据
      pageSize: 1,
      searchKeyword: "", // 搜索关键词
    };
  },
  
  computed: {
    event_list() {
      return this.$store.getters.eventList
    },
    competition_event() {
      return this.$store.getters.event
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
    getEventList().then((res)=>{
      console.log('res'+res)
    })
    .catch((res) => {
      console.log('错误'+res);
    });
  },
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    
    handleSearch() {
      // 重新计算分页相关数据
      this.currentPage = 1;
      // ... 其他逻辑 ...
    },

    // 加载比赛列表数据
    loadCompetitionList() {
    // 假数据
    const fakeData = [
      { id: 1, eventName: 'Event 1', eventDate: '2023-08-01', award: '1', eventState: '已结束'},
      { id: 2, eventName: 'Event 2', eventDate: '2023-08-15', award: '1', eventState: '已结束'},
      { id: 3, eventName: 'Event 3', eventDate: '2023-09-05', award: '1', eventState: '已结束'},
    ];

      // 使用假数据更新 competitionList 和 totalCompetitionCount
      this.competitionList = fakeData;
      this.totalCompetitionCount = fakeData.length;

    },
    //分页
    handleSizeChange(newSize) {
      this.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
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

.my-breadcrumb a{
  color: #555555;
  text-decoration: none;
}

.my-breadcrumb a:hover{
  color: #f98079;
  text-decoration: none;
}

.my-breadcrumb a:active{
  color: #fe8d46;
  text-decoration: none;
}


.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  padding: 20px 15px 10px;
  /*line-height: 25px !important;*/
  color:#555555;
  font-size: 17px;
  margin-bottom: 0px;
}

</style>
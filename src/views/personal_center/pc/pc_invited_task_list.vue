<template>
  <el-row>
    <el-col :offset="1" :span="20" class="center-vertically mb-20">
      <router-link to="/pc_invited_event" class="personal-title-a">特邀预测比赛</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <router-link :to="{path:'/pc_invited_participate',query:{eventName:$route.query.eventName}}"
                   class="personal-title-a">参与活动</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <span class="personal-title">任务列表</span>
    </el-col>

    <el-col :offset="1" :span="23" style="margin-bottom: 15px">
      <el-radio-group v-model="screen">
        <el-radio-button class="filter-radio" label=2>全部</el-radio-button>
        <el-radio-button class="filter-radio" label=0>进行中</el-radio-button>
        <el-radio-button class="filter-radio" label=1>已结束</el-radio-button>
      </el-radio-group>
    </el-col>

    <el-col :offset="1" :span="23" class="line">
      <el-divider></el-divider>
    </el-col>

    <el-col :span="11" :offset="1" class="activity-box" v-for="item in page_project_list" v-bind:key="item.title">
      <el-row>
        <el-col :span="24">
          <h4 style="margin-bottom: 2px">
            {{ item.title }}
          </h4>
        </el-col>
        <el-col :span="24" style="margin-top:8px;margin-bottom: 10px">
          <span class="over_state" v-if="item.status">已结束</span>
          <span class="ing_state" v-else>进行中</span>
        </el-col>

        <el-col :span="8" class="mb-5">
          <span class="gray-text">活动收益</span>
        </el-col>
        <el-col :span="15" :offset="1">
          <span style="font-size: 14px">
            {{ parseFloat(item.project_earning).toFixed(2) }}&nbsp;诸葛贝
          </span>
          <!--          <span v-if="item.status" style="font-size: 14px">-->
          <!--            {{ parseFloat(item.project_earning).toFixed(2) }}&nbsp;诸葛贝-->
          <!--          </span>-->
          <!--          <span style="font-size: 14px" v-else>-->
          <!--            活动进行中-->
          <!--          </span>-->
        </el-col>

        <el-col :span="8" class="mb-5">
          <span class="gray-text">正确结果</span>
        </el-col>
        <el-col :span="15" :offset="1">
          <span style="font-size: 14px">
            {{ item.true_contract }}
          </span>
        </el-col>
      </el-row>
    </el-col>

    <el-col class="center my-pagination">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout=" prev, pager, next"
          :total="total_num">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import {getCSRFToken} from '@/api/token'

export default {
  name: "pc_invited_task_list",
  data() {
    return {
      screen: 2, //2表示全部
      pageSize: 10, //单页数目
      pageNum: 1,
      currentPage: 1,
    }
  },
  computed: {
    my_project_list() {
      let myInvitedEvent = this.$store.getters.myInvitedEvent
      // 从前页传来的值
      const selectEventName = this.$route.query.eventName;
      const selectActName = this.$route.query.actName

      const selectedAct = myInvitedEvent.find(
          (act) => act.event_name === selectEventName
      ).act_list;

      const selectedProject = selectedAct.find(
          (proj) => proj.act_name === selectActName
      ).project_list;

      if (selectedProject) {
        return selectedProject.filter((item) => {
          if ((this.screen == 2 || this.screen == item.status)) {
            return item
          }
        })
      } else {
        console.log('未筛选到相应的数据')
        return []
      }
    },
    page_project_list() {
      try {
        return this.my_project_list
            .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      } catch (error) {
        console.error('page_project_list报错:', error);
        return [];
      }
    },
    total_num() {
      try {
        return this.my_project_list.length;
      } catch (error) {
        console.error('total_num报错:', error);
        return 0;
      }
    }
  },
  mounted() {
    this.getCSRFTokenMethod()
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      console.log('条数', pageSize);
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;     // 在每次当前页改变后的值赋值给 data 里面定义的当前页
    }
  }
}
</script>

<style scoped>

/*被选后的单选框颜色*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #FFAA2A;
  background: rgba(255, 195, 105, 0.2);
  font-size: 14px;
}

/*单选框样式*/
.filter-radio >>> .el-radio-button__inner {
  margin-right: 20px;
  background: #F5F8FA;
  color: #7F7F7F;
  border: 0;
  border-radius: 10px;
  padding: 8px 15px;
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
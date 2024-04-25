<template>
  <el-row>
    <el-col :offset="1" :span="20" class="center-vertically mb-20">
      <router-link to="/pc_competition" class="personal-title-a">比赛</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <span class="personal-title">参与活动</span>
    </el-col>

    <el-col :offset="1" :span="23" class="line">
      <el-divider></el-divider>
    </el-col>

    <el-col :span="11" :offset="1" class="activity-box"
            v-for="item in page_act_list" v-bind:key="item.act_name">
      <el-row>
        <el-col :span="24" class="mb-10">
          <h4 style="margin-bottom: 2px">
            {{ item.act_name }}
          </h4>
        </el-col>
        <el-col :span="8" class="mb-5">
          <span class="gray-text">活动收益</span>
        </el-col>
        <el-col :span="15" :offset="1">
          <span style="font-size: 14px">
            {{ parseFloat(item.act_money).toFixed(2) }}&nbsp;诸葛贝
          </span>
        </el-col>

        <el-col class="yellow-btn link" style="margin-top: 10px;">
          <router-link :to="{path:'/pc_task_list',query:{eventName:$route.query.eventName,actName:item.act_name}}">
            <el-button>查看详情</el-button>
          </router-link>
          <router-link :to="{path:'/competition_transaction',
                            query:{eventId:$route.query.eventId,activityId:item.activity_id}}">
            <el-button>交易页面</el-button>
          </router-link>
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
  name: "pc_participate",
  data() {
    return {
      screen: 2, //2表示全部
      pageSize: 10, //单页数目
      pageNum: 1,
      currentPage: 1,
    }
  },
  computed: {
    act_list() {
      let myEvent = this.$store.getters.myEvent
      // 从前页传来的值
      const selectEventName = this.$route.query.eventName;
      const selectedAct = myEvent.find(
          (act) => act.event_name === selectEventName
      );

      if (selectedAct) {
        return selectedAct.act_list
      } else {
        console.log('未筛选到相应的数据')
        return []
      }
    },
    page_act_list() {
      try {
        return this.act_list
            .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      } catch (error) {
        console.error('page_act_list报错:', error);
        return [];
      }
    },
    total_num() {
      try {
        return this.act_list.length;
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
      this.currentPage = pageNum;     // 在每次当前页改变后的值 赋值给 data 里面定义的 当前页
    }
  }
}
</script>

<style scoped>
.my-pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#F0C27B;
}

.my-pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
  color: #FFFFFF;
}

.my-pagination >>> .el-pagination.is-background .el-pager li:hover{
  color:#EF9C19;
}
.link{
  display: flex;
  justify-content: space-between;
}
</style>
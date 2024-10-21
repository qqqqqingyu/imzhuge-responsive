<template>
  <div>
    <el-row class="mt-20">
      <el-col :span="1" :offset="1">
        <router-link to="/mobile_invited_event">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title mb-10">
          {{ $route.query.eventName }}-参与活动
        </el-row>
      </el-col>
    </el-row>

    <!--    面包屑导航栏开始-->
    <el-row class="mb-10">
      <el-col :span="22" :offset="1" class="m-breadcrumb center-vertically">
        您当前的位置：
        <router-link to="/mobile_invited_event">比赛列表</router-link>
        <img src="@/assets/images/right.svg" alt="下级" height="20">
        <span class="cur-de">比赛活动</span>
      </el-col>
    </el-row>
    <!--    面包屑导航栏结束-->

    <el-row>
      <el-col :offset="1" :span="22" style="margin-bottom: 15px">
        <div class="mb-card" v-for="item in page_act_list" v-bind:key="item.title">
          <el-row>
            <el-col :span="16" :offset="1">
              <el-row>
                <el-col class="mb-10">
                  <h4>
                    {{ item.act_name }}
                  </h4>
                </el-col>
                <el-col :span="10" class="mb-2">
                  <span class="mobile-gray-text">活动收益</span>
                </el-col>
                <el-col :span="13" :offset="1">
                  <span style="font-size: 13px">
                    {{ parseFloat(item.act_money).toFixed(2) }}&nbsp;诸葛贝
                  </span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="right center-vertically">
              <router-link :to="{path:'/mobile_invited_task_list',query:{eventName:$route.query.eventName,actName:item.act_name,eventId:$route.query.eventId}}" class="yellow-link center-vertically">
                <span class="my-icon" style="font-size: 14px">查看详情</span>
                <img src="@/assets/images/enter.svg" height="11" alt="进入">
              </router-link>
              <router-link :to="{path:'/competition_transaction',
                            query:{eventId:$route.query.eventId,activityId:item.activity_id}}" 
                            class="yellow-link center-vertically">
            <span class="my-icon" style="font-size: 14px">交易页面</span>
            <img src="@/assets/images/enter.svg" height="11" alt="进入">
            </router-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="center my-pagination mb-20">
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
  </div>
  <bottom-nav :current-page="'personal'"></bottom-nav>
</template>

<script>
import bottomNav from "../../../components/bottomNav";
import {useStore} from "vuex";
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_invited_participate",
  components:{bottomNav},
  data(){
    return{
      screen: 2, //2表示全部
      pageSize: 10, //单页数目
      pageNum: 1,
      currentPage: 1,
    }
  },
  computed: {
    act_list() {
      let myInvitedEvent = this.$store.getters.myInvitedEvent
      // 从前页传来的值
      const selectEventName = this.$route.query.eventName;
      const selectedAct = myInvitedEvent.find(
          (act) => act.event_name === selectEventName
      );

      if (selectedAct) {
        // 先返回不根据状态筛选的数据
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

    const store = useStore()
    store.dispatch('myActivity/useMyInvitedEventData')
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
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#F5F8FA')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
  },
}
</script>

<style scoped>
.my-tab >>> .el-tabs__nav-wrap::after {
  background:none;
}

.my-tab >>> .el-tabs__item:hover{
  color: #EF9C19;
}

.my-tab >>> .el-tabs__active-bar{
  background-color:#EF9C19;
}

.my-tab >>> .el-tabs__item.is-active{
  color: #EF9C19;
}

.my-tab >>> .el-tabs__item{
  height: 35px;
  color: #909399;
}

a.yellow-link{
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
.link{
  display: flex;
  justify-content: space-between;
}
</style>
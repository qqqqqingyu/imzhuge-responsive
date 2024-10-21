<template>
  <div>
    <el-row class="mt-20">
      <el-col :span="1" :offset="1">
        <router-link to="/mobile_industry_list">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title mb-10">
          行业个股收益率预测
        </el-row>
      </el-col>
    </el-row>

    <!--    面包屑导航栏开始-->
    <el-row class="mb-10">
      <el-col :span="22" :offset="1" class="m-breadcrumb center-vertically">
        您当前的位置：
        <router-link to="/mobile_industry_list">行业列表</router-link>
        <img src="@/assets/images/right.svg" alt="下级" height="20">
        <span class="cur-de">参与活动</span>
      </el-col>
    </el-row>
    <!--    面包屑导航栏结束-->

    <el-row>
      <el-col :offset="1" :span="22" style="margin-bottom: 15px">
        <el-tabs class="my-tab" v-model="activeName">
          <el-tab-pane v-for="(tab, index) in myTabs" :key="index" :label="tab.label" :name="tab.name">
            <div class="mb-card half" v-for="item in page_project_list" v-bind:key="item.title" >
              <el-row>
                <el-col>
                  <h4 class="mb-2">
                    {{ item.title }}
                  </h4>
                </el-col>
                <el-col style="margin-top:8px;margin-bottom: 10px">
                  <span class="m-over_state"  v-if="item.status">已结束</span>
                  <span class="m-ing_state" v-else>进行中</span>
                </el-col>

                <el-col :span="10" class="mb-2">
                  <span class="mobile-gray-text">比赛收益</span>
                </el-col>
                <el-col :span="14">
                  <span style="font-size: 13px">
                    {{ parseFloat(item.project_earning).toFixed(2) }}&nbsp;诸葛贝
                  </span>
                </el-col>

                <el-col :span="10" class="mb-2">
                  <span class="mobile-gray-text">正确结果</span>
                </el-col>
                <el-col :span="14">
                  <span style="font-size: 13px">
                    {{ item.true_contract }}
                  </span>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
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

    <bottom-nav  :current-page="'personal'"></bottom-nav>
  </div>
</template>

<script>
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'
import {useStore} from "vuex";

export default {
  name: "mobile_my_activities",
  components:{bottomNav},
  data() {
    return {
      activeName: 'all', //用于切换el-tabs
      pageSize: 10, //单页数目
      pageNum: 1,
      currentPage: 1,
      myTabs: [
        { label: "全部", name: "all" },
        { label: "进行中", name: "onGoing" },
        { label: "已结束", name: "ended" }
      ]
    }
  },
  computed: {
    project_list() {
      let project = this.$store.getters.myActivity.act_project_list

      // 从前页传来的值
      const selectedActName = this.$route.query.industry;
      const selectedAct = project.find(
          (act) => act.act_name === selectedActName
      );
      if (selectedAct) {
        return selectedAct.project_list.filter((item) => {
          if (this.activeName == 'onGoing') {
            return item.status == false;
          } else if (this.activeName == 'ended') {
            return item.status == true;
          } else {
            return item;
          }
        });
      }else {
        console.log('未筛选到数据')
        return []
      }
    },
    page_project_list() {
      try {
        return this.project_list
            .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      } catch (error) {
        console.error('page_project_list报错:', error);
        return [];
      }
    },
    total_num() {
      try {
        return this.project_list.length;
      } catch (error) {
        console.error('total_num报错:', error);
        return 0;
      }
    }
  },
  mounted() {
    this.getCSRFTokenMethod()

    const store = useStore()
    store.dispatch('myActivity/useMyActivityData')
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
.half:nth-child(odd){
  width: 43%;
  margin-right: 1%;
  display: inline-block;
  padding-left: 3%;
  padding-right: 3%;
}

.half:nth-child(even){
  width: 43%;
  margin-left: 1%;
  display: inline-block;
  padding-left: 3%;
  padding-right: 3%;
}

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
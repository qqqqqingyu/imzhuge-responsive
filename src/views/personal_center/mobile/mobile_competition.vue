<template>
  <div>
    <el-row class="mt-20">
      <el-col :span="1" :offset="1">
        <router-link to="/personal_center">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title mb-10">
          公开比赛
        </el-row>
      </el-col>
    </el-row>

    <!--    面包屑导航栏开始-->
    <el-row >
      <el-col :span="22" :offset="1" class="m-breadcrumb center-vertically">
        您当前的位置：
        <span class="cur-de">比赛列表</span>
      </el-col>
    </el-row>
    <!--    面包屑导航栏结束-->

    <el-row>
      <el-col :offset="1" :span="22" style="margin-bottom: 15px">
        <el-tabs class="my-tab" v-model="activeName">
          <el-tab-pane v-for="(tab, index) in myTabs" :key="index" :label="tab.label" :name="tab.name">
            
            <el-col :span="24" class="mb-card half" v-for="item in page_my_event" v-bind:key="item.event_name" >
              <el-row>
                <el-col>
                  <h4 style="margin-bottom: 2px">
                    {{ item.event_name }}
                  </h4>
                </el-col>
                <el-col style="margin-top:8px;margin-bottom: 10px">
                  <span class="m-over_state"  v-if="item.event_status.endsWith('未开始或已结束')">未开始或已结束</span>
                  <span class="m-ing_state" v-else>进行中</span>
                </el-col>

                <el-col :span="10" class="mb-2">
                  <span class="mobile-gray-text">比赛收益</span>
                </el-col>
                <el-col :span="14" style="padding-left: 2px">
                  <span style="font-size: 13px">
                    {{ parseFloat(item.earning_coin).toFixed(2) }}&nbsp;诸葛贝
                  </span>
                </el-col>

                <el-col :span="10" class="mb-2">
                  <span class="mobile-gray-text">比赛时间</span>
                </el-col>
                <el-col :span="14" style="padding-left: 2px">
                  <span style="font-size: 13px">
                    {{ formatDate(item.event_start_time) }} ~ {{ formatDate(item.event_end_time) }}
                  </span>
                </el-col>

                <el-col :span="10" class="mb-2">
                  <span class="mobile-gray-text">获得奖金</span>
                </el-col>
                <el-col :span="14" style="padding-left: 2px">
                  <span style="font-size: 13px">
                    {{ changeCash(item.event_earning_cash) }}
                  </span>
                </el-col>

                <el-col class="mobile-yellow-btn center" style="margin-top: 5px;">
                  <router-link :to="{path:'/mobile_participate',query:{eventName:item.event_name}}">
                    <el-button>查看详情</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </el-col>

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

    <el-row style="height: 35px"></el-row>
    <bottom-nav  :current-page="'personal'"></bottom-nav>
  </div>
</template>

<script>
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'
import {useStore} from "vuex";

export default {
  name: "mobile_competition",
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
        { label: "未开始或已结束", name: "ended" }
      ]
    }
  },
  computed: {
    my_event() {
      let myEvent = this.$store.getters.myEvent

      if (myEvent) {
        return myEvent.filter((item) => {
          if (this.activeName == 'onGoing') {
            return item.event_status.endsWith('进行中');
          } else if (this.activeName == 'ended') {
            return item.event_status.endsWith('未开始或已结束');
          } else {
            return item;
          }
        })
      } else {
        return this.$store.getters.myEvent
      }
    },
    page_my_event() {
      try {
        return this.my_event
            .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      } catch (error) {
        console.error('page_my_event报错:', error);
        return [];
      }
    },
    total_num() {
      try {
        return this.my_event.length;
      } catch (error) {
        console.error('total_num报错:', error);
        return 0;
      }
    }
  },
  mounted() {
    this.getCSRFTokenMethod()

    const store = useStore()
    store.dispatch('myActivity/useMyEventData')
  },
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 保留n位小数或显示文字
    changeCash(value) {
      // 检查是否可以转换为数字
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        // 转换为数值并保留两位小数
        return numericValue.toFixed(2)+" RMB";
      }
      // 返回原始文本
      return value;
    },
    // 保留n位小数
    numFilter(value, n) {
      return parseFloat(value).toFixed(n)
    },
    // 分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      console.log('条数', pageSize);
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;     // 在每次当前页改变后的值 赋值给 data 里面定义的 当前页
    },
    resetPage(){
      this.currentPage = 1
    },
    // 转换数据为时间格式
    formatDate(dateString) {
      const dateObj = new Date(dateString);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); //月份从0开始，需要+1
      const day = ('0' + dateObj.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },
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

.half:nth-child(odd){
  width: 100%;
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
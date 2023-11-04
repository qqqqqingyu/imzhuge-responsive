<template>
  <el-row>
    <el-col :offset="1" :span="20" class="mb-20">
      <h2 class="personal-title">特邀比赛</h2>
    </el-col>
    <el-col :offset="1" :span="23" style="margin-bottom: 15px">
      <el-radio-group v-model="screen">
        <el-radio-button class="filter-radio" label=2>全部</el-radio-button>
        <el-radio-button class="filter-radio" label=0>进行中</el-radio-button>
        <el-radio-button class="filter-radio" label=1>未开始或已结束</el-radio-button>
      </el-radio-group>
    </el-col>
  
    <el-col :offset="1" :span="23" class="line">
      <el-divider></el-divider>
    </el-col>
  
    <el-col :span="11" :offset="1" class="activity-box" v-for="item in page_my_event" v-bind:key="item.event_name">
      <el-row>
        <el-col :span="24">
          <h4 style="margin-bottom: 2px">
            {{ item.event_name }}
          </h4>
        </el-col>
        <el-col :span="24" style="margin-top:8px;margin-bottom: 10px">
          <span class="over_state" v-if="item.event_status.endsWith('未开始或已结束')">未开始或已结束</span>
          <span class="ing_state" v-else>进行中</span>
          <span class="pc_invited">特邀</span>
        </el-col>
  
        <el-col :span="8" class="mb-5">
          <span class="gray-text">比赛收益</span>
        </el-col>
        <el-col :span="15" :offset="1">
          <span style="font-size: 14px">
            {{ parseFloat(item.earning_coin).toFixed(2) }}&nbsp;诸葛贝
          </span>
        </el-col>
  
        <el-col :span="8" class="mb-5">
            <span class="gray-text">比赛时间</span>
        </el-col>
        <el-col :span="15" :offset="1">
          <span style="font-size: 14px">
            {{ formatDate(item.event_start_time) }} ~ {{ formatDate(item.event_end_time) }}
          </span>
        </el-col>
  
        <el-col :span="8" class="mb-5">
          <span class="gray-text">获得奖金</span>
        </el-col>
        <el-col :span="15" :offset="1">
          <span style="font-size: 14px">
            {{ changeCash(item.event_earning_cash) }}
          </span>
        </el-col>
  
        <el-col class="yellow-btn center" style="margin-top: 10px;">
          <router-link :to="{path:'/pc_participate',query:{eventName:item.event_name}}">
            <el-button>查看详情</el-button>
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
  name: "pc_invited_event",
  data() {
    return {
      screen: 2, //2表示全部
      pageSize: 6, //单页数目
      pageNum: 1,
      currentPage: 1,
    }
  },
  computed: {
    my_event() {
      let myEvent = this.$store.getters.myEvent

      if (myEvent) {
        return myEvent.filter((item) => {
          if (this.screen == 0) {
            return item.event_status.endsWith('进行中');
          } else if (this.screen == 1) {
            return item.event_status.endsWith('未开始或已结束');
          } else {
            // screen为2时，返回所有的
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
  },
  methods: {
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
  }
}
</script>

<style scoped>

/* 不管哪种修改样式都不太稳定，有时候会失效 */
/* ::v-deep.el-radio-button{
  margin-right: 20px;
  border-radius:10px;
  .el-radio-button__inner {
    background: #F5F8FA;
    color: #7F7F7F;
    border: 0 !important;
    padding: 8px 15px;

  }
    修改按钮激活样式 
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: #FFAA2A;
      background-color: rgba(255, 195, 105, 0.2);
      font-size: 14px;
  }
} */

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
  border-radius: 8px;
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

.pc_invited {
    margin-left: 6px;
    border: 1px solid #fb6770;
    border-radius: 5px;
    padding:3px 9px 3px;
    font-size: small;
    color: #fb6770;
}
</style>


<!-- 赛事中心 -->
<template>
  <div class="container">
    <el-row style="margin-top: 20px">
      <el-col :span="1" :offset="1">
        <router-link to="/">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
          赛事中心
        </el-row>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :offset="1" :span="23">
        <p style="font-size: 21px;font-weight: bold;color: #333333">赛事中心简介</p>
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

    <el-row style="margin-top: 40px">
      <el-col :span="11" :offset="1">
        <p style="font-size: 21px;font-weight: bold;color: #333333">比赛列表</p>
      </el-col>

      <el-col :span="11" :offset="1" class="right">
        <!-- 搜索表单 -->
        <el-form :inline="true" >
          <el-form-item>
            <el-input v-model="searchKeyword" size="small" placeholder="请输入比赛名称"
                      @keyup.enter="event_list"></el-input>
          </el-form-item>
<!--          <el-form-item class="yellow-btn" >-->
<!--            <el-button size="small" @click="handleSearch">搜索</el-button>-->
          <!-- </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
    
    <!-- <el-card style="margin-bottom: 20px;" class="my-card">
      <el-row > 
        <el-rol :span="10" :offset="14">
          <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-rol>
        
      </el-row>
      
    </el-card> -->

    <el-row>
      <el-col :span="22" :offset="1" class="mb-20">
        <el-card v-for="competition in page_list" :key="competition.id" class="box-card">
          <div class="card-content">
            <el-image :src="getImagePath(competition.event_name)" alt="比赛"
                      fit="scale-down" class="card-image"></el-image>

            <!-- 右侧比赛信息 -->
            <div class="card-info">
              <p style="font-size: 18px;font-weight: bold;color: #333333">{{ competition.event_name }}</p>
              <el-tag class="mytag">进行中</el-tag>
              <p style="color: #AAAAAA;">比赛时间   {{ formatDate(competition.start_time) }} ~ {{ formatDate(competition.end_time) }}</p>
              <p style="color: #AAAAAA;">比赛奖金   {{ competition.award }}</p>
              
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col >
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
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_competiotion_center",
  components:{
    bottomNav,
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
      }
    };
    
  },

  computed: {
    total_page() {
      return this.event_list.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    event_list(){
      return this.$store.getters.eventList.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1)
    },
    page_list(){
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.event_list.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1).slice(startIndex, endIndex)
    },
    // loginStatus(){
    //   return this.$store.getters.loginStatus
    // },
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
    // 根据行业调用相应图片，图片用svg，命名与比赛命名对应
    getImagePath(img) {
      const compName = this.compMapping[img];
      try {
        return require(`@/assets/images/${compName}.svg`);
      } catch (error) {
        return require('@/assets/images/none.svg');
      }
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
      document.body.setAttribute('style', 'background:#F5F8FA')
    });
  },
    //实例销毁之前钩子，移除body标签的属性style
    beforeUnmount() {
      document.body.removeAttribute('style');
    },
}
</script>

<style scoped>
@import '../../../assets/CSS/responsive_style.css';

.container{
  margin-bottom: 40px;
}

.introduction{
  background-color: #FFFFFF;
  border-radius: 18px;
  color:#555555;
  font-size: 15px;
  margin-bottom: 0px;
}

.introduction-content{
  padding-left: 10px;
  padding-right:  10px;
  padding-top: 10px;
}

.box-card {
  padding: 10px;
}
.mytag {
  width: 56px;
  height: 28px;
  border-color: #F0C27B;
  background-color: #FFFFFF;
  color: #F0C27B;
}
.card-content {
  display: flex;
  align-items: center;
}

.card-image {
  /* width: 100px;
  height: 80px;  */
  margin-left: 0;
  margin-right: 8px; 
  padding: 0;
}

.card-info {
  flex: 1; 
  font-size: 8px;
}

.my-pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#F0C27B;
}
</style>
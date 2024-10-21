<!-- 赛事中心 -->
<template>
  <div class="container">
    <el-row class="title-box">
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

    <!--    面包屑导航栏开始-->
    <el-row>
      <el-col :span="22" :offset="1" class="m-breadcrumb center-vertically mb-5">
        您当前的位置：赛事中心
      </el-col>
    </el-row>
    <!--    面包屑导航栏结束-->

    <el-row style="margin-top: 5px">
      <el-col :offset="1" :span="23">
        <p style="font-size: 21px;font-weight: bold;color: #333333">赛事中心简介</p>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px; margin-bottom: 10px;">
      <el-col :span="22" :offset="1">
        <div class="introduction">
          <el-row class="introduction-content">
            <el-col>
              <p>欢迎您参加预测比赛，提升预测技能，成为预测专家。同时，我们欢迎您发起预测比赛（联系人：郑海超，邮箱：haichao@swufe.edu.cn）。期待与您一起创造并体验精彩的预测比赛！</p>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <p></p>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;max-height: 50px;">
      <el-col :span="8" :offset="1" style="margin-top: 5px">
        <p style="font-size: 21px;font-weight: bold;color: #333333">比赛列表</p>
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
            <el-form v-on:click="sortByDate" class="myform">
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

          <!-- <el-button type="primary" @click="filterMatches('all')" class="mybtn1">全部</el-button>
          <el-button @click="filterMatches('ongoing')" class="mybtn2">进行中</el-button>
          <el-button @click="filterMatches('ended')" class="mybtn2">已结束</el-button> -->
        </el-row>

        <div v-for="competition in page_list" :key="competition.id" class="box-card card-content">
<!--              活动类型不为information，为付费型信息分析实验，进入实验页面-->
          <router-link v-if="(competition.event_type == 'information' || competition.event_type == 'information-1')" :to="{ path: '/stock_predict', query: { eventId: competition.event_id } }"
                       class="comp-link" >
            <!--            @touchstart="handleTouchStart" @touchend="handleTouchEnd"-->
            <!-- 图片和比赛信息放在router-link内部 -->
            <el-image :src="getImagePath(competition.event_name)" alt="比赛" fit="scale-down"
                      class="card-image"></el-image>
            <!-- 右侧比赛信息 -->
            <div class="card-info">
              <p style="font-size: 16px; font-weight: bold; color: #333333">{{ competition.event_name }}</p>
              <p style="margin-top:6px;margin-bottom: 8px">
                <span class="m-over_state" v-if="competition.status.endsWith('未开始或已结束')">未开始或已结束</span>
                <span class="m-ing_state" v-else>进行中</span>
                <!-- 特邀标签 -->
                <span v-if="competition.is_special" class="m_invited">特邀</span>
              </p>
              
              <p style="color: #AAAAAA;">比赛时间 {{ formatDate(competition.start_time) }} ~
                {{ formatDate(competition.end_time) }}</p>
              <p style="color: #AAAAAA;">比赛奖金 <span style="color: #ffc848;">{{ competition.award }}</span></p>
            </div>
          </router-link>
<!--              反之，进入普通比赛详情页面-->
          <router-link v-else :to="{ path: '/competition_details', query: { eventId: competition.event_id } }"
                       class="comp-link">
            <!--            @touchstart="handleTouchStart" @touchend="handleTouchEnd"-->
            <!-- 图片和比赛信息放在router-link内部 -->
            <el-image :src="getImagePath(competition.event_name)" alt="比赛" fit="scale-down"
                      class="card-image"></el-image>
            <!-- 右侧比赛信息 -->
            <div class="card-info">
              <p style="font-size: 16px; font-weight: bold; color: #333333">{{ competition.event_name }}</p>
              <p style="margin-top:6px;margin-bottom: 8px">
                <span class="m-over_state" v-if="competition.status.endsWith('未开始或已结束')">未开始或已结束</span>
                <span class="m-ing_state" v-else>进行中</span>
                <!-- 特邀标签 -->
                <span v-if="competition.is_special" class="m_invited">特邀</span>
              </p>

              <p style="color: #AAAAAA;">比赛时间 {{ formatDate(competition.start_time) }} ~
                {{ formatDate(competition.end_time) }}</p>
              <p style="color: #AAAAAA;">比赛奖金 <span style="color: #ffc848;">{{ competition.award }}</span></p>
            </div>
          </router-link>
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
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_competiotion_center",
  components: {
    bottomNav,
  },

  data() {
    return {
      currentPage: 1,  // 当前页码
      pageNum: 1,
      pageSize: 15,  // 每页显示的条数
      searchKeyword: "", // 搜索关键词
      search:"",
      compMapping: {
        '《行为金融学》预测比赛': 'xwjrx.jpg',
        '上海原油期货月度结算参考价预测': 'comp2.svg',
        '财经指标预测':'cjzb.jpg',
        '国际经济与政策预测': 'comp1.svg',
        '2023年底全球重要股指预测':'important_stock_predict.jpg',
        '股价涨跌预测':'fufei.webp'
      },
      sortOrder: 'end_time',
      filterOption: 'all',
      FASComp: [],
      // 设置筛选为全选，未开始或已结束还是进行中，对应2，1，0
      screen: 2
    };
  },
  // created() {
  // this.filterOption='all';
  // this.updateComp();
  // },

  computed: {
    // 获取的原始数据
    event_list() {
      return this.$store.getters.eventList.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1)
    },
    // 根据比赛状态筛选并根据条件排序后展示的数据
    // 把 event_list 改为 page_list 防止未登录出现特邀比赛（zby：改回来了，不然筛选功能不行）
    filter_list() {
      const filteredList = this.event_list.filter((comp) => {
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
      return this.filter_list.filter(item => item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1).length
    },
    // 当前页数据
    page_list() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const isUserLoggedIn = this.$store.getters.loginStatus;
      const filteredEventList = this.filter_list.filter(item => {
        const match = item.event_name.toLowerCase().indexOf(this.searchKeyword) !== -1;
        // 判断是否特邀比赛，如果用户未登录，则不展示特邀比赛
        const isSpecialEvent = item.is_special;
        // 只返回符合条件的比赛
        return match && (isUserLoggedIn || !isSpecialEvent);
      });
      return filteredEventList.slice(startIndex, endIndex);
    },
    // 不用
    // loginStatus(){
    //   return this.$store.getters.loginStatus
    // },
  },

  mounted() {
    this.getCSRFTokenMethod();
  },

  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 搜索
    handleSearch(){
      this.searchKeyword = this.search
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
        return require(`@/assets/images/${compName}`);
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
    // 不用
    filterComp(filterOption) {
      if (filterOption === 'all') {
        // 显示所有比赛
        this.FASComp = this.page_list;
      } else if (filterOption === 'ongoing') {
        // 显示进行中的比赛
        this.FASComp = this.page_list.filter(comp => {
          if (comp.status === '进行中') {
            return comp
          }
        });
      } else if (filterOption === 'ended') {
        // 显示已结束的比赛
        this.FASComp = this.page_list.filter(comp => {
          if (comp.status === '比赛未开始或已结束') {
            return comp
          }
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
          return a.event_name.localeCompare(b.event_name);
        });
      } else {
        return myList
      }
    },
    // sortByDate() {
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
    updateComp() {
      // 先筛选再排序
      // this.filterComp(this.filterOption);
      // this.sortByDate();
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

  // watch: {
  //   sortOrder: 'updateComp',
  //   filterOption: 'updateComp',
  // },
}
</script>

<style scoped>
@import '../../../assets/CSS/responsive_style.css';

.container {
  margin-bottom: 40px;
}

.introduction {
  background-color: #FFFFFF;
  border-radius: 12px;
  color: #555555;
  font-size: 15px;
  margin-bottom: 0px;
}

.introduction-content {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}

/* .input-height {
  height: 10px; 
} */

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

.myform .el-form__max-height {
  max-height: 25px;
}

.box-card {
  padding: 10px;
  border-bottom: 1px solid #efefef;
}

.box-card:hover{
  background: rgba(242,242,242,0.4);
}

.card-content {
  display: flex;
  align-items: center;
}

/*行高问题是因为图片的宽高不一样。一般图片设置宽or高的一个就行，但是el-image设置了fit后，同时设置宽和高，不会导致图片变形*/
.card-image {
  margin-left: 0;
  margin-right: 8px;
  padding: 0;
  width: 120px;
  height: 95px;
}

.card-info {
  flex: 1;
  font-size: 12px;
}

.comp-link {
  display: flex;
  flex: 1;
  text-decoration: none;
}

.comp-link.hovered {
  background-color: #efefef;
}

.mytag {
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

.m_invited {
  margin-left: 4px;
  color: #fb6770;
  border: 1px solid #fb6770;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: 12px;
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

/*修改按钮样式*/
.yellow-btn .el-button{
  padding: 7px 10px;
}

/*复写全局类*/
.title-box{
  margin-bottom: 10px;
}
</style>
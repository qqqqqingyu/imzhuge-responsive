<template>
  <div>
    <el-row class="mb-10 mt-20">
      <el-col :span="1" :offset="1">
        <router-link to="/personal_center">
          <img src="../../../assets/images/return.svg" alt="返回" height="18" style="float: left;padding: 1px;">
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-row class="mobile-title">
          {{ competition }}-参与活动
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :offset="1" :span="22" style="margin-bottom: 15px">
        <el-tabs class="my-tab" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="全部" name="all">
            <div class="mb-card" v-for="item in my_project_list" v-bind:key="item.title" >
              <el-row>
                <el-col :span="22" :offset="1">
                  <h4 style="margin-bottom: 2px">
                    {{ item.title }}
                  </h4>
                </el-col>
                <el-col :span="22" :offset="1" style="margin-top:8px;margin-bottom: 10px">
                  <span class="m-over_state" v-if="item.status">已结束</span>
                  <span class="m-ing_state" v-else>进行中</span>
                </el-col>

                <el-col :span="9" :offset="1" class="mb-2">
                  <span class="mobile-gray-text">比赛收益</span>
                </el-col>
                <el-col :span="13" :offset="1">
                  <span v-if="item.status" style="font-size: 13px">
                    {{ parseFloat(item.earnings).toFixed(2) }}诸葛贝
                  </span>
                  <span style="font-size: 13px" v-else>
                    活动进行中
                  </span>
                </el-col>

                <el-col :span="9" :offset="1" class="mb-2">
                  <span class="mobile-gray-text">比赛时间</span>
                </el-col>
                <el-col :span="13" :offset="1">
                  <span style="font-size: 13px">
                    2023.07.01
                  </span>
                </el-col>

                <el-col :span="9" :offset="1" class="mb-2">
                  <span class="mobile-gray-text">比赛奖金</span>
                </el-col>
                <el-col :span="13" :offset="1">
                  <span style="font-size: 13px">
                    100
                  </span>
                </el-col>

                <el-col class="mobile-yellow-btn center" style="margin-top: 5px;">
                  <router-link :to="{path:'/mobile_participate',query:{competition:item.title}}">
                    <el-button>查看详情</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="进行中" name="onGoing">
          </el-tab-pane>
          <el-tab-pane label="已结束" name="ended">
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "mobile_participate",
  data(){
    return{
      competition:this.$route.query.competition,
      activeName: 'all', //用于切换el-tabs
    }
  },
  computed: {
    my_project_list() {
      // let project = this.$store.getters.myActivity.my_project_list
      let project =
          [
            {
              "title": "比赛1",
              "status": false,
              "earnings": "活动尚未结束"
            },
            {
              "title": "比赛1",
              "status": true,
              "earnings": 0
            },
            {
              "title": "比赛1",
              "status": true,
              "earnings": 0
            },
            {
              "title": "比赛1",
              "status": true,
              "earnings": 0
            },
            {
              "title": "比赛1",
              "status": true,
              "earnings": 0
            }
          ]
      if (project) {
        return project.filter((item) => {
          if (this.activeName == 'onGoing' && item.status == false) {
            return item;
          } else if (this.activeName == 'ended' && item.status == true) {
            return item;
          } else if (this.activeName == 'all') {
            return item;
          }
          return false
        })
      } else {
        return this.$store.getters.myActivity.my_project_list
      }
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
</style>
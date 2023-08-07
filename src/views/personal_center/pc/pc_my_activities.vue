<template>
  <el-row>
    <el-col :offset="1" :span="20" class="center-vertically mb-2">
      <router-link to="/weekly_forecast" class="personal-title-a">行业列表</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <span class="personal-title">参与活动</span>
    </el-col>
    <el-col :offset="1" :span="23" style="margin-top: 15px;margin-bottom: 15px">
      <el-radio-group v-model="screen">
        <el-radio-button class="filter-radio" label=2>全部</el-radio-button>
        <el-radio-button class="filter-radio" label=0>进行中</el-radio-button>
        <el-radio-button class="filter-radio" label=1>已结束</el-radio-button>
      </el-radio-group>
    </el-col>
    <el-col :span="11" :offset="1" class="activity-box" v-for="item in my_project_list" :key="item">
      <el-row>
        <el-col :span="24">
          <h4 style="margin-bottom: 2px">
            {{ item.title }}
          </h4>
        </el-col>
        <el-col :span="24" style="margin-top:3px;margin-bottom: 10px">
          <span class="over_state" v-if="item.status">已结束</span>
          <span class="ing_state" v-else>进行中</span>
        </el-col>
        <el-col :span="12">
          <span style="font-size: 13px">活动收益</span>
        </el-col>
        <el-col :span="10" :offset="1">
          <span v-if="item.status" style="font-size: 13px">
            {{ numFilter(item.earnings, 2) }}
          </span>
          <span style="color:#AAAAAA;font-size: 13px" v-else>
            活动进行中
          </span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {getCSRFToken} from '@/api/token'

export default {
  name: "pc_my_activities",
  data() {
    return {
      screen: 2, //2表示全部
    }
  },
  computed: {
    my_project_list() {
      // let project = this.$store.getters.myActivity.my_project_list
      let project =
          [
            {
              "title": "金融行业20230805-20230811周度收益率排名预测",
              "status": false,
              "earnings": "活动尚未结束"
            },
            {
              "title": "金融行业20230729-20230804周度收益率排名预测",
              "status": true,
              "earnings": 0
            },
            {
              "title": "金融行业20230722-20230728周度收益率排名预测",
              "status": true,
              "earnings": 0
            },
            {
              "title": "金融行业20230714-20230721周度收益率排名预测",
              "status": true,
              "earnings": 0
            },
            {
              "title": "金融行业20230708-20230714周度收益率排名预测",
              "status": true,
              "earnings": 0
            }
          ]


      if (project) {
        return project.filter((item) => {
          if ((this.screen == 2 || this.screen == item.status)) {
            return item
          }
        })
      } else {
        return this.$store.getters.myActivity.my_project_list
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
    // 保留n位小数
    numFilter(value, n) {
      return parseFloat(value).toFixed(n)
    },
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
  border-radius: 25px;
  padding: 8px 15px;

}

/*单选框覆盖原有阴影*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}

.activity-box {
  border-radius: 18px;
  border: solid rgba(215, 215, 215, 1) 1px;
  padding: 15px 10px 15px;
  margin-bottom: 20px;
}

.over_state {
  border: 1.1px solid #7F7F7F;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: small;
  color: #7F7F7F;
}

.ing_state {
  border: 1.1px solid rgb(247, 197, 120);
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: small;
  color: #F0C27B;
}
</style>
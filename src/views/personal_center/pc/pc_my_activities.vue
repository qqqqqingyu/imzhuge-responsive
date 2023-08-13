<template>
  <el-row>
    <el-col :offset="1" :span="20" class="center-vertically mb-20">
      <router-link to="/pc_industry_list" class="personal-title-a">行业列表</router-link>
      <img src="@/assets/images/right.svg" alt="下级" height="25">
      <span class="personal-title">参与活动</span>
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

    <el-col :span="11" :offset="1" class="activity-box" v-for="item in project_list" :key="item">
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
        <el-col :span="11" :offset="1">
          <span v-if="item.status" style="font-size: 14px">
            {{ parseFloat(item.project_earning).toFixed(2) }}&nbsp;诸葛贝
          </span>
          <span style="font-size: 14px" v-else>
            活动进行中
          </span>
        </el-col>

        <el-col :span="8" class="mb-5">
          <span class="gray-text">正确结果</span>
        </el-col>
        <el-col :span="11" :offset="1">
          <span style="font-size: 14px">
            {{ item.true_contract }}
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
    project_list() {
      let project = this.$store.getters.myActivity.act_project_list
      // 从前页传来的值
      const selectedActName = '月度收益率预测-金融';
      const selectedAct = project.find(
          (act) => act.act_name === selectedActName
      );
      if (selectedAct) {
        return selectedAct.project_list.filter((item) => {
          if ((this.screen == 2 || this.screen == item.status)) {
            return item
          }
        });
      }else {

        return []
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

/*单选框覆盖原有阴影*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}


</style>
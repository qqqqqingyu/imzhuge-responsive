<template>
  <el-row>
    <el-col :offset="1" :span="20" class="mb-20">
      <h2 class="personal-title">行业列表</h2>
    </el-col>

    <el-col :offset="1" :span="23" class="industry-item" v-for="item in act_project_list" v-bind:key="item.act_name">
      <el-row>
        <el-col :offset="1" :span="8" class="center-vertically">
          <img :src="getImagePath(item.act_name)" height="19">
          <b>{{ item.act_name }}</b>
        </el-col>
        <el-col :span="5">
          <span>历史净收益</span>
        </el-col>
        <el-col :span="4">
          {{ parseFloat(item.act_money).toFixed(2) }}诸葛贝
        </el-col>
        <el-col :span="5" class="right yellow-btn">
          <router-link :to="{path:'/pc_my_activities',query:{industry:item.act_name}}">
            <el-button>查看详情</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {getCSRFToken} from '@/api/token'

export default {
  name: "industry_list",
  data() {
    return {
      industryMapping: {
        '金融': 'finance',
        '新能源': 'new-energy',
        '金融（不含银行）': 'finance2',
        '房地产': 'real-estate',
        '传媒': 'media',
        '消费': 'consumption',
        '计算机': 'computer',
        '无匹配':'none-industry'
      }
    }
  },
  computed: {
    act_project_list() {
      let project = this.$store.getters.myActivity.act_project_list
      return project
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
    // 根据行业调用相应图片
    getImagePath(industry) {

      // 遍历所有行业名称，查找末尾文字相符的行业名称
      let matchingIndustry = null;
      for (const key in this.industryMapping) {
        if (industry.endsWith(key)) {
          matchingIndustry = key;
          break;
        }
        else {
          matchingIndustry = '无匹配'
        }
      }

      const englishIndustryName = this.industryMapping[matchingIndustry];
      return require(`@/assets/images/${englishIndustryName}.png`);
    }
  }
}
</script>

<style scoped>
.industry-item {
  border: rgb(215, 215, 215) 1px solid;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 28px;
}

.industry-item img {
  margin-right: 30px;
}

.industry-item span:first-child {
  color: #7F7F7F;
}

</style>
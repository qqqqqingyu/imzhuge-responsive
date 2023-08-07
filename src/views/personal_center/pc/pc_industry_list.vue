<template>
  <el-row>
    <el-col :offset="1" :span="20" class="mb-2">
      <h2 class="personal-title">行业列表</h2>
    </el-col>

    <el-col :offset="1" :span="23" class="industry-item" v-for="item in industries">
      <el-row>
        <el-col :offset="1" :span="8" class="center-vertically">
          <img :src="getImagePath(item)" height="19">
          <b>{{ item }}</b>
        </el-col>
        <el-col :span="5">
          <span>历史净收益</span>
        </el-col>
        <el-col :span="4">
          20诸葛贝
        </el-col>
        <el-col :span="5" class="right yellow-btn">
          <router-link to="/pc_my_activities">
            <el-button>查看详情</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "industry_list",
  data(){
    return{
      industries:['金融', '新能源','金融（不含银行）','房地产','传媒','消费','计算机'],
      industryMapping: {
        '金融': 'finance',
        '新能源': 'new-energy',
        '金融（不含银行）': 'finance2',
        '房地产': 'real-estate',
        '传媒': 'media',
        '消费': 'consumption',
        '计算机': 'computer',
      }
    }
  },
  methods: {
    getImagePath(industry) {
      const englishIndustryName = this.industryMapping[industry];
      return require(`@/assets/images/${englishIndustryName}.png`);
    }
  }
}
</script>

<style scoped>
.industry-item{
  border: rgb(215, 215, 215) 1px solid;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 28px;
}

.industry-item img{
  margin-right: 30px;
}

.industry-item span:first-child{
  color: #7F7F7F;
}

.yellow-btn .el-button{
  color: #FFFFFF;
  background-color: #F7C578;
  border:none;
  min-height:10px;
  padding: 7px 20px;
}

.yellow-btn .el-button:hover{
  background-color: rgb(227,181,112);
  border:none;
}
</style>
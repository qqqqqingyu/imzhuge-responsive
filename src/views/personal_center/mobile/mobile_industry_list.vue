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
          行业个股收益率预测
        </el-row>
      </el-col>
    </el-row>

    <!--    面包屑导航栏开始-->
    <el-row>
      <el-col :span="22" :offset="1" class="m-breadcrumb center-vertically mb-10">
        您当前的位置：
        <span class="cur-de">行业列表</span>
      </el-col>
    </el-row>
    <!--    面包屑导航栏结束-->

    <el-row>
      <el-col :span="22" :offset="1" class="mb-10">
        <h3 style="font-size: 19px">行业列表</h3>
      </el-col>
      <el-col :offset="1" :span="22" class="industry-item" v-for="item in act_project_list" v-bind:key="item.act_name">
        <el-row>
          <el-col :offset="1" :span="7" class="center-vertically">
            <img :src="getImagePath(item.act_name)" height="19">
            <b>{{ item.act_name }}</b>
          </el-col>
          <el-col :span="10" class="center-vertically">
            <span style="margin-right: 5px">历史净收益</span>
            {{ parseFloat(item.act_money).toFixed(2) }}诸葛贝
          </el-col>
          <el-col :span="6" class="center-vertically">
            <router-link :to="{path:'/mobile_my_activities',query:{industry:item.act_name}}" class="yellow-link center-vertically">
              <span class="my-icon" style="font-size: 14px;color: #EF9C19">查看详情</span>
              <img src="@/assets/images/enter.svg" height="11" alt="进入">
            </router-link>
          </el-col>
        </el-row>
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
  name: "mobile_industry_list",
  components:{bottomNav},
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
      return this.$store.getters.myActivity.act_project_list
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
.industry-item {
  background: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 13px;
  line-height: 28px;
}

.industry-item img {
  margin-right: 7px;
}

.industry-item span:first-child {
  color: #7F7F7F;
}
</style>
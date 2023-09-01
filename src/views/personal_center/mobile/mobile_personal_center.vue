<template>
  <div class="container">
    <el-row class="mobile-title" style="margin-top: 20px" >
      <span>个人中心</span>
    </el-row>
    <!--        个人信息-->
    <el-row>
      <el-col :offset="1" :span="22">
        <div class="user_info_box">
          <el-row class="user_info">
            <el-col :offset="1" :span="23">
              <el-row>
                <span style="font-size:17px;font-weight: bolder;color: #2e2e2e">{{ userName }}</span>
              </el-row>
              <el-row style="margin-top: 5px">
                <router-link to="/personal_info">
                  <span style="color: #7F7F7F;">查看并编辑个人资料</span>
                </router-link>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-col :span="5">
                  <span>个人财富 </span>
                </el-col>
                <el-col :span="9">
                  <span
                      style="color: #EF9C19;font-weight: bold;font-size: medium;margin-left: 5px">{{ numFilter(myActivity.coin, 2) }}</span>
                  <span> 诸葛贝</span>
                </el-col>
                <el-col :span="9">
                  <span style="margin-left: 5px">交易次数 </span>
                  <span style="color: #2e2e2e;font-weight: bold;font-size: medium ">{{ myActivity.trade_times }}</span>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-button class="withdraw" size="small" v-on:click="toWithdraw">
                  <span style="color: #FFFFFF;font-size: 14px">提现</span>
                </el-button>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--    我参与的-->
    <el-row>
      <el-col :offset="2" :span="20" style="margin-top: 20px;margin-bottom: 15px">
        <span style="font-size:19px;font-weight: bolder;color: #2e2e2e">我参与的</span>
      </el-col>

      <el-col :offset="1" :span="22" class="mb-card participation">
        <el-row>
          <el-col :offset="1" :span="2">
            <img src="@/assets/images/my_competition.svg" height="22" style="margin-top: 2px" alt="比赛"/>
          </el-col>
          <el-col :offset="1" :span="13">
            比赛
          </el-col>
          <el-col :span="6" class="right">
            <router-link to="/mobile_competition" class="center-vertically">
              查看详情
              <img src="@/assets/images/enter.svg" height="13" alt="进入">
            </router-link>
          </el-col>
        </el-row>
      </el-col>

      <el-col :offset="1" :span="22" class="mb-card participation">
        <el-row>
          <el-col :offset="1" :span="2">
            <img src="@/assets/images/my_stock.svg" height="26" style="margin-top: 3px" alt="比赛"/>
          </el-col>
          <el-col :offset="1" :span="13">
            行业个股收益率
          </el-col>
          <el-col :span="6" class="right">
            <router-link to="/mobile_industry_list" class="center-vertically">
              查看详情
              <img src="@/assets/images/enter.svg" height="13" alt="进入">
            </router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
  <bottom-nav :current-page="'personal'"></bottom-nav>
</template>

<script>
import config from '@/config'
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_personal_center",
  components: {bottomNav},
  computed: {
    userName() {
      return this.$store.getters.myInfoDetails.username
    },
    myActivity() {
      return this.$store.getters.myActivity
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
    //去提现
    toWithdraw() {
      window.location.href = config.serverUrl + '/selfcenter/tocash/'
    }
  },
  // 设置背景
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#f5f8fa')
    })
  },
  //实例销毁之前钩子，移除body标签的属性style
  beforeUnmount() {
    document.body.removeAttribute('style')
  },
}
</script>

<style scoped>
.container {
  padding-bottom: 80px;
}

.user_info_box {
  background-color: #ffffff;
  border-radius: 18px;
  margin-top: 20px;
}

.user_info {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 15px;
}

.withdraw {
  background-color: #F7C578;
  padding-left: 20px;
  padding-right: 20px;
  border-color: #F7C578;
  border-radius: 15px;
}

.my_join_act {
  margin-top: 5px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.98);
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
  border: 1.1px solid #F0C27B;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: small;
  color: #F0C27B;
}

.act_info {
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  /*padding: 10px;*/
  font-size: small;
}

.participation{
  line-height: 30px;
}

.participation a{
  color: #EF9C19;
}

.participation img:last-child{
  margin-left: 5px;
}

a {
  text-decoration: none;
}


</style>
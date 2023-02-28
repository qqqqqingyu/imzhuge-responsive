<template>
  <div class="container">
    <el-row style="justify-content: center;font-size:16px;font-weight: bolder;color: #2e2e2e">
      <span>个人中心</span>
    </el-row>
<!--        个人信息-->
    <el-row>
      <el-col :offset="1" :span="22">
        <div class="user_info_box">
          <el-row class="user_info">
            <el-col :offset="1" :span="23">
<!--              验证是否一个页面只能有一个-->
<!--              <el-row>-->
<!--                <span style="font-size:17px;font-weight: bolder;color: #2e2e2e">{{userName}}</span>-->
<!--              </el-row>-->
              <el-row style="margin-top: 5px">
                <router-link to="/personal_info">
                  <span style="color: #7F7F7F;">查看并编辑个人资料</span>
                </router-link>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-col :span="5">
                  <span>个人财富 </span>
                </el-col>
                <el-col  :span="9">
                  <span style="color: #ff697b;font-weight: bold;font-size: medium ">{{numFilter(myActivity.coin,2)}}</span>
                  <span> 诸葛贝</span>
                </el-col>
                <el-col :offset="1" :span="9">
                  <span>交易次数 </span>
                  <span style="color: #2e2e2e;font-weight: bold;font-size: medium ">{{myActivity.trade_times}}</span>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-button  class="withdraw" size="small" v-on:click="toWithdraw">
                  <span style="color: #FFFFFF;font-size: 12px">提现</span>
                </el-button>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <!--    我参与的活动-->
    <el-row style="margin-top: 20px">
      <el-col :offset="2" :span="22">
        <span style="font-size:19px;font-weight: bolder;color: #2e2e2e">我参与的活动</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="1" :span="22">
        <div class="my_join_act" v-for="item in myActivity.project_list"
             :key="item">
          <div class="act_title">
            <el-row>
              <el-col :offset="1" :span="18">
                <span>{{item.title}}</span>
              </el-col>
              <el-col  :span="5">
                <span class="over_state" v-if="item.status">已结束</span>
                <span class="ing_state" v-else>进行中</span>
              </el-col>
            </el-row>
          </div>
          <div class="act_info">
            <el-row>
              <el-col :offset="1" :span="23">
                <el-row>
                  <el-col :span="5">
                    <span>活动名称</span>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <span>{{item.title}}</span>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 8px">
                  <el-col :span="5">
                    <span>活动状态</span>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <span class="over_state" v-if="item.status">已结束</span>
                    <span class="ing_state" v-else>进行中</span>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 8px">
                  <el-col :span="5">
                    <span>活动收益</span>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <span v-if="item.status">{{numFilter(item.earnings,2)}}</span>
                    <span style="color:#7F7F7F;" v-else>活动进行中</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>
  <bottom-nav></bottom-nav>
</template>

<script>
import config from '@/config'
import bottomNav from "../../../components/bottomNav";
export default {
  name: "mobile_personal_center",
  components:{bottomNav},
  computed:{
    // userName(){
    //   console.log("userName",this.$store.getters.myInfoDetails.username)
    //   return this.$store.getters.myInfoDetails.username
    //
    // },
    myActivity(){
      console.log("myActivity",this.$store.getters.myActivity)
      return this.$store.getters.myActivity
    }
  },

  methods:{
    // 保留n位小数
    numFilter(value, n) {
      return parseFloat(value).toFixed(n)
    },
    //去提现
    toWithdraw(){
      window.location.href = config.serverUrl+'/selfcenter/tocash/'
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
.container{
  margin-top: 20px;
}
.user_info_box{
  background-color: #ffffff;
  border-radius: 18px;
  margin-top: 20px;
}
.user_info{
  padding-top: 10px;
  padding-bottom: 10px;
  font-size:15px;
}
.withdraw{
  background-color:#FF7168;
  padding-left: 25px;
  padding-right: 25px;
  border-color: #FF7168;
  border-radius: 15px;
}
.my_join_act{
  margin-top: 5px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.98);

}
.act_title{
  background-color: #ffffff;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.over_state{
  border: 1.1px solid #7F7F7F;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: small;
  color:#7F7F7F;
}
.ing_state{
  border: 1.1px solid #f57171;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: small;
  color: #f56c6c;
}
.act_info{
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  /*padding: 10px;*/
  font-size: small;
}
a {
  text-decoration: none;
}


</style>
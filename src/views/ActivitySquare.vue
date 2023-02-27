<template>
<!--  筛选功能未做-->
  <div class="container">

    <el-row>
      <el-col :xs="24" :md="24" :lg="12">

        <el-row class="el-select">
          <el-col :span="6">
            <span class="li">市场类型</span><br>
            <el-select v-model="valueMarketType" clearable placeholder="请选择" size="small">
              <el-option
                  v-for="item in marketType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="6">
            <span class="li">活动类型</span><br>
            <el-select v-model="valueActivityType" clearable placeholder="请选择" size="small">
              <el-option
                  v-for="item1 in activityType"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span class="li">状态</span><br>
            <el-select v-model="valueStatus" clearable placeholder="请选择" size="small">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span class="li">我的活动</span><br>
            <el-select v-model="valueActivity" clearable placeholder="请选择" size="small">
              <el-option
                  v-for="item in myActivity"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-col :span="24" align="center">
          <el-row class="market-info" >
            <el-col :span="24" class="market-title stty_il" align="center">
              <img src="../assets/images/homepage_cda.svg" class="icon-cda">
              双向拍卖市场
            </el-col>
            <el-col :span="22" :offset="1" class="market-introduction">&emsp;&emsp;双向拍卖指只要一方中有人接受另一方的叫价，两者便可以达成交易，每一次交易一个商品。然后再开始新一轮的叫价，可以有多个交易期，交易价格总是介于初始出价和初始要价之间。在整个交易过程中，价格信息是公开的。</el-col>
            <el-col :span="22" :offset="1">
              <router-link exact to="/CDADetails" class="details">
                &emsp;&emsp;查看完整介绍 >>
              </router-link>
            </el-col>
          </el-row>
        </el-col>

      </el-col>
    </el-row>
    <el-row>

      <el-col :xs="24" :md="24" :lg="12">
        <div v-for="item in this.tableData" :key='item'>
          <el-card class="box-card">
              <div class="stty_il">
                <a class="a-title" @click="participateActivityMethod(item.id,item.title)">{{item.title}}</a>
              </div>
            <el-row class="card-tag" >
              <el-tag type="primary" class="card-tag-margin">双向拍卖</el-tag>
              <el-tag type="warning" class="card-tag-margin">财经</el-tag>
              <el-tag type="warning" class="card-tag-margin">北向资金</el-tag>
              <el-tag type="warning" class="card-tag-margin">进行中</el-tag>
            </el-row>
            <el-row class="stty_i2">
              <el-col :xs="4" :md="2" >活动时间:</el-col>
              <el-col :span="19" :offset="1" align="left" >{{formatTimer(item.pro_start_time)}}-{{formatTimer(item.pro_end_time)}}</el-col>
            </el-row>
            <el-row class="card-huodong">
              <el-col :xs="8" :md="5" :lg="5" align="left">
                <el-tooltip popper-class="test line-feed" class="item" effect="light" :content="tips" placement="right">
                  <img src="../assets/images/question_yellow.svg" class="question-icon">
                </el-tooltip>
                活动奖金：
              </el-col>
              <el-col :span="14" :offset="1" align="left">
                <i class="el-icon-coin" type="success"></i> {{item.award}}
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="8" :md="5" :lg="5" align="left">
<!--              不可见的小问号，目的是和上面对齐-->
              <el-tooltip style="visibility: hidden">
                <img src="../assets/images/question_yellow.svg" class="question-icon">
              </el-tooltip>
              活动描述：
              </el-col>
              <el-col :span="14" :offset="1" align="left">
                {{item.desc}}
              </el-col>
            </el-row>
            <el-row class="card-button" gutter="3">
                <el-button type="warning" round @click="participateActivityMethod(item.id,item.title)">参与活动</el-button>
            </el-row>
            <div class="card-bottom"> 47人关注
            </div>
          </el-card>
        </div>
      </el-col>

    </el-row>
  </div>
  <FloatBall :text="'跳转LMSR'"></FloatBall>
</template>
<script>
// @ is an alias to /src
// import Header from '@/components/Header.vue'
import {
  getCdaActivitySquare,
  participateActivity
} from '@/api/auction'
// import baseUrl from '../router/api_url.js';
import {mapMutations} from 'vuex';
import FloatBall from '@/components/FloatBall';

export default {
  name: 'Login',
  components:{
    FloatBall
  },
  data() {
    return {
      login: true,
      email: "",
      password: "",
      tableData:'',
      alert_message: '',
      marketType: [{
        value: '全部',
        label: '全部'
      },{
        value: 'LMSR',
        label: 'LMSR'
      }, {
        value: '双向拍卖',
        label: '双向拍卖'
      }],
      activityType:[{
        value: '全部',
        label: '全部'
      }, {
        value: '推荐',
        label: '推荐'
      }, {
        value: '社会',
        label: '社会'
      }, {
        value: '财经',
        label: '财经'
      }, {
        value: '科技',
        label: '科技'
      }, {
        value: '娱乐',
        label: '娱乐'
      }, {
        value: '体育',
        label: '体育'
      }, {
        value: '汽车',
        label: '汽车'
      }, {
        value: '房产',
        label: '房产'
      }, {
        value: '教育',
        label: '教育'
      }],
      status: [{
        value: '全部',
        label: '全部'
      },{
        value: '预热中',
        label: '预热中'
      },{
        value: '进行中',
        label: '进行中'
      },{
        value: '已结束',
        label: '已结束'
      },{
        value: '结果待揭晓',
        label: '结果待揭晓'
      },{
        value: '已结算',
        label: '已结算'
      }
      ],
      myActivity:[{
        value: '全部',
        label: '全部'
      },{
        value: '关注过',
        label: '关注过'
      },{
        value: '预测过',
        label: '预测过'
      },{
        value: '已报名',
        label: '已报名'
      }],
      valueMarketType:'全部',
      valueActivityType:'全部',
      valueStatus:'全部',
      valueActivity:'全部',
      tips:'参与活动主要目的是学习与自我成长，设置少量现金奖励是为了带来更多的乐趣。' +
          '平台根据活动结束后用户在该活动中拥有财富的比例分配奖金。'
    }
  },
  mounted() {
    this.initial();

  },
  methods: {
    ...mapMutations(['setToken']),
    setErrors(e) {
      window.alert(e)
    },
    //根据开始时间排序，倒序，这里是获取时间的时间戳然后比较
    sortData(a, b){
      return new Date(b.pro_start_time).getTime() - new Date(a.pro_start_time).getTime()
    },
    initial() {
      getCdaActivitySquare().then(response => {
        this.tableData = response.data
        // 排序
        this.tableData = this.tableData.sort(this.sortData)
      })
    },
    //时间格式转换
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      return y + "/" + MM + "/" + d + " " + h + ":" + m;
    },
    participateActivityMethod(id,title) {
      participateActivity(id)
      // 跳转去交易页面
      this.$router.push({
        path:'/Trade',
        query:{
          activityId:id,
          activityTitle:title
        },
      })
    }
  }
}
</script>

<style>
.container {
  height:100%;
  text-align: center;
}
.li{
  font-size:13px;
  font-weight:700;

}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 100%;
  text-align: left;
  margin: 2px;
  background-color: white !important;
}

.stty_il {
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 15px;
  /*justify-content: center;*/
  /*position: absolute;*/
}
.stty_i2{
  text-align:left;
  font-size: 12px;
  color:#909399;
  margin-top:10px;
  margin-bottom:10px;

}
.card-huodong{
  justify-content:start;
}

.card-button{
  margin-top:20px;
  margin-bottom:20px;
  display: flex;
  justify-content: center;
}
.card-bottom{
  font-size:10px;
  color:#909399;
  text-align:right;
}

.box-card {
  width: 100%;
  text-align: center;
  margin: 2px;
}
.card-tag-margin{
  margin-right: 5px
}
.test{
  background: rgba(255,255,255,0.9) !important;
  color: 	#708090;
}
.line-feed{
  max-width: 200px;
}
.market-title{
  font-size: 20px;
  text-align: center;
}
.market-introduction{
  text-align: center;
  width: 90%;
  line-height: 1.5;
  margin-bottom: 5px;
}
.market-info{
  border: #DCDCDC 1px solid;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 99%;
}
.icon-cda{
  height: 26px;
  padding-bottom: 2px;
  vertical-align:middle;
}
a.details{
  text-decoration: none;
  color: #E6A23C;
  font-weight: 600;
  font-size: 17px;
}
a.details:active{
  text-decoration: none;
  color: #CD5555;
}
.question-icon{
  height: 15px;
  margin-bottom: 2px;
  vertical-align:middle;
}
.a-title:active{
  color: #CD5555;
}
</style>

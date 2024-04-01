<template>
  <div class="container">
    <el-row class="title-box">
      <el-col :span="1" :offset="1">
        <router-link to="/personal_center">
          <img src="../../../assets/images/return.svg" alt="返回" class="return-img">
        </router-link>
      </el-col>
      <el-col :span="20" class="mobile-title">
        <span>个人信息</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" class="mb-card">
        <el-row class="gray info-box">
          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                用户名：
              </el-col>
              <el-col :span="16" class="user-info" v-if="modifiedStatus == 0
              && Object.keys(myInfoDetails).length !== 0">
                {{myInfoDetails.username}}
              </el-col>
              <el-col :span="15" :offset="1" class="user-info" v-if="modifiedStatus == 1">
                <el-input :size="inputSize" placeholder="请输入" style="width: 100%"
                    v-model="changeData.username" clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                手机号码：
              </el-col>
              <el-col :span="16" class="user-info" v-if="modifiedStatus == 0
              && Object.keys(myInfoDetails).length !== 0">
                {{myInfoDetails.phone_number}}
              </el-col>
              <el-col :span="15" :offset="1" class="user-info" v-if="modifiedStatus == 1">
                <el-input :size="inputSize" placeholder="请输入" style="width: 100%"
                          v-model="changeData.phone_number"  clearable
                          oninput ="value=value.replace(/[^0-9.]/g,'')" >
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                电子邮箱：
              </el-col>
              <el-col :span="16" class="user-info" v-if="modifiedStatus == 0
              && Object.keys(myInfoDetails).length !== 0">
                {{myInfoDetails.email}}
              </el-col>
              <el-col :span="15" :offset="1"  class="user-info" v-if="modifiedStatus == 1">
                <el-input :size="inputSize" placeholder="请输入" style="width: 100%"
                          v-model="changeData.email" clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                我的邀请码：
              </el-col>
              <el-col :span="16" class="user-info" v-if="modifiedStatus == 0
              && Object.keys(myInfoDetails).length !== 0">
                {{myInfoDetails.invite_code}}
              </el-col>
              <el-col :span="15" :offset="1" class="user-info" v-if="modifiedStatus == 1">
                <el-input :size="inputSize" placeholder="请输入" style="width: 100%"
                          v-model="changeData.invite_code" clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="20" :offset="2" v-if="modifiedStatus == 0" class="btn-box">
        <el-button type="danger" class="my-btn" v-on:click="editInfo">修改</el-button>
      </el-col>
      <el-col :span="20" :offset="2" v-if="modifiedStatus == 1" class="btn-box">
        <el-button type="info" v-on:click="returnInfo">取消</el-button>
        <el-button type="danger" class="my-btn" v-on:click="editMyInfoMethod">提交</el-button>
      </el-col>
    </el-row>
  </div>
  <bottom-nav :current-page="'personal'"></bottom-nav>
</template>

<script>
import {editMyInfo} from "../../../api/my_activity";
import bottomNav from "../../../components/bottomNav";
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_personal_info",
  components:{bottomNav},
  computed:{
    myInfoDetails(){
      return this.$store.getters.myInfoDetails
    },
  },
  data(){
    return{
      modifiedStatus:0,
      changeData:{
        username:'',
        phone_number:'',
        email:'',
        invite_code:''
      },
      inputSize:'small'
    }
  },
  mounted() {
    this.getCSRFTokenMethod()
  },
  methods:{
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    editInfo(){
      this.modifiedStatus = 1;
      this.changeData.username = this.myInfoDetails.username;
      this.changeData.phone_number = this.myInfoDetails.phone_number;
      this.changeData.email = this.myInfoDetails.email;
      this.changeData.invite_code = this.myInfoDetails.invite_code;
    },
    returnInfo(){
      this.modifiedStatus = 0;
    },
    // 提交数据
    editMyInfoMethod(){
      this.modifiedStatus = 0;

      let info = {};
      info.username = this.changeData.username
      info.phone_number = this.changeData.phone_number
      info.email = this.changeData.email
      info.invite_code = this.changeData.invite_code

      if(info.username === this.myInfoDetails.username &&
        info.phone_number === this.myInfoDetails.phone_number &&
        info.email === this.myInfoDetails.email &&
        info.invite_code === this.myInfoDetails.invite_code){
        this.$alert('请修改后提交', '提交失败', {
          confirmButtonText: '确定',
          customClass: 'AlertBox',
        });
        this.modifiedStatus = 1;
      }
      // else if(typeof info.username === 'undefined'){
      //   console.log('info.username'+info.username)
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入用户名'
      //   });
      //   this.modifiedStatus = 1;
      // } else if(typeof info.phone_number === 'undefined'){
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入手机号码'
      //   });
      //   this.modifiedStatus = 1;
      // } else if(typeof info.email === 'undefined'){
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入电子邮箱'
      //   });
      //   this.modifiedStatus = 1;
      // } else if(typeof info.invite_code === 'undefined'){
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入邀请码'
      //   });
      //   this.modifiedStatus = 1;
      // }
      else {
        editMyInfo(info).then(() => {
          this.$alert('恭喜您，修改成功！', '修改成功', {
            confirmButtonText: '确定',
            customClass: 'AlertBox',
            callback: action => {
              if (action === 'confirm') {
                // 在点击确认按钮后刷新页面
                location.reload();
              }
            }
          });
        }).catch(() => {
          this.$alert('修改失败，请重试！', '修改失败', {
            confirmButtonText: '确定',
            customClass: 'AlertBox',
            callback: action => {
              if (action === 'confirm') {
                // 在点击确认按钮后刷新页面
                location.reload();
              }
            }
          });
          console.log('提交失败')
        })
      }
    },
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
.user-info{
  text-align: right;
}

.gray{
  color: rgb(150,153,162);
}

.info-box{
  line-height: 30px;
}

.info-box .el-col{
  border-bottom: 1px #F5F5F5 solid;
  line-height: 40px;
}

.my-btn {
  margin-top: 2%;
  background: #F0C27B;
}

.btn-box{
  text-align: center;
}
</style>

<style>
@import '../../../assets/CSS/MessageBox.css';
</style>
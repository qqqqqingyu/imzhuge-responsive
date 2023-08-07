<template>
  <el-row>
    <el-col :offset="1" :span="20">
      <h2 class="personal-title">个人信息</h2>
    </el-col>

    <el-col :span="24">
      <el-row class="gray info-box">
        <el-col :span="22" :offset="1">
          <el-row>
            <el-col :span="8" class="form-item">
              用户名：
            </el-col>
            <el-col :span="16" class="user-info" v-if="modifiedStatus == 0
              && Object.keys(myInfoDetails).length !== 0">
              {{ myInfoDetails.username }}
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
            <el-col :span="8" class="form-item">
              手机号码：
            </el-col>
            <el-col :span="16" class="user-info" v-if="modifiedStatus == 0
              && Object.keys(myInfoDetails).length !== 0">
              {{ myInfoDetails.phone_number }}
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
            <el-col :span="8" class="form-item">
              电子邮箱：
            </el-col>
            <el-col :span="16" class="user-info" v-if="modifiedStatus == 0
              && Object.keys(myInfoDetails).length !== 0">
              {{ myInfoDetails.email }}
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
            <el-col :span="8" class="form-item">
              我的邀请码：
            </el-col>
            <el-col :span="16" class="user-info" v-if="modifiedStatus == 0
              && Object.keys(myInfoDetails).length !== 0">
              {{ myInfoDetails.invite_code }}
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
      <el-button type="warning" v-on:click="editInfo">修改</el-button>
    </el-col>
    <el-col :span="20" :offset="2" v-if="modifiedStatus == 1" class="btn-box">
      <el-button type="info" v-on:click="returnInfo">取消</el-button>
      <el-button type="warning" v-on:click="editMyInfoMethod">提交</el-button>
    </el-col>
  </el-row>
</template>

<script>
import {getCSRFToken} from '@/api/token'
import {editMyInfo} from "../../../api/my_activity";

export default {
  name: "pc_personal_info",
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
  computed: {
    myInfoDetails() {
      return this.$store.getters.myInfoDetails
    },
  },
  mounted() {
    this.getCSRFTokenMethod()
  },
  methods: {
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
        this.$message({
          type: 'warning',
          message: '请修改后提交'
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
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          //刷新
          location.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '修改失败，请重试'
          });
        })
      }
    },
  }
}
</script>

<style scoped>
.user-info {
  text-align: right;
  padding-right: 1%;
}

.gray {
  font-size: 18px;
  color: rgb(150, 153, 162);
}

.info-box {
  line-height: 30px;
  margin: 15px 0 20px;
}

.info-box .el-col {
  border-bottom: 0.5px #F5F5F5 solid;
  padding-top: 10px;
  line-height: 40px;

}

.form-item {
  color: #555555;
  padding-left: 1%;
}

.btn-box{
  text-align: center;
}
</style>
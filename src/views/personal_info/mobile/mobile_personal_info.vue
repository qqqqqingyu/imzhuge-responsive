<template>
  <div class="container">
    <el-row class="title-box">
      <el-col :span="1" :offset="1">
        <router-link to="/personal_center">
          <img src="../../../assets/images/return.svg" alt="返回" class="return-img">
        </router-link>
      </el-col>
      <el-col :span="20" class="title">
        <span>个人信息</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" class="my-box">
        <el-row class="gray info-box">
          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                用户名：
              </el-col>
              <el-col :span="16" class="user-info" v-if="modifiedStatus == 0">
                {{myInfoDetails.username}}
              </el-col>
              <el-col :span="11" :offset="5" class="user-info" v-if="modifiedStatus == 1">
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
              <el-col :span="16" class="user-info" v-if="modifiedStatus == 0">
                {{myInfoDetails.phone_number}}
              </el-col>
              <el-col :span="11" :offset="5" class="user-info" v-if="modifiedStatus == 1">
                <el-input :size="inputSize" placeholder="请输入" style="width: 100%"
                          v-model="changeData.phone_number" clearable>
                </el-input>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                电子邮箱：
              </el-col>
              <el-col :span="16" class="user-info" v-if="modifiedStatus == 0">
                {{myInfoDetails.email}}
              </el-col>
              <el-col :span="11" :offset="5" class="user-info" v-if="modifiedStatus == 1">
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
              <el-col :span="16" class="user-info" v-if="modifiedStatus == 0">
                {{myInfoDetails.invite_code}}
              </el-col>
              <el-col :span="11" :offset="5" class="user-info" v-if="modifiedStatus == 1">
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
</template>

<script>
import {editMyInfo} from "../../../api/my_activity";

export default {
  name: "mobile_personal_info",
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
  methods:{
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
      } else if(isNaN(info.username)){
        this.$message({
          type: 'warning',
          message: '用户名不得为空'
        });
        this.modifiedStatus = 1;
      } else if(isNaN(info.phone_number)){
        this.$message({
          type: 'warning',
          message: '手机号码不得为空'
        });
        this.modifiedStatus = 1;
      } else if(isNaN(info.email)){
        this.$message({
          type: 'warning',
          message: '电子邮箱不得为空'
        });
        this.modifiedStatus = 1;
      } else if(isNaN(info.invite_code)){
        this.$message({
          type: 'warning',
          message: '邀请码不得为空'
        });
        this.modifiedStatus = 1;
      } else {
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
  background: #FF8F86;
}

.btn-box{
  text-align: center;
}
</style>
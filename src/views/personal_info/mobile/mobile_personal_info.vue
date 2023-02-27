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
              <el-col :span="16" class="user-info">
                {{myInfoDetails.username}}
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                手机号码：
              </el-col>
              <el-col :span="16" class="user-info">
                {{myInfoDetails.phone_number}}
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                电子邮箱：
              </el-col>
              <el-col :span="16" class="user-info">
                {{myInfoDetails.email}}
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="22" :offset="1">
            <el-row>
              <el-col :span="8">
                我的邀请码：
              </el-col>
              <el-col :span="16" class="user-info">
                {{myInfoDetails.invite_code}}
              </el-col>
            </el-row>
          </el-col>

        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: "mobile_personal_info",
  computed:{
    myInfoDetails(){
      return this.$store.getters.myInfoDetails
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
  border-bottom: 1px #F5F5F5 solid
}
</style>
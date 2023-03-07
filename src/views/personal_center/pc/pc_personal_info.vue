<template>
  <el-row>
    <el-col :offset="1" :span="20">
      <h2 class="right-title">个人信息</h2>
    </el-col>

    <el-col :span="24" class="my-box">
      <el-row class="gray info-box">
        <el-col :span="22" :offset="1">
          <el-row>
            <el-col :span="8" class="form-item">
              用户名：
            </el-col>
            <el-col :span="16" class="user-info">
              {{ myInfoDetails.username }}
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="22" :offset="1">
          <el-row>
            <el-col :span="8" class="form-item">
              手机号码：
            </el-col>
            <el-col :span="16" class="user-info">
              {{ myInfoDetails.phone_number }}
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="22" :offset="1">
          <el-row>
            <el-col :span="8" class="form-item">
              电子邮箱：
            </el-col>
            <el-col :span="16" class="user-info">
              {{ myInfoDetails.email }}
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="22" :offset="1">
          <el-row>
            <el-col :span="8" class="form-item">
              我的邀请码：
            </el-col>
            <el-col :span="16" class="user-info">
              {{ myInfoDetails.invite_code }}
            </el-col>
          </el-row>
        </el-col>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {getCSRFToken} from '@/api/token'

export default {
  name: "pc_personal_info",
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
    }
  }
}
</script>

<style scoped>
.right-title {
  font-size: 22px;
  font-weight: 700;
}

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
}

.info-box .el-col {
  border-bottom: 0.5px #F5F5F5 solid;
  padding-top: 10px;

}

.form-item {
  color: #555555;
  padding-left: 1%;
}
</style>
<template>
  <div class="save">
    <el-button type="primary" @click="save()">暂时保存</el-button>
    <el-button type="info" @click="saveAndQuit()">全部提交</el-button>
  </div>
</template>

<script>
export default {
  name: "SaveAndSubmit",
  methods: {
    save() {
      this.$parent.submitClassify();
    },
    saveAndQuit() {
      this.$parent.submitClassify();

      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>
.save {
  margin-top: 30px;
  text-align: center;
}
</style>
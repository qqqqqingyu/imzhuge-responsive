<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="" style="width: 60px;margin-right:0px!important">
      <el-input v-model="formInline.toMarkIndex" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">跳转</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "JumpTo",
  props:["marked_count"],
  data() {
    return {
      formInline: {
        toMarkIndex: ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.formInline.toMarkIndex <= this.marked_count && this.formInline.toMarkIndex > 0) {
        this.$emit('jumpToMarkedIndex', this.formInline.toMarkIndex);
      } else {
        alert("跳转页数错误")
      }
    }
  }
}
</script>

<style>

</style>

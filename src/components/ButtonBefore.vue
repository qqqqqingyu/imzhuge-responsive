<template>
  <el-button type="primary" @click="pre()">上一页</el-button>
</template>

<script>
export default {
  name: "ButtonBefore",
  props: ["marked_index"],
  methods: {
    pre() {
      if (this.marked_index > 1) {
        let preMarkedIndex = this.marked_index - 1
        this.$emit('preMarkedIndex', preMarkedIndex);
      } else {
        console.log("no page")
      }
    }
  }
}
</script>

<style scoped>

</style>
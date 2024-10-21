<template>
  <el-button  type="primary" @click="next()">下一页</el-button>
</template>

<script>
export default {
  name: "ButtonNext",
  props:["marked_index"],
  methods: {
    next() {
      let nextMarkedIndex = this.marked_index + 1
      this.$emit('nextMarkedIndex', nextMarkedIndex);
    }
  }
}
</script>

<style scoped>

</style>
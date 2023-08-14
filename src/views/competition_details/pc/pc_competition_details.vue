<template>
  <el-row>
  </el-row>
</template>

<script>
export default {
  name: "pc_competition_details",
  computed: {
    competition_event() {
      return this.$store.getters.event
    }
  },
}
</script>

<style scoped>

</style>
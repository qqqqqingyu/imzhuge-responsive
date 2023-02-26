<template>
  <div class="container">
<!--    pc端的个人信息和我的活动都在personal_center中，故跳转到personal_center组件中-->
  </div>
</template>

<script>

export default {
  name: "pc_personal_info",
  mounted() {
    this.$router.push({
      path: '/personal_center'
    })
  }
}
</script>

<style scoped>

</style>
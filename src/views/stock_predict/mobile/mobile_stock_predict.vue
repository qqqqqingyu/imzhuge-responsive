<template>


</template>

<script>
import {getCSRFToken} from '@/api/token'

export default {
  name: "mobile_stock_predict",
  mounted() {
    this.getCSRFTokenMethod();
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
  }
}
</script>

<style scoped>

</style>
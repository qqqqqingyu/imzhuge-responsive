<template>
    <div>我是消息订阅模块</div>
  </template>
  
  <script>
  import {getCSRFToken} from '@/api/token'
  
  export default {
    name: "mobile_competition_subscribe",
    mounted() {
      this.getCSRFTokenMethod()
        //console.log('my_event', this.my_event)
    },
    methods: {
      // 获取csrftoken 确保受保护接口不会响应403
      getCSRFTokenMethod() {
        getCSRFToken();
      },
      // 保留n位小数或显示文字
      changeCash(value) {
        // 检查是否可以转换为数字
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          // 转换为数值并保留两位小数
          return numericValue.toFixed(2)+" RMB";
        }
        // 返回原始文本
        return value;
      },

    }
  }
  </script>
  
  <style scoped>
  
  
  </style>
  
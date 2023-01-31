<template>
  <ul>
    <li
        v-for="item in categorys"
        :key="item"
    >
      {{ item }}
    </li>
  </ul>
  <h2>这里是手机端</h2>

</template>

<script>
import { useStore } from 'vuex'

export default {
  name: "mobileNavigation",

  computed:{
    categorys(){
      const store = useStore()
      // 触发 category 数据获取动作
      store.dispatch('category/useCategoryData')
      return this.$store.getters.categorys;
    }
  },

  methods:{
    getdata(){
    }
  },
  mounted() {

  }

}



</script>

<style scoped>

</style>
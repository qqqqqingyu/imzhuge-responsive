<template>
  <div>
    <ul>
      <li
          v-for="item in categorys"
          :key="item"
      >
        {{ item }}
      </li>
    </ul>

    <h2>.......pc</h2>

  </div>



</template>

<script>
import {useStore} from "vuex";

export default {
  name: "pcNavigation",
  data(){
    return{


    }

  },
  computed:{
    categorys(){
      const store = useStore()
      // 触发 category 数据获取动作
      store.dispatch('category/useCategoryData')
      return this.$store.getters.categorys;
    }


  },


}


</script>

<style scoped>

</style>
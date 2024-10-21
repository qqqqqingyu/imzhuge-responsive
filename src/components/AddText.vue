<template>
  <el-card>
    <div class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <el-scrollbar  :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" :noresize="true" tag="section">
    <div class="card-body">
      <p>{{ content }}</p>
    </div>
    </el-scrollbar>
  </el-card>
</template>

<script>
export default {
  name: "AddText",
  props: {
    title: String,
    content: String
  }
}
</script>

<style>

.card-header {
  justify-content: center !important;
  color: white;
  font-weight: bold;
  height: auto;
  background: #007bff;
  text-align: center;
}

.card-body {
  height: 60vh;
  line-height: 2.5em;
}
</style>

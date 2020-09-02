<template>
  <el-card shadow="hover">
    <template #header>
      Scroll down to see the bottom-right button.
      <el-backtop target=".main-scroll-wrap" :bottom="10"></el-backtop>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`Scroll down to see the bottom-right button.
      <el-backtop target=".main-scroll-wrap" :bottom="10"></el-backtop>`}}
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Base'
})
</script>
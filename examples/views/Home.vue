<template>
  <div class="home">
    <el-container>
    <el-aside>
    </el-aside>
    <el-main>
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <el-alert type="success">123</el-alert>
    </el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// @ts-ignore
import { components } from 'zero-ui'
export default defineComponent({
  name: 'Home'
})
</script>
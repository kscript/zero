<template>
  <el-card shadow="hover">
    <template #header>
      <el-calendar :range="['2019-03-04', '2019-03-24']"></el-calendar>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-calendar :range="['2019-03-04', '2019-03-24']"></el-calendar>
      <script lang="ts">
      import { defineComponent } from 'vue'
      export default defineComponent({
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Range'
})
</script>
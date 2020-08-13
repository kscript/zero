<template>
  <main class="el-main">
    <slot></slot>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElMain',
  componentName: 'ElMain'
})
</script>
<style lang="scss">
@import 'theme/main.scss';
</style>
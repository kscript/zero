<template>
  <aside class="el-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElAside',

  componentName: 'ElAside',

  props: {
    width: {
      type: String,
      default: '300px'
    }
  }
})
</script>
<style lang="scss">
@import 'theme/aside.scss';
</style>

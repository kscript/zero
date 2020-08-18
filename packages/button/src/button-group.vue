<template>
  <div class="el-button-group">
    <slot></slot>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'ElButtonGroup'
  });
</script>

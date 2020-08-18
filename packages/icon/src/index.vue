<template>
  <i :class="'el-icon-' + name"></i>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'ElIcon',

    props: {
      name: String
    }
  });
</script>

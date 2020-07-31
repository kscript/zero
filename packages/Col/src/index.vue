<template>
  <div class="zr-col" v-bind="$attrs">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'zr-col'
}
</script>
<style lang="scss">
.zr-col {
  float: left;
}
</style>

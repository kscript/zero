<template>
  <div class="zr-col" v-bind="$attrs">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ZrCol'
}
</script>
<style lang="scss">
.zr-col {
  float: left;
  box-sizing: border-box;
}
</style>

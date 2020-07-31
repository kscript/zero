<template>
  <div class="zr-row" v-bind="$attrs">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'zr-row'
}
</script>
<style lang="scss">
.zr-row {
  @include clearfix();
  margin-left: -10px;
  margin-right: -10px;
  box-sizing: border-box;
}
</style>

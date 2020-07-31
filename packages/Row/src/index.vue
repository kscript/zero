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
  margin-left: -10px;
  margin-right: -10px;
  width: 100%;
  box-sizing: border-box;
}
</style>

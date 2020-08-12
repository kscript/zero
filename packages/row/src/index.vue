<template>
  <div class="zr-row" v-bind="$attrs">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ZrRow'
}
</script>
<style lang="scss">
.zr-row {
  @include clearfix();
}
</style>

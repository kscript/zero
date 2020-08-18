<template>
  <div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="el-card__header" v-if="headerSlot">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="el-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent, computed, getCurrentInstance } from 'vue'
  export default defineComponent({
    name: 'ElCard',
    props: {
      header: {},
      bodyStyle: {},
      shadow: {
        type: String
      }
    },
    setup(props, cxt) {
      const instance = getCurrentInstance()
      const headerSlot = computed(() => {
        return instance.slots.header || props.header
      })
      return {
        headerSlot
      }
    }
  });
</script>
<style lang="scss">
@import 'theme/card.scss';
</style>

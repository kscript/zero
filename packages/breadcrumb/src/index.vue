<template>
  <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent, provide, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue'
  export default defineComponent({
    name: 'ElBreadcrumb',

    props: {
      separator: {
        type: String,
        default: '/'
      },
      separatorClass: {
        type: String,
        default: ''
      }
    },

    setup(props, cxt) {
      const instance = getCurrentInstance() as ComponentInternalInstance
      provide('elBreadcrumb', instance)
      onMounted(() => {
        const items = instance.vnode?.el?.querySelectorAll('.el-breadcrumb__item')
        if (items && items.length) {
          items[items.length - 1].setAttribute('aria-current', 'page')
        }
      })
    }
  })
</script>

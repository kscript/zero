<template>
  <span class="el-breadcrumb__item">
    <span
      :class="['el-breadcrumb__inner', to ? 'is-link' : '']"
      ref="link"
      role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="el-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="el-breadcrumb__separator" role="presentation">{{separator}}</span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, provide, onMounted, getCurrentInstance, ComponentInternalInstance, reactive, inject, toRefs } from 'vue'
  export default defineComponent({
    name: 'ElBreadcrumbItem',
    props: {
      to: {},
      replace: Boolean
    },

    setup(props, cxt) {
      const state = reactive({
        separator: '',
        separatorClass: ''
      })
      const instance = getCurrentInstance() as ComponentInternalInstance
      const elBreadcrumb = inject('elBreadcrumb') as ComponentInternalInstance
      onMounted(() => {
        state.separator = elBreadcrumb.props.separator as string;
        state.separatorClass = elBreadcrumb.props.separatorClass as string;
        const link = instance.refs.link as HTMLElement;
        link.setAttribute('role', 'link');
        link.addEventListener('click', _ => {
          // @ts-ignore
          const { $router } = instance.proxy
          console.log(props, $router)
          if (!props.to || !$router) return
          props.replace ? $router.replace(props.to) : $router.push(props.to)
        })
      })
      return {
        ...toRefs(state)
      }
    }
  })
</script>

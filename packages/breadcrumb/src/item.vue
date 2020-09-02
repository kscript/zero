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
  import { defineComponent, provide, onMounted, getCurrentInstance, ComponentInternalInstance, reactive, inject, toRefs, PropType } from 'vue'
  import { useRouter, RouteLocationRaw } from 'vue-router'
  export default defineComponent({
    name: 'ElBreadcrumbItem',
    props: {
      to: {
        type: [String, Object] as PropType<RouteLocationRaw>,
        default: ''
      },
      replace: Boolean
    },

    setup(props, cxt) {
      const state = reactive({
        separator: '',
        separatorClass: ''
      })
      const instance = getCurrentInstance() as ComponentInternalInstance
      const elBreadcrumb = inject('elBreadcrumb') as ComponentInternalInstance
      const router = useRouter()
      onMounted(() => {
        state.separator = elBreadcrumb.props.separator as string;
        state.separatorClass = elBreadcrumb.props.separatorClass as string;
        const link = instance.refs.link as HTMLElement;
        link.setAttribute('role', 'link');
        link.addEventListener('click', _ => {
          if (!props.to || !router) return
          props.replace ? router.replace(props.to) : router.push(props.to)
        })
      })
      return {
        ...toRefs(state)
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/breadcrumb-item.scss';
</style>

<template>
  <transition name="el-alert-fade">
    <div
      class="el-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      v-show="visible"
      role="alert"
    >
      <i class="el-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="el-alert__content">
        <span class="el-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="el-alert__description" v-if="$slots.default && !description"><slot></slot></p>
        <p class="el-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        <i class="el-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ref, computed, toRefs, defineComponent, PropType, reactive } from 'vue'
  const TYPE_CLASSES_MAP = {
    'success': 'el-icon-success',
    'warning': 'el-icon-warning',
    'error': 'el-icon-error',
    'info': 'el-icon-info'
  };
  export default {
    name: 'ElAlert',
    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      center: Boolean,
      effect: {
        type: String,
        default: 'light',
        validator: function(value) {
          return ['light', 'dark'].indexOf(value) !== -1;
        }
      }
    },
    setup(props, cxt) {
      const visible = ref(true)
      const close = () => {
        visible.value = false
        cxt.emit('close')
      }
      const state = reactive({
        type: props.type,
        description: props.description,
      })
      const typeClass = computed(() => {
        return `el-alert--${state.type}`
      })
      const iconClass = computed(() => {
        return TYPE_CLASSES_MAP[state.type] || 'el-icon-info'
      })
      const isBigIcon = computed(() => {
        return state.description || cxt.slots.default ? 'is-big' : ''
      })
      const isBoldTitle = computed(() => {
        return state.description || cxt.slots.default ? 'is-bold' : ''
      })
      return {
        ...toRefs(state),
        visible,
        close,
        typeClass,
        iconClass,
        isBigIcon,
        isBoldTitle
      }
    },
  }
</script>
<style lang="scss">
@import 'packages/theme-chalk/src/alert.scss';
</style>
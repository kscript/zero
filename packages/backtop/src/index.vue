<template>
  <transition name="el-fade-in">
    <div
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="el-backtop">
      <slot>
        <el-icon name="caret-top"></el-icon>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, getCurrentInstance, Ref, onMounted, onBeforeUnmount, ComponentInternalInstance } from 'vue'
import ElIcon from 'packages/icon/src/index.vue'
// @ts-ignore
import {throttle} from 'throttle-debounce';

const cubic = (value: number) => Math.pow(value, 3);
const easeInOutCubic = (value: number) => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2;

export default defineComponent({
  name: 'ElBacktop',

  components: {
    ElIcon
  },
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: [String],
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },

  setup(props, cxt) {
    const container: Ref<Document | HTMLElement> = ref(document)
    const el = ref(document.documentElement)
    const visible = ref(false)
    const throttledScrollHandler = ref(() => {})
    const styleBottom = computed(() => {
      return `${props.bottom}px`;
    })
    const styleRight = computed(() => {
      return `${props.right}px`;
    })
    const instance = getCurrentInstance() as ComponentInternalInstance 
    const init = () => {
      if (props.target) {
        el.value = document.querySelector(props.target) as HTMLElement;
        if (!el.value) {
          throw new Error(`target is not existed: ${props.target}`);
        }
        container.value = el.value;
      }
    }
    const onScroll = () => {
      const scrollTop = el.value.scrollTop;
      visible.value = scrollTop >= props.visibilityHeight;
    }
    const scrollToTop = () => {
      const beginTime = Date.now();
      const beginValue = el.value.scrollTop;
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.value.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.value.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    }
    const handleClick = (e: Event) => {
      scrollToTop();
      instance.emit('click', e);
    }
    onMounted(() => {
      init()
      throttledScrollHandler.value = throttle(300, onScroll)
      container.value?.addEventListener('scroll', throttledScrollHandler.value)
    })
    onBeforeUnmount(() => {
      container.value?.removeEventListener('scroll', throttledScrollHandler.value);
    })
    return {
      container,
      el,
      visible,
      styleBottom,
      styleRight,
      handleClick
    }
  }
})
</script>

<style lang="scss">
@import 'theme/backtop.scss';
</style>
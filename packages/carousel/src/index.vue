<template>
  <div
    :class="carouselClasses"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div
      class="el-carousel__container"
      :style="{ height: height }">
      <transition
        v-if="arrowDisplay"
        name="carousel-arrow-left">
        <button
          type="button"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="el-carousel__arrow el-carousel__arrow--left">
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition
        v-if="arrowDisplay"
        name="carousel-arrow-right">
        <button
          type="button"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
          class="el-carousel__arrow el-carousel__arrow--right">
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul
      v-if="indicatorPosition !== 'none'"
      :class="indicatorsClasses">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'el-carousel__indicator',
          'el-carousel__indicator--' + direction,
          { 'is-active': index === activeIndex }]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="el-carousel__button">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="tsx">
// @ts-ignore
import { throttle } from 'throttle-debounce'
// @ts-ignore
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, h, nextTick, onBeforeUnmount, onMounted, Prop, provide, reactive, ref, toRef, toRefs, watch } from 'vue'
import { Carousel } from './type'
export default defineComponent({
  name: 'ElCarousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val: string) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1
      }
    } as Prop<string>
  },

  setup(props, { emit, slots }) {
    const state = reactive({
      activeIndex: -1,
      containerWidth: 0,
      timer: 0,
      hover: false
    })
    const items = ref([] as anyObject[])

    const arrowDisplay = computed(() => {
      return props.arrow !== 'never' && props.direction !== 'vertical'
    })

    const hasLabel = computed(() => {
      return items.value.some(item => item.props.label.toString().length > 0)
    })

    const carouselClasses = computed(() => {
      const classes = ['el-carousel', 'el-carousel--' + props.direction]
      if (props.type === 'card') {
        classes.push('el-carousel--card')
      }
      return classes
    })

    const indicatorsClasses = computed(() => {
      const classes = ['el-carousel__indicators', 'el-carousel__indicators--' + props.direction]
      if (hasLabel.value) {
        classes.push('el-carousel__indicators--labels')
      }
      if (props.indicatorPosition === 'outside' || props.type === 'card') {
        classes.push('el-carousel__indicators--outside')
      }
      return classes
    })

    const handleMouseEnter = () => {
      state.hover = true
      pauseTimer()
    }

    const handleMouseLeave = () => {
      state.hover = false
      startTimer()
    }

    const itemInStage = (item: any, index: number) => {
      const length = items.value.length
      if (index === length - 1 && item.inStage && items.value[0].active ||
        (item.inStage && items.value[index + 1] && items.value[index + 1].active)) {
        return 'left'
      } else if (index === 0 && item.inStage && items.value[length - 1].active ||
        (item.inStage && items.value[index - 1] && items.value[index - 1].active)) {
        return 'right'
      }
      return false
    }

    const handleButtonEnter = (arrow: boolean | string) => {
      if (props.direction === 'vertical') return
      items.value.forEach((item, index) => {
        if (arrow === itemInStage(item, index)) {
          item.hover = true
        }
      })
    }

    const handleButtonLeave = () => {
      if (props.direction === 'vertical') return
      items.value.forEach(item => {
        item.hover = false
      })
    }

    const children = ref([] as ComponentInternalInstance[])
    const mountChildren = (instance: ComponentInternalInstance) => {
      children.value.push(instance)
    }
    const updateItems = () => {
      items.value = children.value.filter(child => child.type.name === 'ElCarouselItem')
    }

    const resetItemPosition = (oldIndex: number) => {
      items.value.forEach((item, index) => {
        item.setupState.translateItem(index, state.activeIndex, oldIndex)
      })
    }

    const playSlides = () => {
      if (state.activeIndex < items.value.length - 1) {
        state.activeIndex++
      } else if (props.loop) {
        state.activeIndex = 0
      }
    }

    const pauseTimer = () => {
      if (state.timer) {
        clearInterval(state.timer)
        state.timer = 0
      }
    }

    const startTimer = () => {
      if (props.interval <= 0 || !props.autoplay || state.timer) return
      state.timer = setInterval(playSlides, props.interval)
    }

    const setActiveItem = (index: number) => {
      if (typeof index === 'string') {
        const filteredItems = items.value.filter(item => item.name === index)
        if (filteredItems.length > 0) {
          index = items.value.indexOf(filteredItems[0])
        }
      }
      index = Number(index)
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn('[Element Warn][Carousel]index must be an integer.')
        return
      }
      let length = items.value.length
      const oldIndex = state.activeIndex
      if (index < 0) {
        state.activeIndex = props.loop ? length - 1 : 0
      } else if (index >= length) {
        state.activeIndex = props.loop ? 0 : length - 1
      } else {
        state.activeIndex = index
      }
      if (oldIndex === state.activeIndex) {
        resetItemPosition(oldIndex)
      }
    }

    const prev = () => {
      setActiveItem(state.activeIndex - 1)
    }

    const next = () => {
      setActiveItem(state.activeIndex + 1)
    }

    const handleIndicatorClick = (index: number) => {
      state.activeIndex = index
    }

    const handleIndicatorHover = (index: number) => {
      if (props.trigger === 'hover' && index !== state.activeIndex) {
        state.activeIndex = index
      }
    }
    const instance = getCurrentInstance() as ComponentInternalInstance 
    const throttledArrowClick = throttle(300, true, (index: number) => {
      setActiveItem(index)
    })
    const throttledIndicatorHover = throttle(300, (index: number) => {
      handleIndicatorHover(index)
    })
    watch(() => items.value, (val)=> {
      if (val.length > 0) setActiveItem(props.initialIndex)
    })
    watch(() => state.activeIndex, (val, oldVal)=> {
      resetItemPosition(oldVal)
      if (oldVal > -1) {
        emit('change', val, oldVal)
      }
    })
    watch(() => props.autoplay, (val)=> {
      val ? startTimer() : pauseTimer()
    })
    watch(() => props.loop, ()=> {
      setActiveItem(state.activeIndex)
    })
    provide('carousel', {
      items,
      updateItems,
      setActiveItem,
      type: props.type,
      loop: props.loop,
      direction: props.direction,
      mountChildren
    } as Carousel)
    onMounted(() => {
      updateItems()
      nextTick(() => {
        addResizeListener(instance.vnode.el, resetItemPosition)
        if (props.initialIndex < items.value.length && props.initialIndex >= 0) {
          state.activeIndex = props.initialIndex
        }
        startTimer()
      })
    })
    onBeforeUnmount(() => {
      if (instance.vnode.el) removeResizeListener(instance.vnode.el, resetItemPosition)
      pauseTimer()
    })
    return {
      ...toRefs(state),
      items,
      arrowDisplay,
      hasLabel,
      carouselClasses,
      indicatorsClasses,
      handleMouseEnter,
      handleMouseLeave,
      itemInStage,
      handleButtonEnter,
      handleButtonLeave,
      prev,
      next,
      handleIndicatorClick,
      handleIndicatorHover,
      throttledArrowClick,
      throttledIndicatorHover
    }
  }
})
</script>

<style lang="scss">
@import 'theme/carousel.scss';
</style>

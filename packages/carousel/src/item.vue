<template>
  <div
    v-show="ready"
    class="el-carousel__item"
    :class="{
      'is-active': active,
      'el-carousel__item--card': type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    @click="handleItemClick"
    :style="itemStyle">
    <div
      v-if="type === 'card'"
      v-show="!active"
      class="el-carousel__mask">
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  // @ts-ignore
  import { autoprefixer } from '@/utils/util'
  import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, inject, onMounted, onUnmounted, reactive, toRefs } from 'vue'
  import { Carousel } from './type'
  const CARD_SCALE = 0.83
  export default defineComponent({
    name: 'ElCarouselItem',

    props: {
      name: String,
      label: {
        type: [String, Number],
        default: ''
      }
    },

    setup(props, { emit }) {
      const state = reactive({
        hover: false,
        translate: 0,
        scale: 1,
        active: false,
        ready: false,
        inStage: false,
        animating: false
      })
      const instance = getCurrentInstance() as ComponentInternalInstance 
      const carousel = inject('carousel') as Carousel
      const type = computed(() => carousel.type)
      const processIndex = (index: number, activeIndex: number, length: number) => {
        if (activeIndex === 0 && index === length - 1) {
          return -1
        } else if (activeIndex === length - 1 && index === 0) {
          return length
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          return length + 1
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          return -2
        }
        return index
      }

      const calcCardTranslate = (index: number, activeIndex: number) => {
        const parent = instance.parent
        const parentWidth = parent?.vnode.el?.offsetWidth || 0
        if (state.inStage) {
          return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4
        } else if (index < activeIndex) {
          return -(1 + CARD_SCALE) * parentWidth / 4
        } else {
          return (3 + CARD_SCALE) * parentWidth / 4
        }
      }

      const calcTranslate = (index: number, activeIndex: number, isVertical: boolean) => {
        const parent = instance.parent
        const distance = parent?.vnode.el?.[isVertical ? 'offsetHeight' : 'offsetWidth']
        return distance * (index - activeIndex)
      }

      const translateItem = (index: number, activeIndex: number, oldIndex: number) => {
        const parent = instance.parent as ComponentInternalInstance 
        const parentType = type.value
        const direction = parentDirection.value
        const length = carousel.items.value.length
        if (parentType !== 'card' && oldIndex !== undefined) {
          state.animating = index === activeIndex || index === oldIndex
        }
        if (index !== activeIndex && length > 2 && carousel.loop) {
          index = processIndex(index, activeIndex, length)
        }
        if (parentType === 'card') {
          if (direction === 'vertical') {
            console.warn('[Element Warn][Carousel]vertical direction is not supported in card mode')
          }
          state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
          state.active = index === activeIndex
          state.translate = calcCardTranslate(index, activeIndex)
          state.scale = state.active ? 1 : CARD_SCALE
        } else {
          state.active = index === activeIndex
          const isVertical = direction === 'vertical'
          state.translate = calcTranslate(index, activeIndex, isVertical)
        }
        state.ready = true
      }

      const handleItemClick = () => {
        if (type.value === 'card') {
          const index = carousel.items.value.indexOf(instance)
          carousel.setActiveItem(index)
        }
      }

      const parentDirection = computed(() => {
        return carousel.direction
      })

      const itemStyle = computed(() => {
        const translateType = parentDirection.value === 'vertical' ? 'translateY' : 'translateX'
        const value = `${translateType}(${ state.translate }px) scale(${ state.scale })`
        const style = {
          transform: value
        }
        return autoprefixer(style)
      })
      carousel.mountChildren(instance)
      carousel.updateItems()
      onUnmounted(() => {
        carousel.updateItems()
      })
      return {
        ...toRefs(state),
        type,
        itemStyle,
        translateItem
      }
    }
  })
</script>
  
<style lang="scss">
@import 'theme/carousel-item.scss';
</style>

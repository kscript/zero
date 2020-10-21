<template>
  <div
    class="el-step"
    :a="[isLast,space,isCenter]"
    :style="style"
    :class="[
      !isSimple && `is-${direction}`,
      isSimple && 'is-simple',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center'
    ]"
  >
    <!-- icon & line -->
    <div class="el-step__head" :class="`is-${currentStatus}`">
      <div
        class="el-step__line"
        :style="isLast ? '' : { marginRight: stepOffset + 'px' }"
      >
        <i class="el-step__line-inner" :style="lineStyle"></i>
      </div>

      <div class="el-step__icon" :class="`is-${icon ? 'icon' : 'text'}`">
        <slot
          v-if="currentStatus !== 'success' && currentStatus !== 'error'"
          name="icon"
        >
          <i v-if="icon" class="el-step__icon-inner" :class="[icon]"></i>
          <div class="el-step__icon-inner" v-if="!icon && !isSimple">
            {{ index + 1 }}
          </div>
        </slot>
        <i
          v-else
          :class="[
            'el-icon-' + (currentStatus === 'success' ? 'check' : 'close')
          ]"
          class="el-step__icon-inner is-status"
        >
        </i>
      </div>
    </div>
    <!-- title & description -->
    <div class="el-step__main">
      <div class="el-step__title" ref="title" :class="['is-' + currentStatus]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="isSimple" class="el-step__arrow"></div>
      <div v-else class="el-step__description" :class="['is-' + currentStatus]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  watch
} from 'vue'

export default defineComponent({
  name: 'ElStep',

  props: {
    title: String,
    icon: String,
    description: String,
    status: String
  },

  setup(props) {
    const state = reactive({
      index: -1,
      lineStyle: {},
      internalStatus: ''
    })
    const stepInstance = {}
    const instance = getCurrentInstance() as ComponentInternalInstance
    const { props: stepsProps, steps, stepOffset } = inject(
      'elSteps',
      {} as anyObject
    )
    
    const direction = computed(() => {
      return stepsProps.direction
    })

    const currentStatus = computed(() => {
      return props.status || state.internalStatus
    })
    const prevStatus = computed(() => {
      const prevStep = steps.value[state.index - 1]
      return prevStep ? prevStep.currentStatus : 'wait'
    })
    const isCenter = computed(() => {
      return stepsProps.alignCenter
    })
    const isVertical = computed(() => {
      return direction.value === 'vertical'
    })
    const isSimple = computed(() => {
      return stepsProps.simple
    })
    const isLast = computed(() => {
      return steps._rawValue[steps.value.length - 1] === stepInstance
    })
    const stepsCount = computed(() => {
      return steps.value.length
    })

    const space = computed(() => {
      return isSimple.value ? '' : stepsProps.space
    })
    const style = computed(() => {
      const style = {} as CSSStyleDeclaration
      const len = steps.value.length

      style.flexBasis =
        typeof space.value === 'number'
          ? space.value + 'px'
          : space.value
          ? space.value
          : 100 / (len - (isCenter.value ? 0 : 1)) + '%'
      if (isVertical.value) return style
      if (isLast.value) {
        style.maxWidth = 100 / stepsCount.value + '%'
      } else {
        style.marginRight = -stepOffset.value + 'px'
      }

      return style
    })
    const updateStatus = (val: number) => {
      const prevChild = steps.value[state.index - 1]

      if (val > state.index) {
        state.internalStatus = stepsProps.finishStatus
      } else if (val === state.index && prevStatus.value !== 'error') {
        state.internalStatus = stepsProps.processStatus
      } else {
        state.internalStatus = 'wait'
      }
      if (prevChild) prevChild.calcProgress(state.internalStatus)
    }

    const calcProgress = (status: string) => {
      let step = 100
      const style = {} as CSSStyleDeclaration

      style.transitionDelay = 150 * state.index + 'ms'
      if (status === stepsProps.processStatus) {
        step = currentStatus.value !== 'error' ? 0 : 0
      } else if (status === 'wait') {
        step = 0
        style.transitionDelay = -150 * state.index + 'ms'
      }

      style.borderWidth = step && !isSimple.value ? '1px' : '0'
      direction.value === 'vertical'
        ? (style.height = step + '%')
        : (style.width = step + '%')

      state.lineStyle = style
    }
    Object.assign(stepInstance, {
      instance,
      calcProgress
    })
    
    onMounted(() => {
      const unwatch = watch(
        () => state.index,
        val => {
          watch(() => stepsProps.active, updateStatus, { immediate: true })
          watch(
            () => stepsProps.processStatus,
            () => {
              const activeIndex = stepsProps.active
              updateStatus(activeIndex)
            },
            { immediate: true }
          )
          unwatch()
        }
      )
      state.index = steps.value.length
      steps.value.push(stepInstance)
    })
    onUnmounted(() => {
      const index = steps.value.indexOf(stepInstance)
      if (index >= 0) {
        steps.value.splice(index, 1)
      }
    })

    return {
      ...toRefs(state),
      space,
      isSimple,
      style,
      isLast,
      isCenter,
      isVertical,
      currentStatus,

      direction,
      stepOffset
    }
  }
})
</script>

<style lang="scss">
@import 'theme/step';
</style>

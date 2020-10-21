<template>
  <div
    class="el-steps"
    :class="[!simple && 'el-steps--' + direction, simple && 'el-steps--simple']"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Migrating from '@/mixins/migrating'
import { ComponentInternalInstance, defineComponent, getCurrentInstance, provide, reactive, ref, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'ElSteps',

  mixins: [Migrating],

  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },

  emits: ['change'],
  setup(props, { emit }) {
    const steps = ref([] as ComponentInternalInstance[])
    const stepOffset = ref(0)
    watch(
      () => props.active,
      (newVal, oldVal) => {
        emit('change', newVal, oldVal)
      }
    )

    const getMigratingConfig = () => {
      return {
        props: {
          center: 'center is removed.'
        }
      }
    }
    provide('elSteps', { props, steps, stepOffset })
    return {
      steps,
      stepOffset,
      getMigratingConfig
    }
  }
})
</script>
<style lang="scss">
@import 'theme/steps';
</style>

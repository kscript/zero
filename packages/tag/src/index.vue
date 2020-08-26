<template>
<span
  v-if="disableTransitions"
  :class="classes"
  :style="{backgroundColor: color}"
  @click="handleClick">
  <slot></slot>
  <i class="el-tag__close el-icon-close" @click="handleClose" v-if="closable"></i>
</span>
<transition v-else :name="animate">
  <span
    :class="classes"
    :style="{backgroundColor: color}"
    @click="handleClick"
    v-if="show">
    <slot></slot>
    <i class="el-tag__close el-icon-close" @click="handleClose" v-if="closable"></i>
  </span>
</transition>
</template>
<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'
export default defineComponent({
  name: 'ElTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    animate: {
      type:String,
      default: 'el-zoom-in-center'
    },
    effect: {
      type: String as PropType<'dark' | 'light' | 'plain'>,
      default: 'light'
    }
  },
  setup(props, { emit, slots }) {
    const show = ref(true)
    const tagSize = computed(() => {
      //  (this.$ELEMENT || {}).size
      return props.size
    })
    const handleClose = (even: Event) => {
      event?.stopPropagation()
      show.value = false
      emit('close', event)
    }
    const handleClick = (event: Event) => {
      emit('click', event)
    }
    const {type, effect, hit } = props
    const classes = ref([
      'el-tag',
      type ? `el-tag--${type}` : '',
      tagSize.value ? `el-tag--${tagSize.value}` : '',
      effect ? `el-tag--${effect}` : '',
      hit && 'is-hit'
    ])

    console.log(props.disableTransitions)
    return {
      show,
      tagSize,
      classes,
      handleClose,
      handleClick,
    }
  }
})
</script>
<style lang="scss">
@import 'theme/tag.scss';
</style>
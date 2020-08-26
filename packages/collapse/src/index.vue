<template>
  <div class="el-collapse" role="tablist" aria-multiselectable="true">
    <slot></slot>
  </div>
</template>
<script lang="ts">
  import { 
    defineComponent, ref, watch, computed, provide, 
    onUnmounted,
    PropType, Ref
  } from 'vue'
  import mitt, { Emitter } from 'mitt'
  import { modelValueType, modelValueArray } from './type'
  export default defineComponent({
    name: 'ElCollapse',

    emits: ['update:modelValue', 'item-click', 'input', 'change'],
    
    componentName: 'ElCollapse',

    props: {
      accordion: Boolean,
      modelValue: {
        type: [Array, String, Number] as PropType<modelValueType>,
        default: () => [] as modelValueArray
      }
    },
    setup(props, { emit }) {
      const emitter: Emitter = mitt()
      const activeNames = ref(([] as modelValueArray).concat(props.modelValue))

      const setActiveNames = (names: modelValueType) => {
        names = Array.isArray(names) ? names : [names]
        let value = props.accordion ? names[0] : names
        activeNames.value = names
        emit('update:modelValue', activeNames.value)
        emit('input', value)
        emit('change', value)
      }
      const handleItemClick = (item: any) => {
        if (props.accordion) {
          setActiveNames(
            (activeNames.value[0] || activeNames.value[0] === 0) &&
            activeNames.value[0] === item.props.name
              ? '' : item.props.name
          )
        } else {
          let names = activeNames.value.slice(0)
          let index = names.indexOf(item.props.name)

          if (index > -1) {
            names.splice(index, 1)
          } else {
            names.push(item.props.name)
          }
          setActiveNames(names)
        }
      }

      const collapse = provide('collapse', {
        activeNames,
        emitter
      })

      watch(() => props.modelValue, () => {
        activeNames.value = ([] as modelValueArray).concat(props.modelValue)
      })

      emitter.on('item-click', handleItemClick)

      onUnmounted(() => {
        emitter.all.clear()
      })
      return {
        collapse,
        setActiveNames,
        handleItemClick
      }
    }
  })
</script>

<style lang="scss">
@import 'theme/collapse.scss';
</style>
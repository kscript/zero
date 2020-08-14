<template>
  <div class="el-collapse" role="tablist" aria-multiselectable="true">
    <slot></slot>
  </div>
</template>
<script>
  import { defineComponent, ref, reactive, provide, watch, getCurrentInstance, computed } from 'vue';
  export default defineComponent({
    name: 'ElCollapse',

    componentName: 'ElCollapse',

    props: {
      accordion: Boolean,
      value: {
        type: [Array, String, Number],
        default() {
          return [];
        }
      }
    },
    setup(props, cxt) {
      const instance = getCurrentInstance()
      const state = reactive({
        activeNames: [].concat(props.value)
      })
      const collapse = provide('collapse', props)
      const name = computed(() => {
        return props.value
      })
      const setActiveNames = (activeNames) => {
        // console.log(activeNames)
        // activeNames = [].concat(activeNames);
        // let value = props.accordion ? activeNames[0] : activeNames;
        // state.activeNames = activeNames;
        // instance.emit('input', value);
        // instance.emit('change', value);
      }
      const handleItemClick = (item) => {
        // if (props.accordion) {
        //   setActiveNames(
        //     (state.activeNames[0] || state.activeNames[0] === 0) &&
        //     state.activeNames[0] === item.name
        //       ? '' : item.name
        //   );
        // } else {
        //   let activeNames = state.activeNames.slice(0);
        //   let index = activeNames.indexOf(item.name);

        //   if (index > -1) {
        //     activeNames.splice(index, 1);
        //   } else {
        //     activeNames.push(item.name);
        //   }
        //   setActiveNames(activeNames);
        // }
      }
      return {
        ...state,
        collapse,
        setActiveNames,
        handleItemClick
      }
    }
  });
</script>

<style lang="scss">
@import 'theme/collapse.scss';
</style>
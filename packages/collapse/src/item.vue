<template>
  <div class="el-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`el-collapse-content-${id}`"
      :aria-describedby ="`el-collapse-content-${id}`"
    >
      <div
        class="el-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`el-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">{{title}}</slot>
        <i
          class="el-collapse-item__arrow el-icon-arrow-right"
          :class="{'is-active': isActive}">
        </i>
      </div>
    </div>
    <el-collapse-transition>
      <div
        class="el-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`el-collapse-head-${id}`"
        :id="`el-collapse-content-${id}`"
      >
        <div class="el-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script lang="ts">
  import { 
    defineComponent, computed, watch, reactive, provide, inject, getCurrentInstance, 
    PropType, Ref
  } from 'vue'
  import { generateId } from '@/utils/util'
  import { modelValueType, collapseProvide, modelValueArray } from './type'
  
  export default defineComponent({
    name: 'ElCollapseItem',

    componentName: 'ElCollapseItem',

    props: {
      title: String,
      name: {
        type: [String, Number] as PropType<string | number>,
        default: () => generateId()
      },
      disabled: Boolean
    },

    setup(props) {
      const state = reactive({
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false,
        name: props.name,
        id: generateId()
      })
      const instance = getCurrentInstance()
      const collapse = inject('collapse') as collapseProvide
      const activeNames = computed(() => {
        return ([] as modelValueArray).concat(collapse.activeNames.value)
      })
      const isActive = computed(() => {
        return activeNames.value.indexOf(state.name) > -1;
      })
      const handleFocus = () => {
        setTimeout(() => {
          if (!state.isClick) {
            state.focusing = true;
          } else {
            state.isClick = false;
          }
        }, 50)
      }
      const handleHeaderClick = () => {
        if (props.disabled) return;
        collapse.emitter.emit('item-click', instance)
        state.focusing = false;
        state.isClick = true;
      }
      const handleEnterClick = () => {
        collapse.emitter.emit('item-click', instance)
      }
      return {
        ...state,
        collapse,
        isActive,
        handleFocus,
        handleHeaderClick,
        handleEnterClick
      }
    },
  })
</script>

<style lang="scss">
@import 'theme/collapse-item.scss';
</style>
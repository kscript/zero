<template>
  <div class="el-dropdown" v-clickoutside="hide">
    <el-button-group v-if="splitButton">
      <el-button
        :type="type"
        :size="dropdownSize"
        @click="handleMainButtonClick"
      >
        <slot></slot>
      </el-button>
      <el-button
        ref="trigger"
        :type="type"
        :size="dropdownSize"
        class="el-dropdown__caret-button"
      >
        <i class="el-dropdown__icon el-icon-arrow-down"></i>
      </el-button>
    </el-button-group>
    <slot v-else></slot>
    <slot name="dropdown"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ElButton from 'packages/button/src/index.vue'
import ElButtonGroup from 'packages/button/src/button-group.vue'
import Clickoutside from '@/utils/clickoutside'
import Migrating from '@/mixins/migrating'
import useDropDown from './useDropDown'
export default defineComponent({
  name: 'ElDropdown',

  componentName: 'ElDropdown',

  components: {
    ElButton,
    ElButtonGroup
  },

  mixins: [Migrating],

  emits: ['command', 'click'],

  directives: { Clickoutside },

  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    type: String,
    size: {
      type: String,
      default: ''
    },
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom-end'
    },
    visibleArrow: {
      default: true
    },
    showTimeout: {
      type: Number,
      default: 250
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },

  setup(props) {
    const {
      hide,
      dropdownSize,
      handleMainButtonClick
    } = useDropDown(props)
    return {
      hide,
      dropdownSize,
      handleMainButtonClick
    }
  }
})
</script>

<style lang="scss">
@import 'theme/dropdown.scss';
</style>

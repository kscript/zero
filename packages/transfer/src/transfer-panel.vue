<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate"
      >
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </el-checkbox>
    </p>

    <div
      :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']"
    >
      <el-input
        class="el-transfer-panel__filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable"
      >
        <i
          slot="prefix"
          :class="['el-input__icon', 'el-icon-' + inputIcon]"
          @click="clearQuery"
        ></i>
      </el-input>
      <el-checkbox-group
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="el-transfer-panel__list"
      >
        <el-checkbox
          class="el-transfer-panel__item"
          :label="item[keyProp]"
          :disabled="item[disabledProp]"
          :key="item[keyProp]"
          v-for="item in filteredData"
        >
          <option-content :option="item"></option-content>
        </el-checkbox>
      </el-checkbox-group>
      <p class="el-transfer-panel__empty" v-show="hasNoMatch">
        {{ t('el.transfer.noMatch') }}
      </p>
      <p
        class="el-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch"
      >
        {{ t('el.transfer.noData') }}
      </p>
    </div>
    <p class="el-transfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="tsx">
import ElCheckboxGroup from 'packages/checkbox-group'
import ElCheckbox from 'packages/checkbox'
import ElInput from 'packages/input'
// @ts-ignore
import Locale from '@/mixins/locale'
import { computed, ComputedRef, defineComponent, getCurrentInstance, inject, Prop, provide, reactive, ref, toRefs, watch } from 'vue'

export default defineComponent({
  mixins: [Locale],

  name: 'ElTransferPanel',

  componentName: 'ElTransferPanel',

  emits: ['checked-change'],

  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElInput,
    OptionContent: {
      props: {
        option: Object
      },
      render(h: Function) {
        const option = this.option
        const { renderContent, labelProp, keyProp, instance } = inject('ElTransferPanel', {} as anyObject)
        const transferSlots = instance.parent.slots || instance.slots
        return renderContent ? (
          renderContent(h, option)
        ) : transferSlots.default ? (
          transferSlots.default({ option })
        ) : (
          <span>
            {option[labelProp.value] || option[keyProp.value]}
          </span>
        )
      }
    }
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    } as Prop<any[]>,
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object as Prop<anyObject>,
    filterMethod: Function,
    defaultChecked: Array as Prop<string[]>,
    props: Object,
    hasSlot: Boolean
  },

  setup(props, { slots, emit }) {
    const state = reactive({
      checked: [],
      allChecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true
    })
    const instance = getCurrentInstance()!
    const checkedRef = ref([] as string[])
    const filteredData = computed(() => {
      return props.data!.filter(item => {
        if (typeof props.filterMethod === 'function') {
          return props.filterMethod(state.query, item)
        } else {
          const label = item[labelProp.value] || item[keyProp.value].toString()
          return label.toLowerCase().indexOf(state.query.toLowerCase()) > -1
        }
      })
    }) as ComputedRef<string[]>

    const checkableData = computed(() => {
      return filteredData.value.filter(item => !item[disabledProp.value])
    })

    const checkedSummary = computed(() => {
      const checkedLength = checkedRef.value.length
      const dataLength = props.data!.length
      const { noChecked, hasChecked } = props.format!
      if (noChecked && hasChecked) {
        return checkedLength > 0
          ? hasChecked
              .replace(/\${checked}/g, checkedLength)
              .replace(/\${total}/g, dataLength)
          : noChecked.replace(/\${total}/g, dataLength)
      } else {
        return `${checkedLength}/${dataLength}`
      }
    })

    const isIndeterminate = computed(() => {
      const checkedLength = checkedRef.value.length
      return checkedLength > 0 && checkedLength < checkableData.value.length
    })

    const hasNoMatch = computed(() => {
      return state.query.length > 0 && filteredData.value.length === 0
    })

    const inputIcon = computed(() => {
      return state.query.length > 0 && state.inputHover
        ? 'circle-close'
        : 'search'
    })

    const labelProp = computed(() => {
      return props.props?.label || 'label'
    })

    const keyProp = computed(() => {
      return props.props?.key || 'key'
    })

    const disabledProp = computed(() => {
      return props.props?.disabled || 'disabled'
    })

    const hasFooter = computed(() => {
      return !!props.hasSlot
    })
    const updateAllChecked = () => {
      const checkableDataKeys = checkableData.value.map(
        item => item[keyProp.value]
      )
      state.allChecked =
        checkableDataKeys.length > 0 &&
        checkableDataKeys.every((item: string) => checkedRef.value.indexOf(item) > -1)
    }

    const handleAllCheckedChange = (value: boolean) => {
      checkedRef.value = value
        ? checkableData.value.map(item => item[keyProp.value])
        : []
    }

    const clearQuery = () => {
      if (inputIcon.value === 'circle-close') {
        state.query = ''
      }
    }

    watch(() => checkedRef.value, (val, oldVal) => {
      updateAllChecked()
      if (state.checkChangeByUser) {
        const movedKeys = val
          .concat(oldVal)
          .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1)
        emit('checked-change', val, movedKeys)
      } else {
        emit('checked-change', val)
        state.checkChangeByUser = true
      }
    })
    watch(() => props.data, () => {
      const checked: string[] = []
      const filteredDataKeys = filteredData.value.map(item => item[keyProp.value])
      checkedRef.value.forEach(item => {
        if (filteredDataKeys.indexOf(item) > -1) {
          checked.push(item)
        }
      })
      state.checkChangeByUser = false
      checkedRef.value = checked
    })
    watch(() => checkableData.value, () => {
      updateAllChecked()
    })
    watch(() => props.defaultChecked, (val?: string[], oldVal?: string[]) => {
        if (
          oldVal &&
          val?.length === oldVal.length &&
          val?.every(item => oldVal.indexOf(item) > -1)
        )
          return
        const checked: string[] = []
        const checkableDataKeys = checkableData.value.map(
          item => item[keyProp.value]
        )
        val?.forEach((item: string) => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item)
          }
        })
        state.checkChangeByUser = false
        checkedRef.value = checked
      }, {
      immediate: true
    })
    
    provide('ElTransferPanel', {
      instance,
      renderContent: props.renderContent,
      labelProp,
      keyProp,
    })
    return {
      ...toRefs(state),
      checked: checkedRef,
      isIndeterminate,
      checkedSummary,
      hasFooter,
      inputIcon,
      hasNoMatch,
      keyProp,
      disabledProp,
      filteredData,
      
      handleAllCheckedChange,
      clearQuery
    }
  }

})
</script>

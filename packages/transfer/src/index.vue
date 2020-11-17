<template>
  <div class="el-transfer">
    <transfer-panel
      v-bind="$props"
      ref="leftPanel"
      :data="sourceData"
      :title="titles[0] || t('el.transfer.titles.0')"
      :default-checked="leftDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      :hasSlot="!!slots['left-footer']"
      @checked-change="onSourceCheckedChange"
    >
      <slot name="left-footer"></slot>
    </transfer-panel>
    <div class="el-transfer__buttons">
      <el-button
        type="primary"
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0"
      >
        <i class="el-icon-arrow-left"></i>
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
      </el-button>
      <el-button
        type="primary"
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0"
      >
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <transfer-panel
      v-bind="$props"
      ref="rightPanel"
      :data="targetData"
      :title="titles[1] || t('el.transfer.titles.1')"
      :default-checked="rightDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onTargetCheckedChange"
      :hasSlot="!!slots['right-footer']"
    >
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script lang="ts">
import ElButton from 'packages/button'
// @ts-ignore
import Locale from '@/mixins/locale'
import TransferPanel from './transfer-panel.vue'
import Migrating from '@/mixins/migrating'
import { computed, defineComponent, getCurrentInstance, Prop, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'ElTransfer',

  mixins: [Locale, Migrating],

  emits: ['update:modelValue', 'change', 'left-check-change', 'right-check-change'],

  components: {
    TransferPanel,
    ElButton
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    } as Prop<any[]>,
    titles: {
      type: Array,
      default() {
        return []
      }
    } as Prop<any[]>,
    buttonTexts: {
      type: Array,
      default() {
        return []
      }
    } as Prop<any[]>,
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return []
      }
    } as Prop<any[]>,
    rightDefaultChecked: {
      type: Array,
      default() {
        return []
      }
    } as Prop<any[]>,
    renderContent: Function,
    modelValue: {
      type: Array,
      default() {
        return []
      }
    } as Prop<any[]>,
    value: {
      type: Array,
      default() {
        return []
      }
    } as Prop<any[]>,
    format: {
      type: Object,
      default() {
        return {}
      }
    }as Prop<anyObject>,
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled'
        }
      }
    } as Prop<anyObject>,
    targetOrder: {
      type: String,
      default: 'original'
    }
  },

  setup(props, { emit, slots }) {
    const leftChecked = ref([] as string[])
    const rightChecked = ref([] as string[])
    const instance = getCurrentInstance()!
    const dataObj = computed(() => {
      const key = props.props!.key
      return props.data?.reduce((o, cur) => (o[cur[key]] = cur) && o, {})
    })

    const sourceData = computed(() => {
      return props.data?.filter(
        item => realValue.value.indexOf(item[props.props!.key]) === -1
      )
    })

    const targetData = computed(() => {
      if (props.targetOrder === 'original') {
        return props.data?.filter(
          item => realValue.value.indexOf(item[props.props!.key]) > -1
        )
      } else {
        return realValue.value.reduce((arr, cur) => {
          const val = dataObj.value[cur]
          if (val) {
            arr.push(val)
          }
          return arr
        }, [])
      }
    })

    const hasButtonTexts = computed(() => {
      return props.buttonTexts?.length === 2
    })

    const realValue = computed(() => {
      return (props.modelValue || props.value) as any[]
    })
    // watch(() => props.modelValue, (val) => {
    //   this.dispatch('ElFormItem', 'el.form.change', val)
    // }

    const getMigratingConfig = () => {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.'
        }
      }
    }

    const onSourceCheckedChange = (val: string[], movedKeys: string[]) => {
      leftChecked.value = val
      if (movedKeys === undefined) return
      emit('left-check-change', val, movedKeys)
    }

    const onTargetCheckedChange = (val: string[], movedKeys: string[]) => {
      rightChecked.value = val
      if (movedKeys === undefined) return
      emit('right-check-change', val, movedKeys)
    }

    const addToLeft = () => {
      let currentValue = realValue.value.slice()
      rightChecked.value.forEach(item => {
        const index = currentValue.indexOf(item)
        if (index > -1) {
          currentValue.splice(index, 1)
        }
      })
      emit('update:modelValue', currentValue)
      emit('change', currentValue, 'left', rightChecked.value)
    }

    const addToRight = () => {
      let currentValue = realValue.value.slice()
      const itemsToBeMoved: string[] = []
      const key = props.props!.key
      props.data?.forEach(item => {
        const itemKey = item[key] as string
        if (
          leftChecked.value.indexOf(itemKey) > -1 &&
          realValue.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey)
        }
      })
      currentValue =
        props.targetOrder === 'unshift'
          ? itemsToBeMoved.concat(currentValue)
          : currentValue.concat(itemsToBeMoved)
      emit('update:modelValue', currentValue)
      emit('change', currentValue, 'right', leftChecked.value)
    }

    const clearQuery = (which: string) => {
      if (which === 'left') {
        (instance.refs.leftPanel as anyObject).query = ''
      } else if (which === 'right') {
        (instance.refs.rightPanel as anyObject).query = ''
      }
    }
    return {
      slots,
      leftChecked,
      rightChecked,
      
      addToLeft,
      addToRight,

      sourceData,
      targetData,
      onSourceCheckedChange,
      onTargetCheckedChange,
      hasButtonTexts
    }
  }
})
</script>

<style lang="scss">
@import 'theme/transfer.scss';
</style>

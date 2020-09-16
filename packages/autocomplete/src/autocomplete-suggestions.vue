<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="el-autocomplete-suggestion el-popper"
      :class="{ 'is-loading': isLoading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <el-scrollbar
        tag="ul"
        wrap-class="el-autocomplete-suggestion__wrap"
        view-class="el-autocomplete-suggestion__list">
        <li v-if="isLoading"><i class="el-icon-loading"></i></li>
        <slot v-else></slot>
      </el-scrollbar>
    </div>
  </transition>
</template>
<script lang="ts">
  import { defineComponent, reactive, getCurrentInstance, ComponentInternalInstance, provide, inject, onUpdated, nextTick, onMounted, toRefs, computed, watch, ref, PropType, ComponentPublicInstance, Prop } from 'vue'
  import ElScrollBar from 'packages/scrollbar/src/index.vue'
  // @ts-ignore
  import Popper from '@/utils/vue-popper'
  import mitt, { Emitter } from 'mitt'
  export default defineComponent({

    name: 'ElAutocompleteSuggestions',
    
    components: {
      ElScrollBar
    },

    mixins: [Popper],

    emits: ['input', 'created'],

    props: {
      id: String,
      options: {
        type: Object,
        default() {
          return {
            gpuAcceleration: false
          }
        }
      } as Prop<Object>
    },

    setup(props) {
      const instance = getCurrentInstance() as ComponentInternalInstance 
      const state = reactive({
        isLoading: false,
        dropdownWidth: '',
        showPopper: false
      })
      const popperElm = ref(null as HTMLElement | null)
      const referenceElm = ref(null as HTMLElement | null)
      const parent = ref(instance.parent)
      const autocompleteInject = inject('autocomplete') as anyObject
      const emitter = autocompleteInject.emitter as Emitter
      const select = (item: any) => {
        emitter.emit('item-click', item)
      }
      onUpdated(() => {
        nextTick(() => {
          Popper.methods.updatePopper()
        })
      })
      watch(() => parent.value, (parent: anyObject | null) => {
        return state.isLoading = !!(parent && !parent.hideLoading && parent.loading)
      })
      onMounted(() => {
        parent.value = instance.parent
        const el = (instance.vnode.el as HTMLElement)
        const input = parent.value?.refs.input as ComponentPublicInstance
        const referenceList = el.querySelector('.el-autocomplete-suggestion__list')
        popperElm.value = el
        referenceElm.value = (input.$refs.input || input.$refs.textarea) as HTMLElement
        if (instance?.parent?.vnode.el) {
          instance.parent.vnode.el.popperElm = el
        }
        referenceList?.setAttribute('role', 'listbox')
        props.id && referenceList?.setAttribute('id', props.id)
      })
      emitter.on('visible', ([val, inputWidth]) => {
        state.dropdownWidth = inputWidth + 'px'
        state.showPopper = val
      })
      return {
        ...toRefs(state),
        popperElm,
        referenceElm
      }
    }
  })
</script>

<style lang="scss">
.el-autocomplete-suggestion {
  ul {
    padding-left: 0;
  }
}
</style>
<template>
  <div class="el-image">
    <slot v-if="loading" name="placeholder">
      <div class="el-image__placeholder"></div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="el-image__error">{{ t('el.image.error') }}</div>
    </slot>
    <img
      v-else
      class="el-image__inner"
      v-bind="attrs"
      @click="clickHandler"
      :src="src"
      :style="imageStyle"
      :class="{ 'el-image__inner--center': alignCenter, 'el-image__preview': preview }"
    />
    <template v-if="preview">
      <image-viewer
        :z-index="zIndex"
        :initial-index="imageIndex"
        v-if="showViewer"
        :on-close="closeViewer"
        :url-list="previewSrcList"
      />
    </template>
  </div>
</template>

<script lang="ts">
import ImageViewer from './image-viewer.vue'
// @ts-ignore
import Locale from '@/mixins/locale'
import { on, off, getScrollContainer, isInContainer } from '@/utils/dom'
// @ts-ignore
import { isString, isHtmlElement } from '@/utils/types'
// @ts-ignore
import { throttle } from 'throttle-debounce'
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
  watch,
  watchEffect
} from 'vue'

const isSupportObjectFit = () =>
  document.documentElement.style.objectFit !== undefined

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down'
}

let prevOverflow = ''

export default defineComponent({
  name: 'ElImage',

  mixins: [Locale],
  inheritAttrs: false,

  emits: ['error'],

  components: {
    ImageViewer
  },

  props: {
    src: String,
    fit: String,
    lazy: Boolean,
    scrollContainer: {},
    previewSrcList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },

  setup(props, { emit, attrs }) {
    const state = reactive({
      loading: true,
      error: false,
      show: !props.lazy,
      imageWidth: 0,
      imageHeight: 0,
      showViewer: false
    })
    let scrollContainer: HTMLElement | null = null
    let lazyLoadHandler: Function | null = null
    const instance = getCurrentInstance() as ComponentInternalInstance
    const $isServer = false
    const imageStyle = computed(() => {
      if (!$isServer && props.fit) {
        return isSupportObjectFit()
          ? { 'object-fit': props.fit }
          : getImageStyle(props.fit)
      }
      return {}
    })
    const alignCenter = computed(() => {
      return !$isServer && !isSupportObjectFit() && props.fit !== ObjectFit.FILL
    })
    const preview = computed(() => {
      return (
        Array.isArray(props.previewSrcList) && props.previewSrcList.length > 0
      )
    })
    const imageIndex = computed(() => {
      let previewIndex = 0
      const srcIndex = props.previewSrcList.indexOf(props.src)
      if (srcIndex >= 0) {
        previewIndex = srcIndex
      }
      return previewIndex
    })
    const loadImage = () => {
      if ($isServer) return
      // reset status
      state.loading = true
      state.error = false

      const img = new Image()
      img.onload = e => handleLoad(e, img)
      img.onerror = handleError

      // bind html attrs
      // so it can behave consistently
      Object.keys(attrs).forEach(key => {
        const value = attrs[key] as string
        img.setAttribute(key, value)
      })
      img.src = props.src as string
    }
    const handleLoad = (e: Event, img: HTMLImageElement) => {
      state.imageWidth = img.width
      state.imageHeight = img.height
      state.loading = false
      state.error = false
    }
    const handleError = (e: Event | string) => {
      state.loading = false
      state.error = true
      emit('error', e)
    }
    const handleLazyLoad = () => {
      const el = instance.vnode.el as HTMLElement
      if (el && isInContainer(el, scrollContainer)) {
        state.show = true
        removeLazyLoadListener()
      }
    }
    const addLazyLoadListener = () => {
      if ($isServer) return
      let _scrollContainer = null
      const el = instance.vnode.el as HTMLElement

      if (isHtmlElement(props.scrollContainer)) {
        _scrollContainer = props.scrollContainer
      } else if (typeof props.scrollContainer === 'string') {
        _scrollContainer = document.querySelector(props.scrollContainer)
      } else {
        _scrollContainer = getScrollContainer(el)
      }

      if (_scrollContainer) {
        scrollContainer = _scrollContainer as HTMLElement
        lazyLoadHandler = throttle(200, handleLazyLoad)
        on(scrollContainer, 'scroll', lazyLoadHandler)
        handleLazyLoad()
      }
    }
    const removeLazyLoadListener = () => {
      if ($isServer || !scrollContainer || !lazyLoadHandler) return

      off(scrollContainer, 'scroll', lazyLoadHandler)
      scrollContainer = null
      lazyLoadHandler = null
    }
    /**
     * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
     */
    const getImageStyle = (fit: string) => {
      const { imageWidth, imageHeight } = state
      const el = instance.vnode.el as HTMLElement
      const { clientWidth: containerWidth, clientHeight: containerHeight } = el

      if (!imageWidth || !imageHeight || !containerWidth || !containerHeight)
        return {}

      const vertical = imageWidth / imageHeight < 1

      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller =
          imageWidth < containerWidth && imageHeight < containerHeight
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
      }

      switch (fit) {
        case ObjectFit.NONE:
          return { width: 'auto', height: 'auto' }
        case ObjectFit.CONTAIN:
          return vertical ? { width: 'auto' } : { height: 'auto' }
        case ObjectFit.COVER:
          return vertical ? { height: 'auto' } : { width: 'auto' }
        default:
          return {}
      }
    }
    const clickHandler = () => {
      // don't show viewer when preview is false
      if (!preview.value) {
        return
      }
      // prevent body scroll
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      state.showViewer = true
    }
    const closeViewer = () => {
      document.body.style.overflow = prevOverflow
      state.showViewer = false
    }

    watch(
      () => props.src,
      () => {
        state.show && loadImage()
      }
    )
    watch(
      () => state.show,
      val => {
        val && loadImage()
      }
    )

    onMounted(() => {
      if (props.lazy) {
        addLazyLoadListener()
      } else {
        loadImage()
      }
    })
    onBeforeUnmount(() => {
      props.lazy && removeLazyLoadListener()
    })

    return {
      ...toRefs(state),
      attrs,
      imageStyle,
      alignCenter,
      preview,
      imageIndex,
      clickHandler,
      closeViewer
    }
  }
})
</script>

<style lang="scss">
@import 'theme/image.scss';
</style>

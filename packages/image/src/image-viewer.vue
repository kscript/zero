<template>
  <transition name="viewer-fade">
    <div
      tabindex="-1"
      ref="el-image-viewer__wrapper"
      class="el-image-viewer__wrapper"
      :style="{ 'z-index': zIndex }"
    >
      <div class="el-image-viewer__mask"></div>
      <!-- CLOSE -->
      <span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
        <i class="el-icon-circle-close"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span
          class="el-image-viewer__btn el-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <i class="el-icon-arrow-left" />
        </span>
        <span
          class="el-image-viewer__btn el-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
          <i class="el-icon-arrow-right" />
        </span>
      </template>
      <!-- ACTIONS -->
      <div class="el-image-viewer__btn el-image-viewer__actions">
        <div class="el-image-viewer__actions__inner">
          <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
          <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i :class="mode.icon" @click="toggleMode"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')"></i>
          <i class="el-icon-refresh-right" @click="handleActions('clocelise')"></i>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="el-image-viewer__canvas">
        <img
          ref="img"
          class="el-image-viewer__img"
          :src="currentImg"
          :style="imgStyle"
          @load="handleImgLoad"
          @error="handleImgError"
          @mousedown="handleMouseDown"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { on, off } from '@/utils/dom'
// @ts-ignore
import { rafThrottle, isFirefox } from '@/utils/util'
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import { ScrollBehavior } from 'vue-router'

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original'
  }
}

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'

export default defineComponent({
  name: 'elImageViewer',

  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    onSwitch: {
      type: Function,
      default: () => {}
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },

  setup(props, {}) {
    const state = reactive({
      index: props.initialIndex,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    })
    const instance = getCurrentInstance() as ComponentInternalInstance
    const isSingle = computed(() => {
      return props.urlList.length <= 1
    })
    const isFirst = computed(() => {
      return state.index === 0
    })
    const isLast = computed(() => {
      return state.index === props.urlList.length - 1
    })
    const currentImg = computed(() => {
      return props.urlList[state.index]
    })
    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = state.transform
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        marginLeft: `${offsetX}px`,
        marginTop: `${offsetY}px`
      } as CSSStyleDeclaration
      if (state.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = '100%'
      }
      return style
    })

    const handler = {
      _keyDownHandler: null,
      _mouseWheelHandler: null,
      _dragHandler: null
    } as anyObject<Function | null>
    const img = new Image()
    watch(() => state.index, (val) => {
      reset()
      props.onSwitch(val)
    })
    watch(() => currentImg.value, (val) => {
      nextTick(() => {
        const img = (instance.refs.img as HTMLImageElement[])[0]
        if (!img.complete) {
          state.loading = true
        }
      })
    })

    const hide = () => {
      deviceSupportUninstall()
      props.onClose()
    }
    const deviceSupportInstall = () => {
      handler._keyDownHandler = rafThrottle((e: KeyboardEvent) => {
        const keyCode = e.keyCode
        switch (keyCode) {
          // ESC
          case 27:
            hide()
            break
          // SPACE
          case 32:
            toggleMode()
            break
          // LEFT_ARROW
          case 37:
            prev()
            break
          // UP_ARROW
          case 38:
            handleActions('zoomIn')
            break
          // RIGHT_ARROW
          case 39:
            next()
            break
          // DOWN_ARROW
          case 40:
            handleActions('zoomOut')
            break
        }
      })
      handler._mouseWheelHandler = rafThrottle((e: MouseWheelEvent & anyObject) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail
        if (delta > 0) {
          handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false
          })
        } else {
          handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false
          })
        }
      })
      on(document, 'keydown', handler._keyDownHandler)
      on(document, mousewheelEventName, handler._mouseWheelHandler)
    }
    const deviceSupportUninstall = () => {
      off(document, 'keydown', handler._keyDownHandler)
      off(document, mousewheelEventName, handler._mouseWheelHandler)
      handler._keyDownHandler = null
      handler._mouseWheelHandler = null
    }
    const handleImgLoad = () => {
      state.loading = false
    }
    const handleImgError = (e: Event) => {
      (e.target as HTMLImageElement).alt = '加载失败'
      state.loading = false
    }
    const handleMouseDown = (e: MouseEvent) => {
      if (state.loading || e.button !== 0) return

      const { offsetX, offsetY } = state.transform
      const startX = e.pageX
      const startY = e.pageY
      handler._dragHandler = rafThrottle((ev: MouseEvent) => {
        state.transform.offsetX = offsetX + ev.pageX - startX
        state.transform.offsetY = offsetY + ev.pageY - startY
      })
      on(document, 'mousemove', handler._dragHandler)
      on(document, 'mouseup', () => {
        off(document, 'mousemove', handler._dragHandler)
      })

      e.preventDefault()
    }
    const reset = () => {
      state.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    }
    const toggleMode = () => {
      if (state.loading) return
      const modeNames: string[] = Object.keys(Mode)
      const modeValues = Object.values(Mode)
      const index = modeValues.indexOf(state.mode)
      const nextIndex = (index + 1) % modeNames.length
      state.mode = Mode[modeNames[nextIndex] as keyof typeof Mode]
      reset()
    }
    const prev = () => {
      if (isFirst.value && !state.infinite) return
      const len = props.urlList.length
      state.index = (state.index - 1 + len) % len
    }
    const next = () => {
      if (isLast.value && !state.infinite) return
      const len = props.urlList.length
      state.index = (state.index + 1) % len
    }
    const handleActions = (action: string, options = {}) => {
      if (state.loading) return
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      }
      const { transform } = state
      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat(
              (transform.scale - zoomRate).toFixed(3)
            )
          }
          break
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
          break
        case 'clocelise':
          transform.deg += rotateDeg
          break
        case 'anticlocelise':
          transform.deg -= rotateDeg
          break
      }
      transform.enableTransition = enableTransition
    }
    onMounted(() => {
      deviceSupportInstall()
      // add tabindex then wrapper can be focusable via Javascript
      // focus wrapper so arrow key can't cause inner scroll behavior underneath
      ~(instance.refs['el-image-viewer__wrapper'] as HTMLElement)?.focus()
    })
    return {
      ...toRefs(state),
      currentImg,
      imgStyle,
      isSingle,
      isFirst,
      isLast,
      handleActions,
      toggleMode,
      prev,
      next,
      hide,
      handleImgLoad,
      handleImgError,
      handleMouseDown
    }
  }
})
</script>

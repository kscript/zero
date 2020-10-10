import { nextTick, defineComponent, onUnmounted, onBeforeUnmount, onBeforeMount, reactive, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
// @ts-ignore
import merge from '@/utils/merge'
import PopupManager from '@/utils/popup/popup-manager'
// @ts-ignore
import getScrollBarWidth from '../scrollbar-width'
import { getStyle, addClass, removeClass, hasClass } from '../dom'

let idSeed = 1;

let scrollBarWidth;
const isServer = false
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    hooks: {
      type: Object,
      default: {}
    }
  },

  setup(props) {
    const state = reactive({
      opened: false,
      bodyPaddingRight: '',
      computedBodyPaddingRight: 0,
      withoutHiddenClass: true,
      rendered: false,
    })
    const data = {
      _openTimer: 0,
      _closeTimer: 0,
      _opening: false,
      _closing: false,
      _popupId: ''
    }
    const instance = getCurrentInstance() as ComponentInternalInstance

    const hooks = Object.assign({
      onOpen() { },
      willOpen() { return true },
      onClose() { },
      willClose() { return true }
    }, props.hooks)

    const open = (options: anyObject = {}) => {
      if (!state.rendered) {
        state.rendered = true;
      }

      const newProps = merge({}, props, options);

      if (data._closeTimer) {
        clearTimeout(data._closeTimer);
        data._closeTimer = 0;
      }
      clearTimeout(data._openTimer);

      const openDelay = Number(newProps.openDelay);
      if (openDelay > 0) {
        data._openTimer = setTimeout(() => {
          data._openTimer = 0;
          doOpen(newProps);
        }, openDelay);
      } else {
        doOpen(newProps);
      }
    }

    const doOpen = (newProps: anyObject) => {
      if (isServer) return;
      if (hooks.willOpen && !hooks.willOpen()) return;
      if (state.opened) return;

      data._opening = true;

      const dom = instance.vnode.el as HTMLElement;

      const modal = newProps.modal;

      const zIndex = newProps.zIndex;
      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }

      if (modal) {
        if (data._closing) {
          PopupManager.closeModal(data._popupId);
          data._closing = false;
        }
        PopupManager.openModal(data._popupId, PopupManager.nextZIndex(), props.modalAppendToBody ? undefined : dom, newProps.modalClass, newProps.modalFade);
        if (props.lockScroll) {
          state.withoutHiddenClass = !hasClass(document.body, 'el-popup-parent--hidden');
          if (state.withoutHiddenClass) {
            state.bodyPaddingRight = document.body.style.paddingRight;
            state.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10);
          }
          scrollBarWidth = getScrollBarWidth();
          let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          let bodyOverflowY = getStyle(document.body, 'overflowY');
          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && state.withoutHiddenClass) {
            document.body.style.paddingRight = state.computedBodyPaddingRight + scrollBarWidth + 'px';
          }
          addClass(document.body, 'el-popup-parent--hidden');
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      dom.style.zIndex = String(PopupManager.nextZIndex());
      state.opened = true;

      hooks.onOpen && hooks.onOpen();

      doAfterOpen();
    }

    const doAfterOpen = () => {
      data._opening = false;
    }

    const close = () => {
      if (hooks.willClose && !hooks.willClose()) return;

      if (data._openTimer) {
        clearTimeout(data._openTimer);
        data._openTimer = 0;
      }
      clearTimeout(data._closeTimer);

      const closeDelay = Number(props.closeDelay);

      if (closeDelay > 0) {
        data._closeTimer = setTimeout(() => {
          data._closeTimer = 0;
          doClose();
        }, closeDelay);
      } else {
        doClose();
      }
    }

    const doClose = () => {
      data._closing = true;

      hooks.onClose && hooks.onClose();

      if (props.lockScroll) {
        setTimeout(restoreBodyStyle, 200);
      }

      state.opened = false;

      doAfterClose();
    }

    const doAfterClose = () => {
      PopupManager.closeModal(data._popupId);
      data._closing = false;
    }

    const restoreBodyStyle = () => {
      if (props.modal && state.withoutHiddenClass) {
        document.body.style.paddingRight = state.bodyPaddingRight;
        removeClass(document.body, 'el-popup-parent--hidden');
      }
      state.withoutHiddenClass = true;
    }

    watch(() => props.visible, (val: boolean) => {
      if (val) {
        if (data._opening) return;
        if (!state.rendered) {
          state.rendered = true;
          nextTick(() => {
            open();
          });
        } else {
          open();
        }
      } else {
        close();
      }
    })
    onBeforeMount(() => {
      data._popupId = 'popup-' + idSeed++;
      PopupManager.register(data._popupId, instance);
    })
    onBeforeUnmount(() => {
      PopupManager.deregister(data._popupId);
      PopupManager.closeModal(data._popupId);

      restoreBodyStyle();
    })

  }
});

export {
  PopupManager
};

<template>
  <transition
  @beforeEnter="beforeEnter"
  @enter="enter"
  @afterEnter="afterEnter"
  @beforeLeave="beforeLeave"
  @leave="leave"
  @afterLeave="afterLeave"
  >
    <slot />
  </transition>
</template>
<script lang="ts">
// @ts-ignore
import { addClass, removeClass } from '@src/utils/dom'
import { defineComponent, h, getCurrentInstance } from 'vue';
interface anyObject<T = any> {
    [prop: string]: T
}
interface TransitionElement extends HTMLElement {
    dataset: DOMStringMap;
    style: CSSStyleDeclaration
}
export default defineComponent({
  name: 'ElCollapseTransition',
  setup() {
    const beforeEnter = (el: TransitionElement) => {
      addClass(el, 'collapse-transition');
      if (!el.dataset) el.dataset = {};

      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.height = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
    }

    const enter = (el: TransitionElement) => {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = String(el.dataset.oldPaddingTop);
        el.style.paddingBottom = String(el.dataset.oldPaddingBottom);
      } else {
        el.style.height = '';
        el.style.paddingTop = String(el.dataset.oldPaddingTop);
        el.style.paddingBottom = String(el.dataset.oldPaddingBottom);
      }

      el.style.overflow = 'hidden';
    }

    const afterEnter = (el: TransitionElement) => {
      // for safari: remove class then reset height is necessary
      removeClass(el, 'collapse-transition');
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow as string;
    }

    const beforeLeave = (el: TransitionElement) => {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
    }

    const leave = (el: TransitionElement) => {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        addClass(el, 'collapse-transition');
        el.style.height = '0';
        el.style.paddingTop = '0';
        el.style.paddingBottom = '0';
      }
    }

    const afterLeave = (el: TransitionElement) => {
      removeClass(el, 'collapse-transition');
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow as string;
      el.style.paddingTop = el.dataset.oldPaddingTop as string;
      el.style.paddingBottom = el.dataset.oldPaddingBottom as string;
    }
    return {
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
      afterLeave
    }
  }
});
</script>
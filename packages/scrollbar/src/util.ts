import { anyObject } from 'packages/global'
export interface BaseMap {
  offset: 'offsetHeight' | 'offsetWidth'
  scroll: 'scrollTop' | 'scrollLeft'
  scrollSize: 'scrollHeight' | 'scrollWidth'
  size: 'height' | 'width'
  key: 'vertical' | 'horizontal'
  axis: 'Y' | 'X'
  client: 'clientY' | 'clientX'
  direction: 'top' | 'left'
}
export interface BarMap {
  vertical: BaseMap
  horizontal: BaseMap
}
export const BAR_MAP: BarMap = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}

export function renderThumbStyle({ move, size, bar }: {
  move?: Number,
  size?: string,
  bar: anyObject
}) {
  const style: anyObject = {}
  const translate = `translate${bar.axis}(${ move }%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}

import { Emitter } from "mitt"
import { ComputedRef } from 'vue'

export interface ElDropdownProvide {
  emitter: Emitter
  placement: string
  initDomOperation: () => void
  dropdownSize: ComputedRef<string>
  setPopperElm: (el: HTMLElement | null) => void
}

export interface IElDropdownProps {
  trigger: string
  type?: string
  size: string
  splitButton?: boolean
  hideOnClick: boolean
  placement: string
  visibleArrow: boolean,
  showTimeout: number,
  hideTimeout: number,
  tabindex: number
}
import { Emitter } from 'mitt'
export interface ElForm {
  disabled: boolean
}
export interface ElFormItem {
  elFormItemSize: string
  emitter: Emitter
}
export interface CheckboxGroup {
  min: number
  max: number
  modelValue: any
  realModelValue: any
  disabled: boolean
  size: string
  emit: (event: string, value: any) => void
  fill?: string
  textColor?: string
  handleChange: (value: string) => void
}

export interface ICheckboxProps {
  modelValue: string | boolean | number
  label?: string | boolean | number
  indeterminate?: boolean
  disabled?: boolean
  checked?: boolean
  name?: string
  trueLabel?: string | number
  falseLabel?: string | number
  id?: string
  controls?: string
  border?: boolean
  size?: string
}
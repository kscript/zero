import { Ref } from 'vue'
import { Emitter } from 'mitt'

export type modelValueArray = Array<string|number>

export type modelValueType = string | number | modelValueArray

export interface collapseProvide {
    activeNames: Ref<modelValueType>,
    emitter: Emitter
}
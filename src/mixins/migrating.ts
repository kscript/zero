// @ts-ignore
import { kebabCase } from '@/utils/util'
interface MigratingOption {
  props: {
    [prop: string]: any
  }
  events: {
    [prop: string]: any
  }
}
const getMigratingConfig: () => MigratingOption = () => {
  return {
    props: {},
    events: {}
  }
}
/**
 * Show migrating guide in browser console.
 *
 * Usage:
 * import Migrating from '@/mixins/migrating'
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    }
 *  },
 */
export default {
  mounted() {
    if (process.env.NODE_ENV === 'production') return
    const { props = {}, events = {} } = getMigratingConfig()
    // @ts-ignore
    const { $attrs, $listeners, $options } = this
    const definedProps = $attrs || {}
    const definedEvents = $listeners || {}
    for (let propName in definedProps) {
      propName = kebabCase(propName) // compatible with camel case
      if (props[propName]) {
        console.warn(`[Element Migrating][${$options.name}][Attribute]: ${props[propName]}`)
      }
    }
    for (let eventName in definedEvents) {
      eventName = kebabCase(eventName) // compatible with camel case
      if (events[eventName]) {
        console.warn(`[Element Migrating][${$options.name}][Event]: ${events[eventName]}`)
      }
    }
  }
}
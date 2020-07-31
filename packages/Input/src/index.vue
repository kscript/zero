<template>
  <div class="zr-input">
    <slot name="prefix"></slot>
    <input ref="input" :type="cType"
      v-bind="$attrs"
      v-on="$listeners"
      :class="cSize"
      @compositionstart="handler($event, 'compositionstart')"
      @compositionupdate="handler($event, 'compositionupdate')"
      @compositionend="handler($event, 'compositionend')"
      @input="handler($event, 'input')"
      @focus="handler($event, 'focus')"
      @blur="handler($event, 'blur')"
      @change="handler($event, 'change')"
    >
    <slot name="suffix"></slot>
  </div>
</template>
<script>
export default {
  name: 'zr-input',
  data() {
    return {
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: 'middle'
    }
  },
  computed: {
    cType() {
      return /^(text|password|radio|checkbox|file|image|submit|button|reset|hidden|url|number|tel|email|search|range|color|time|date|datetime|datetime-local|month|week)$/.test(this.type) ? this.type : 'text'
    },
    cSize() {
      return /^(mini|middle|big|large)$/.test(this.size) ? this.size : 'middle'
    }
  },
  methods: {
    handler(event, name) {
      this.$emit(name, event)
    }
  }
}
</script>
<style lang="scss">
.zr-input {
  input {
    outline: none;
    &.mini{
      padding: 3px 6px;
    }
    &.middle{
      padding: 5px 10px;
    }
    &.big{
      padding: 6px 12px;
    }
    &.large{
      padding: 10px 20px;
    }
  }
}
</style>

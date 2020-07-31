<template>
  <div class="zr-code" :class="'zr-code-' + mode">
    <div class="input-group" :class="groupClass" v-for="(vo, index) in len" :key="index">
      <zr-input
        type="text"
        maxlength="1"
        :value="code[index]"
        :readonly="complete"
        @input="input($event, index)"
        @keyup="keyup($event, index)"
        ref="inputEl"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'zr-code',
  data() {
    return {
      code: [],
      activeIndex: 0,
      inputEl: [],
      complete: false
    }
  },
  props: {
    len: {
      type: Number,
      default: 4
    },
    mode: {
      type: String,
      default: 'mix'
    },
    groupClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    rule() {
      return (
        {
          mix: /^[a-zA-Z0-9]$/,
          number: /^[0-9]$/,
          letter: /^[a-zA-Z]$/,
          all: /\*/
        }[this.mode] || /^[a-zA-Z0-9]$/
      )
    }
  },
  methods: {
    vcodeChange() {
      if (this.complete) return
      if (this.code.length === this.len) {
        this.complete = !this.code.includes(void 0)
      }
      this.$emit('change', this.code, this.activeIndex)
      if (this.complete) {
        this.$emit('complete', this.code)
      }
    },
    verifyNum(num) {
      const isLetter = num >= 65 && num <= 90
      const isNumber = (num >= 48 && num <= 57) || (num >= 96 && num <= 105)
      return (
        {
          mix: isLetter || isNumber,
          number: isNumber,
          letter: isLetter,
          all: true
        }[this.mode] === true
      )
    },
    keyup($event, index) {
      if (this.complete) return !!0
      const value = this.code[index]
      const num = $event.keyCode
      if (num === 8 || num === 37) {
        if (!value || num === 37) {
          this.toggleInput(index, index - 1)
        }
      } else if (num === 39) {
        this.toggleInput(index, index + 1)
      } else {
        if (value && this.verifyNum(num)) {
          this.toggleInput(index, index + 1)
          this.activeIndex = index
        }
      }
    },
    input($event, index) {
      if (this.complete) return !!0
      if (this.rule.test($event.data)) {
        const value = this.code[index]
        if (value !== '') {
          this.toggleInput(index, index + 1)
        }
        this.activeIndex = index
        this.$set(this.code, index, $event.target.value)
        this.vcodeChange()
      } else {
        this.$set(this.code, index, '')
      }
    },
    toggleInput(curr, index) {
      if (index >= 0 && index < this.len) {
        this.$refs.inputEl[curr].$refs.input.blur()
        this.$refs.inputEl[index].$refs.input.focus()
      }
    },
    clear() {
      this.code.splice(0)
      this.complete = false
    }
  },
  mounted() {
    this.$on('clear', this.clear)
  }
}
</script>
<style lang="scss">
.zr-code {
  display: table;
  width: 100%;
  .input-group {
    display: table-cell;
    padding: 0px 10px;
  }
}
.zr-code-none .input-group input {
  color: transparent;
  text-shadow: 0 0 0 #555;
  border: 1px solid #aaa;
  &:focus {
    text-shadow: 0 0 0 #42abff;
    border: 1px solid #42abff;
  }
}
</style>

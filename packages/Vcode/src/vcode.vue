<template>
  <div class="v-code" :class="'v-code-' + mode">
    <div class="input-group" :class="groupClass" v-for="(vo, index) in len" :key="index">
      <input
        type="text"
        v-model="code[index]"
        :readonly="complete"
        maxlength="1"
        @input="input(index, $event)"
        @keyup="keyup(index, $event)"
        ref="inputEl"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-code',
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
    keyup(index, $event) {
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
          this.$set(this.code, index, $event.key)
          this.toggleInput(index, index + 1)
          this.activeIndex = index
          this.vcodeChange()
        }
      }
    },
    input(index, $event) {
      if (this.complete) return !!0
      if (this.rule.test($event.data)) {
        const value = this.code[index]
        if (value !== '') {
          this.toggleInput(index, index + 1)
        }
        this.activeIndex = index
        this.vcodeChange()
      } else {
        this.$set(this.code, index, '')
      }
    },
    toggleInput(curr, index) {
      if (index >= 0 && index < this.len) {
        this.$refs.inputEl[curr].blur()
        this.$refs.inputEl[index].focus()
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
<style>
.v-code {
  display: table;
  width: 100%;
}
.v-code .input-group {
  display: table-cell;
  padding: 0px 10px;
}
.v-code .input-group input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px;
  text-align: center;
  outline: none;
}
.v-code-none .input-group input {
  color: transparent;
  text-shadow: 0 0 0 #555;
  border: 1px solid #aaa;
}
.v-code-none .input-group input:focus {
  text-shadow: 0 0 0 #42abff;
  border: 1px solid #42abff;
}
</style>

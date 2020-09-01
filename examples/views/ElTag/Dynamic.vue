<template>
<el-card shadow="hover">
  <template #header>
  <el-tag
    :key="tag"
    v-for="tag in dynamicTags"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)">
    {{tag}}
  </el-tag>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </template>
  <el-code collapse :trim="-1" :first="1">
    {{`<el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      \{\{tag\}\}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

    <script lang="ts">
      import { defineComponent, reactive, nextTick, getCurrentInstance, ComponentInternalInstance, toRefs, VNode } from 'vue'
      export default defineComponent({
        setup(props, cxt) {
          const state = reactive({
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
          })
          const instance = getCurrentInstance() as ComponentInternalInstance
          const handleClose = (tag: string) => {
            state.dynamicTags.splice(state.dynamicTags.indexOf(tag), 1)
          }

          const showInput = () => {
              state.inputVisible = true;
              nextTick(() => {
                // @ts-ignore
                instance.refs.saveTagInput.$refs.input.focus()
              })
            }

          const handleInputConfirm = () => {
            let inputValue = state.inputValue
            if (inputValue) {
              state.dynamicTags.push(inputValue)
            }
            state.inputVisible = false
            state.inputValue = ''
          }
          return {
            ...toRefs(state),
            handleClose,
            showInput,
            handleInputConfirm
          }
        }
      })
    </script>

    <style>
      .el-tag + .el-tag {
        margin-left: 10px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    </style>
    `}}
  </el-code>
</el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, nextTick, getCurrentInstance, ComponentInternalInstance, toRefs, VNode } from 'vue'
export default defineComponent({
  name: 'ElTagDynamic',
  setup(props, cxt) {
    const state = reactive({
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    })
    const instance = getCurrentInstance() as ComponentInternalInstance
    const handleClose = (tag: string) => {
      state.dynamicTags.splice(state.dynamicTags.indexOf(tag), 1)
    }

    const showInput = () => {
        state.inputVisible = true;
        nextTick(() => {
          (instance.refs.saveTagInput as anyObject).$refs.input.focus()
        })
      }

    const handleInputConfirm = () => {
      let inputValue = state.inputValue
      if (inputValue) {
        state.dynamicTags.push(inputValue)
      }
      state.inputVisible = false
      state.inputValue = ''
    }
    return {
      ...toRefs(state),
      handleClose,
      showInput,
      handleInputConfirm
    }
  }
})
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

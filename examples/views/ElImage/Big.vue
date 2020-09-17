<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-image__preview">
        <el-image 
          style="width: 100px; height: 100px"
          :src="url" 
          :preview-src-list="srcList">
        </el-image>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="demo-image__preview">
        <el-image 
          style="width: 100px; height: 100px"
          :src="url" 
          :preview-src-list="srcList">
        </el-image>
      </div>
      
      <script lang="ts">
      import { defineComponent, reactive } from 'vue'
      export default defineComponent({
        setup() {
          const state = reactive({
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
              'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
              'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ]
          })
          return {
            ...state
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'Big',
  setup() {
    const state = reactive({
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    })
    return {
      ...state
    }
  }
})
</script>
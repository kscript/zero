<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-image__error">
        <div class="block">
          <span class="demonstration">默认</span>
          <el-image></el-image>
        </div>
        <div class="block">
          <span class="demonstration">自定义</span>
          <el-image>
            <template #error>
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
            </template>
          </el-image>
        </div>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="demo-image__error">
        <div class="block">
          <span class="demonstration">默认</span>
          <el-image></el-image>
        </div>
        <div class="block">
          <span class="demonstration">自定义</span>
          <el-image>
            <template #error>
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
            </template>
          </el-image>
        </div>
      </div>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'Error',
  setup() {
    const state = reactive({
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    })
    return {
      ...state
    }
  }
})
</script>
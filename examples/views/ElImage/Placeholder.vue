<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-image__placeholder">
        <div class="block">
          <span class="demonstration">默认</span>
          <el-image :src="src"></el-image>
        </div>
        <div class="block">
          <span class="demonstration">自定义</span>
          <el-image :src="src">
            <template #placeholder>
              <div class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </template>
          </el-image>
        </div>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="demo-image__placeholder">
        <div class="block">
          <span class="demonstration">默认</span>
          <el-image :src="src"></el-image>
        </div>
        <div class="block">
          <span class="demonstration">自定义</span>
          <el-image :src="src">
            <template #placeholder>
              <div class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </template>
          </el-image>
        </div>
      </div>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const src = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')
          return {
            src
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Placeholder',
  setup() {
    const src = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')
    return {
      src
    }
  }
})
</script>
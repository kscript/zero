<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
          <span class="demonstration">{{ fit }}</span>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :fit="fit"></el-image>
        </div>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
          <span class="demonstration">\{\{ fit \}\}</span>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :fit="fit"></el-image>
        </div>
      </div>
      
      <script lang="ts">
      import { defineComponent, reactive } from 'vue'
      export default defineComponent({
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
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'Base',
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
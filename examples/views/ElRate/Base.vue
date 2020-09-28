<template>
  <el-card shadow="hover">
    <template #header>
      <div class="block">
        <span class="demonstration">默认不区分颜色</span>
        <el-rate v-model="value1"></el-rate>
      </div>
      <div class="block">
        <span class="demonstration">区分颜色</span>
        <el-rate
          v-model="value2"
          :colors="colors">
        </el-rate>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="block">
        <span class="demonstration">默认不区分颜色</span>
        <el-rate v-model="value1"></el-rate>
      </div>
      <div class="block">
        <span class="demonstration">区分颜色</span>
        <el-rate
          v-model="value2"
          :colors="colors">
        </el-rate>
      </div>
      
      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const state = reactive({
            value1: null,
            value2: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
          })
          return {
            ...toRefs(state)
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Base',
  setup() {
    const state = reactive({
      value1: null,
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
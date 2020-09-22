<template>
  <el-card shadow="hover">
    <template #header>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
      </ul>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in count" :key="i" class="infinite-list-item">\{\{ i \}\}</li>
      </ul>
      <script lang="ts">
      import { defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const count = ref(10)
          const load = () => {
            count.value += 10
          }
          return {
            count
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
  name: 'Base',
  setup() {
    const count = ref(10)
    const load = () => {
      count.value += 10
    }
    return {
      count,
      load
    }
  }
})
</script>
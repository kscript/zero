<template>
  <el-card shadow="hover">
    <template #header>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
          <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
          <li v-for="i in count" :key="i" class="list-item">\{\{ i \}\}</li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
      <script lang="ts">
      import { computed, defineComponent, ref } from 'vue'
      export default defineComponent({
        setup() {
          const count = ref(10)
          const loading = ref(false)
          const noMore = computed(() => {
            return count.value >= 20
          })
          const disabled = computed(() => {
            return loading.value || noMore.value
          })
          const load = () => {
            loading.value = true
            setTimeout(() => {
              count.value += 2
              loading.value = false
            }, 2000)
          }
          return {
            count,
            loading,
            noMore,
            disabled,
            load
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Disabled',
  setup() {
    const count = ref(10)
    const loading = ref(false)
    const noMore = computed(() => {
      return count.value >= 20
    })
    const disabled = computed(() => {
      return loading.value || noMore.value
    })
    const load = () => {
      loading.value = true
      setTimeout(() => {
        count.value += 2
        loading.value = false
      }, 2000)
    }
    return {
      count,
      loading,
      noMore,
      disabled,
      load
    }
  }
})
</script>
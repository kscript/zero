<template>
  <el-card shadow="never">
    <template #header>
      <div class="tag-group">
      <span class="tag-group__title">Dark</span>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="dark">
        {{ item.label }}
      </el-tag>
    </div>
    <div class="tag-group">
      <span class="tag-group__title">Plain</span>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="plain">
        {{ item.label }}
      </el-tag>
    </div>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="通过设置effect属性来改变主题，默认为 light">
    <!--
    <div class="tag-group">
      <span class="tag-group__title">Dark</span>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="dark">
        {{ item.label }}
      </el-tag>
    </div>
    <div class="tag-group">
      <span class="tag-group__title">Plain</span>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="plain">
        {{ item.label }}
      </el-tag>
    </div>

    <script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
      setup() {
        const items = ref([
          { type: '', label: '标签一' },
          { type: 'success', label: '标签二' },
          { type: 'info', label: '标签三' },
          { type: 'danger', label: '标签四' },
          { type: 'warning', label: '标签五' }
        ])
        return {
          items
        }
      }
    })
    </script>
    -->
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ElTagTheme',
  setup() {
    const items = ref([
      { type: '', label: '标签一' },
      { type: 'success', label: '标签二' },
      { type: 'info', label: '标签三' },
      { type: 'danger', label: '标签四' },
      { type: 'warning', label: '标签五' }
    ])
    return {
      items
    }
  }
})
</script>
<style lang="scss" scoped>
.tag-group{
  margin-bottom: 10px;
  .tag-group__title {
    margin-right: 10px;
  }
}
</style>
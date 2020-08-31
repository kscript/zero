<template>
  <el-card shadow="never">
    <template #header>
      <el-tag closable>默认标签</el-tag>
      <el-tag size="medium" closable>中等标签</el-tag>
      <el-tag size="small" closable>小型标签</el-tag>
      <el-tag size="mini" closable>超小标签</el-tag>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。">
    {{`<el-tag closable>默认标签</el-tag>
    <el-tag size="medium" closable>中等标签</el-tag>
    <el-tag size="small" closable>小型标签</el-tag>
    <el-tag size="mini" closable>超小标签</el-tag>

    <script>
    import { defineComponent } from 'vue'
    export default defineComponent({
    })
    </script>`}}
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElTagSize'
})
</script>
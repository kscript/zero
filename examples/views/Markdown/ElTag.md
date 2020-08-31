## Tag 标签
用于标记和选择。

### 基础用法
<el-card shadow="never">
<template #header>
  <el-tag>标签一</el-tag>
  <el-tag type="success">标签二</el-tag>
  <el-tag type="info">标签三</el-tag>
  <el-tag type="warning">标签四</el-tag>
  <el-tag type="danger">标签五</el-tag>
</template>
<el-code collapse desc="由type属性来选择tag的类型，也可以通过color属性来自定义背景色。">
<!--
<el-tag>标签一</el-tag>
<el-tag type="success">标签二</el-tag>
<el-tag type="info">标签三</el-tag>
<el-tag type="warning">标签四</el-tag>
<el-tag type="danger">标签五</el-tag>
-->
</el-code>
</el-card>

### 可移除标签

<el-card shadow="never">
<template #header>
<el-tag v-for="tag in [
  { name: '标签一', type: '' },
  { name: '标签二', type: 'success' },
  { name: '标签三', type: 'info' },
  { name: '标签四', type: 'warning' },
  { name: '标签五', type: 'danger' }]"
  :key="tag.name"
  :type="tag.type"
  closable>{{tag.name}}</el-tag>
</template>
<el-code collapse desc="设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，*true* 为关闭。">
<!--
<el-tag
  v-for="tag in tags"
  :key="tag.name"
  closable
  :type="tag.type">
  {{tag.name}}
</el-tag>
<script>
  export default {
    data() {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      }
    }
  }
</script>
--></el-code>
</el-card>

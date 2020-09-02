## Tag 标签
用于标记和选择。

### 基础用法
<i></i>
<el-tag-base>
由`type`属性来选择**tag**的类型，也可以通过`color`属性来自定义背景色。
</el-tag-base>
  

### 可移除标签
<i></i>
<el-tag-remove>
设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，**true** 为关闭。
</el-tag-remove>
  

### 动态编辑标签
动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现  

<el-tag-dynamic></el-tag-dynamic>
  

### 不同尺寸
**Tag** 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。  
<el-tag-size>
额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。
</el-tag-size>
  

### 不同主题
**Tag** 组件提供了三个不同的主题：`dark`、`light` 和 `plain`  
<el-tag-theme>
通过设置`effect`属性来改变主题，默认为 `light`
</el-tag-theme>
  

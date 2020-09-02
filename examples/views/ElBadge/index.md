## Badge 标记
出现在按钮、图标旁的数字或状态标记。

### 基础用法
展示新消息数量。
<el-badge-base>
定义`value`属性，它接受`Number`或者`String`。
</el-badge-base>

### 最大值
可自定义最大值。
<el-badge-max>
由`max`属性定义，它接受一个`Number`，需要注意的是，只有当`value`为`Number`时，它才会生效。
</el-badge-max>

### 自定义内容
可以显示数字以外的文本内容。
<el-badge-custom>
定义`value`为`String`类型是时可以用于显示自定义文本。
</el-badge-custom>

### 小红点
以红点的形式标注需要关注的内容。
<el-badge-dot>
除了数字外，设置`is-dot`属性，它接受一个`Boolean`。
</el-badge-dot>

### Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|value|显示值|string, number|—|—|
|max|最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型|number|—|—|
is-dot|小圆点|boolean|—|false|
|hidden|隐藏 badge|boolean|—|false|
|type|类型|string|primary / success / warning / danger / info|—|

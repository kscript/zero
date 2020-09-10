## Checkbox 多选框
一组备选项中进行多选

### 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。
<el-checkbox-base>
在`el-checkbox`元素中定义`v-model`绑定变量，单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。
</el-checkbox-base>

### 禁用状态
多选框不可用状态。
<el-checkbox-disabled>
设置`disabled`属性即可。
</el-checkbox-disabled>

### 多选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。
<el-checkbox-Multi>
`checkbox-group`元素能把多个 `checkbox` 管理为一组，只需要在 **Group** 中使用`v-model`绑定`Array`类型的变量即可。 `el-checkbox` 的 `label`属性是该 **checkbox** 对应的值，若该标签中无内容，则该属性也充当 **checkbox** 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。
</el-checkbox-Multi>

### indeterminate 状态
`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
<el-checkbox-indeterminate></el-checkbox-indeterminate>

### 可选项目数量的限制
使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。
<el-checkbox-quantity></el-checkbox-quantity>

### 按钮样式
按钮样式的多选组合。
<el-checkbox-button-demo>
只需要把`el-checkbox`元素替换为`el-checkbox-button`元素即可。此外，还提供了`size`属性。
</el-checkbox-button-demo>

### 带有边框
<i></i>
<el-checkbox-border>
设置`border`属性可以渲染为带有边框的多选框。
</el-checkbox-border>

### Checkbox Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|value / v-model|绑定值|string / number / boolean|—|—|
|label|选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）|string / number / boolean|—|—|
|true-label|选中时的值|string / number|—|—|
|false-label|没有选中时的值|string / number|—|—|
|disabled|是否禁用|boolean|—|false|
|border|是否显示边框|boolean|—|false|
|size|Checkbox 的尺寸，仅在 border 为真时有效|string|medium / small / mini|—|
|name|原生 name 属性|string|—|—|
|checked|当前是否勾选|boolean|—|false|
|indeterminate|设置 indeterminate 状态，只负责样式控制|boolean|—|false|

### Checkbox Events
|事件名称|说明|回调参数|
|--|--|--|
|change|当绑定值变化时触发的事件|更新后的值|

### Checkbox-group Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|value / v-model|绑定值|array|—|—|
|size|多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效|string|medium / small / mini|—|
|disabled|是否禁用|boolean|—|false|
|min|可被勾选的 checkbox 的最小数量|number|—|—|
|max|可被勾选的 checkbox 的最大数量|number|—|—|
|text-color|按钮形式的 Checkbox 激活时的文本颜色|string|—|#ffffff|
|fill|按钮形式的 Checkbox 激活时的填充色和边框色|string|—|#409EFF|

### Checkbox-group Events
|事件名称|说明|回调参数|
|--|--|--|
|change|当绑定值变化时触发的事件|更新后的值|

### Checkbox-button Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|label|选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）|string / number / boolean|—|—|
|true-label|选中时的值|string / number|—|—|
|false-label|没有选中时的值|string / number|—|—|
|disabled|是否禁用|boolean|—|false|
|name|原生 name 属性|string|—|—|
|checked|当前是否勾选|boolean|—|false|

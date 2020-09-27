## Switch 开关
表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基本用法
<i></i>
<el-switch-base>
绑定`v-model`到一个`Boolean`类型的变量。可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。
</el-switch-base>

### 文字描述
<i></i>
<el-switch-desc>
使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。
</el-switch-desc>

### 扩展的 value 类型
<i></i>
<el-switch-value>
设置`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值。
</el-switch-value>

### 禁用状态
<i></i>
<el-switch-disabled>
设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。
</el-switch-disabled>

### Radio Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|value / v-model|绑定值|string / number / boolean|—|—|
|label|Radio 的 value|string / number / boolean|—|—|
|disabled|是否禁用|boolean|—|false|
|border|是否显示边框|boolean|—|false|
|size|Radio 的尺寸，仅在 border 为真时有效|string|medium / small / mini|—|
|name|原生 name 属性|string|—|—|

### Radio Events
|事件名称|说明|回调参数|
|--|--|--|
|change|绑定值变化时触发的事件|选中的 Radio label 值|

### Radio-group Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|value / v-model|绑定值|string / number / boolean|—|—|
|size|单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效|string|medium / small / mini|—|
|disabled|是否禁用|boolean|—|false|
|text-color|按钮形式的 Radio 激活时的文本颜色|string|—|#ffffff|
|fill|按钮形式的 Radio 激活时的填充色和边框色|string|—|#409EFF|

### Radio-group Events
|事件名称|说明|回调参数|
|--|--|--|
|change|绑定值变化时触发的事件|选中的 Radio label 值|

### Radio-button Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|label|Radio 的 value|string / number|—|—|
|disabled|是否禁用|boolean|—|false|
|name|原生 name 属性|string|—|—|
## Button 按钮
常用的操作按钮。

### 基础用法
基础的按钮用法。
<el-button-base>
使用`type`、`plain`、`round`和`circle`属性来定义 **Button** 的样式。
</el-button-base>

### 禁用状态
按钮不可用状态。
<el-button-disabled>
你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。
</el-button-disabled>

### 文字按钮
没有边框和背景色的按钮。
<el-button-text></el-button-text>

### 图标按钮
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。
<el-button-icon>
设置`icon`属性即可，**icon** 的列表可以参考 **Element** 的 **icon** 组件，也可以设置在文字右边的 **icon** ，只要使用`i`标签即可，可以使用自定义图标。
</el-button-icon>

### 按钮组
以按钮组的方式出现，常用于多项类似操作。
<el-button-group-demo>
使用`<el-button-group>`标签来嵌套你的按钮。
</el-button-group-demo>

### 加载中
点击按钮后进行数据加载操作，在按钮上显示加载状态。
<el-button-loading>
要设置为 **loading** 状态，只要设置`loading`属性为`true`即可。
</el-button-loading>

### 不同尺寸
**Button** 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
<el-button-size>
额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。
</el-button-size>

### Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|size|尺寸|string|medium / small / mini|—|
|type|类型|string|primary / success / warning / danger / info / text|—|
|plain|是否朴素按钮|boolean|—|false|
|round|是否圆角按钮|boolean|—|false|
|circle|是否圆形按钮|boolean|—|false|
|loading|是否加载中状态|boolean|—|false|
|disabled|是否禁用状态|boolean|—|false|
|icon|图标类名|string|—|—|
|autofocus|是否默认聚焦|boolean|—|false|
|native-type|原生 type 属性|string|button / submit / reset|button|


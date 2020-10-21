## Steps 步骤条
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法
简单的步骤条。
<el-steps-base>
设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置`space`属性即可，它接受`Number`，单位为`px`，如果不设置，则为自适应。设置`finish-status`属性可以改变已经完成的步骤的状态。
</el-steps-base>

### 含状态步骤条
每一步骤显示出该步骤的状态。
<el-steps-status>
也可以使用`title`具名分发，可以用`slot`的方式来取代属性的设置，在本文档最后的列表中有所有的 slot name 可供参考。
</el-steps-status>

### 有描述的步骤条
每个步骤有其对应的步骤状态描述。
<el-steps-desc></el-steps-desc>

### 居中的步骤条
标题和描述都将居中。
<el-steps-center></el-steps-center>

### 带图标的步骤条
步骤条内可以启用各种自定义的图标。
<el-steps-icon>
通过`icon`属性来设置图标，图标的类型可以参考 Icon 组件的文档，除此以外，还能通过具名`slot`来使用自定义的图标。
</el-steps-icon>

### 竖式步骤条
竖直方向的步骤条。
<el-steps-vertical>
只需要在`el-steps`元素中设置`direction`属性为`vertical`即可。
</el-steps-vertical>

### 简洁风格的步骤条
设置 simple 可应用简洁风格，该条件下 align-center / description / direction / space 都将失效。
<el-steps-simple>
设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置`space`属性即可，它接受`Number`，单位为`px`，如果不设置，则为自适应。设置`finish-status`属性可以改变已经完成的步骤的状态。
</el-steps-simple>

### Steps Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|space|每个 step 的间距，不填写将自适应间距。支持百分比。|number / string|—|—|
|direction|显示方向|string|vertical/horizontal|horizontal|
|active|设置当前激活步骤|number|—|0|
|process-status|设置当前步骤的状态|string|wait / process / finish / error / success|process|
|finish-status|设置结束步骤的状态|string|wait / process / finish / error / success|finish|
|align-center|进行居中对齐|boolean|-|false|
|simple|是否应用简洁风格|boolean|-|false|

### Step Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|title|标题|string|—|—|
|description|描述性文字|string|—|—|
|icon|图标|传入 icon 的 class 全名来自定义 icon，也支持 slot 方式写入|string|—|
|status|设置当前步骤的状态，不设置则根据 steps 确定状态|wait / process / finish / error / success|-||

### Step Slot
|name|说明|
|--|--|
|icon|自定义图标|
|title|自定义标题|
|description|自定义描述性文字|
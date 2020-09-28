## Timeline 时间线
可视化地呈现时间流信息。

### 基础用法
Timeline 可拆分成多个按照时间戳正序或倒序排列的 activity，时间戳是其区分于其他控件的重要特征，使用时注意与 Steps 步骤条等区分。
<el-timeline-base>
</el-timeline-base>

### 自定义节点样式
可根据实际场景自定义节点尺寸、颜色，或直接使用图标。
<el-timeline-style>
</el-timeline-style>

### 自定义时间戳
当内容在垂直方向上过⾼时，可将时间戳置于内容之上。
<el-timeline-timestamp>
</el-timeline-timestamp>

### Timeline Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|reverse|指定节点排序方向，默认为正序|boolean|—|false|

### Timeline-item Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|timestamp|时间戳|string|-|—|
|hide-timestamp|是否隐藏时间戳|boolean|—|false|
|placement|时间戳位置|string|top / bottom|bottom|
|type|节点类型|string|primary / success / warning / danger / info|-|
|color|节点颜色|string|hsl / hsv / hex / rgb|-|
|size|节点尺寸|string|normal / large|normal|
|icon|节点图标|string|—|-|

### Timeline-Item Slot
|name|说明|
|--|--|
|—|Timeline-Item 的内容|
|dot|自定义节点|
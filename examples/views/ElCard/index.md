## Card 卡片
将信息聚合在卡片容器中展示。

### 基础用法
包含标题，内容和操作
<el-card-base>
**Card** 组件包括`header`和`body`部分，`header`部分需要有显式具名 **slot** 分发，同时也是可选的。
</el-card-base>

### 简单卡片
卡片可以只有内容区域。
<el-card-simple></el-card-simple>

### 带图片
可配置定义更丰富的内容展示。
<el-card-image>
配置`body-style`属性来自定义`body`部分的`style`，我们还使用了布局组件。
</el-card-image>

### 卡片阴影
可对阴影的显示进行配置。
<el-card-shadow>
通过`shadow`属性设置卡片阴影出现的时机：`always`、`hover`或`never`。
</el-card-shadow>

### Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|header|设置 header，也可以通过 slot#header 传入 DOM|string|—|—|
|body-style|设置 body 的样式|object|—|{ padding: '20px' }|
|shadow|设置阴影显示时机|string|always / hover / never|always|
## Pagination 分页
当数据量过多时，使用分页分解数据。

### 基础用法
<i></i>
<el-pagination-base>
设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`prev`表示上一页，`next`为下一页，`pager`表示页码列表，除此以外还提供了`jumper`和`total`，`size`和特殊的布局符号`->`，`->`后的元素会靠右显示，`jumper`表示跳页元素，`total`表示总条目数，`size`用于设置每页显示的页码数量。
</el-pagination-base>

### 设置最大页码按钮数
<i></i>
<el-pagination-max>
默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过`pager-count`属性可以设置最大页码按钮数。
</el-pagination-max>

### 带有背景色的分页
<i></i>
<el-pagination-background>
设置`background`属性可以为分页按钮添加背景色。
</el-pagination-background>

### 小型分页
在空间有限的情况下，可以使用简单的小型分页。
<el-pagination-small>
只需要一个`small`属性，它接受一个`Boolean`，默认为`false`，设为`true`即可启用。
</el-pagination-small>

### 附加功能
根据场景需要，可以添加其他功能模块。
<el-pagination-whole>
此例是一个完整的用例，使用了`size-change`和`current-change`事件来处理页码大小和当前页变动时候触发的事件。`page-sizes`接受一个整型数组，数组元素为展示的选择每页显示个数的选项，`[100, 200, 300, 400]`表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。
</el-pagination-whole>

### 当只有一页时隐藏分页
当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。
<el-pagination-hide>
</el-pagination-hide>

### Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|small|是否使用小型分页样式|boolean|—|false|
|background|是否为分页按钮添加背景色|boolean|—|false|
|page-size|每页显示条目个数，支持 .sync 修饰符|number|—|10|
|total|总条目数|number|—|—|
|page-count|总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性|Number|—|—|
|pager-count|页码按钮的数量，当总页数超过该值时会折叠|number|大于等于 5 且小于等于 21 的奇数|7|
|current-page|当前页数，支持 .sync 修饰符|number|—|1|
|layout|组件布局，子组件名用逗号分隔|String|sizes, prev, pager, next, jumper, ->, total, slot|'prev, pager, next, jumper, ->, total'|
|page-sizes|每页显示个数选择器的选项设置|number[]|—|[10, 20, 30, 40, 50, 100]|
|popper-class|每页显示个数选择器的下拉框类名|string|—|—|
|prev-text|替代图标显示的上一页文字|string|—|—|
|next-text|替代图标显示的下一页文字|string|—|—|
|disabled|是否禁用|boolean|—|false|
|hide-on-single-page|只有一页时是否隐藏|boolean|—|-|

### Events
|事件名称|说明|回调参数|
|--|--|--|
|size-change|pageSize 改变时会触发|每页条数|
|current-change|currentPage 改变时会触发|当前页|
|prev-click|用户点击上一页按钮改变当前页后触发|当前页|
|next-click|用户点击下一页按钮改变当前页后触发|当前页|

### Slot
|name|说明|
|--|--|
|—|自定义内容，需要在 layout 中列出 slot|
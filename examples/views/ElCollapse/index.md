## Collapse 折叠面板
通过折叠面板收纳内容区域

### 基础用法
可同时展开多个面板，面板之间不影响
<el-collapse-base></el-collapse-base>

### 手风琴效果
每次只能展开一个面板
<el-collapse-accordion>
通过 `accordion` 属性来设置是否以手风琴模式显示。
</el-collapse-accordion>

### 自定义面板标题
除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。
<el-collapse-custom></el-collapse-custom>

### Collapse Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|value / v-model|当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)|string / array|—|—|
|accordion|是否手风琴模式|boolean|—|false|

### Collapse Events
|事件名称|说明|回调参数|
|--|--|--|
|change|当前激活面板改变时触发(如果是手风琴模式，参数 activeNames 类型为string，否则为array)|(activeNames: array / string)|

### Collapse Item Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|name|唯一标志符|string/number|—|—|
|title|面板标题|string|—|—|
|disabled|是否禁用|boolean|—|—|

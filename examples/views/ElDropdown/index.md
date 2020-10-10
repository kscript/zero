## Dropdown 下拉菜单
将动作或菜单折叠到下拉菜单中。

### 基础用法
移动到下拉菜单上，展开更多操作。
<el-dropdown-base>
通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。
</el-dropdown-base>

### 触发对象
可使用按钮触发下拉菜单。
<el-dropdown-trigger>
设置`split-button`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。
</el-dropdown-trigger>

### 触发方式
可以配置 click 激活或者 hover 激活。
<el-dropdown-reference>
在`trigger`属性设置为`click`即可。
</el-dropdown-reference>

### 菜单隐藏方式(待调整)
可以`hide-on-click`属性来配置。
<el-dropdown-hide>
下拉菜单默认在点击菜单项后会被隐藏，将`hide-on-click`属性默认为`false`可以关闭此功能。
</el-dropdown-hide>

### 指令事件
点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作
<el-dropdown-command></el-dropdown-command>

### 不同尺寸
Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。
<el-dropdown-size>
额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。
</el-dropdown-size>

### Dropdown Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|type|菜单按钮类型，同 Button 组件(只在split-button为 true 的情况下有效)|string|—|—|
|size|菜单尺寸，在split-button为 true 的情况下也对触发按钮生效|string|medium / small / mini|—|
|split-button|下拉触发元素呈现为按钮组|boolean|—|false|
|placement|菜单弹出位置|string|top/top-start/top-end/bottom/bottom-start/bottom-end|bottom-end|
|trigger|触发下拉的行为|string|hover, click|hover|
|hide-on-click|是否在点击菜单项后隐藏菜单|boolean|—|true|
|show-timeout|展开下拉菜单的延时（仅在 trigger 为 hover 时有效）|number|—|250|
|hide-timeout|收起下拉菜单的延时（仅在 trigger 为 hover 时有效）|number|—|150|
|tabindex|Dropdown 组件的 tabindex|number|—|0|

### Dropdown Slots
|Name|说明|
|--|--|
|—|触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件|
|dropdown|下拉列表，通常是 el-dropdown-menu 组件|

### Dropdown Events
|事件名称|说明|回调参数|
|--|--|--|
|click|split-button 为 true 时，点击左侧按钮的回调|—|
|command|点击菜单项触发的事件回调|dropdown-item 的指令|
|visible-change|下拉框出现/隐藏时触发|出现则为 true，隐藏则为 false|

### Dropdown Menu Item Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|command|指令|string/number/object|—|—|
|disabled|禁用|boolean|—|false|
|divided|显示分割线|boolean|—|false|
|icon|图标类名|string|—|—|
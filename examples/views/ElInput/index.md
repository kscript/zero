## Input 输入框
通过鼠标或键盘输入字符

> **Input** 为受控组件，它**总会显示 Vue 绑定值**。  
> 通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则，输入框内显示的值将不会改变。  
> 不支持 `v-model` 修饰符。  

### 基础用法
<el-input-base></el-input-base>
  
### 禁用状态
<i></i>
<el-input-disabled>
通过 `disabled` 属性指定是否禁用 **input** 组件
</el-input-disabled>

### 可清空
<i></i>
<el-input-clear>
使用`clearable`属性即可得到一个可清空的输入框
</el-input-clear>

### 密码框
<i></i>
<el-input-password>
使用`show-password`属性即可得到一个可切换显示隐藏的密码框
</el-input-password>

### 带 icon 的输入框
带有图标标记输入类型
<el-input-icon>
可以通过 `prefix-icon` 和 `suffix-icon` 属性在 **input** 组件首部和尾部增加显示图标，也可以通过 `slot` 来放置图标。
</el-input-icon>

### 文本域
用于输入多行文本信息，通过将 `type` 属性的值指定为 **textarea。**
<el-input-textarea>
文本域高度可通过 `rows` 属性控制
</el-input-textarea>

### 可自适应文本高度的文本域
通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。
<el-input-autosize></el-input-autosize>

### 复合型输入框
可前置或后置元素，一般为标签或按钮
<el-input-compound>
可通过 **slot** 来指定在 **input** 中前置或者后置内容。
</el-input-compound>

### 尺寸
<i></i>
<el-input-size>
可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 `large`、`small` 和 `mini` 三种尺寸。(?)
</el-input-size>

### 带输入建议
根据输入内容提供对应的输入建议
> Autocomplete 组件暂未加入组件库

### 自定义模板
可自定义输入建议的显示
> Autocomplete 组件暂未加入组件库

### 远程搜索
从服务端搜索数据
> Autocomplete 组件暂未加入组件库

### 输入长度限制
<i></i>
<el-input-length>
`maxlength` 和 `minlength` 是原生属性，用来限制输入框的字符长度，其中字符长度是用 **Javascript** 的字符串长度统计的。对于类型为 `text` 或 `textarea` 的输入框，在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计。
</el-input-length>
## Input 输入框
通过鼠标或键盘输入字符

> Input 为受控组件，它总会显示 Vue 绑定值。  
> 通常情况下，应当处理 input 事件，并更新组件的绑定值（或使用v-model）。否则，输入框内显示的值将不会改变。  
> 不支持 v-model 修饰符。  

### 基础用法
<el-input-base></el-input-base>
  
### 禁用状态
<el-input-disabled></el-input-disabled>

### 可清空
<el-input-clear></el-input-clear>

### 密码框
<el-input-password></el-input-password>

### 带 icon 的输入框
带有图标标记输入类型
<el-input-icon></el-input-icon>

### 文本域
用于输入多行文本信息，通过将 `type` 属性的值指定为 `textarea`。
<el-input-textarea></el-input-textarea>

### 可自适应文本高度的文本域
通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。
<el-input-autosize></el-input-autosize>

### 复合型输入框
可前置或后置元素，一般为标签或按钮
<el-input-compound></el-input-compound>

### 尺寸
<el-input-size></el-input-size>

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
<el-input-length></el-input-length>
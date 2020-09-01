## Alert 警告
用于页面中展示重要的提示信息。

### 基本用法
页面中的非浮层元素，不会自动消失。
<el-alert-base>
<template v-slot:desc>
**Alert** 组件提供四种主题，由`type`属性指定，默认值为`info`。
</template>
</el-alert-base>

### 主题
**Alert** 组件提供了两个不同的主题：`light`和`dark`。
<el-alert-theme>
<template v-slot:desc>
通过设置`effect`属性来改变主题，默认为`light`。
</template>
</el-alert-theme>

### 自定义关闭按钮
自定义关闭按钮为文字或其他符号
<el-alert-custom>
<template v-slot:desc>
在 `Alert` 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable`属性决定是否可关闭，接受`boolean`，默认为`true`。你可以设置`close-text`属性来代替右侧的关闭图标，注意：`close-text`必须为文本。设置`close`事件来设置关闭时的回调。
</template>
</el-alert-custom>


### 带有 icon
表示某种状态时提升可读性。
<el-alert-icon>
<template v-slot:desc>
通过设置`show-icon`属性来显示 **Alert** 的 **icon**，这能更有效地向用户展示你的显示意图。
</template>
</el-alert-icon>

### 文字居中
使用 `center` 属性让文字水平居中。
<el-alert-center></el-alert-center>

### 带有辅助性文字介绍
包含标题和内容，解释更详细的警告。
<el-alert-Assist>
<template v-slot:desc>
除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。
</template>
</el-alert-Assist>


### 带有 icon 和辅助性文字介绍
<el-alert-Assist-icon>
<template v-slot:desc>
最后，这是一个同时具有 **icon** 和辅助性文字的样例。
</template>
</el-alert-Assist-icon>
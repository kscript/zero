# @zero-ui/vue
使用 vue3 重构的 element-ui 组件库

## 使用方法
1. 安装zero-ui
```
// yarn
yarn add -D @zero-ui/vue
// npm
npm i -D @zero-ui/vue
```
2. 使用
``` javascript
import { createApp } from 'vue'
import App from './App.vue'
import ZeroUI from '@zero-ui/vue'
import '@zero-ui/vue/lib/zero.css'
createApp(App).use(ZeroUI).mount('#app')
```

## 在线demo
[@zero-ui/vue](https://kscript.github.io/zero/)

## 现有组件
- [x] Alert 警告  
- [x] Avatar 头像  
- [x] Backtop 返回顶部  
- [x] Badge 标记  
- [x] Breadcrumb 面包屑  
- [x] Button 按钮  
- [x] Calendar 日历  
- [x] Card 卡片  
- [x] Carousel 走马灯  
- [x] Checkbox 多选框  
- [x] Code* 代码块  
- [x] Collapse 折叠面板  
- [x] Dialog 对话框  
- [x] Divider 分割线  
- [x] Drawer 抽屉  
- [x] Form 表单  
- [x] Icon 图标  
- [x] Input 输入框  
- [x] Image 图片  
- [x] InfiniteScroll 无限滚动  
- [x] Link 链接  
- [x] Markdown*  
- [x] Pagination 分页  
- [x] Progress 进度条  
- [x] Radio 单选框  
- [x] Rate 评分  
- [x] Select 选择器  
- [x] Steps 步骤条  
- [x] Scrollbar 滚动条  
- [x] Switch 开关  
- [x] Tag 标签  
- [x] Timeline 时间线  
- [x] Container 布局容器 (Container/Header/Aside/Main/Footer)
- [x] Layout 布局 (Row/Col)

> 带*号的组件是新添加的, 不在element-ui组件库之内

## 贡献指南
如果你也想要为重构vue3版本的element-ui出一份力, 可以先浏览参考这份[贡献指南 Guide](./Guide.md), 方便快速上手

## 交流群
前端技术交流群(QQ)  
群号: [218699135](https://qm.qq.com/cgi-bin/qm/qr?k=dny0rBikAgLvvYwzKT8IOBzq70KvwEMs&jump_from=webapi)  
二维码:  
![](https://qun.qq.com/qrcode/index?data=https%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Fk%3Ddny0rBikAgLvvYwzKT8IOBzq70KvwEMs%26jump_from%3Dwebapi%26qr%3D1)  

## 参考 
- [element](https://github.com/ElemeFE/element)  
- [ele-next](https://github.com/a631807682/ele-next)
- [element-plus](https://github.com/element-plus/element-plus)

## lisence
MIT
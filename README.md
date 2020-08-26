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
import { createApp } from 'vue';
import App from './App.vue';
import zeroUI from '@zero-ui/vue';
import '@zero-ui/vue/lib/zero.css';
createApp(App).use(zeroUI).mount('#app');
```

## 在线demo
[@zero-ui/vue](https://kscript.github.io/zero/)

## 现有组件
- [x] alert
- [x] avatar
- [x] backtop
- [x] badge
- [x] button
- [x] card
- [x] code (自己封装的, 用于演示)
- [x] collapse
- [x] icon
- [x] input
- [x] tag

## 参考 
- [element](https://github.com/ElemeFE/element)  
- [ele-next](https://github.com/a631807682/ele-next)
- [element-plus](https://github.com/element-plus/element-plus)

## lisence
MIT
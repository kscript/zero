## 组件开发

首先, 有两种方式可以快速地创建单一组件的结构:
1. 复制 element-ui 项目 [packages](https://github.com/ElemeFE/element/tree/dev/packages) 文件夹下, 要开发的组件所在的文件夹
2. 复制 当前项目 [template](templates/packages/template) 文件夹的组件模板  

两种方式二选一, 复制到 [packages](packages) 目录下, 重命名, 然后按以下结构调整文件:
- index.ts (入口) 内容有固定格式, 请参考[组件入口文件示例](#组件入口文件)
- src/index.vue (组件主体) 需填写组件名(El开头大驼峰法), 有需要引入样式的, 样式文件存放于 [packages/theme-chalk/src](packages/theme-chalk/src)  

关于组件开发时的vue3写法, 可以参考 [vue3](http://v3.vuejs.org) 文档, 或者已有组件.  
最后, 在 [packages/index.ts](packages/index.ts) 中导入并声明和使用.  
### 组件入口文件
``` ts
import { App } from 'vue'
// 如果是B组件从属于A组件的情况(如form-item从属于form), B组件入口修改下导入路径即可
import Component from './src/index.vue'
export const install = function (app: App) {
  app.component(Component.name as string, Component)
}

export default Component
```

## 编写文档
首先, 复制 [template](templates/packages/template) 文件夹的模板, 将其复制到 [views](examples/views) 目录下, 然后将文件夹名改为相应的组件名(El开头大驼峰法)  
该模板下:  
- index.ts (入口) 新增demo组件时, 需要在这个文件里导入并导出
- index.md (文档主体) 支持Markdown写法(由于markdown-it解析时存在一些问题, 因此和预期的写法有一些出入, 模板中有说明)
- .vue (demo组件), 一般由card和code组件组合而成. card的header插槽用于展示效果, 默认插槽用于展示源码. code的desc插槽, 填充的是demo组件默认插槽里的内容, 内容一般是在index.md中填写

最后在 [View.vue](examples/views/View.vue) 文件中导入, 并加入到常量demos里, 同时将组件信息添加到 [Components.ts](examples/views/Components.ts) 的组件列表里 (示例文档左侧的列表)
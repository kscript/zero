## 组件开发

首先, 复制 [templates/packages/template](templates/packages/template) 文件夹的组件模板, 将其复制到 [packages](packages) 目录下, 然后将文件夹名改为相应的组件名
该模板下:  
- index.ts 文件是供外部import的入口, 一般不需要修改
- src/index.vue 文件即是组件主体, 复制后需填写组件名(El开头大驼峰法), 如果需要样式, 样式文件存放于 [packages/theme-chalk/src](packages/theme-chalk/src)  

关于组件开发时的vue3写法, 可以参考 [vue3](http://v3.vuejs.org) 文档, 或者已有组件.  

最后, 在 [packages/index.ts](packages/index.ts) 中导入并声明和使用.  

## 编写文档
首先, 复制 [templates/examples/template](templates/packages/template) 文件夹的文档模板, 将其复制到 [examples/views](examples/views) 目录下, 然后将文件夹名改为相应的组件名(El开头大驼峰法)  
该模板下:  
- index.ts 文件是供外部import的入口, 新增demo组件时, 需要在这个文件里导入并导出
- index.md 文件是文档主体, 支持Markdown写法(由于markdown-it解析时存在一些问题, 因此和预期的写法有一些出入, 模板中有说明)
- .vue 文件是单个demo组件所在的文件, 一般由card和code组件组合而成. card的header插槽用于展示效果, 默认插槽用于展示源码. code的desc插槽, 填充的是demo组件默认插槽里的内容, 内容一般是在index.md中填写

最后在 [examples/views/View.vue](examples/views/View.vue) 文件中导入, 并加入到常量demos里
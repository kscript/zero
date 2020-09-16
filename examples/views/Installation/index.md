## 安装

### npm 安装
```
npm i -D @zero-ui/vue
```

### CDN 引入
目前可以通过 [unpkg.com/@zero-ui/vue](https://unpkg.com/@zero-ui/vue) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。
<iframe height="265" style="width: 100%;" scrolling="no" title="@zero/vue 在浏览器中使用" src="https://codepen.io/kscript/embed/qBZyYLb?height=265&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/kscript/pen/qBZyYLb'>@zero/vue 在浏览器中使用</a> by kscript
  (<a href='https://codepen.io/kscript'>@kscript</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


### 在Vue Cli构建的Vue项目中使用

``` javascript 
// 项目入口文件  
import { createApp } from 'vue'
// 组件库
import ZeroUI from '@zero-ui/vue'
// 样式文件
import '@zero-ui/vue/lib/zero.css'

createApp({})
  .use(ZeroUI)
  .mount('#app')
```

### 在Vite构建的Vue项目中使用
与 Vue cli构建的Vue项目 使用方法一致, 但需要在vite.config.js增加配置
``` javascript
// vite.config.js
module.exports = {
  optimizeDeps: {
    include: ["@zero-ui/vue"]
  }
}
```

## 特别说明
<p style="font-size: 16px;font-weight: 300;line-height: 34px;">
由于时间精力有限, 目前组件文档底部的相关属性表格, 直接复制于element-ui, 
<span style="color:red;">未经验证, 仅供参考</span>. 如在使用过程中, 遇到与文档不符之处, <a href="https://github.com/kscript/zero/issues" target="_blank" style="text-decoration: none;">请到GitHub上反馈</a>.
</p>
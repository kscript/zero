// 导入组件，组件必须声明 name
import Vcode from './src/vcode.vue'

// 为组件提供 install 安装方法，供按需引入
Vcode.install = function(Vue) {
  Vue.component(Vcode.name, Vcode)
}

// 默认导出组件
export default Vcode

// 导入组件，组件必须声明 name
import List from './src/index.vue'

// 为组件提供 install 安装方法，供按需引入
List.install = function(Vue) {
  Vue.component(List.name, List)
}

// 默认导出组件
export default List

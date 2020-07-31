// 导入组件，组件必须声明 name
import ListItem from '../List/src/item.vue'

// 为组件提供 install 安装方法，供按需引入
ListItem.install = function(Vue) {
  Vue.component(ListItem.name, ListItem)
}

// 默认导出组件
export default ListItem

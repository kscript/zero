## InfiniteScroll 无限滚动
滚动至底部时，加载更多数据。
> distance小于等于0时, 可能存在无法触发加载函数的情况, 最好设置大于0的值

### 基础用法
在要实现滚动加载的列表上添加`v-infinite-scroll`，并赋值相应的加载方法，可实现滚动到底部时自动执行加载方法。
<infinite-scroll-base></infinite-scroll-base>

### 禁用加载
<i></i>
<infinite-scroll-disabled></infinite-scroll-disabled>

### Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|infinite-scroll-disabled|是否禁用|boolean|-|false|
|infinite-scroll-delay|节流时延，单位为ms|number|-|200|
|infinite-scroll-distance|触发加载的距离阈值，单位为px|number|-|0|
|infinite-scroll-immediate|是否立即执行加载方法，以防初始状态下内容无法撑满容器。|boolean|-|true|

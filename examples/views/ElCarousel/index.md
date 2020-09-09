## Carousel 走马灯
在有限空间内，循环播放同一类型的图片、文字等内容

### 基础用法
适用广泛的基础用法
<el-carousel-base>
结合使用`el-carousel`和`el-carousel-item`标签就得到了一个走马灯。幻灯片的内容是任意的，需要放在`el-carousel-item`标签中。默认情况下，在鼠标 **hover** 底部的指示器时就会触发切换。通过设置`trigger`属性为`click`，可以达到点击触发的效果。
</el-carousel-base>

### 指示器
可以将指示器的显示位置设置在容器外部
<el-carousel-indicator>
`indicator-position`属性定义了指示器的位置。默认情况下，它会显示在走马灯内部，设置为`outside`则会显示在外部；设置为`none`则不会显示指示器。
</el-carousel-indicator>

### 切换箭头
可以设置切换箭头的显示时机
<el-carousel-arrow>
`arrow`属性定义了切换箭头的显示时机。默认情况下，切换箭头只有在鼠标 **hover** 到走马灯上时才会显示；若将`arrow`设置为`always`，则会一直显示；设置为`never`，则会一直隐藏。
</el-carousel-arrow>

### 卡片化
当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格
<el-carousel-card>
将`type`属性设置为`card`即可启用卡片模式。从交互上来说，卡片模式和一般模式的最大区别在于，可以通过直接点击两侧的幻灯片进行切换。
</el-carousel-card>

### 方向
默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示。
<el-carousel-direction></el-carousel-direction>

### Carousel Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|height|走马灯的高度|string|—|—|
|initial-index|初始状态激活的幻灯片的索引，从 0 开始|number|—|0|
|trigger|指示器的触发方式|string|click|—|
|autoplay|是否自动切换|boolean|—|true|
|interval|自动切换的时间间隔，单位为毫秒|number|—|3000|
|indicator-position|指示器的位置|string|outside/none|—|
|arrow|切换箭头的显示时机|string|always/hover/never|hover|
|type|走马灯的类型|string|card|—|
|loop|是否循环显示|boolean|-|true|
|direction|走马灯展示的方向|string|horizontal/vertical|horizontal|

### Carousel Events
|事件名称|说明|回调参数|
|--|--|--|
|change|幻灯片切换时触发|目前激活的幻灯片的索引，原幻灯片的索引|

### Carousel Methods
|方法名|说明|参数|
|--|--|--|
|setActiveItem|手动切换幻灯片|需要切换的幻灯片的索引，从 0 开始；或相应 el-carousel-item 的 name 属性值|
|prev|切换至上一张幻灯片|—|
|next|切换至下一张幻灯片|—|

### Carousel-Item Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|name|幻灯片的名字，可用作 setActiveItem 的参数|string|—|—|
|label|该幻灯片所对应指示器的文本|string|—|—|
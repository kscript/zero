## Image 图片
图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等

### 基础用法
<i></i>
<el-image-base>
可通过`fit`确定图片如何适应到容器框，同原生 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" target="_blank">object-fit</a>。
</el-image-base>

### 占位内容
<i></i>
<el-image-placeholder>
可通过`placeholder`插槽自定义占位内容
</el-image-placeholder>

### 加载失败
<i></i>
<el-image-error>
可通过`error`插槽自定义加载失败内容
</el-image-error>

### 懒加载
<i></i>
<el-image-lazy>
可通过`lazy`开启懒加载功能，当图片滚动到可视范围内才会加载。可通过`scroll-container`来设置滚动容器，若未定义，则为最近一个`overflow`值为`auto`或`scroll`的父元素。
</el-image-lazy>

### 大图预览
<i></i>
<el-image-big>
可通过 `previewSrcList` 开启预览大图的功能。
</el-image-big>


### Attributes
|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|src|图片源，同原生|string|—|-|
|fit|确定图片如何适应容器框，同原生 object-fit|string|fill / contain / cover / none / scale-down|-|
|alt|原生 alt|string|-|-|
|referrer-policy|原生 referrerPolicy|string|-|-|
|lazy|是否开启懒加载|boolean|—|false|
|scroll-container|开启懒加载后，监听 scroll 事件的容器|string / HTMLElement|—|最近一个 overflow 值为 auto 或 scroll 的父元素|
|preview-src-list|开启图片预览功能|Array|—|-|
|z-index|设置图片预览的 z-index|Number|—|2000|

### Events
|事件名称|说明|回调参数|
|--|--|--|
|load|图片加载成功触发|(e: Event)|
|error|图片加载失败触发|(e: Error)|

### Slots
|名称|说明|
|--|--|
|placeholder|图片未加载的占位内容|
|error|加载失败的内容|
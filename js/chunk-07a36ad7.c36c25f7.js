(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07a36ad7"],{"1c91":function(e,t,n){},4990:function(e,t,n){"use strict";n.r(t);n("ac1f"),n("5319");var c=n("7a23"),a={ElTag:function(){return n("7e63").default}},l=Object(c["i"])({props:{id:{type:String,default:""}},setup:function(e){var t={render:function(){}},n=Object(c["c"])((function(){var n;return(null===(n=a[e.id])||void 0===n?void 0:n.call(a))||t})),l={};return Object(c["u"])("docsView",{collapseNameChange:function(e,t){if(e)for(var n in l[e]=t,l)l[n]!==t&&l[n]()}}),function(){var t,a;return Object(c["k"])("div",{class:e.id.replace(/[A-Z]/g,(function(e,t){return(0===t?"":"-")+e.toLowerCase()}))+"-md demo-container"},(null===(t=(a=n.value).render)||void 0===t?void 0:t.call(a))||[])}}});n("c38b"),t["default"]=l},"7e63":function(e,t,n){"use strict";n.r(t);var c=n("7a23");const a={class:"markdown"},l=Object(c["h"])("h2",null,"Tag 标签",-1),r=Object(c["h"])("p",null,"用于标记和选择。",-1),b=Object(c["h"])("h3",null,"基础用法",-1),u=Object(c["g"])("标签一"),o=Object(c["g"])("标签二"),s=Object(c["g"])("标签三"),j=Object(c["g"])("标签四"),O=Object(c["g"])("标签五"),d=Object(c["g"])(Object(c["C"])('\n<el-tag>标签一</el-tag>\n<el-tag type="success">标签二</el-tag>\n<el-tag type="info">标签三</el-tag>\n<el-tag type="warning">标签四</el-tag>\n<el-tag type="danger">标签五</el-tag>\n'),1),i=Object(c["h"])("h3",null,"可移除标签",-1);function g(e,t){const n=Object(c["A"])("el-tag"),g=Object(c["A"])("el-code"),p=Object(c["A"])("el-card");return Object(c["s"])(),Object(c["e"])("div",a,[l,r,b,Object(c["h"])(p,{shadow:"never"},{header:Object(c["I"])(()=>[Object(c["h"])(n,null,{default:Object(c["I"])(()=>[u]),_:1}),Object(c["h"])(n,{type:"success"},{default:Object(c["I"])(()=>[o]),_:1}),Object(c["h"])(n,{type:"info"},{default:Object(c["I"])(()=>[s]),_:1}),Object(c["h"])(n,{type:"warning"},{default:Object(c["I"])(()=>[j]),_:1}),Object(c["h"])(n,{type:"danger"},{default:Object(c["I"])(()=>[O]),_:1})]),default:Object(c["I"])(()=>[Object(c["h"])(g,{collapse:"",desc:"由type属性来选择tag的类型，也可以通过color属性来自定义背景色。"},{default:Object(c["I"])(()=>[d]),_:1})]),_:1}),i,Object(c["h"])(p,{shadow:"never"},{header:Object(c["I"])(()=>[(Object(c["s"])(),Object(c["e"])(c["a"],null,Object(c["y"])([{name:"标签一",type:""},{name:"标签二",type:"success"},{name:"标签三",type:"info"},{name:"标签四",type:"warning"},{name:"标签五",type:"danger"}],e=>Object(c["h"])(n,{key:e.name,type:e.type,closable:""},{default:Object(c["I"])(()=>[Object(c["g"])(Object(c["C"])(e.name),1)]),_:2},1032,["type"])),64))]),default:Object(c["I"])(()=>[Object(c["h"])(g,{collapse:"",desc:"设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，*true* 为关闭。"},{default:Object(c["I"])(()=>[Object(c["g"])(Object(c["C"])("\n<el-tag\n  v-for=\"tag in tags\"\n  :key=\"tag.name\"\n  closable\n  :type=\"tag.type\">\n  {{tag.name}}\n</el-tag>\n<script>\n  export default {\n    data() {\n      return {\n        tags: [\n          { name: '标签一', type: '' },\n          { name: '标签二', type: 'success' },\n          { name: '标签三', type: 'info' },\n          { name: '标签四', type: 'warning' },\n          { name: '标签五', type: 'danger' }\n        ]\n      }\n    }\n  }\n<\/script>\n"),1)]),_:1})]),_:1})])}const p={};p.render=g;t["default"]=p},c38b:function(e,t,n){"use strict";n("1c91")}}]);
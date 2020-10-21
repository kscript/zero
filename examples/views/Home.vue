<template>
  <el-container class="home" direction="vertical">
    <el-header height="80px">
      <div class="container">
        <el-link href="./" :underline="false">
          <span class="title">
            zero-ui
          </span>
        </el-link>
        <el-link class="link-icon" icon="iconfont icon-github" href="https://github.com/kscript/zero" :underline="false" target="_blank"></el-link>
        <el-link class="link-icon" icon="iconfont icon-qq" href="https://qm.qq.com/cgi-bin/qm/qr?k=dny0rBikAgLvvYwzKT8IOBzq70KvwEMs&jump_from=webapi" :underline="false" target="_blank"></el-link>
      </div>
    </el-header>
    <el-main>
      <el-scrollbar ref="scroll" wrapClass="main-scroll-wrap" viewClass="main-scroll-view">
        <template v-if="name === 'Home'">
          <v-welcome></v-welcome>
        </template>
        <template v-else>
          <router-view></router-view>
        </template>
      </el-scrollbar>
    </el-main>
    <el-backtop target=".main-scroll-wrap" :bottom="60">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }"
      >
        UP
      </div>
    </el-backtop>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, ref,  watch, getCurrentInstance, ComponentInternalInstance, provide} from 'vue'
import { useRoute } from 'vue-router'
import VWelcome from './Welcome.vue'
import { list } from './Components'
export default defineComponent({
  name: 'Home',
  components: {
    VWelcome
  },
  setup(props, cxt) {
    const instance = getCurrentInstance() as ComponentInternalInstance 
    const route = useRoute()
    const name = ref(route.name)
    provide('home', {
      instance
    })
    return {
      name
    }
  }
})
</script>
<style lang="scss" scoped>
$height: 80px;
.el-header{
  border-bottom: 1px solid #f8f8f8;
  .container {
    width: 1140px;
    margin: 0 auto;
  }
  .title {
    font-size: 32px;
    line-height: $height;
  }
  .link-icon {
    float: right;
  }
  ::v-deep(.iconfont) {
    font-size: 28px;
    line-height: $height;
    margin-left: 12px;
  }
}
.el-main {
  padding: 80px 0 0 0;
  height: 100vh;
  margin-top: -80px;
  box-sizing: border-box;
}
.el-scrollbar{
  height: 100%;
  // ::v-deep(.main-scroll-view) {
  //   padding-top: 30px;
  // }
}
</style>

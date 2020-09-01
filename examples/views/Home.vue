<template>
  <el-container class="home" direction="vertical">
    <el-header height="80px">
      <div class="container">
        <span class="title">
          zero-ui
        </span>
        <el-link class="link-repository" icon="iconfont icon-github" href="https://github.com/kscript/zero" :underline="false" target="_blank"></el-link>
      </div>
    </el-header>
    <el-main>
      <el-scrollbar>
        <template v-if="name === 'Home'">
          <v-welcome></v-welcome>
        </template>
        <template v-else>
          <router-view></router-view>
        </template>
      </el-scrollbar>
    </el-main>
    <el-backtop :bottom="100">
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
import { defineComponent, ref,  watch, getCurrentInstance, ComponentInternalInstance} from 'vue'
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
    return {
      name
    }
  }
})
</script>
<style lang="scss" scoped>
$height: 80px;
.el-header{
  .container {
    width: 1140px;
    margin: 0 auto;
    border-bottom: 1px solid #f8f8f8;
  }
  .title {
    font-size: 32px;
    line-height: $height;
  }
  .link-repository {
    float: right;
  }
  ::v-deep(.icon-github) {
    font-size: 28px;
    line-height: $height;
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
}
</style>

<template>
  <div class="docs">
    <el-container>
      <el-aside width="240px">
        <el-scrollbar class="full-screen-height">
          <ul class="componet-list">
            <li v-for="vo in componets" :key="vo.name">
              <router-link :to="{ path: '/docs/' + vo.name }">
                <el-link>
                  {{vo.title}}
                </el-link>
              </router-link>
            </li>
          </ul>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
      <!-- <el-aside></el-aside> -->
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { list } from './Components'
export default defineComponent({
  name: 'Home',
  setup() {
    const componets = ref(list)
    return {
      componets
    }
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  width: 1140px;
  margin: 0 auto;
}
.el-scrollbar.full-screen-height {
  height: 100vh;
}
.componet-list {
  padding-left: 0;
  li {
    list-style: none;
    padding: 10px;
  }
}
</style>
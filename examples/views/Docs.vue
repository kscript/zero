<template>
  <div class="docs">
    <el-container>
      <el-aside>
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
.el-scrollbar.full-screen-height {
  height: 100vh;
}
.componet-list {
  li {
    list-style: none;
    padding: 10px;
  }
}
</style>
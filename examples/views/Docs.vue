<template>
  <div class="docs">
    <el-container>
      <el-aside width="240px">
        <el-scrollbar class="full-screen-height">
          <ul class="componet-list">
            <li v-for="vo in componets" :key="vo.name">
              <router-link :to="{ path: '/docs/' + vo.name }">
                <el-link :type="vo.name === activeName ? 'primary' : 'default'" @click="clickHandler(vo.name)">
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
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Home',
  setup() {
    const route = useRoute()
    const componets = ref(list)
    const activeName = ref(route.params.id)
    const clickHandler = (name: string) => {
      activeName.value = name
    }
    return {
      activeName,
      clickHandler,
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
  height: calc(100vh - 80px);
  position: fixed;
  width: 240px;
}
.componet-list {
  padding-left: 0;
  li {
    list-style: none;
    padding: 10px;
  }
}
</style>
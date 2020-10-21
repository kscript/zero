<template>
  <div class="docs">
    <el-container>
      <el-aside width="240px">
        <el-scrollbar class="full-screen-height">
          <ul class="componet-list">
            <li v-for="vo in components" :key="vo.name">
              <router-link :to="{ path: '/docs/' + vo.name }">
                <el-link :type="vo.name === activeName ? 'primary' : 'default'">
                  {{vo.title}}
                </el-link>
              </router-link>
            </li>
          </ul>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-aside></el-aside> -->
        <el-footer height="80px">
          <router-link v-if="prev.name" :to="{
            path: '/docs/' + prev.name
          }">
            <el-link :underline="false">
              <el-icon name="arrow-left"></el-icon>
              {{prev.title || ''}}
            </el-link>
          </router-link>
          <router-link v-if="next.name" :to="{
            path: '/docs/' + next.name
          }">
            <el-link class="right" :underline="false">
              {{next.title || ''}}
              <el-icon name="arrow-right"></el-icon>
            </el-link>
          </router-link>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { list } from './Components'
import { useRoute } from 'vue-router'
import { components } from 'packages'

export default defineComponent({
  name: 'Home',
  setup() {
    const route = useRoute()
    const components = ref(list)
    const activeIndex = ref(-1)
    const activeName = ref(route.params.id)

    const prev = computed(() => {
      const index = activeIndex.value - 1
      return index < 0 ? {} : components.value[index]
    })
    const next = computed(() => {
      const index = activeIndex.value + 1
      return index < 0 || index >= components.value.length ? {} : components.value[index]
    })

    watchEffect(() => {
      activeName.value = route.params.id
      activeIndex.value = components.value.findIndex(item => item.name === route.params.id)
    })

    return {
      activeName,
      components,
      prev,
      next
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
.el-footer {
  padding: 15px;
  box-sizing: border-box;
  .right {
    float: right;
  }
}
</style>
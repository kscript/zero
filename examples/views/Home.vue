<template>
  <div class="home">
    <template v-if="name === 'Home'">
      <v-welcome></v-welcome>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
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
  </div>
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

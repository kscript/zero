<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-fit">
        <div class="block" v-for="fit in fits" :key="fit">
            <span class="title">{{ fit }}</span>
            <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
        </div>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
    {{`<div class="demo-fit">
          <div class="block" v-for="fit in fits" :key="fit">
              <span class="title">\{\{ fit \}\}</span>
              <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
          </div>
        </div>
      
      <script>
      import { defineComponent } from 'vue'
      export default defineComponent({
        setup() {
          const fits = ref(['fill', 'contain', 'cover', 'none', 'scale-down'])
          const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
          return {
            fits,
            url
          }
        }
      })
      </script>`}}
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ElAvatarFit',
  setup() {
    const fits = ref(['fill', 'contain', 'cover', 'none', 'scale-down'])
    const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
    return {
      fits,
      url
    }
  }
})
</script>
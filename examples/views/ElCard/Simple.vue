<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-simple-demo">
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div v-for="o in 4" :key="o" class="text item">
        \{\{'列表内容 ' + o \}\}
      </div>`}}
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Simple'
})
</script>

<style lang="scss">
.card-simple-demo {
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
}
</style>
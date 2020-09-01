<template>
  <el-card shadow="hover">
    <template #header>
      <div class="demo-type">
        <div>
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
        <div>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div>
          <el-avatar> user </el-avatar>
        </div>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1" desc="">
    {{`<div class="demo-type">
        <div>
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
        <div>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div>
          <el-avatar> user </el-avatar>
        </div>
      </div>
      
      <script>
      import { defineComponent } from 'vue'
      export default defineComponent({
      })
      </script>`}}
    </el-code>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElAvatarType',
})
</script>
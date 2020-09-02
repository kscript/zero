<template>
  <el-card shadow="hover">
    <template #header>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>

      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>

      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>

      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>

      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-container>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>

      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>

      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>

    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>

      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>

      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>

      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>

      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-container>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>

      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>

      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>

      <style>
        .el-header, .el-footer {
          background-color: #B3C0D1;
          color: #333;
          text-align: center;
          line-height: 60px;
        }
        
        .el-aside {
          background-color: #D3DCE6;
          color: #333;
          text-align: center;
          line-height: 200px;
        }
        
        .el-main {
          background-color: #E9EEF3;
          color: #333;
          text-align: center;
          line-height: 160px;
        }
        
        .el-container:nth-child(5) .el-aside,
        .el-container:nth-child(6) .el-aside {
          line-height: 260px;
        }
        
        .el-container:nth-child(7) .el-aside {
          line-height: 320px;
        }
      </style>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Base'
})
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
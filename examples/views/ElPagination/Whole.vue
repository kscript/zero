<template>
  <el-card shadow="hover">
    <template #header>
      <div class="block">
        <span class="demonstration">显示总数</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">调整每页显示条数</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">直接前往</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div class="block">
        <span class="demonstration">显示总数</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">调整每页显示条数</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">直接前往</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
      
      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const handleSizeChange = (val: number) => {
            console.log(\`每页 \${val} 条\`);
          }
          const handleCurrentChange =(val: number) => {
            console.log(\`当前页: \${val}\`);
          }
          const state = reactive( {
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
          })
          return {
            ...toRefs(state),
            handleSizeChange,
            handleCurrentChange
          }
        }
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Whole',
  setup() {
    const handleSizeChange = (val: number) => {
      console.log(`每页 ${val} 条`);
    }
    const handleCurrentChange =(val: number) => {
      console.log(`当前页: ${val}`);
    }
    const state = reactive( {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    })
    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
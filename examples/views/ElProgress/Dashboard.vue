<template>
  <el-card shadow="hover">
    <template #header>
      <el-progress
        type="dashboard"
        :percentage="percentage"
        :color="colors"
      ></el-progress>
      <div>
        <el-button-group>
          <el-button icon="el-icon-minus" @click="decrease"></el-button>
          <el-button icon="el-icon-plus" @click="increase"></el-button>
        </el-button-group>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-progress
        type="dashboard"
        :percentage="percentage"
        :color="colors"
      ></el-progress>
      <div>
        <el-button-group>
          <el-button icon="el-icon-minus" @click="decrease"></el-button>
          <el-button icon="el-icon-plus" @click="increase"></el-button>
        </el-button-group>
      </div>

      <script lang="ts">
        import { defineComponent, reactive, toRefs } from 'vue'
        export default defineComponent({
          setup() {
            const state = reactive({
              percentage: 10,
              colors: [
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 }
              ]
            })
            const increase = () => {
              state.percentage += 10
              if (state.percentage > 100) {
                state.percentage = 100
              }
            }
            const decrease = () => {
              state.percentage -= 10
              if (state.percentage < 0) {
                state.percentage = 0
              }
            }
            return {
              ...toRefs(state),
              increase,
              decrease
            }
          }
        })
      </script>
      `}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Dashboard',
  setup() {
    const state = reactive({
      percentage: 10,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    })
    const increase = () => {
      state.percentage += 10
      if (state.percentage > 100) {
        state.percentage = 100
      }
    }
    const decrease = () => {
      state.percentage -= 10
      if (state.percentage < 0) {
        state.percentage = 0
      }
    }
    return {
      ...toRefs(state),
      increase,
      decrease
    }
  }
})
</script>
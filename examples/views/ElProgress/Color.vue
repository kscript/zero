<template>
  <el-card shadow="hover">
    <template #header>
      <el-progress :percentage="percentage" :color="customColor"></el-progress>
      <el-progress
        :percentage="percentage"
        :color="customColorMethod"
      ></el-progress>
      <el-progress :percentage="percentage" :color="customColors"></el-progress>
      <div>
        <el-button-group>
          <el-button icon="el-icon-minus" @click="decrease"></el-button>
          <el-button icon="el-icon-plus" @click="increase"></el-button>
        </el-button-group>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-progress :percentage="percentage" :color="customColor"></el-progress>
      <el-progress
        :percentage="percentage"
        :color="customColorMethod"
      ></el-progress>
      <el-progress :percentage="percentage" :color="customColors"></el-progress>
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
            percentage: 20,
            customColor: '#409eff',
            customColors: [
              { color: '#f56c6c', percentage: 20 },
              { color: '#e6a23c', percentage: 40 },
              { color: '#5cb87a', percentage: 60 },
              { color: '#1989fa', percentage: 80 },
              { color: '#6f7ad3', percentage: 100 }
            ]
          })
          const customColorMethod = (percentage: number) => {
            if (percentage < 30) {
              return '#909399'
            } else if (percentage < 70) {
              return '#e6a23c'
            } else {
              return '#67c23a'
            }
          }
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
            customColorMethod,
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
  name: 'Color',
  setup() {
    const state = reactive({
      percentage: 20,
      customColor: '#409eff',
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    })
    const customColorMethod = (percentage: number) => {
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    }
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
      customColorMethod,
      increase,
      decrease
    }
  }
})
</script>
<template>
  <el-card shadow="hover">
    <template #header>
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio2" size="medium">
          <el-radio-button label="上海" ></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio3" size="small">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京" disabled ></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio4" disabled size="mini">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio2" size="medium">
          <el-radio-button label="上海" ></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio3" size="small">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京" disabled ></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio4" disabled size="mini">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>

      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const state = reactive({
            radio1: '上海',
            radio2: '上海',
            radio3: '上海',
            radio4: '上海'
          })
          return {
            ...toRefs(state)
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
  name: 'ButtonDemo',
  setup() {
    const state = reactive({
      radio1: '上海',
      radio2: '上海',
      radio3: '上海',
      radio4: '上海'
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
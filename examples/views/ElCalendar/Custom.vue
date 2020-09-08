<template>
  <el-card shadow="hover">
    <template #header>
      <el-calendar>
        <template v-slot:dateCell="{data}">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
          </p>
        </template>
      </el-calendar>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-calendar>
        <template v-slot:dateCell="{data}">
          <p :class="data.isSelected ? 'is-selected' : ''">
            \{\{ data.day.split('-').slice(1).join('-') \}\} \{\{ data.isSelected ? '✔️' : ''\}\}
          </p>
        </template>
      </el-calendar>
      <script lang="ts">
      import { defineComponent } from 'vue'
      export default defineComponent({
      })
      </script>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Custom'
})
</script>
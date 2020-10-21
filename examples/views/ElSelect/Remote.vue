<template>
  <el-card shadow="hover">
    <template #header>
      <el-select
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-select
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'Remote',
  setup() {
    const list = ref([] as object[])
    const options = ref([] as object[])
    const state = reactive({
      value: [],
      loading: false,
      states: [
        "Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"
      ]
    })
    const remoteMethod = (query: string) => {
      if (query !== '') {
        state.loading = true
        setTimeout(() => {
          state.loading = false
          options.value = list.value.filter((item: anyObject) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
          console.log(options)
        }, 200)
      } else {
        options.value = []
      }
    }
    onMounted(() => {
      list.value = state.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
    })
    return {
      ...toRefs(state),
      list,
      options,
      remoteMethod
    }
  }
})
</script>
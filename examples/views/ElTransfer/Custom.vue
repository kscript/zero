<template>
  <el-card shadow="hover">
    <template #header>
      <p style="text-align: center; margin: 0 0 20px">使用 render-content 自定义数据项</p>
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          wrender-content="renderFunc"
          :titles="['Source', 'Target']"
          :button-texts="['到左边', '到右边']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          @change="handleChange"
          :data="data">
          <template #left-footer>
            <el-button class="transfer-footer" size="small">操作</el-button>
          </template>
          <template #right-footer>
            <el-button class="transfer-footer" size="small">操作</el-button>
          </template>
        </el-transfer>
      </div>
      <p style="text-align: center; margin: 50px 0 20px">使用 scoped-slot 自定义数据项</p>
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value4"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['Source', 'Target']"
          :button-texts="['到左边', '到右边']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          @change="handleChange"
          :data="data">
            <template v-slot:default="{option}">
              <span>{{ option.key }} - {{ option.label }}</span>
            </template>
            <template #left-footer>
              <el-button class="transfer-footer" size="small">操作</el-button>
            </template>
            <template #right-footer>
              <el-button class="transfer-footer" size="small">操作</el-button>
            </template>
        </el-transfer>
      </div>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<p style="text-align: center; margin: 0 0 20px">使用 render-content 自定义数据项</p>
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          wrender-content="renderFunc"
          :titles="['Source', 'Target']"
          :button-texts="['到左边', '到右边']"
          :format="{
            noChecked: '$\{total\}',
            hasChecked: '$\{checked\}/$\{total\}'
          }"
          @change="handleChange"
          :data="data">
          <template #left-footer>
            <el-button class="transfer-footer" size="small">操作</el-button>
          </template>
          <template #right-footer>
            <el-button class="transfer-footer" size="small">操作</el-button>
          </template>
        </el-transfer>
      </div>
      <p style="text-align: center; margin: 50px 0 20px">使用 scoped-slot 自定义数据项</p>
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value4"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['Source', 'Target']"
          :button-texts="['到左边', '到右边']"
          :format="{
            noChecked: '$\{total\}',
            hasChecked: '$\{checked\}/$\{total\}'
          }"
          @change="handleChange"
          :data="data">
            <template v\-slot:default="{option}">
              <span>\{\{ option.key \}\} - \{\{ option.label \}\}</span>
            </template>
            <template #left-footer>
              <el-button class="transfer-footer" size="small">操作</el-button>
            </template>
            <template #right-footer>
              <el-button class="transfer-footer" size="small">操作</el-button>
            </template>
        </el-transfer>
      </div>`}}
      <template #desc><slot></slot></template>
    </el-code>
  </el-card>
</template>

<script lang="tsx">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Custom',
  setup() {
    const generateData = () => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    const state = reactive({
      data: generateData(),
      value: [1],
      value4: [1],
      renderFunc(h: Function, option: {
        key: string
        label: string
      }) {
        return <span>{ option.key } - { option.label }</span>;
      }
    })
    const handleChange = (value: any, direction: any, movedKeys: any) => {
      console.log(value, direction, movedKeys);
    }
    return {
      ...toRefs(state),
      handleChange
    }
  }
})
</script>
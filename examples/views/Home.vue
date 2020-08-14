<template>
  <div class="home">
    <el-container>
    <el-aside>
    </el-aside>
    <el-main>
      <el-collapse @item-click="itemClick" :value="itemName">
        <el-collapse-item title="Avatar 头像" name="ElAvatar">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </el-collapse-item>
        <el-collapse-item title="Alert 警告" name="ElAlert">
          <el-alert :title="vo.title" :type="vo.type" v-for="vo in alerts" :key="vo.type"></el-alert>
        </el-collapse-item>
      </el-collapse>
    </el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, App, ComponentOptions } from 'vue'
// @ts-ignore
import { components } from 'zero-ui'
export default defineComponent({
  name: 'Home',
  setup() {
    const itemName = ref('ElAvatar')
    const itemClick = (vm: ComponentOptions) => {
      itemName.value = vm.props.name
    }
    const alerts = [
      {
        title: '成功',
        type: 'success'
      },
      {
        title: '消息',
        type: 'info'
      },
      {
        title: '警告',
        type: 'warning'
      },
      {
        title: '错误',
        type: 'error'
      }
    ]
    return {
      itemName,
      itemClick,
      alerts
    }
  }
})
</script>
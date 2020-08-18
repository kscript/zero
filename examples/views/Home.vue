<template>
  <div class="home">
    <el-container>
    <el-aside>
      侧边栏
    </el-aside>
    <el-main>
      <el-card>
        <template #header>
          <p class="text-danger">collapse 折叠面板</p>
          <el-collapse accordion v-model:value="itemName">
            <el-collapse-item title="Avatar 头像" name="ElAvatar">
              <el-card>
                <template #header>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </template>
                <el-code>
                  {{`<el-avatar icon="el-icon-user-solid"></el-avatar>`}}
                </el-code>
              </el-card>
            </el-collapse-item>
            <el-collapse-item title="Alert 警告" name="ElAlert">
              <el-card>
                <template #header>
                  <el-alert :title="vo.title" :type="vo.type" v-for="vo in alerts" :key="vo.type"></el-alert>
                </template>
                <el-code :trim="-1">
                  {{`<el-alert :title="vo.title" :type="vo.type" v-for="vo in alerts" :key="vo.type"></el-alert>`}}
                  {{`
                  <script>
                  // alerts
                  ` + JSON.stringify(alerts, null, 2) + `
                  </script>`}}
                </el-code>
              </el-card>
            </el-collapse-item>
            <el-collapse-item title="Icon 图标" name="ElIcon">
              <el-card>
                <template #header>
                  <el-icon name="user-solid"></el-icon>
                </template>
                <el-code>
                  {{`<el-icon name="user-solid"></el-icon>`}}
                </el-code>
              </el-card>
            </el-collapse-item>
            <el-collapse-item title="Badge 标记" name="ElBadge">
              <el-card>
                <template #header>
                  <el-badge :value="12" class="item">
                    <el-button size="small">评论</el-button>
                  </el-badge>
                  <el-badge :value="3" class="item">
                    <el-button size="small">回复</el-button>
                  </el-badge>
                  <el-badge :value="1" class="item" type="primary">
                    <el-button size="small">评论</el-button>
                  </el-badge>
                  <el-badge :value="2" class="item" type="warning">
                    <el-button size="small">回复</el-button>
                  </el-badge>
                </template>
                <el-code :trim="-1">
                  {{
                  `<el-badge :value="12" class="item">
                    <el-button size="small">评论</el-button>
                  </el-badge>
                  <el-badge :value="3" class="item">
                    <el-button size="small">回复</el-button>
                  </el-badge>
                  <el-badge :value="1" class="item" type="primary">
                    <el-button size="small">评论</el-button>
                  </el-badge>
                  <el-badge :value="2" class="item" type="warning">
                    <el-button size="small">回复</el-button>
                  </el-badge>`
                  }}
                </el-code>
              </el-card>
            </el-collapse-item>
            <el-collapse-item title="Button 按钮" name="ElButton">
              <el-card>
                <template #header>
                  <el-button>默认按钮</el-button>
                  <el-button type="primary">主要按钮</el-button>
                  <el-button type="success">成功按钮</el-button>
                  <el-button type="info">信息按钮</el-button>
                  <el-button type="warning">警告按钮</el-button>
                  <el-button type="danger">危险按钮</el-button>
                </template>
                <el-code :trim="-1">
                  {{
                    `<el-button>默认按钮</el-button>
                    <el-button type="primary">主要按钮</el-button>
                    <el-button type="success">成功按钮</el-button>
                    <el-button type="info">信息按钮</el-button>
                    <el-button type="warning">警告按钮</el-button>
                    <el-button type="danger">危险按钮</el-button>`
                  }}
                </el-code>
              </el-card>
            </el-collapse-item>
            <el-collapse-item title="Card 卡片" name="ElCard">
              <el-card>
                <el-code :trim="-1">
                  {{`<el-card>
                    <template #header>
                      头部
                    </template>
                    内容
                  </el-card>`}}
                </el-code>
              </el-card>
            </el-collapse-item>
          </el-collapse>
        </template>
        <el-code :trim="-1">
          {{
          `<el-collapse accordion v-model:value="itemName">
            <el-collapse-item title="Avatar 头像" name="ElAvatar">
            </el-collapse-item>
          </el-collapse>`
          }}
        </el-code>
      </el-card>
    </el-main>
    </el-container>
    <el-backtop :bottom="100">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }"
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, App, ComponentOptions } from 'vue'
// @ts-ignore
import { components } from 'zero-ui'
export default defineComponent({
  name: 'Home',
  setup() {
    const itemName = ref([])
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
      alerts
    }
  }
})
</script>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 10px;
}
.el-badge {
  margin-right: 30px;
}
</style>
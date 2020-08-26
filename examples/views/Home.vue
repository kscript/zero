<template>
  <div class="home">
    <el-container>
    <el-aside>
      <el-scrollbar class="full-screen-height">
        <ul class="componet-list">
          <li v-for="vo in list" :key="vo.name" @click="clickLink(vo)">
            <el-link>
              {{vo.title}}
            </el-link>
          </li>
        </ul>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <el-scrollbar class="full-screen-height">
        <el-collapse accordion v-model="itemName">
          <el-collapse-item title="Tag 标签" name="ElTag">
            <el-card>
              <template #header>
                <el-tag
                  v-for="tag in tags"
                  :key="tag.name"
                  closable
                  :type="tag.type"
                  :disable-transitions="false">
                  {{tag.name}}
                </el-tag>
              </template>
              <el-code :trim="-1">
                {{`<el-tag
                    v-for="tag in tags"
                    :key="tag.name"
                    closable
                    :type="tag.type"
                    :disable-transitions="false">
                    \{\{tag.name\}\}
                  </el-tag>`}}
              </el-code>
            </el-card>
          </el-collapse-item>
          <el-collapse-item title="Input 输入框" name="ElInput">
            <el-card>
              <template #header>
                <div class="demo-input-suffix">
                  属性方式：
                  <el-input
                    placeholder="请选择日期"
                    suffix-icon="el-icon-date"
                    v-model="input1">
                  </el-input>
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input2">
                  </el-input>
                </div>
                <div class="demo-input-suffix">
                  slot 方式：
                  <el-input
                    placeholder="请选择日期"
                    v-model="input3">
                    <i slot="suffix" class="el-input__icon el-icon-date"></i>
                  </el-input>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input4">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </template>
              <el-code :trim="-1">
                {{`<div class="demo-input-suffix">
                  属性方式：
                  <el-input
                    placeholder="请选择日期"
                    suffix-icon="el-icon-date"
                    v-model="input1">
                  </el-input>
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input2">
                  </el-input>
                </div>
                <div class="demo-input-suffix">
                  slot 方式：
                  <el-input
                    placeholder="请选择日期"
                    v-model="input3">
                    <i slot="suffix" class="el-input__icon el-icon-date"></i>
                  </el-input>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input4">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>`}}
              </el-code>
            </el-card>
          </el-collapse-item>
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
              <template #header>
                <el-card>
                  <template #header>
                    头部
                  </template>
                  内容
                </el-card>
              </template>
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
          <el-collapse-item title="Collapse 折叠面板" name="ElCollapse">
            <el-card>
              <template #header>
                ...
              </template>
              <el-code :trim="-1">
                {{`<el-collapse accordion v-model="itemName">
                  <el-collapse-item title="Avatar 头像" name="ElAvatar">
                  </el-collapse-item>
                </el-collapse>`}}
            </el-code>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
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
import { defineComponent, ref, App, ComponentOptions, reactive, toRefs } from 'vue'
// @ts-ignore
import { components } from 'zero-ui'
export default defineComponent({
  name: 'Home',
  setup() {
    const state = toRefs(reactive({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    }))
    const itemName = ref(['ElInput'] as string[])
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
    const tags =  ref([
      { name: '标签一', type: '' },
      { name: '标签二', type: 'success' },
      { name: '标签三', type: 'info' },
      { name: '标签四', type: 'warning' },
      { name: '标签五', type: 'danger' }
    ])
    const list = ref([
      {
        name: 'ElTag',
        title: 'Tag 标签'
      },
      {
        name: 'ElInput',
        title: 'Input 输入框'
      },
      {
        name: 'ElAvatar',
        title: 'Avatar 头像'
      },
      {
        name: 'ElAlert',
        title: 'Alert 警告'
      },
      {
        name: 'ElIcon',
        title: 'Icon 图标'
      },
      {
        name: 'ElBadge',
        title: 'Badge 标记'
      },
      {
        name: 'ElButton',
        title: 'Button 按钮'
      },
      {
        name: 'ElCard',
        title: 'Card 卡片'
      },
      {
        name: 'ElCollapse',
        title: 'Collapse 折叠面板'
      }
    ])
    const clickLink = (vo: anyObject) => {
      itemName.value = itemName.value[0] === vo.name ? [] :[vo.name]
    }
    return {
      ...state,
      itemName,
      alerts,
      tags,
      list,
      clickLink
    }
  }
})
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
}
.el-scrollbar.full-screen-height {
  height: 100vh;
}
.el-alert {
  margin-bottom: 10px;
}
.el-badge {
  margin-right: 30px;
}
.demo-input-suffix {
  margin-bottom: 10px;
}
.el-input {
  width: 180px;
  margin-right: 20px;
}
.el-tag{
  margin-right: 10px;
}

.componet-list {
  li {
    list-style: none;
    padding: 10px;
  }
}
</style>
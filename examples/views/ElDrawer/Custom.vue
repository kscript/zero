<template>
  <el-card shadow="hover">
    <template #header>
      <el-button type="text" @click="table = true">打开嵌套表格的 Drawer</el-button>
      <el-button type="text" @click="dialog = true">打开嵌套 Form 的 Drawer</el-button>
      <el-drawer
        title="我嵌套了表格!"
        v-model:visible="table"
        direction="rtl"
        size="50%">
        <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
      </el-drawer>

      <el-drawer
        title="我嵌套了 Form !"
        :before-close="handleClose"
        v-model:visible="dialog"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
        >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </template>
    <el-code collapse :trim="-1" :first="1">
      {{`<el-button type="text" @click="table = true">打开嵌套表格的 Drawer</el-button>
      <el-button type="text" @click="dialog = true">打开嵌套 Form 的 Drawer</el-button>
      <el-drawer
        title="我嵌套了表格!"
        v\-model:visible="table"
        direction="rtl"
        size="50%">
        <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
      </el-drawer>

      <el-drawer
        title="我嵌套了 Form !"
        :before-close="handleClose"
        v\-model:visible="dialog"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
        >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">\{\{ loading ? '提交中 ...' : '确 定' \}\}</el-button>
          </div>
        </div>
      </el-drawer>

      <script lang="ts">
      import { defineComponent, reactive, toRefs } from 'vue'
      export default defineComponent({
        setup() {
          const state = reactive({
            table: false,
            dialog: false,
            loading: false,
            gridData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }],
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '80px',
            timer: 0,
          })
          const handleClose = (done: Function) => {
            if (state.loading) {
              return
            }
            if (
              confirm('确定要提交表单吗？')
            ) {
              state.loading = true;
              state.timer = setTimeout(() => {
                done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  state.loading = false
                }, 400)
              }, 2000)
            }
          }
          const cancelForm = () => {
            state.loading = false
            state.dialog = false
            clearTimeout(state.timer)
          }
          return {
            ...toRefs(state),
            handleClose,
            cancelForm
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
  name: 'Custom',
  setup() {
    const state = reactive({
      table: false,
      dialog: false,
      loading: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: 0,
    })
    const handleClose = (done: Function) => {
      if (state.loading) {
        return
      }
      if (
        confirm('确定要提交表单吗？')
      ) {
        state.loading = true;
        state.timer = setTimeout(() => {
          done()
          // 动画关闭需要一定的时间
          setTimeout(() => {
            state.loading = false
          }, 400)
        }, 2000)
      }
    }
    const cancelForm = () => {
      state.loading = false
      state.dialog = false
      clearTimeout(state.timer)
    }
    return {
      ...toRefs(state),
      handleClose,
      cancelForm
    }
  }
})
</script>
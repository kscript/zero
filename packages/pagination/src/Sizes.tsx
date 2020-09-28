
import { defineComponent, inject, PropType, watch } from 'vue'
import ElSelect from 'packages/select'
import ElOption from 'packages/option'
// @ts-ignore
import { valueEquals } from '@/utils/util'
import { Pagination } from './type'
// @ts-ignore
import { t } from '@/locale'
export default defineComponent({
  props: {
    pageSizes: Array as PropType<string[]>
  },
  components: {
    ElSelect,
    ElOption
  },
  setup(props) {
    const parent = inject('ElPagination') as Pagination
    const handleChange = (val: string) => {
      if (parseInt(val, 10) !== parent.internalPageSize) {
        let newVal = (parent.internalPageSize = parseInt(val, 10))
        parent.userChangePageSize = true
        parent.emit('update:pageSize', newVal)
        parent.emit('size-change', newVal)
      }
    }
    watch(
      () => props.pageSizes,
      (newVal, oldVal) => {
        if (valueEquals(newVal, oldVal)) return
        if (Array.isArray(newVal)) {
          parent.internalPageSize =
            (newVal.indexOf(String(parent.pageSize)) > -1
              ? parent.pageSize
              : props.pageSizes?.[0]) as number
        }
      },
      {
        immediate: true
      }
    )
    return () => {
      return (
        <span class="el-pagination__sizes">
          <el-select
            value={parent.internalPageSize}
            popperClass={parent.popperClass || ''}
            size="mini"
            onInput={handleChange}
            disabled={parent.disabled}
          >
            {props.pageSizes?.map((item: string) => (
              <el-option
                value={item}
                label={item + t('el.pagination.pagesize')}
              ></el-option>
            ))}
          </el-select>
        </span>
      )
    }
  }
})
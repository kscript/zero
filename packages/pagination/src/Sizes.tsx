
import { defineComponent, inject, PropType, watch, ref } from 'vue'
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
    const { pageSize, popperClass, disabled, internalPageSize, userChangePageSize, emit: emitter } = inject('ElPagination') as Pagination
    const handleChange = (val: string) => {
      if (parseInt(val, 10) !== internalPageSize.value) {
        let newVal = parseInt(val, 10)
        internalPageSize.value = newVal
        userChangePageSize.value = true
        emitter('update:pageSize', newVal)
        emitter('size-change', newVal)
      }
    }
    watch(
      () => props.pageSizes,
      (newVal, oldVal) => {
        if (valueEquals(newVal, oldVal)) return
        if (Array.isArray(newVal)) {
          internalPageSize.value =
            (newVal.indexOf(String(pageSize)) > -1
              ? pageSize
              : props.pageSizes?.[0]) as number
        }
      },
      {
        immediate: true
      }
    )
    return () =>
      <span class="el-pagination__sizes">
        <el-select
          size="mini"
          value={internalPageSize.value}
          disabled={disabled}
          popperClass={popperClass || ''}
          onChange={handleChange}
        >
          {props.pageSizes?.map((item: string) => (
            <el-option
              value={item}
              label={item + t('el.pagination.pagesize')}
            ></el-option>
          ))}
        </el-select>
      </span>
  }
})
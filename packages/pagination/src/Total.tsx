
import { defineComponent, inject } from 'vue'
import { Pagination } from './type'
// @ts-ignore
import { t } from '@/locale'
export default defineComponent({
  render() {
    const parent = inject('ElPagination') as Pagination
    return typeof parent.total === 'number' ? (
      <span class="el-pagination__total">
        {t('el.pagination.total', { total: parent.total })}
      </span>
    ) : (
      ''
    )
  }
})
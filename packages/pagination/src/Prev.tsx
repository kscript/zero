
import { defineComponent, inject } from 'vue'
import { Pagination } from './type'
export default defineComponent({
  setup() {
    const parent = inject('ElPagination') as Pagination
    return () => {
      return (
        <button
          type="button"
          class="btn-prev"
          disabled={parent.disabled || parent.internalCurrentPage.value <= 1}
          onClick={parent.prev}
        >
          {parent.prevText ? (
            <span>{parent.prevText}</span>
          ) : (
            <i class="el-icon el-icon-arrow-left"></i>
          )}
        </button>
      )
    }
  }
})
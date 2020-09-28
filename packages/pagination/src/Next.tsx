
import { defineComponent, inject } from 'vue'
import { Pagination } from './type'
export default defineComponent({
  setup() {
    const parent = inject('ElPagination') as Pagination
    return () => {
      return (
        <button
          type="button"
          class="btn-next"
          disabled={
            parent.disabled ||
            parent.internalCurrentPage.value === parent.internalPageCount ||
            parent.internalPageCount === 0
          }
          onClick={parent.next}
        >
          {parent.nextText ? (
            <span>{parent.nextText}</span>
          ) : (
            <i class="el-icon el-icon-arrow-right"></i>
          )}
        </button>
      )
    }
  }
})
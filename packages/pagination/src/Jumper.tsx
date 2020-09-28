
import { defineComponent, inject, ref, watch } from 'vue'
import { Pagination } from './type'
import ElInput from 'packages/input'
// @ts-ignore
import { t } from '@/locale'
export default defineComponent({

  components: { ElInput },

  setup() {
    const parent = inject('ElPagination') as Pagination
    const userInput = ref('')

    const handleKeyup = ({ keyCode, target }: KeyboardEvent) => {
      // Chrome, Safari, Firefox triggers change event on Enter
      // Hack for IE: https://github.com/ElemeFE/element/issues/11710
      // Drop this method when we no longer supports IE
      if (keyCode === 13) {
        target && handleChange((target as HTMLInputElement).value);
      }
    }
    const handleInput = (value: string) => {
      userInput.value = value
    }
    const handleChange = (value: string) => {
      parent.internalCurrentPage.value = parent.getValidCurrentPage(value)
      parent.emitChange(parent.getValidCurrentPage(value))
      userInput.value = ''
    }
    watch(() => parent.internalCurrentPage.value, () => {
      userInput.value = ''
    })
    return {
      userInput,
      parent,
      handleKeyup,
      handleInput,
      handleChange
    }
  },
  render() {
    return (
      <span class="el-pagination__jump">
        {t('el.pagination.goto')}
        <el-input
          class="el-pagination__editor is-in-pagination"
          min={1}
          max={this.parent.internalPageCount}
          value={
            this.userInput !== null
              ? this.userInput
              : this.parent.internalCurrentPage
          }
          type="number"
          disabled={this.parent.disabled}
          nativeOnKeyup={this.handleKeyup}
          onInput={this.handleInput}
          onChange={this.handleChange}
        />
        {t('el.pagination.pageClassifier')}
      </span>
    )
  }
})
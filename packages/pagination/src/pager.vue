<template>
  <ul @click="onPagerClick" class="el-pager">
    <li
      :class="{ active: currentPage === 1, disabled }"
      v-if="pageCount > 0"
      class="number"
    >
      1
    </li>
    <li
      class="el-icon more btn-quickprev"
      :class="[quickprevIconClass, { disabled }]"
      v-if="showPrevMore"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickprevIconClass = 'el-icon-more'"
    ></li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ active: currentPage === pager, disabled }"
      class="number"
    >
      {{ pager }}
    </li>
    <li
      class="el-icon more btn-quicknext"
      :class="[quicknextIconClass, { disabled }]"
      v-if="showNextMore"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quicknextIconClass = 'el-icon-more'"
    ></li>
    <li
      :class="{ active: currentPage === pageCount, disabled }"
      class="number"
      v-if="pageCount > 1"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>

<script type="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'ElPager',

  props: {
    currentPage: Number,

    pageCount: Number,

    pagerCount: Number,

    disabled: Boolean
  },

  setup(props, { emit }) {

    const state = reactive({
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: 'el-icon-more',
      quickprevIconClass: 'el-icon-more'
    })

    const pagers = computed(() => {
      const pagerCount = props.pagerCount
      const halfPagerCount = (pagerCount - 1) / 2

      const currentPage = Number(props.currentPage)
      const pageCount = Number(props.pageCount)

      let showPrevMore = false
      let showNextMore = false

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }

      const array = []

      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }

      state.showPrevMore = showPrevMore
      state.showNextMore = showNextMore

      return array
    })

    const onPagerClick = (event) => {
      const target = event.target
      if (target.tagName === 'UL' || props.disabled) {
        return
      }

      let newPage = Number(event.target.textContent)
      const pageCount = props.pageCount
      const currentPage = props.currentPage
      const pagerCountOffset = props.pagerCount - 2

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - pagerCountOffset
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + pagerCountOffset
        }
      }

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1
        }

        if (newPage > pageCount) {
          newPage = pageCount
        }
      }
      if (newPage !== currentPage) {
        emit('change', newPage)
      }
    }

    const onMouseenter = (direction) => {
      if (props.disabled) return
      if (direction === 'left') {
        state.quickprevIconClass = 'el-icon-d-arrow-left'
      } else {
        state.quicknextIconClass = 'el-icon-d-arrow-right'
      }
    }

    watch(() => props.showPrevMore, (val) =>{
      if (!val) state.quickprevIconClass = 'el-icon-more'
    })

    watch(() => state.showNextMore, (val) => {
      if (!val) state.quicknextIconClass = 'el-icon-more'
    })

    return {
      ...toRefs(state),
      pagers,
      onPagerClick,
      onMouseenter
    }

  }

})
</script>

<style lang="scss">
@import 'theme/pagination.scss';
</style>

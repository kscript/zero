import { Ref } from 'vue';

export interface PaginationProps {
  pageSize: number
  small: boolean
  total: number
  pageCount: number
  pagerCount: number
  currentPage: number,
  layout: string,
  pageSizes: number[],
  popperClass: string,
  prevText: string,
  nextText: string,
  background: boolean,
  disabled: boolean,
  hideOnSinglePage: boolean
}

export interface PaginationReturn {
  internalPageCount: number
  handleCurrentChange: (val: number) => void
  getValidCurrentPage: (val: number | string) => number
  emitChange: (pageno?: number) => void
  prev: () => void
  next: () => void
}

export interface PaginationState {
  internalCurrentPage: Ref<number>
  internalPageSize: Ref<number>
  lastEmittedPage: Ref<number>
  userChangePageSize: Ref<boolean>
}

export interface Pagination extends PaginationState, PaginationReturn, PaginationProps {
  emit: (name: string, value: any) => void
}
<template>
  <div class="el-calendar">
    <div class="el-calendar__header">
      <div class="el-calendar__title">
        {{ i18nDate }}
      </div>
      <div
        class="el-calendar__button-group"
        v-if="validatedRange.length === 0">
        <el-button-group>
          <el-button
            type="plain"
            size="mini"
            @click="prevMonth">
            {{ t('el.datepicker.prevMonth') }}
          </el-button>
          <el-button
            type="plain"
            size="mini"
            @click="currMonth">
            {{ t('el.datepicker.today') }}
          </el-button>
          <el-button
            type="plain"
            size="mini"
            @click="nextMonth">
            {{ t('el.datepicker.nextMonth') }}
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div
      class="el-calendar__body"
      v-if="validatedRange.length === 0"
      key="no-range">
      <date-table
        hide-header
        :range="range"
        :date="date"
        :selected-day="realSelectedDay"
        :first-day-of-week="realFirstDayOfWeek"
        @pick="pickDay" />
    </div>
    <div
      v-else
      class="el-calendar__body"
      key="has-range">
      <date-table
        v-for="(range, index) in validatedRange"
        :key="index"
        :date="range[0]"
        :selected-day="realSelectedDay"
        :range="range"
        :hide-header="index !== 0"
        :first-day-of-week="realFirstDayOfWeek"
        @pick="pickDay" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, provide, computed, Prop, PropType, ComputedRef, getCurrentInstance, ComponentInternalInstance } from 'vue'
import ElButton from 'packages/button/src/index.vue'
import ElButtonGroup from 'packages/button/src/button-group.vue'
// @ts-ignore
import { t } from '@/locale'
// @ts-ignore
import fecha from '@/utils/date'
// @ts-ignore
import { validateRangeInOneMonth } from '@/utils/date-util'
import DateTable from './date-table.vue'

const validTypes = ['prev-month', 'today', 'next-month']
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const oneDay = 86400000
type propValue = Date | string | number
export default defineComponent({
  name: 'ElCalendar',

  components: {
    ElButton,
    ElButtonGroup,
    DateTable
  },

  props: {
    value: [Date, String, Number] as PropType<propValue>,
    range: {
      type: Array,
      validator(range) {
        if (Array.isArray(range)) {
          return range.length === 2 && range.every(
            item => typeof item === 'string' ||
            typeof item === 'number' ||
            item instanceof Date);
        } else {
          return true;
        }
      }
    } as Prop<propValue[]>,
    firstDayOfWeek: {
      type: Number,
      default: 1
    }
  },

  provide() {
    return {
      elCalendar: this
    };
  },

  setup(props, { emit, slots }) {
    const state = reactive({
      selectedDay: '',
      now: new Date()
    })
    const prevMonthDatePrefix = computed(() => {
      const temp = new Date(date.value.getTime())
      temp.setDate(0)
      return fecha.format(temp, 'yyyy-MM')
    })

    const curMonthDatePrefix = computed(() => {
      return fecha.format(date.value, 'yyyy-MM')
    })

    const nextMonthDatePrefix = computed(() => {
      const temp = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 1)
      return fecha.format(temp, 'yyyy-MM')
    })

    const formatedDate = computed(() => {
      return fecha.format(date.value, 'yyyy-MM-dd')
    })

    const i18nDate = computed(() => {
      const year = date.value.getFullYear()
      const month = date.value.getMonth() + 1;
      return `${year} ${t('el.datepicker.year')} ${t('el.datepicker.month' + month)}`
    })

    const formatedToday = computed(() => {
      return fecha.format(state.now, 'yyyy-MM-dd');
    })

    const realSelectedDay = computed({
      get() {
        if (!props.value) return state.selectedDay;
        return formatedDate.value;
      },
      set(val: string) {
        state.selectedDay = val
        const date = new Date(val)
        emit('input', date)
      }
    })

    const date = computed(() => {
      if (!props.value) {
        if (realSelectedDay.value) {
          const d = state.selectedDay.split('-')
          return new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2]))
        } else if (validatedRange.value.length) {
          return validatedRange.value[0][0];
        }
        return state.now
      } else {
        return toDate(props.value)
      }
    })

    // if range is valid, we get a two-digit array
    const validatedRange = computed((): Date[][] => {
      let range = props.range
      let result = []
      if (range) {
        result = range.reduce((prev: Date[], val: propValue, index: number) => {
          const date = toDate(val)
          if (rangeValidator(date, index === 0)) {
            prev = prev.concat(date)
          }
          return prev
        }, [])
      } else {
        return []
      }
      if (result.length === 2) {
        const [start, end] = result
        if (start > end) {
          console.warn('[ElementCalendar]end time should be greater than start time');
          return [];
        }
        // start time and end time in one month
        if (validateRangeInOneMonth(start, end)) {
          return [
            [start, end]
          ]
        }
        const data = []
        let startDay = new Date(start.getFullYear(), start.getMonth() + 1, 1)
        const lastDay = toDate(startDay.getTime() - oneDay)
        if (!validateRangeInOneMonth(startDay, end)) {
          console.warn('[ElementCalendar]start time and end time interval must not exceed two months')
          return []
        }
        // 第一个月的时间范围
        data.push([
          start,
          lastDay
        ]);
        // 下一月的时间范围，需要计算一下该月的第一个周起始日
        const firstDayOfWeek = realFirstDayOfWeek.value
        const nextMontFirstDay = startDay.getDay()
        let interval = 0
        if (nextMontFirstDay !== firstDayOfWeek) {
          if (firstDayOfWeek === 0) {
            interval = 7 - nextMontFirstDay
          } else {
            interval = firstDayOfWeek - nextMontFirstDay
            interval = interval > 0 ? interval : 7 + interval
          }
        }
        startDay = toDate(startDay.getTime() + interval * oneDay)
        if (startDay.getDate() < end.getDate()) {
          data.push([
            startDay,
            end
          ])
        }
        return data
      }
      return []
    })

    const realFirstDayOfWeek = computed(() => {
      if (props.firstDayOfWeek < 1 || props.firstDayOfWeek > 6) {
        return 0
      }
      return Math.floor(props.firstDayOfWeek)
    })
    
    const pickDay = (day: string) => {
      realSelectedDay.value = day
    }

    const selectDate = (type: string) => {
      return () => {
        if (validTypes.indexOf(type) === -1) {
          throw new Error(`invalid type ${type}`)
        }
        let day = ''
        if (type === 'prev-month') {
          day = `${prevMonthDatePrefix.value}-01`
        } else if (type === 'next-month') {
          day = `${nextMonthDatePrefix.value}-01`
        } else {
          day = formatedToday.value
        }

        if (day === formatedDate.value) return
        pickDay(day)
      }
    }

    const toDate = (val: propValue) => {
      if (!val) {
        throw new Error('invalid val');
      }
      return val instanceof Date ? val : new Date(val)
    }

    const rangeValidator = (date: Date, isStart: boolean) => {
      const firstDayOfWeek = realFirstDayOfWeek.value
      const expected = isStart ? firstDayOfWeek : (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1)
      const message = `${isStart ? 'start' : 'end'} of range should be ${weekDays[expected]}.`
      if (date.getDay() !== expected) {
        console.warn('[ElementCalendar]', message, 'Invalid range will be ignored.')
        return false
      }
      return true
    }
    provide('calendar', {
      formatedToday,
      dateCellSlot: slots.dateCell
    })

    return {
      ...toRefs(state),

      i18nDate,
      validatedRange,
      date,
      realSelectedDay,
      realFirstDayOfWeek,

      t,
      prevMonth: selectDate('prev-month'),
      currMonth: selectDate('today'),
      nextMonth: selectDate('next-month'),
      pickDay,
    }
  }
})
</script>

<style lang="scss">
@import 'theme/calendar.scss';
</style>

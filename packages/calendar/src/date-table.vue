<script lang="tsx">
import { defineComponent, computed, Prop, inject, ComponentInternalInstance, h, getCurrentInstance, watch, ref } from 'vue'
// @ts-ignore
import fecha from '@/utils/date'
// @ts-ignore
import { range as rangeArr, getFirstDayOfMonth, getPrevMonthLastDays, getMonthDays, getI18nSettings, validateRangeInOneMonth } from '@/utils/date-util'
interface Cell {
  type: string;
  text: number;
}
export default defineComponent({
  props: {
    selectedDay: String, // formated date yyyy-MM-dd
    range: {
      type: Array,
      validator(val) {
        if (!(val && Array.isArray(val))) return true;
        const [start, end] = val;
        return validateRangeInOneMonth(start, end);
      }
    } as Prop<Date[]>,
    date: Date as Prop<Date>,
    hideHeader: Boolean,
    firstDayOfWeek: Number
  },


  setup(props, { emit }) {
    const WEEK_DAYS = getI18nSettings().dayNames as string[]
    const elCalendar = inject('calendar') as anyObject
    const date = computed(() => {
      return props.date || new Date()
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

    const formatedToday = computed(() => {
      return elCalendar.formatedToday.value
    })

    const isInRange = computed(() => {
      return props.range && props.range.length
    })
    const rows = computed(() => {
      let days = [];
      if (isInRange.value) {
        const [start, end] = props.range as Date[]
        const currentMonthRange = rangeArr(end.getDate() - start.getDate() + 1).map((_: any, index: number) => ({
          text: start.getDate() + index,
          type: 'current'
        }))
        let remaining = currentMonthRange.length % 7
        remaining = remaining === 0 ? 0 : 7 - remaining
        const nextMonthRange = rangeArr(remaining).map((_: any, index: number) => ({
          text: index + 1,
          type: 'next'
        }))
        days = currentMonthRange.concat(nextMonthRange)
      } else {
        let firstDay = getFirstDayOfMonth(date.value)
        firstDay = firstDay === 0 ? 7 : firstDay
        const firstDayOfWeek = typeof props.firstDayOfWeek === 'number' ? props.firstDayOfWeek : 1
        const prevMonthDays = getPrevMonthLastDays(date.value, firstDay - firstDayOfWeek).map((text: number) => ({
          text,
          type: 'prev'
        }))
        const currentMonthDays = getMonthDays(date.value).map((text: number) => ({
          text,
          type: 'current'
        }))
        days = [...prevMonthDays, ...currentMonthDays]
        const nextMonthDays = rangeArr(42 - days.length).map((_: any, index: number) => ({
          text: index + 1,
          type: 'next'
        }));
        days = days.concat(nextMonthDays);
      }
      return toNestedArr(days)
    })

    const weekDays = computed(() : string[] => {
      const start = props.firstDayOfWeek
      if (typeof start !== 'number' || start === 0) {
        return WEEK_DAYS.slice()
      } else {
        return WEEK_DAYS.slice(start).concat(WEEK_DAYS.slice(0, start))
      }
    })
  

    const toNestedArr = (days: Cell[]) => {
      return rangeArr(days.length / 7).map((_: any, index: number) => {
        const start = index * 7
        return days.slice(start, start + 7)
      })
    }

    const getFormateDate = (day: number, type: string) => {
      if (!day || ['prev', 'current', 'next'].indexOf(type) === -1) {
        throw new Error('invalid day or type')
      }
      let prefix = curMonthDatePrefix.value
      if (type === 'prev') {
        prefix = prevMonthDatePrefix.value
      } else if (type === 'next') {
        prefix = nextMonthDatePrefix.value
      }
      let _day = `00${day}`.slice(-2)
      return `${prefix}-${_day}`
    }
    const getCellClass = ({ text, type}: Cell) => {
      const classes = [type]
      if (type === 'current') {
        const date = getFormateDate(text, type)
        if (date === props.selectedDay) {
          classes.push('is-selected')
        }
        if (date === formatedToday.value) {
          classes.push('is-today')
        }
      }
      return classes
    }

    const pickDay = ({ text, type }: Cell) => {
      const date = getFormateDate(text, type);
      emit('pick', date);
    }

    const cellRenderProxy = ({ text, type }: Cell) => {
      let render = elCalendar.dateCellSlot;
      if (!render) return h('span', {
        innerText: text
      })

      const day = getFormateDate(text, type);
      const date = new Date(day);
      const data = {
        isSelected: props.selectedDay === day,
        type: `${type}-month`,
        day
      }
      return render({ date, data })
    }
  
    return () => {
      const thead = props.hideHeader ? null : (<thead>
        {
          weekDays.value.map(day => <th key={day}>{ day }</th>)
        }
      </thead>)
      return (
        <table
          class={{
            'el-calendar-table': true,
            'is-range': isInRange.value
          }}
          cellspacing="0"
          cellpadding="0">
          {
            thead
          }
          <tbody>
            {
              rows.value.map((row: Cell[], index: number) => <tr
                class={{
                  'el-calendar-table__row': true,
                  'el-calendar-table__row--hide-border': index === 0 && props.hideHeader
                }}
                key={index}>
                {
                  row.map((cell: Cell, key: number) => <td key={key}
                    class={ getCellClass(cell) }
                    onClick={pickDay.bind(this, cell)}>
                    <div class="el-calendar-day">
                      {
                        cellRenderProxy(cell)
                      }
                    </div>
                  </td>)
                }
              </tr>)
            }
          </tbody>
        </table>)
    }
  }
})

</script>

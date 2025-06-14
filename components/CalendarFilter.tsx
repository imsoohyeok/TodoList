import Calendar, { type CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useCalendarStore } from '@/stores/calendarStore'
import { formatDateToLocalString } from '@/utils/date'

export default function CalendarFilter() {
  const selectedDate = useCalendarStore((state) => state.selectedDate)
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate)

  const handleChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(formatDateToLocalString(value))
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setSelectedDate(formatDateToLocalString(value[0]))
    }
  }

  return (
    <div className="flex justify-center mb-6">
      <Calendar
        onChange={handleChange}
        value={selectedDate ? new Date(selectedDate) : new Date()}
        selectRange={false}
        locale="ko-KR"
      />
    </div>
  )
}

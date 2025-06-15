'use client'

import Calendar, { type CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useCalendarStore } from '@/stores/calendarStore'
import { useTodoStore } from '@/stores/todoStore'
import { formatDateToLocalString, isSameDay } from '@/utils/date'

export default function CalendarFilter() {
  const selectedDate = useCalendarStore((state) => state.selectedDate)
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate)
  const todos = useTodoStore((state) => state.todos)

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
        className="calendar-custom"
        onChange={handleChange}
        value={selectedDate ? new Date(selectedDate) : new Date()}
        selectRange={false}
        locale="ko-KR"
        tileContent={({ date }) => {
          const dayTodos = todos.filter((todo) =>
            isSameDay(new Date(todo.createdAt), date)
          )
          return (
            <div className="mt-1 space-y-1 px-1">
              {dayTodos.slice(0, 2).map((todo) => (
                <p
                  key={todo.id}
                  className="text-3 truncate bg-blue-100 text-blue-700 px-1 rounded max-w-20"
                >
                  {todo.text.length > 5 ? `${todo.text.slice(0, 5)}...` : todo.text}
                </p>
              ))}
              {dayTodos.length > 2 && (
                <p className="text-3 text-gray-500">+{dayTodos.length - 2}개</p>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}

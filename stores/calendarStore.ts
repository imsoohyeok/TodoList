import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CalendarState {
  selectedDate: string | null
  setSelectedDate: (date: string | null) => void
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      selectedDate: new Date().toISOString().split('T')[0],
      setSelectedDate: (date) => set({ selectedDate: date }),
    }),
    { name: 'calendar-store' }
  )
)

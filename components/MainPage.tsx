'use client'

import { useMemo, useState } from 'react'
import { useTodoStore } from '@/stores/todoStore'
import { useCalendarStore } from '@/stores/calendarStore'
import { formatDateToLocalString } from '@/utils/date'
import TodoItem from './TodoItem'
import AddTodoModal from './AddTodoModal'
import CalendarFilter from './CalendarFilter'
import { AnimatePresence } from 'framer-motion'

export default function MainPage() {
  const todos = useTodoStore((state) => state.todos)
  const filter = useTodoStore((state) => state.filter)
  const sort = useTodoStore((state) => state.sort)
  const setFilter = useTodoStore((state) => state.setFilter)
  const setSort = useTodoStore((state) => state.setSort)

  const addTodo = useTodoStore((state) => state.addTodo)
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const deleteTodo = useTodoStore((state) => state.deleteTodo)

  const [input, setInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const selectedDate = useCalendarStore((state) => state.selectedDate)

  const filteredTodos = useMemo(() => {
    let result = [...todos]

    if (filter === 'completed') result = result.filter((t) => t.completed)
    if (filter === 'active') result = result.filter((t) => !t.completed)

    if (selectedDate) {
      result = result.filter((t) => {
        const createdAtDate = formatDateToLocalString(new Date(t.createdAt))
        return createdAtDate === selectedDate
      })
    }

    if (sort === 'latest') result.sort((a, b) => b.createdAt - a.createdAt)
    else result.sort((a, b) => a.createdAt - b.createdAt)

    return result
  }, [todos, filter, sort, selectedDate])

  const handleAdd = () => {
    if (input.trim() === '') return
    addTodo(input)
    setInput('')
    setIsModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-sky-100 text-foreground p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">나으 투두 리스또</h1>

      <div className="flex justify-center gap-4 mb-4">
        <select
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilter(e.target.value as 'all' | 'completed' | 'active')
          }
          className="px-2 py-1 rounded"
        >
          <option value="all">전체</option>
          <option value="active">미완료</option>
          <option value="completed">완료</option>
        </select>

        <select
          value={sort}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSort(e.target.value as 'latest' | 'oldest')
          }
          className="px-2 py-1 rounded"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>

      <CalendarFilter />

      <ul className="space-y-2 mb-20 max-w-3xl mx-auto">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>

      <button
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-14 h-14 rounded-full text-3xl shadow-lg hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <AddTodoModal
            input={input}
            setInput={setInput}
            onAdd={handleAdd}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

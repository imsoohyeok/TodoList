'use client'

import { useState } from 'react'
import TodoItem from '@/components/TodoItem'
import AddTodoModal from '@/components/AddTodoModal'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function MainPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addTodo = () => {
    if (input.trim() === '') return
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    }
    setTodos([...todos, newTodo])
    setInput('')
    setIsModalOpen(false)
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <main className="min-h-screen bg-sky-100 text-foreground p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">나으 투두 리스또</h1>

      <ul className="space-y-2 mb-20">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleComplete(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>

      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full text-3xl shadow-lg hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      {isModalOpen && (
        <AddTodoModal
          input={input}
          setInput={setInput}
          onAdd={addTodo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  )
}

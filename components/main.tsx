'use client'

import { useState } from 'react'
import TodoItem from '@/components/TodoItem'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function MainPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim() === '') return
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    }
    setTodos([...todos, newTodo])
    setInput('')
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
    <main className="min-h-screen bg-sky-100 text-foreground p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 My Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded bg-white text-black"
          placeholder="할 일을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={addTodo}
        >
          추가
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleComplete(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </main>
  )
}

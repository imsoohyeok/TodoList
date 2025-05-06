'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function MainPage() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput('');
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleRemove = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 To-do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          onClick={handleAdd}
        >
          추가
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b py-1"
          >
            <span
              className={`cursor-pointer ${
                todo.done ? 'line-through text-gray-400' : ''
              }`}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.text}
            </span>
            <button
              className="text-red-500 text-sm"
              onClick={() => handleRemove(todo.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

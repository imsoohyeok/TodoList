'use client'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface Props {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="w-full flex items-center justify-between p-3 border rounded bg-white">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="w-4 h-4"
        />
        <span className={`text-black ${todo.completed ? 'line-through opacity-50' : ''}`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        삭제
      </button>
    </li>
  )
}

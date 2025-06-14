import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: number
}

type FilterType = 'all' | 'completed' | 'active'
type SortType = 'latest' | 'oldest'

interface TodoStore {
  todos: Todo[]
  filter: FilterType
  sort: SortType
  setFilter: (filter: FilterType) => void
  setSort: (sort: SortType) => void
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  getFilteredTodos: () => Todo[]
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      sort: 'latest',
      setFilter: (filter) => set({ filter }),
      setSort: (sort) => set({ sort }),
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text,
              completed: false,
              createdAt: Date.now(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      getFilteredTodos: () => {
        const { todos, filter, sort } = get()

        let filtered = todos
        if (filter === 'completed') {
          filtered = todos.filter((t) => t.completed)
        } else if (filter === 'active') {
          filtered = todos.filter((t) => !t.completed)
        }

        if (sort === 'latest') {
          filtered = [...filtered].sort((a, b) => b.createdAt - a.createdAt)
        } else {
          filtered = [...filtered].sort((a, b) => a.createdAt - b.createdAt)
        }

        return filtered
      },
    }),
    {
      name: 'todo-storage',
    }
  )
)

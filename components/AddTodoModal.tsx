'use client'

import { motion } from 'framer-motion'

interface Props {
  input: string
  setInput: (value: string) => void
  onAdd: () => void
  onClose: () => void
}

export default function AddTodoModal({ input, setInput, onAdd, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-6 rounded shadow w-[90%] max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h2 className="text-xl font-bold mb-4">할 일 추가</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="할 일을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            onClick={onAdd}
          >
            추가
          </button>
        </div>
      </motion.div>
    </div>
  )
}

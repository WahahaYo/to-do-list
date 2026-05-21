'use client'

interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: number, completed: boolean) => void
  onDeleteTodo: (id: number) => void
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => onToggleTodo(todo.id, e.target.checked)}
            className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
          />
          <span
            className={`flex-1 ${
              todo.completed
                ? 'line-through text-gray-400'
                : 'text-gray-800'
            }`}
          >
            {todo.title}
          </span>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
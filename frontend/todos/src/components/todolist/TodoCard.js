import { CheckCircle, Circle, Pencil, Trash2 } from "lucide-react";

export default function TodoCard({ todo, onUpdate, onDelete }) {
  return (
    <div
      key={todo.id}
      className="p-4 bg-white rounded-lg shadow-md flex items-start justify-between gap-4"
    >
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{todo.title}</h2>
        <p className="text-gray-600">{todo.description || "Không có mô tả"}</p>
        {todo.due_date && (
          <p className="text-sm text-gray-500 mt-1">
            Hạn: {new Date(todo.due_date).toLocaleDateString("vi-VN")}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        {todo.is_completed ? (
          <CheckCircle className="text-green-500 w-6 h-6" />
        ) : (
          <Circle className="text-gray-400 w-6 h-6" />
        )}

        <button
          onClick={() => onUpdate(todo)}
          className="mt-2 text-blue-500 hover:text-blue-700"
          title="Cập nhật"
        >
          <Pencil className="w-5 h-5" />
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
          title="Xoá"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

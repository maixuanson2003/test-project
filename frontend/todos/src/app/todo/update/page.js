"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import request from "@/service/api";
import { fetchTodoById, updateTodo } from "@/service/todoService";
export default function UpdateTodoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    is_completed: false, // 🆕 Trạng thái hoàn thành
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodo = async (id) => {
      try {
        const data = await fetchTodoById(id);
        const todo = data.data;
        setFormData({
          title: todo.title,
          description: todo.description || "",
          due_date: todo.due_date
            ? new Date(todo.due_date).toISOString().split("T")[0]
            : "",
          is_completed: todo.is_completed || false, // 🆕
        });
      } catch (err) {
        console.error("Không thể lấy công việc:", err);
      }
    };

    if (id) fetchTodo(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateTodo(id, formData);
      router.push("/todo");
    } catch (err) {
      setError(err.response?.data?.error || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Cập nhật công việc</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Tiêu đề *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Hạn hoàn thành
          </label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_completed"
            checked={formData.is_completed}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Đã hoàn thành</label>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Đang lưu..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
}
